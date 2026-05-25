# Domain Transfer: How To Move An Active Domain From GoDaddy To CloudFlare (High-Stakes Checklist)

---

## Intro

###### Your main website is live. Real traffic. Real email. And you're about to move the entire domain — ownership and all — from GoDaddy to CloudFlare, without taking the site offline. Done right, nobody notices. Done wrong, your site goes dark for 24 hours.

### What we're actually doing

This is a two-part move, both done in this tutorial:

1. **DNS migration first** — point GoDaddy's nameservers at CloudFlare so CloudFlare is the DNS provider. CloudFlare requires this before they'll accept a registrar transfer.
2. **Registrar transfer second** — unlock the domain at GoDaddy, pull the auth/EPP code, paste it into CloudFlare, pay, approve. CloudFlare becomes the new owner.

End state: **CloudFlare owns the domain. CloudFlare provides DNS. SiteGround still hosts the site.**

### What we're NOT doing today

- Not flipping the CloudFlare proxy on (grey cloud stays grey until we move to CloudFlare Pages)
- Not changing the web host (site stays on SiteGround)
- Not touching email routing unless we have to

---

## Why This Is A Checklist And Not A "Quick How-To"

> ⚠️ "An active production domain is not the place to discover you forgot a DNS record or skipped a registrar lock. If you miss an MX record, email stops. If you flip the proxy on too early, you get a redirect loop. If you start the registrar transfer before DNS has fully cut over, CloudFlare rejects it. We're going slow on purpose."

**Why this matters:** A nameserver change and a registrar transfer are two of the few web changes that are hard to undo cleanly. Once GoDaddy hands DNS to CloudFlare, the internet caches that for up to 48 hours. Once the registrar transfer kicks off, you can't pull it back without coordinating with both registrars. Build the new zone *first*, verify it line-by-line, *then* flip nameservers, *then* transfer the registrar.

---

## The Three Players

| Role | Today | After Phase 1 (DNS) | After Phase 2 (Registrar) — **End State** |
|---|---|---|---|
| Registrar (owns the domain) | GoDaddy | GoDaddy | **CloudFlare** |
| DNS (answers "where is this site?") | SiteGround | **CloudFlare** | CloudFlare |
| Web host (serves the site) | SiteGround | SiteGround | SiteGround |
| Proxy (orange cloud) | n/a | OFF (grey) | OFF (grey) |

The site never moves. Hosting is untouched. The only things changing are who owns the domain and who answers DNS queries.

---

## Prerequisites

