// MM Design System Builder — v2026.3
// Builds the entire Mike Murphy / AI Handyman design system into the current Figma file.
// Idempotent: re-running updates / re-creates the "Foundations & Components" page.

(async () => {
  try {
    figma.notify("Building Mike Murphy DS v2026.3…", { timeout: 2000 });

    // ── PALETTE ─────────────────────────────────────────────
    const HEX = {
      cream:       "#F1ECE2",
      chalk:       "#FCFAF6",
      navy:        "#001E3A",
      orange:      "#FF6434",
      orangeDeep:  "#E8501C",
      yellow:      "#F5C842",
      teal:        "#1ECEBE",
    };

    const hexToRgb = (hex) => {
      const m = hex.replace("#", "");
      return {
        r: parseInt(m.slice(0, 2), 16) / 255,
        g: parseInt(m.slice(2, 4), 16) / 255,
        b: parseInt(m.slice(4, 6), 16) / 255,
      };
    };
    const solid = (hex, opacity) => {
      const p = { type: "SOLID", color: hexToRgb(hex) };
      if (opacity != null) p.opacity = opacity;
      return p;
    };

    // ── VARIABLE COLLECTION ─────────────────────────────────
    let collection = (await figma.variables.getLocalVariableCollectionsAsync())
      .find((c) => c.name === "Mike Murphy v2026.3");
    if (!collection) {
      collection = figma.variables.createVariableCollection("Mike Murphy v2026.3");
      collection.renameMode(collection.modes[0].modeId, "Default");
    }
    const modeId = collection.modes[0].modeId;

    const allVars = await figma.variables.getLocalVariablesAsync();
    const V = {};
    for (const v of allVars) {
      if (v.variableCollectionId === collection.id) V[v.name] = v;
    }

    // Idempotent: create if missing, always update scopes + value on every run.
    const ensureColorVar = (name, hex, scopes, opacity) => {
      let v = V[name];
      if (!v) { v = figma.variables.createVariable(name, collection, "COLOR"); V[name] = v; }
      v.scopes = scopes;
      const rgb = hexToRgb(hex);
      v.setValueForMode(modeId, opacity != null ? { r: rgb.r, g: rgb.g, b: rgb.b, a: opacity } : rgb);
      return v;
    };
    const ensureAliasVar = (name, targetName, scopes) => {
      let v = V[name];
      if (!v) { v = figma.variables.createVariable(name, collection, "COLOR"); V[name] = v; }
      v.scopes = scopes;
      if (!V[targetName]) throw new Error("Missing alias target variable: " + targetName);
      v.setValueForMode(modeId, { type: "VARIABLE_ALIAS", id: V[targetName].id });
      return v;
    };
    const ensureNumberVar = (name, val, scopes) => {
      let v = V[name];
      if (!v) { v = figma.variables.createVariable(name, collection, "FLOAT"); V[name] = v; }
      v.scopes = scopes;
      v.setValueForMode(modeId, val);
      return v;
    };

    // Primitives
    ensureColorVar("color/brand/mm-cream",       HEX.cream,      ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-chalk",       HEX.chalk,      ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-navy",        HEX.navy,       ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-orange",      HEX.orange,     ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-orange-deep", HEX.orangeDeep, ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-yellow",      HEX.yellow,     ["ALL_FILLS", "STROKE_COLOR"]);
    ensureColorVar("color/brand/mm-teal",        HEX.teal,       ["ALL_FILLS", "STROKE_COLOR"]);

    // Semantic aliases
    ensureAliasVar("color/semantic/bg-page",              "color/brand/mm-cream",       ["FRAME_FILL", "SHAPE_FILL"]);
    ensureAliasVar("color/semantic/bg-surface",           "color/brand/mm-chalk",       ["FRAME_FILL", "SHAPE_FILL"]);
    ensureAliasVar("color/semantic/text-primary",         "color/brand/mm-navy",        ["TEXT_FILL"]);
    ensureAliasVar("color/semantic/action-primary",       "color/brand/mm-orange",      ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL"]);
    ensureAliasVar("color/semantic/action-primary-hover", "color/brand/mm-orange-deep", ["FRAME_FILL", "SHAPE_FILL"]);
    ensureAliasVar("color/semantic/border-strong",        "color/brand/mm-navy",        ["STROKE_COLOR"]);
    ensureAliasVar("color/semantic/accent-ai",            "color/brand/mm-teal",        ["ALL_FILLS", "STROKE_COLOR"]);
    // Alpha-bearing semantics (standalone, not aliases)
    ensureColorVar("color/semantic/text-muted",     HEX.navy, ["TEXT_FILL"],     0.62);
    ensureColorVar("color/semantic/border-default", HEX.navy, ["STROKE_COLOR"],  0.18);

    // Number tokens
    const numberGroups = [
      { prefix: "space",  scopes: ["GAP"],            vals: [["1",4],["2",8],["3",12],["4",16],["6",24],["8",32],["12",48],["16",64],["24",96],["32",128]] },
      { prefix: "radius", scopes: ["CORNER_RADIUS"],  vals: [["sm",2],["md",4],["lg",8],["pill",999]] },
      { prefix: "font-size", scopes: ["FONT_SIZE"],   vals: [["display",88],["h1",56],["h2",36],["h3",22],["lede",20],["body",16],["code",14],["eyebrow",13],["mono-label",12]] },
      { prefix: "line-height-pct", scopes: ["LINE_HEIGHT"], vals: [["display",92],["tight",110],["snug",125],["body",155],["code",150]] },
      { prefix: "letter-spacing",  scopes: ["LETTER_SPACING"], vals: [["display",-3],["tight",-2],["normal",0],["label",14],["eyebrow",18]] },
    ];
    for (const g of numberGroups) for (const [label, n] of g.vals) ensureNumberVar(`${g.prefix}/${label}`, n, g.scopes);

    // ── FONTS ──────────────────────────────────────────────
    const availFonts = await figma.listAvailableFontsAsync();
    const has = (fam, sty) => availFonts.some(f => f.fontName.family === fam && f.fontName.style === sty);
    const firstFont = (candidates) => {
      for (const f of candidates) if (has(f.family, f.style)) return f;
      return { family: "Inter", style: "Regular" };
    };
    const SANS_REGULAR = firstFont([{ family: "IBM Plex Sans", style: "Regular" }, { family: "Inter", style: "Regular" }]);
    const SANS_SEMIBOLD = firstFont([{ family: "IBM Plex Sans", style: "SemiBold" }, { family: "Inter", style: "Semi Bold" }, { family: "Inter", style: "Medium" }, SANS_REGULAR]);
    const SANS_BOLD = firstFont([{ family: "IBM Plex Sans", style: "Bold" }, { family: "Inter", style: "Bold" }, SANS_SEMIBOLD]);
    const MONO_REGULAR = firstFont([{ family: "IBM Plex Mono", style: "Regular" }, { family: "Roboto Mono", style: "Regular" }, SANS_REGULAR]);
    const MONO_MEDIUM = firstFont([{ family: "IBM Plex Mono", style: "Medium" }, { family: "Roboto Mono", style: "Medium" }, MONO_REGULAR]);
    const MONO_BOLD = firstFont([{ family: "IBM Plex Mono", style: "Bold" }, { family: "Roboto Mono", style: "Bold" }, MONO_MEDIUM]);
    const HAND_FONT = has("Murphydoodle", "Regular") ? { family: "Murphydoodle", style: "Regular" }
                    : has("Caveat", "Regular")       ? { family: "Caveat", style: "Regular" }
                    : has("Inter", "Italic")          ? { family: "Inter",  style: "Italic" }
                    :                                    SANS_REGULAR;

    const fontsToLoad = [
      SANS_BOLD,
      SANS_SEMIBOLD,
      SANS_REGULAR,
      MONO_BOLD,
      MONO_MEDIUM,
      MONO_REGULAR,
      HAND_FONT,
    ];
    for (const f of fontsToLoad) {
      try { await figma.loadFontAsync(f); } catch (e) { /* skip */ }
    }

    // ── TEXT STYLES ────────────────────────────────────────
    const existingStyles = await figma.getLocalTextStylesAsync();
    const S = {};
    for (const s of existingStyles) S[s.name] = s;
    const textSpecs = {};

    const ensureTextStyle = (name, opts) => {
      let s = S[name];
      if (!s) { s = figma.createTextStyle(); s.name = name; S[name] = s; }
      s.fontName = opts.font;
      s.fontSize = opts.size;
      s.lineHeight = { unit: "PERCENT", value: opts.lh };
      s.letterSpacing = { unit: "PERCENT", value: opts.ls };
      if (opts.upper) s.textCase = "UPPER"; else s.textCase = "ORIGINAL";
      textSpecs[name] = opts;
      return s;
    };

    ensureTextStyle("Display",     { font:SANS_BOLD,     size:88, lh:92,  ls:-3 });
    ensureTextStyle("H1",          { font:SANS_BOLD,     size:56, lh:110, ls:-2 });
    ensureTextStyle("H2",          { font:SANS_BOLD,     size:36, lh:110, ls:-2 });
    ensureTextStyle("H3",          { font:SANS_SEMIBOLD, size:22, lh:125, ls:-1 });
    ensureTextStyle("Lede",        { font:SANS_REGULAR,  size:20, lh:155, ls:0  });
    ensureTextStyle("Body",        { font:SANS_REGULAR,  size:16, lh:155, ls:0  });
    ensureTextStyle("Eyebrow",     { font:MONO_BOLD,     size:13, lh:110, ls:18, upper:true });
    ensureTextStyle("Mono Label",  { font:MONO_MEDIUM,   size:12, lh:110, ls:14, upper:true });
    ensureTextStyle("Code",        { font:MONO_REGULAR,  size:14, lh:150, ls:0  });
    ensureTextStyle("Tagline",     { font:MONO_BOLD,     size:24, lh:110, ls:18, upper:true });
    ensureTextStyle("Handwritten", { font:HAND_FONT, size:32, lh:110, ls:0 });

    // ── PAINT HELPERS ──────────────────────────────────────
    const fillWith = (varName, fallbackHex, opacity) => {
      return solid(fallbackHex, opacity);
    };
    const OUTER_WIDTH = 1632;
    const OUTER_HEIGHT = 12000;
    const OUTER_PADDING_X = 96;
    const SECTION_WIDTH = OUTER_WIDTH - (OUTER_PADDING_X * 2);
    const SECTION_PADDING_X = 48;
    const SECTION_INNER_WIDTH = SECTION_WIDTH - (SECTION_PADDING_X * 2);
    const SWATCH_CARD_W = 248;
    const BRAND_SWATCH_H = 152;
    const BRAND_SWATCH_BODY_H = 132;
    const SEMANTIC_SWATCH_H = 96;
    const SEMANTIC_SWATCH_BODY_H = 72;

    // ── PAGE SETUP ─────────────────────────────────────────
    let page = figma.root.children.find(p => p.name === "Foundations & Components");
    if (!page) { page = figma.createPage(); page.name = "Foundations & Components"; }
    await figma.setCurrentPageAsync(page);
    page.backgrounds = [solid(HEX.cream)];

    // Clear previous build (idempotent)
    const existing = page.children.find(c => c.name === "DS · Foundations & Components");
    if (existing) existing.remove();
    const existingCanary = page.children.find(c => c.name === "00 · Standalone Render Check");
    if (existingCanary) existingCanary.remove();

    // ── HELPERS ────────────────────────────────────────────
    // navy rgb(0, 30, 58) → r:0 g:0.1176 b:0.2275
    const NAVY_RGB = { r: 0, g: 0.1176, b: 0.2275 };
    const cutShadow = {
      type: "DROP_SHADOW",
      color: { r: NAVY_RGB.r, g: NAVY_RGB.g, b: NAVY_RGB.b, a: 1 },
      offset: { x: 4, y: 4 }, radius: 0, spread: 0,
      visible: true, blendMode: "NORMAL",
    };
    const softShadow = {
      type: "DROP_SHADOW",
      color: { r: NAVY_RGB.r, g: NAVY_RGB.g, b: NAVY_RGB.b, a: 0.10 },
      offset: { x: 0, y: 4 }, radius: 12, spread: 0,
      visible: true, blendMode: "NORMAL",
    };
    const polaroidShadow = {
      type: "DROP_SHADOW",
      color: { r: NAVY_RGB.r, g: NAVY_RGB.g, b: NAVY_RGB.b, a: 0.55 },
      offset: { x: 6, y: 12 }, radius: 0, spread: 0,
      visible: true, blendMode: "NORMAL",
    };

    const txt = (styleName, content, fillVar, fillHex, fillOpacity) => {
      const t = figma.createText();
      const spec = textSpecs[styleName];
      if (spec) {
        t.fontName = spec.font;
        t.fontSize = spec.size;
        t.lineHeight = { unit: "PERCENT", value: spec.lh };
        t.letterSpacing = { unit: "PERCENT", value: spec.ls };
        if (spec.upper) t.textCase = "UPPER"; else t.textCase = "ORIGINAL";
      }
      t.textStyleId = S[styleName].id;
      t.characters = content;
      t.fills = [fillWith(fillVar, fillHex, fillOpacity)];
      return t;
    };

    const sectionFrame = (name, padded = true) => {
      const f = figma.createFrame();
      f.name = name;
      f.layoutMode = "VERTICAL";
      f.primaryAxisSizingMode = "AUTO";
      f.counterAxisSizingMode = "FIXED";
      f.itemSpacing = 32;
      if (padded) { f.paddingTop = 48; f.paddingBottom = 48; f.paddingLeft = 48; f.paddingRight = 48; }
      f.fills = [fillWith("color/semantic/bg-surface", HEX.chalk)];
      f.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
      f.strokeWeight = 2;
      f.cornerRadius = 4;
      f.effects = [cutShadow];
      f.resizeWithoutConstraints(SECTION_WIDTH, 1);
      return f;
    };

    const sectionHeader = (eyebrowText, h2Text) => {
      const wrap = figma.createFrame();
      wrap.name = "Section Header";
      wrap.layoutMode = "VERTICAL";
      wrap.primaryAxisSizingMode = "AUTO";
      wrap.counterAxisSizingMode = "AUTO";
      wrap.itemSpacing = 8;
      wrap.fills = [];
      wrap.appendChild(txt("Eyebrow", eyebrowText, "color/semantic/text-muted", HEX.navy, 0.62));
      wrap.appendChild(txt("H2", h2Text, "color/semantic/text-primary", HEX.navy));
      return wrap;
    };

    // ── OUTER ──────────────────────────────────────────────
    const outer = figma.createFrame();
    outer.name = "DS · Foundations & Components";
    outer.layoutMode = "VERTICAL";
    outer.itemSpacing = 64;
    outer.paddingTop = 96; outer.paddingBottom = 128;
    outer.paddingLeft = 96; outer.paddingRight = 96;
    outer.primaryAxisSizingMode = "FIXED";
    outer.counterAxisSizingMode = "FIXED";
    outer.fills = [fillWith("color/semantic/bg-page", HEX.cream)];
    outer.resizeWithoutConstraints(OUTER_WIDTH, OUTER_HEIGHT);
    page.appendChild(outer);
    outer.x = 0; outer.y = 0;

    const addToOuter = (node) => {
      outer.appendChild(node);
      try { node.layoutSizingHorizontal = "FILL"; } catch (e) {}
    };

    // ── 01 COVER ────────────────────────────────────────────
    {
      const cover = sectionFrame("01 · Cover");
      cover.paddingTop = 96; cover.paddingBottom = 96; cover.paddingLeft = 80; cover.paddingRight = 80;
      cover.itemSpacing = 32;
      addToOuter(cover);
      cover.appendChild(txt("Eyebrow", "MIKE MURPHY · AI HANDYMAN", "color/semantic/text-muted", HEX.navy, 0.62));
      cover.appendChild(txt("Display", "Design System", "color/semantic/text-primary", HEX.navy));
      const lede = txt("Lede", "Tokens, type, marks, and the component vocabulary for the v2026.3 brand. Consume semantic tokens only — never hardcode hex.", "color/semantic/text-muted", HEX.navy, 0.62);
      cover.appendChild(lede);
      try { lede.layoutSizingHorizontal = "FILL"; } catch (e) {}

      const meta = figma.createFrame();
      meta.name = "Cover Meta";
      meta.layoutMode = "HORIZONTAL";
      meta.primaryAxisSizingMode = "AUTO";
      meta.counterAxisSizingMode = "AUTO";
      meta.counterAxisAlignItems = "CENTER";
      meta.itemSpacing = 16;
      meta.fills = [];
      cover.appendChild(meta);

      const pill = figma.createFrame();
      pill.layoutMode = "HORIZONTAL";
      pill.primaryAxisSizingMode = "AUTO";
      pill.counterAxisSizingMode = "AUTO";
      pill.paddingLeft = 12; pill.paddingRight = 12; pill.paddingTop = 6; pill.paddingBottom = 6;
      pill.cornerRadius = 2;
      pill.fills = [fillWith("color/semantic/text-primary", HEX.navy)];
      meta.appendChild(pill);
      pill.appendChild(txt("Mono Label", "v2026.3", "color/brand/mm-cream", HEX.cream));

      meta.appendChild(txt("Mono Label", "Updated 2026-05-19", "color/semantic/text-muted", HEX.navy, 0.62));
    }

    // ── 02 BRAND PALETTE ────────────────────────────────────
    {
      const sec = sectionFrame("02 · Brand Palette");
      addToOuter(sec);
      sec.appendChild(sectionHeader("01", "Brand colors"));

      const grid = figma.createFrame();
      grid.name = "Swatch Grid";
      grid.layoutMode = "HORIZONTAL";
      grid.layoutWrap = "WRAP";
      grid.primaryAxisSizingMode = "FIXED";
      grid.counterAxisSizingMode = "AUTO";
      grid.itemSpacing = 16;
      grid.counterAxisSpacing = 16;
      grid.fills = [];
      grid.resizeWithoutConstraints(SECTION_INNER_WIDTH, 316);
      sec.appendChild(grid);
      try { grid.layoutSizingHorizontal = "FILL"; } catch (e) {}

      const swatches = [
        { hex: HEX.cream,      varName: "color/brand/mm-cream",       rule: "Page background. Cream replaces white everywhere." },
        { hex: HEX.chalk,      varName: "color/brand/mm-chalk",       rule: "Surface / card background. Sits inside cream." },
        { hex: HEX.navy,       varName: "color/brand/mm-navy",        rule: "Primary text. Strong borders. Cut-shadows." },
        { hex: HEX.orange,     varName: "color/brand/mm-orange",      rule: "Primary action. The brand color." },
        { hex: HEX.orangeDeep, varName: "color/brand/mm-orange-deep", rule: "Action hover. Stamps and ground for the badge." },
        { hex: HEX.yellow,     varName: "color/brand/mm-yellow",      rule: "Success-state chips only (✓ You're in.). Never on hero or as body type." },
        { hex: HEX.teal,       varName: "color/brand/mm-teal",        rule: "One AI pop per screen. Cursor, live dot, satellite." },
      ];
      for (const sw of swatches) {
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.primaryAxisSizingMode = "FIXED";
        card.counterAxisSizingMode = "FIXED";
        card.itemSpacing = 0;
        card.fills = [];
        card.resizeWithoutConstraints(SWATCH_CARD_W, BRAND_SWATCH_H + BRAND_SWATCH_BODY_H);

        const chip = figma.createFrame();
        chip.fills = [fillWith(sw.varName, sw.hex)];
        chip.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
        chip.strokeWeight = 2;
        chip.resizeWithoutConstraints(SWATCH_CARD_W, BRAND_SWATCH_H);
        chip.cornerRadius = 4;
        card.appendChild(chip);

        const body = figma.createFrame();
        body.layoutMode = "VERTICAL";
        body.primaryAxisSizingMode = "FIXED";
        body.counterAxisSizingMode = "FIXED";
        body.itemSpacing = 4;
        body.paddingTop = 12; body.paddingBottom = 12; body.paddingLeft = 12; body.paddingRight = 12;
        body.fills = [];
        body.resizeWithoutConstraints(SWATCH_CARD_W, BRAND_SWATCH_BODY_H);
        card.appendChild(body);
        try { body.layoutSizingHorizontal = "FILL"; } catch (e) {}
        body.appendChild(txt("Mono Label", sw.varName.replace("color/brand/", ""), "color/semantic/text-primary", HEX.navy));
        body.appendChild(txt("Code", sw.hex.toUpperCase(), "color/semantic/text-muted", HEX.navy, 0.62));
        const rule = txt("Body", sw.rule, "color/semantic/text-muted", HEX.navy, 0.62);
        body.appendChild(rule);
        try { rule.layoutSizingHorizontal = "FILL"; } catch (e) {}

        grid.appendChild(card);
      }
    }

    // ── 03 SEMANTIC PALETTE ─────────────────────────────────
    {
      const sec = sectionFrame("03 · Semantic Palette");
      addToOuter(sec);
      sec.appendChild(sectionHeader("02", "Semantic aliases"));

      const grid = figma.createFrame();
      grid.layoutMode = "HORIZONTAL";
      grid.layoutWrap = "WRAP";
      grid.primaryAxisSizingMode = "FIXED";
      grid.counterAxisSizingMode = "AUTO";
      grid.itemSpacing = 16; grid.counterAxisSpacing = 16;
      grid.fills = [];
      grid.resizeWithoutConstraints(SECTION_INNER_WIDTH, 206);
      sec.appendChild(grid);
      try { grid.layoutSizingHorizontal = "FILL"; } catch (e) {}

      const aliases = [
        { name: "bg-page",              alias: "color/semantic/bg-page",              hex: HEX.cream,      target: "mm-cream" },
        { name: "bg-surface",           alias: "color/semantic/bg-surface",           hex: HEX.chalk,      target: "mm-chalk" },
        { name: "text-primary",         alias: "color/semantic/text-primary",         hex: HEX.navy,       target: "mm-navy" },
        { name: "text-muted",           alias: "color/semantic/text-muted",           hex: HEX.navy,       opacity: 0.62, target: "mm-navy @ 62%" },
        { name: "action-primary",       alias: "color/semantic/action-primary",       hex: HEX.orange,     target: "mm-orange" },
        { name: "action-primary-hover", alias: "color/semantic/action-primary-hover", hex: HEX.orangeDeep, target: "mm-orange-deep" },
        { name: "border-default",       alias: "color/semantic/border-default",       hex: HEX.navy,       opacity: 0.18, target: "mm-navy @ 18%" },
        { name: "border-strong",        alias: "color/semantic/border-strong",        hex: HEX.navy,       target: "mm-navy" },
        { name: "accent-ai",            alias: "color/semantic/accent-ai",            hex: HEX.teal,       target: "mm-teal" },
      ];
      for (const a of aliases) {
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.primaryAxisSizingMode = "FIXED";
        card.counterAxisSizingMode = "FIXED";
        card.fills = [];
        card.itemSpacing = 0;
        card.resizeWithoutConstraints(SWATCH_CARD_W, SEMANTIC_SWATCH_H + SEMANTIC_SWATCH_BODY_H);

        const chip = figma.createFrame();
        chip.fills = [fillWith(a.alias, a.hex, a.opacity)];
        chip.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
        chip.strokeWeight = 2;
        chip.cornerRadius = 4;
        chip.resizeWithoutConstraints(SWATCH_CARD_W, SEMANTIC_SWATCH_H);
        card.appendChild(chip);

        const body = figma.createFrame();
        body.layoutMode = "VERTICAL";
        body.primaryAxisSizingMode = "FIXED";
        body.counterAxisSizingMode = "FIXED";
        body.itemSpacing = 4;
        body.paddingTop = 12; body.paddingBottom = 12; body.paddingLeft = 12; body.paddingRight = 12;
        body.fills = [];
        body.resizeWithoutConstraints(SWATCH_CARD_W, SEMANTIC_SWATCH_BODY_H);
        card.appendChild(body);
        try { body.layoutSizingHorizontal = "FILL"; } catch (e) {}
        body.appendChild(txt("Mono Label", a.name, "color/semantic/text-primary", HEX.navy));
        body.appendChild(txt("Code", "→ " + a.target, "color/semantic/text-muted", HEX.navy, 0.62));
        grid.appendChild(card);
      }
    }

    // ── 04 TYPOGRAPHY ───────────────────────────────────────
    {
      const sec = sectionFrame("04 · Typography");
      addToOuter(sec);
      sec.appendChild(sectionHeader("03", "Type specimens"));

      const specs = [
        { style: "Display",     sample: "Move Forward.",                    spec: "IBM Plex Sans Bold · 88 / 92 / -3%" },
        { style: "H1",          sample: "Learn the tool.",                  spec: "IBM Plex Sans Bold · 56 / 110 / -2%" },
        { style: "H2",          sample: "Build something real.",            spec: "IBM Plex Sans Bold · 36 / 110 / -2%" },
        { style: "H3",          sample: "Section heading",                  spec: "IBM Plex Sans SemiBold · 22 / 125 / -1%" },
        { style: "Lede",        sample: "Here's what this actually does.",  spec: "IBM Plex Sans Regular · 20 / 155 / 0" },
        { style: "Body",        sample: "Calm, technical, never corporate. Real tool names. Real workflows.", spec: "IBM Plex Sans Regular · 16 / 155 / 0" },
        { style: "Eyebrow",     sample: "EYEBROW LABEL",                    spec: "IBM Plex Mono Bold · 13 / 110 / +18% · UPPER" },
        { style: "Mono Label",  sample: "MONO LABEL",                       spec: "IBM Plex Mono Medium · 12 / 110 / +14% · UPPER" },
        { style: "Code",        sample: "const tagline = 'LEARN · BUILD'",  spec: "IBM Plex Mono Regular · 14 / 150 / 0" },
        { style: "Tagline",     sample: "LEARN · BUILD · MOVE FORWARD",     spec: "IBM Plex Mono Bold · 24 / 110 / +18% · UPPER" },
        { style: "Handwritten", sample: "Mike",                             spec: "Murphydoodle (or Caveat fallback) · 32" },
      ];
      for (const s of specs) {
        const row = figma.createFrame();
        row.layoutMode = "VERTICAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "FIXED";
        row.itemSpacing = 8;
        row.paddingTop = 20; row.paddingBottom = 20;
        row.paddingLeft = 0; row.paddingRight = 0;
        row.fills = [];
        row.strokes = [fillWith("color/semantic/border-default", HEX.navy, 0.18)];
        row.strokeWeight = 1;
        row.strokeTopWeight = 0; row.strokeLeftWeight = 0; row.strokeRightWeight = 0; row.strokeBottomWeight = 1;
        sec.appendChild(row);
        try { row.layoutSizingHorizontal = "FILL"; } catch (e) {}

        row.appendChild(txt("Mono Label", s.style.toUpperCase() + " · " + s.spec, "color/semantic/text-muted", HEX.navy, 0.62));
        row.appendChild(txt(s.style, s.sample, "color/semantic/text-primary", HEX.navy));
      }
    }

    // ── 05 TAGLINE LOCKUP ───────────────────────────────────
    {
      const sec = sectionFrame("05 · Tagline Lockup");
      addToOuter(sec);
      sec.appendChild(sectionHeader("04", "The tagline — locked"));
      const tag = txt("Tagline", "LEARN · BUILD · MOVE FORWARD", "color/semantic/text-primary", HEX.navy);
      sec.appendChild(tag);
      sec.appendChild(txt("Body", "Mid-dots (·), ALL CAPS, IBM Plex Mono Bold. No periods, no commas. Never 'create' or 'ship'.", "color/semantic/text-muted", HEX.navy, 0.62));
    }

    // ── 06 SPACING SCALE ────────────────────────────────────
    {
      const sec = sectionFrame("06 · Spacing");
      addToOuter(sec);
      sec.appendChild(sectionHeader("05", "Spacing — 4px base"));
      const steps = [[1,4],[2,8],[3,12],[4,16],[6,24],[8,32],[12,48],[16,64],[24,96],[32,128]];
      for (const [k, v] of steps) {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.counterAxisAlignItems = "CENTER";
        row.itemSpacing = 16;
        row.fills = [];
        sec.appendChild(row);

        const label = txt("Mono Label", `space/${k}`, "color/semantic/text-primary", HEX.navy);
        label.resize(120, label.height);
        row.appendChild(label);

        const bar = figma.createFrame();
        bar.fills = [fillWith("color/brand/mm-orange", HEX.orange)];
        bar.resize(v, 16);
        bar.cornerRadius = 2;
        row.appendChild(bar);

        row.appendChild(txt("Code", `${v}px`, "color/semantic/text-muted", HEX.navy, 0.62));
      }
    }

    // ── 07 RADII ────────────────────────────────────────────
    {
      const sec = sectionFrame("07 · Radii");
      addToOuter(sec);
      sec.appendChild(sectionHeader("06", "Corner radii"));
      const grid = figma.createFrame();
      grid.layoutMode = "HORIZONTAL";
      grid.primaryAxisSizingMode = "AUTO";
      grid.counterAxisSizingMode = "AUTO";
      grid.itemSpacing = 24;
      grid.fills = [];
      sec.appendChild(grid);

      const radii = [["sm",2],["md",4],["lg",8],["pill",999]];
      for (const [k, r] of radii) {
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.primaryAxisSizingMode = "AUTO";
        card.counterAxisSizingMode = "AUTO";
        card.itemSpacing = 8;
        card.fills = [];
        grid.appendChild(card);

        const box = figma.createFrame();
        box.fills = [fillWith("color/brand/mm-navy", HEX.navy)];
        box.resize(120, 120);
        box.cornerRadius = Math.min(r, 60);
        card.appendChild(box);

        card.appendChild(txt("Mono Label", `radius/${k}`, "color/semantic/text-primary", HEX.navy));
        card.appendChild(txt("Code", r + "px", "color/semantic/text-muted", HEX.navy, 0.62));
      }
    }

    // ── 08 SHADOWS ──────────────────────────────────────────
    {
      const sec = sectionFrame("08 · Shadows");
      addToOuter(sec);
      sec.appendChild(sectionHeader("07", "Elevation"));
      const grid = figma.createFrame();
      grid.layoutMode = "HORIZONTAL";
      grid.primaryAxisSizingMode = "AUTO";
      grid.counterAxisSizingMode = "AUTO";
      grid.itemSpacing = 32;
      grid.paddingTop = 24; grid.paddingBottom = 32;
      grid.fills = [];
      sec.appendChild(grid);

      const shadows = [
        { name: "shadow-sm",       spec: "0 1px 2px navy/8",   note: "Inputs at rest",        eff: { type:"DROP_SHADOW", color:{r:0.051,g:0.106,b:0.165,a:0.08}, offset:{x:0,y:1}, radius:2,  spread:0, visible:true, blendMode:"NORMAL" } },
        { name: "shadow-md",       spec: "0 4px 12px navy/10", note: "Floating overlays",     eff: softShadow },
        { name: "shadow-cut",      spec: "4 4 0 navy",         note: "Cards & primary stamps. The signature.", eff: cutShadow },
        { name: "shadow-polaroid", spec: "6 12 0 navy/55",     note: "Polaroid only",         eff: polaroidShadow },
      ];
      for (const sh of shadows) {
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.primaryAxisSizingMode = "AUTO";
        card.counterAxisSizingMode = "AUTO";
        card.itemSpacing = 12;
        card.fills = [];
        grid.appendChild(card);

        const box = figma.createFrame();
        box.fills = [fillWith("color/semantic/bg-surface", HEX.chalk)];
        box.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
        box.strokeWeight = 2;
        box.cornerRadius = 4;
        box.resize(180, 100);
        box.effects = [sh.eff];
        card.appendChild(box);

        card.appendChild(txt("Mono Label", sh.name, "color/semantic/text-primary", HEX.navy));
        card.appendChild(txt("Code", sh.spec, "color/semantic/text-muted", HEX.navy, 0.62));
        card.appendChild(txt("Body", sh.note, "color/semantic/text-muted", HEX.navy, 0.62));
      }
    }

    // ── 09 MOTION ───────────────────────────────────────────
    {
      const sec = sectionFrame("09 · Motion");
      addToOuter(sec);
      sec.appendChild(sectionHeader("08", "Durations & easing"));
      const lines = [
        "dur-fast      120ms     micro-interactions",
        "dur-base      200ms     default transition",
        "ease-out      cubic-bezier(0.2, 0.7, 0.2, 1)        standard easing",
        "ease-spring   cubic-bezier(0.34, 1.4, 0.5, 1)       playful, slightly overshoots",
      ];
      for (const l of lines) sec.appendChild(txt("Code", l, "color/semantic/text-primary", HEX.navy));
    }

    // ── 10 LOGO & MARKS ─────────────────────────────────────
    {
      const sec = sectionFrame("10 · Logo & Marks");
      addToOuter(sec);
      sec.appendChild(sectionHeader("09", "Two marks, two jobs"));

      const loopOrangeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path d="M24 64 C24 38 40 16 64 16 C90 16 106 38 106 64 C106 89 90 110 64 110 C42 110 26 95 26 76 C26 59 39 47 54 47 C69 47 80 58 80 72 C80 85 71 93 59 90 C49 87 44 77 47 67" fill="none" stroke="#FF6434" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      const loopChalkSvg = loopOrangeSvg.replace("#FF6434", "#FCFAF6");
      const nodeNavySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><circle cx="68" cy="68" r="58" fill="#001E3A" opacity="0.25"/><circle cx="64" cy="64" r="58" fill="#001E3A"/><line x1="64" y1="51" x2="34" y2="28" stroke="#FCFAF6" stroke-width="3" stroke-linecap="round" opacity="0.55"/><line x1="77" y1="58" x2="98" y2="44" stroke="#FCFAF6" stroke-width="2.5" stroke-linecap="round" opacity="0.40"/><line x1="58" y1="77" x2="42" y2="96" stroke="#FCFAF6" stroke-width="2" stroke-linecap="round" opacity="0.28"/><circle cx="64" cy="64" r="13" fill="#FF6434"/><circle cx="30" cy="25" r="9" fill="#FCFAF6"/><circle cx="102" cy="41" r="6.5" fill="#1ECEBE"/><circle cx="39" cy="99" r="4.5" fill="#FCFAF6" opacity="0.35"/></svg>`;

      const grid = figma.createFrame();
      grid.layoutMode = "HORIZONTAL";
      grid.primaryAxisSizingMode = "AUTO";
      grid.counterAxisSizingMode = "AUTO";
      grid.itemSpacing = 32;
      grid.fills = [];
      sec.appendChild(grid);

      const makeMark = (label, role, bgVar, bgHex, svgStr) => {
        const card = figma.createFrame();
        card.layoutMode = "VERTICAL";
        card.primaryAxisSizingMode = "AUTO";
        card.counterAxisSizingMode = "AUTO";
        card.itemSpacing = 12;
        card.fills = [];
        grid.appendChild(card);

        const tile = figma.createFrame();
        tile.layoutMode = "HORIZONTAL";
        tile.primaryAxisSizingMode = "AUTO";
        tile.counterAxisSizingMode = "AUTO";
        tile.counterAxisAlignItems = "CENTER";
        tile.primaryAxisAlignItems = "CENTER";
        tile.paddingTop = 32; tile.paddingBottom = 32; tile.paddingLeft = 32; tile.paddingRight = 32;
        tile.fills = [fillWith(bgVar, bgHex)];
        tile.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
        tile.strokeWeight = 2;
        tile.cornerRadius = 4;
        card.appendChild(tile);

        const mark = figma.createNodeFromSvg(svgStr);
        mark.name = label;
        tile.appendChild(mark);

        card.appendChild(txt("Mono Label", label, "color/semantic/text-primary", HEX.navy));
        card.appendChild(txt("Body", role, "color/semantic/text-muted", HEX.navy, 0.62));
        return card;
      };

      makeMark("Loop · orange on cream",  "Primary brand mark. Header, social, personal surfaces.", "color/brand/mm-cream", HEX.cream, loopOrangeSvg);
      makeMark("Loop · chalk on navy",    "Same mark, on dark.",                                    "color/brand/mm-navy",  HEX.navy,  loopChalkSvg);
      makeMark("Node · system mark",      "System / content mark. Tutorial cards, technical surfaces.", "color/brand/mm-cream", HEX.cream, nodeNavySvg);
    }

    // ── 11 AI HANDYMAN BADGE ────────────────────────────────
    {
      const sec = sectionFrame("11 · AI Handyman Badge");
      addToOuter(sec);
      sec.appendChild(sectionHeader("10", "Locked navy-on-orange stamp"));

      const tile = figma.createFrame();
      tile.layoutMode = "HORIZONTAL";
      tile.primaryAxisSizingMode = "AUTO";
      tile.counterAxisSizingMode = "AUTO";
      tile.paddingTop = 48; tile.paddingBottom = 48; tile.paddingLeft = 48; tile.paddingRight = 48;
      tile.counterAxisAlignItems = "CENTER";
      tile.primaryAxisAlignItems = "CENTER";
      tile.fills = [fillWith("color/semantic/bg-page", HEX.cream)];
      tile.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
      tile.strokeWeight = 2;
      tile.cornerRadius = 4;
      sec.appendChild(tile);

      // Badge chip: navy text on orange ground, 1px navy border, 4px navy cut-shadow.
      const badge = figma.createFrame();
      badge.layoutMode = "HORIZONTAL";
      badge.primaryAxisSizingMode = "AUTO";
      badge.counterAxisSizingMode = "AUTO";
      badge.paddingTop = 14; badge.paddingBottom = 14;
      badge.paddingLeft = 22; badge.paddingRight = 22;
      badge.cornerRadius = 4;
      badge.fills = [fillWith("color/brand/mm-orange", HEX.orange)];
      badge.strokes = [fillWith("color/brand/mm-navy", HEX.navy)];
      badge.strokeWeight = 1;
      badge.effects = [cutShadow];
      tile.appendChild(badge);
      badge.appendChild(txt("Tagline", "AI HANDYMAN", "color/brand/mm-navy", HEX.navy));

      sec.appendChild(txt("Body", "Navy text on orange ground, 1px navy border, 4px navy cut-shadow. Used selectively — tutorial cards, intro/end screens, home hero — never formulaically. Drop in assets/logos/badge/badge-ai-handyman.svg for the production version.", "color/semantic/text-muted", HEX.navy, 0.62));
    }

    // ── 12 POLAROID ─────────────────────────────────────────
    {
      const sec = sectionFrame("12 · Polaroid");
      addToOuter(sec);
      sec.appendChild(sectionHeader("11", "Polaroid + Murphydoodle caption"));

      const stage = figma.createFrame();
      stage.layoutMode = "HORIZONTAL";
      stage.primaryAxisSizingMode = "AUTO";
      stage.counterAxisSizingMode = "AUTO";
      stage.paddingTop = 48; stage.paddingBottom = 48; stage.paddingLeft = 48; stage.paddingRight = 48;
      stage.fills = [fillWith("color/semantic/bg-page", HEX.cream)];
      stage.strokes = [fillWith("color/semantic/border-default", HEX.navy, 0.18)];
      stage.strokeWeight = 1;
      sec.appendChild(stage);

      const polaroid = figma.createFrame();
      polaroid.layoutMode = "VERTICAL";
      polaroid.primaryAxisSizingMode = "AUTO";
      polaroid.counterAxisSizingMode = "AUTO";
      polaroid.itemSpacing = 12;
      polaroid.paddingTop = 16; polaroid.paddingBottom = 24; polaroid.paddingLeft = 16; polaroid.paddingRight = 16;
      polaroid.counterAxisAlignItems = "CENTER";
      polaroid.fills = [fillWith("color/brand/mm-chalk", HEX.chalk)];
      polaroid.effects = [polaroidShadow];
      polaroid.rotation = -2.5;
      stage.appendChild(polaroid);

      const photo = figma.createFrame();
      photo.resize(240, 240);
      photo.fills = [fillWith("color/brand/mm-orange", HEX.orange)];
      polaroid.appendChild(photo);

      const cap = txt("Handwritten", "Mike", "color/semantic/text-primary", HEX.navy);
      polaroid.appendChild(cap);

      sec.appendChild(txt("Body", "Murphydoodle is LOCKED to the polaroid caption. It says 'Mike'. Nowhere else.", "color/semantic/text-muted", HEX.navy, 0.62));
    }

    // ── 13 COMPONENT REFERENCE FRAMES ───────────────────────
    {
      const sec = sectionFrame("13 · Components");
      addToOuter(sec);
      sec.appendChild(sectionHeader("12", "Component vocabulary"));

      // Buttons
      const btnRow = figma.createFrame();
      btnRow.layoutMode = "HORIZONTAL";
      btnRow.primaryAxisSizingMode = "AUTO";
      btnRow.counterAxisSizingMode = "AUTO";
      btnRow.itemSpacing = 16;
      btnRow.counterAxisAlignItems = "CENTER";
      btnRow.fills = [];
      sec.appendChild(btnRow);

      const makeBtn = (label, kind) => {
        const b = figma.createFrame();
        b.layoutMode = "HORIZONTAL";
        b.primaryAxisSizingMode = "AUTO";
        b.counterAxisSizingMode = "AUTO";
        b.paddingTop = 12; b.paddingBottom = 12; b.paddingLeft = 20; b.paddingRight = 20;
        b.cornerRadius = 4;
        if (kind === "primary") {
          b.fills = [fillWith("color/semantic/action-primary", HEX.orange)];
          b.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
          b.strokeWeight = 2;
          b.effects = [cutShadow];
          b.appendChild(txt("Mono Label", label, "color/brand/mm-cream", HEX.cream));
        } else {
          b.fills = [fillWith("color/semantic/bg-surface", HEX.chalk)];
          b.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
          b.strokeWeight = 2;
          b.appendChild(txt("Mono Label", label, "color/semantic/text-primary", HEX.navy));
        }
        return b;
      };
      btnRow.appendChild(makeBtn("PRIMARY ACTION", "primary"));
      btnRow.appendChild(makeBtn("SECONDARY", "secondary"));

      // Input fields
      const inputCol = figma.createFrame();
      inputCol.layoutMode = "VERTICAL";
      inputCol.primaryAxisSizingMode = "AUTO";
      inputCol.counterAxisSizingMode = "FIXED";
      inputCol.itemSpacing = 16;
      inputCol.fills = [];
      sec.appendChild(inputCol);
      try { inputCol.layoutSizingHorizontal = "FILL"; } catch (e) {}

      const makeInput = (label, value, isError) => {
        const wrap = figma.createFrame();
        wrap.layoutMode = "VERTICAL";
        wrap.primaryAxisSizingMode = "AUTO";
        wrap.counterAxisSizingMode = "FIXED";
        wrap.itemSpacing = 6;
        wrap.fills = [];
        wrap.resize(360, 1);
        wrap.appendChild(txt("Mono Label", label, "color/semantic/text-muted", HEX.navy, 0.62));

        const field = figma.createFrame();
        field.layoutMode = "HORIZONTAL";
        field.primaryAxisSizingMode = "AUTO";
        field.counterAxisSizingMode = "FIXED";
        field.paddingTop = 12; field.paddingBottom = 12; field.paddingLeft = 14; field.paddingRight = 14;
        field.cornerRadius = 4;
        field.fills = [fillWith("color/semantic/bg-surface", HEX.chalk)];
        field.strokes = [isError ? fillWith("color/semantic/action-primary", HEX.orange) : fillWith("color/semantic/border-strong", HEX.navy)];
        field.strokeWeight = 2;
        field.effects = [cutShadow];
        field.resize(360, 0);
        try { field.layoutSizingHorizontal = "FIXED"; } catch (e) {}
        field.appendChild(txt("Body", value, "color/semantic/text-primary", HEX.navy));
        wrap.appendChild(field);

        if (isError) wrap.appendChild(txt("Mono Label", "ERROR · INVALID INPUT", "color/semantic/action-primary", HEX.orange));
        return wrap;
      };

      inputCol.appendChild(makeInput("LABEL", "Default state", false));
      inputCol.appendChild(makeInput("LABEL", "Error state",   true));

      // Cut-shadow card
      const cardEx = figma.createFrame();
      cardEx.layoutMode = "VERTICAL";
      cardEx.primaryAxisSizingMode = "AUTO";
      cardEx.counterAxisSizingMode = "FIXED";
      cardEx.itemSpacing = 12;
      cardEx.paddingTop = 24; cardEx.paddingBottom = 24; cardEx.paddingLeft = 24; cardEx.paddingRight = 24;
      cardEx.fills = [fillWith("color/semantic/bg-surface", HEX.chalk)];
      cardEx.strokes = [fillWith("color/semantic/border-strong", HEX.navy)];
      cardEx.strokeWeight = 2;
      cardEx.cornerRadius = 4;
      cardEx.effects = [cutShadow];
      cardEx.resize(480, 1);
      sec.appendChild(cardEx);
      cardEx.appendChild(txt("Eyebrow", "TUTORIAL · 18 MIN", "color/semantic/text-muted", HEX.navy, 0.62));
      cardEx.appendChild(txt("H3", "Card · the cut-shadow stamp", "color/semantic/text-primary", HEX.navy));
      const cardBody = txt("Body", "Cut-shadows go on content (cards, code blocks, inputs, primary buttons). Never on chrome (nav, header, footer).", "color/semantic/text-muted", HEX.navy, 0.62);
      cardEx.appendChild(cardBody);
      try { cardBody.layoutSizingHorizontal = "FILL"; } catch (e) {}

      // Code block with teal cursor (the one AI pop example)
      const codeBlock = figma.createFrame();
      codeBlock.layoutMode = "HORIZONTAL";
      codeBlock.primaryAxisSizingMode = "AUTO";
      codeBlock.counterAxisSizingMode = "AUTO";
      codeBlock.paddingTop = 16; codeBlock.paddingBottom = 16; codeBlock.paddingLeft = 18; codeBlock.paddingRight = 18;
      codeBlock.itemSpacing = 4;
      codeBlock.counterAxisAlignItems = "CENTER";
      codeBlock.fills = [fillWith("color/brand/mm-navy", HEX.navy)];
      codeBlock.cornerRadius = 4;
      codeBlock.effects = [cutShadow];
      sec.appendChild(codeBlock);

      const codeTxt = txt("Code", "$ mike build --watch", "color/brand/mm-cream", HEX.cream);
      codeBlock.appendChild(codeTxt);
      const cursor = figma.createRectangle();
      cursor.resize(10, 16);
      cursor.fills = [fillWith("color/semantic/accent-ai", HEX.teal)];
      codeBlock.appendChild(cursor);

      // Live dot
      const liveRow = figma.createFrame();
      liveRow.layoutMode = "HORIZONTAL";
      liveRow.primaryAxisSizingMode = "AUTO";
      liveRow.counterAxisSizingMode = "AUTO";
      liveRow.itemSpacing = 8;
      liveRow.counterAxisAlignItems = "CENTER";
      liveRow.fills = [];
      sec.appendChild(liveRow);
      const dot = figma.createEllipse();
      dot.resize(10, 10);
      dot.fills = [fillWith("color/semantic/accent-ai", HEX.teal)];
      liveRow.appendChild(dot);
      liveRow.appendChild(txt("Mono Label", "LIVE", "color/semantic/text-primary", HEX.navy));
    }

    // ── 14 BRAND RULES ──────────────────────────────────────
    {
      const sec = sectionFrame("14 · Brand Rules");
      addToOuter(sec);
      sec.appendChild(sectionHeader("13", "Hard rules — do not break"));
      const rules = [
        "Consume semantic tokens only. Never hardcode hex in components.",
        "Tagline is locked: LEARN · BUILD · MOVE FORWARD. Mid-dots, ALL CAPS, IBM Plex Mono Bold.",
        "One AI pop per screen. Teal shows up on exactly one element (cursor, live dot, satellite).",
        "Cut-shadow stamps go on content, not chrome. Cards, code blocks, inputs, primary buttons. Never nav/header/footer.",
        "Yellow is reserved for success-state chips only (✓ You're in.). Never the badge ink, never on hero, never as body type.",
        "Murphydoodle is locked to the polaroid caption — 'Mike'. Nowhere else.",
        "Two marks, two jobs. Loop = primary brand mark. Node = system / content mark. Never swap.",
      ];
      for (const r of rules) {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.counterAxisAlignItems = "MIN";
        row.itemSpacing = 12;
        row.fills = [];
        sec.appendChild(row);
        try { row.layoutSizingHorizontal = "FILL"; } catch (e) {}
        row.appendChild(txt("Mono Label", "→", "color/semantic/action-primary", HEX.orange));
        const t = txt("Body", r, "color/semantic/text-primary", HEX.navy);
        row.appendChild(t);
        try { t.layoutSizingHorizontal = "FILL"; } catch (e) {}
      }
    }

    // ── 15 NOT LIST ────────────────────────────────────────
    {
      const sec = sectionFrame("15 · The NOT list");
      addToOuter(sec);
      sec.appendChild(sectionHeader("14", "What is no longer in the brand"));
      const nots = [
        "Cartoon Mike (illustrated character)",
        "The toolshed / workshop metaphor in copy or visuals",
        "Washi tape, hand-drawn arrows, deco illustrations, lighthouse, cloud",
        "Unplugged Sans (the previous display font)",
        "LEARN. CREATE. MOVE FORWARD. — old tagline with periods",
        "'AI Unplugged' as a sub-brand name (the newsletter is just 'the newsletter')",
        "'wire up', 'ship it', 'level up', '10x', 'game-changer', and the toolshed era language",
      ];
      for (const n of nots) {
        const row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.primaryAxisSizingMode = "AUTO";
        row.counterAxisSizingMode = "AUTO";
        row.counterAxisAlignItems = "MIN";
        row.itemSpacing = 12;
        row.fills = [];
        sec.appendChild(row);
        try { row.layoutSizingHorizontal = "FILL"; } catch (e) {}
        row.appendChild(txt("Mono Label", "✕", "color/semantic/text-muted", HEX.navy, 0.62));
        const t = txt("Body", n, "color/semantic/text-muted", HEX.navy, 0.62);
        row.appendChild(t);
        try { t.layoutSizingHorizontal = "FILL"; } catch (e) {}
      }
    }

    // ── 16 FOOTER ──────────────────────────────────────────
    {
      const f = figma.createFrame();
      f.name = "16 · Footer";
      f.layoutMode = "HORIZONTAL";
      f.primaryAxisSizingMode = "AUTO";
      f.counterAxisSizingMode = "FIXED";
      f.counterAxisAlignItems = "CENTER";
      f.itemSpacing = 16;
      f.paddingTop = 24; f.paddingBottom = 24;
      f.fills = [];
      addToOuter(f);
      f.appendChild(txt("Mono Label", "MIKE MURPHY AI", "color/semantic/text-primary", HEX.navy));
      const spacer = figma.createFrame();
      spacer.fills = [];
      spacer.resize(1, 1);
      f.appendChild(spacer);
      try { spacer.layoutSizingHorizontal = "FILL"; } catch (e) {}
      f.appendChild(txt("Mono Label", "v2026.3", "color/semantic/text-muted", HEX.navy, 0.62));
    }

    figma.viewport.scrollAndZoomIntoView([outer]);
    figma.notify("Design system built ✓");
    figma.closePlugin();
  } catch (err) {
    figma.notify("Builder error: " + (err && err.message ? err.message : String(err)), { error: true, timeout: 8000 });
    console.error(err);
    figma.closePlugin();
  }
})();