- [ ] Admin access to **GoDaddy** (where the domain is registered today)
- [ ] Admin access to **SiteGround** (where DNS currently lives and where the site is hosted)
- [ ] A **CloudFlare** account (free for DNS; the registrar transfer has a fee — at-cost, no markup)
- [ ] A payment method on file at CloudFlare to cover the transfer fee (typically renews the domain by one year)
- [ ] About **45 minutes of uninterrupted time** for Phase 1, plus a few days of patient waiting for Phase 2
- [ ] A current backup of the SiteGround site *(rule: never make production changes without a known-good backup)*
- [ ] Domain is **not within 60 days** of a previous transfer or fresh registration (ICANN lock — you can't transfer if it is)

---

## Pre-Flight Status Check

Before we touch anything, capture the current state so we can compare against it later.

- [ ] In a terminal, dump the current public DNS for the domain:

```bash
dig mikemurphy.co ANY +noall +answer
dig mikemurphy.co MX +short
dig mikemurphy.co TXT +short
dig www.mikemurphy.co +short
```

- [ ] Save the output to a text file — this is your "before" snapshot
- [ ] Confirm the current nameservers (they'll point at SiteGround):

```bash
dig mikemurphy.co NS +short
```

> ⚠️ Don't skip this. If something looks wrong after the cutover, this snapshot is what you compare against to figure out what changed.

---

# Phase 1 — DNS Migration

Move CloudFlare into the DNS seat first. This is the gate CloudFlare requires before they'll accept a registrar transfer in Phase 2.

---

## Step 1: Confirm Force SSL Is Enabled On SiteGround

SiteGround needs to be serving HTTPS cleanly before CloudFlare sits in front of it. Otherwise we set ourselves up for a redirect loop later.

- [ ] Log into **SiteGround** → **Websites** → pick the site → **Site Tools**
- [ ] Go to **Security** → **SSL Manager** → confirm an active SSL certificate is installed (Let's Encrypt is fine)
- [ ] Go to **Security** → **HTTPS Enforce** → confirm the toggle is **ON** for the domain (and `www` if you use it)
- [ ] In a private browser window, visit `http://mikemurphy.co` and confirm it redirects to `https://`

---

## Step 2: Add The Domain To CloudFlare

CloudFlare scans your current public DNS and tries to import everything it can see. Trust the scan, but verify it.

- [ ] Log into **CloudFlare** → **Add a site**
- [ ] Type `mikemurphy.co` (root domain — no `www`, no `https://`)
- [ ] Pick the **Free** plan
- [ ] Let CloudFlare run the **automatic DNS scan**
- [ ] When the scan finishes, **do not click Continue yet**
- [ ] CloudFlare will show its two assigned nameservers — copy them somewhere safe, something like:

```
amy.ns.cloudflare.com
ben.ns.cloudflare.com
```

> ⚠️ Your nameservers will be different. CloudFlare assigns a unique pair per account. Don't copy mine.

---

## Step 3: Diligently Compare Zone Files — SiteGround vs CloudFlare

The most important step in this whole tutorial. **Source of truth is the SiteGround UI** — not what `dig` resolves to. SiteGround's DNS Zone Editor shows the literal records as configured. Mirror those exactly in CloudFlare.

- [ ] Open **SiteGround** → **Site Tools** → **Domain** → **DNS Zone Editor**
- [ ] Open **CloudFlare** → your new site → **DNS** → **Records** (side-by-side)
- [ ] Export or screenshot the SiteGround zone — every record, every type

Go through every record type, one by one:

| Record Type | What To Check | Common Gotcha |
|---|---|---|
| **A** | Root `@` → SiteGround IP(s) | Match every A record SiteGround shows — don't add extras, don't miss any |
| **A / CNAME** | `www` → root or SiteGround host | Missing `www` = half your visitors hit a dead end |
| **MX** | All mail exchangers + priorities | This is the email killer |
| **TXT (SPF)** | `v=spf1 ...` record | Missing this = outbound mail lands in spam |
| **TXT (DKIM)** | Mail provider's DKIM key(s) | Long values — easy to truncate on copy/paste |
| **TXT (DMARC)** | `_dmarc` record | If you have one, don't lose it |
| **TXT (verification)** | Google Search Console, Bing, Atlassian, etc. | Lose these and verifications break |
| **CNAME** | Subdomains (`mail`, `blog`, `shop`, etc.) | Inventory every subdomain |
| **SRV** | Microsoft 365, VoIP, etc. | Rare but critical if you have them |
| **CAA** | `0 issue "letsencrypt.org"` or similar | Controls who can issue SSL certs for your domain |

- [ ] For every record in SiteGround but missing from CloudFlare → **add it manually**
- [ ] For every record CloudFlare imported wrong → **fix it**
- [ ] For every record in CloudFlare that's NOT in SiteGround → confirm why or delete it

> ⚠️ **This is where people get stuck.** Most common production outage from this kind of move = a missing or wrong MX record. Read your MX records out loud. Then read them again.

- [ ] When you're satisfied CloudFlare matches SiteGround line-for-line, screenshot the CloudFlare DNS table

---

## Step 4: Turn Off Proxy On Every Record (Orange Cloud → Grey Cloud)

CloudFlare defaults to proxy ON for `A`, `AAAA`, and `CNAME` records. We don't want that yet — CloudFlare should pass traffic straight through to SiteGround. Proxy comes on later, after the CloudFlare Pages migration.

- [ ] In **CloudFlare → DNS → Records**, click every **orange cloud** once → it turns **grey** ("DNS only")
- [ ] Confirm every `A`, `AAAA`, and `CNAME` record is **grey**
- [ ] MX, TXT, SRV, CAA records don't have a proxy toggle — ignore those

> ⚠️ Skip this and CloudFlare starts proxying the second nameservers cut over. SiteGround's Let's Encrypt cert can fight CloudFlare's edge cert — classic redirect loop. Grey cloud now.

---

## Step 5: Change Nameservers On GoDaddy

The DNS cutover. The moment you save this, the internet starts learning about the new nameservers.

- [ ] Take one last look at the CloudFlare zone. Every record there? Every proxy grey? Good.
- [ ] Log into **GoDaddy** → **My Products** → find the domain → **DNS** (or **Manage DNS**)
- [ ] Scroll down to **Nameservers** → click **Change**
- [ ] Choose **"I'll use my own nameservers"** (or "Custom")
- [ ] **Delete** the SiteGround nameservers (`ns1.siteground.net` / `ns2.siteground.net`)
- [ ] **Paste in** the two nameservers CloudFlare gave you in Step 2

```
amy.ns.cloudflare.com
ben.ns.cloudflare.com
```

- [ ] Save / Confirm
- [ ] If GoDaddy emails a confirmation, click through it

---

## Step 6: Wait For CloudFlare To Confirm Nameservers

This is the boring part, and that's the point. Walk away.

- [ ] In **CloudFlare**, click **Done, check nameservers**
- [ ] Status reads **"Pending Nameserver Update"**
- [ ] Wait — usually under an hour, can take up to 24
- [ ] CloudFlare emails you: **"mikemurphy.co is now active on Cloudflare"**

While you wait, watch propagation:

```bash
dig mikemurphy.co NS +short
dig @1.1.1.1 mikemurphy.co NS +short
dig @8.8.8.8 mikemurphy.co NS +short
```

| You see | What it means |
|---|---|
| `ns1.siteground.net` (old) | Resolver hasn't picked up the change yet — keep waiting |
| `amy.ns.cloudflare.com` (new) | That resolver has cut over — getting closer |
| All three resolvers showing CloudFlare | Live on CloudFlare DNS |

> ⚠️ Do not start "fixing" things during this window. Different resolvers will give different answers for hours. That's normal.

---

## Step 7: Verify The Site Still Works

Once CloudFlare confirms the domain is active:

- [ ] Visit `https://mikemurphy.co` in a fresh private window — loads cleanly over HTTPS
- [ ] Visit `https://www.mikemurphy.co` — same
- [ ] Send a test email **to** an address on the domain — arrives
- [ ] Send a test email **from** an address on the domain — arrives, not spam-flagged
- [ ] All subdomains load
- [ ] Compare a fresh `dig` snapshot against your pre-flight snapshot — A/MX/TXT records should match

> 📝 If anything is wrong: do NOT change nameservers back. Fix the record in CloudFlare — that's now the source of truth.

---

## Step 8: Set SSL Mode To Strict On CloudFlare

Prep the SSL setting for when the proxy eventually turns on.

- [ ] In **CloudFlare** → the site → **SSL/TLS** → **Overview**
- [ ] Set encryption mode to **Full (Strict)** → Save

| Mode | What it does | Use when |
|---|---|---|
| Off | No HTTPS | Never |
| Flexible | Browser→CF is HTTPS, CF→server is HTTP | Almost never — causes loops |
| Full | End-to-end HTTPS, cert not validated | OK temporarily |
| **Full (Strict)** | End-to-end HTTPS, cert must be valid | **This is what we want** |

> ⚠️ "Strict" requires the origin to have a valid trusted cert. SiteGround's Let's Encrypt cert qualifies — that's why Step 1's Force SSL check matters.

**End of Phase 1.** CloudFlare is now the DNS provider. GoDaddy is still the registrar — for now.

---

# Phase 2 — Registrar Transfer

CloudFlare is now confirmed as your nameserver provider, which is the only prerequisite for accepting the transfer. Now we move ownership.

---

## Step 9: Unlock The Domain And Get The Auth Code At GoDaddy

Both actions live in the same GoDaddy settings screen.

- [ ] Log into **GoDaddy** → **My Products** → find the domain → click **Domain Settings** (or the domain name itself)
- [ ] Scroll to **Additional Settings** → find **Domain lock** (or "Transfer lock")
- [ ] **Turn the lock OFF** — this is what allows the outbound transfer
- [ ] In the same area, find **Authorization code** (also called "EPP code" or "Transfer code")
- [ ] Click **Get authorization code** — GoDaddy emails it to the registered admin email, OR shows it on screen
- [ ] Copy the auth code somewhere safe (a password manager, a sticky note, anywhere you can paste from in a second)

> ⚠️ Auth codes usually expire — typically 7 days. Don't get the code, then go on vacation. Get it the same day you plan to start the transfer at CloudFlare.

> 📝 If GoDaddy added a 60-day transfer lock after a recent contact-info change, you'll see it here. You can't transfer until that lifts.

---

## Step 10: Initiate The Transfer At CloudFlare

- [ ] Log into **CloudFlare** → top nav → **Domain Registration** → **Transfer Domains**
- [ ] Type `mikemurphy.co` and click **Confirm Domains**
- [ ] CloudFlare checks eligibility — should pass because:
  - You're using CloudFlare nameservers (Phase 1) ✓
  - Domain isn't within an ICANN 60-day lock ✓
  - Domain lock at GoDaddy is OFF (Step 9) ✓
- [ ] When prompted, **paste the auth/EPP code** from Step 9
- [ ] Confirm **WHOIS contact info** — CloudFlare carries this over; review it
- [ ] **Pay** — CloudFlare charges at-cost (no markup). The fee renews the domain by one year on top of your current expiration date.
- [ ] CloudFlare emails you a confirmation: "Transfer initiated."

---

## Step 11: Approve The Outbound Transfer At GoDaddy (Expedite Step)

By default, GoDaddy will hold the outbound transfer for up to 5 days before it auto-completes. You can skip the wait by approving it manually.

- [ ] Log into **GoDaddy** → top nav → **Domains** (or "All products")
- [ ] Go to **Transfers** → **Transfer Out** → **Pending Transfers**
- [ ] Find `mikemurphy.co` in the list
- [ ] Click **Accept** (or "Approve transfer")
- [ ] Confirm

> 📝 GoDaddy may also email you an "approve or decline" link. Either path works. Doing it in the Transfer Out → Pending Transfers area is the most reliable.

> ⚠️ If you do nothing, the transfer still happens — just slower (5 days). Approving manually drops that to a few hours.

---

## Step 12: Wait For The Transfer To Complete

- [ ] CloudFlare shows the domain as **"Transfer in progress"** in your dashboard
- [ ] GoDaddy shows it as **"Pending transfer out"** until the moment it completes
- [ ] You'll get two emails when it's done:
  - From GoDaddy: "Your domain has been transferred out"
  - From CloudFlare: "Your domain transfer is complete"
- [ ] Time: usually a few hours after Step 11's manual approval; up to 5 days if you didn't approve

---

## Step 13: Confirm CloudFlare Now Owns The Domain

- [ ] Log into **CloudFlare** → **Domain Registration** → **Manage Domains**
- [ ] `mikemurphy.co` appears in the list with its new CloudFlare-managed expiration date
- [ ] Click the domain → confirm **Registration status: Active**
- [ ] Confirm WHOIS shows CloudFlare as the registrar:

```bash
whois mikemurphy.co | grep -i "registrar"
```

- [ ] Output should read something like `Registrar: Cloudflare, Inc.` (was previously `GoDaddy.com, LLC`)
- [ ] Site still loads at `https://mikemurphy.co` — registrar transfer doesn't touch DNS, so this should be unchanged

---

## Final Verification Checklist

Walk through this one more time before you close the laptop:

- [ ] Site loads at `https://mikemurphy.co` ✓
- [ ] Site loads at `https://www.mikemurphy.co` ✓
- [ ] HTTP redirects to HTTPS ✓
- [ ] Inbound email works ✓
- [ ] Outbound email works and isn't spam-flagged ✓
- [ ] All subdomains load ✓
- [ ] CloudFlare DNS dashboard shows the domain as **Active** ✓
- [ ] Every DNS record in CloudFlare matches what SiteGround had ✓
- [ ] Every `A` / `AAAA` / `CNAME` record has a **grey cloud** (proxy OFF) ✓
- [ ] SSL/TLS mode is **Full (Strict)** ✓
- [ ] SiteGround **Force SSL** is still on ✓
- [ ] CloudFlare Registrar shows the domain in **Manage Domains** ✓
- [ ] `whois` confirms CloudFlare as registrar ✓
- [ ] GoDaddy account no longer lists `mikemurphy.co` under My Products ✓
- [ ] You still have the "before" DNS snapshot saved somewhere ✓

---

## Core Commands Reference

### Check current nameservers

```bash
dig mikemurphy.co NS +short
```

### Check what specific resolvers see (catches partial propagation)

```bash
dig @1.1.1.1 mikemurphy.co NS +short
dig @8.8.8.8 mikemurphy.co NS +short
```

### Snapshot the full public zone

```bash
dig mikemurphy.co ANY +noall +answer
dig mikemurphy.co MX +short
dig mikemurphy.co TXT +short
dig www.mikemurphy.co +short
```

### Confirm HTTPS is serving cleanly

```bash
curl -I https://mikemurphy.co
curl -I https://www.mikemurphy.co
```

### Confirm registrar after transfer

```bash
whois mikemurphy.co | grep -i "registrar"
```

---

## What's Next

You're done with the transfer. CloudFlare owns the domain, CloudFlare runs DNS, SiteGround still hosts the site, and the proxy is off and waiting.

The next move — separate tutorial — is moving the site itself from SiteGround to **CloudFlare Pages**. When that's ready, we turn the proxy ON (grey → orange), point the `A` / `CNAME` records at Pages, and the SSL/TLS Strict setup we did in Step 8 is already waiting for us.

---

## Wrap Up

A live-domain transfer is mostly a patience exercise. The work that matters happens *before* you change anything — building the new zone, comparing it record-by-record, confirming SSL is clean, getting the auth code ready. Once that's right, the actual moves are a handful of clicks and a quiet wait.

- DNS is now on CloudFlare, proxy off
- CloudFlare is the registrar — domain is fully theirs
- Site still hosted on SiteGround, no traffic disrupted
- Host migration to CloudFlare Pages queued up for later ✓

Mike Murphy AI

_My name is Mike Murphy, your AI Handyman — cheers!_
