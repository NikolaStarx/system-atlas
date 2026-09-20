# Reader interactions and provenance

Lecture State Supervision's local UI was inspected during the original design comparison.
It is an interaction-design reference, not a dependency distributed by this repository.
Its cursor-anchored wheel zoom, trackpad pan, minimap navigation, detail mode
switch and fullscreen reading informed this design. This is source comparison,
not a fresh acceptance test of its production UI.

System Atlas reuses its own bundled Archify camera, node finder, radar and
relationship tools. The new gesture adapter calls that camera; it must not create
a second transform. Ctrl/Cmd-wheel is the Chromium trackpad pinch event path;
WebKit gesture events have a separate adapter. Real hardware smoothness and
WebKit execution need distinct validation from synthetic Chromium input tests.
Zoom is continuous from 100% to 300%; overview bounds prevent panning into empty
space. Two-finger scrolling pans after zooming in. Detail content scrolls normally.

The node body selects without opening the inspector. Its `i` button opens details.
The persistent submap badge shows the child count in both detailed and compact
modes. Single-click toggles a compact, real first-child-level view in place;
neighbouring cards and routes move to make room. Mini nodes retain selection,
info and nested submap controls. Double-click the same badge enters the full
child view; an explicit “进入” button and Shift+Enter provide alternatives.
Enter/Space toggles a focused badge without the 500ms mouse double-click window.
Do not attach full-view entry or inspection to the whole node's double-click.

Back restores camera, selection and expansions. Session storage also restores
these on reload; preferences and drafts retain their existing local storage.
The same inspector DOM can dock or float; its form and draft are never copied.
Drag the floating inspector by its title bar. Canvas focus hides details until
explicitly opened; Escape closes the floating inspector, then exits focus. Text
editing is not intercepted by these shortcuts. Keep native cursor feedback and
let pointerover/out propagate; suppress only the renderer's legacy hover preview.

Preview layout is transient: it never writes expanded geometry to system.json.
Canonical export checks still validate the authored source view, not the inline
preview; inspect the latter separately for node and edge-label overlaps.

Evidence titles open the in-page excerpt. Each card and the excerpt toolbar
reserve an explicit “在 Codex 中打开” action. Enable it only if the preview's
trusted host supplies `openCodexFile({path,line})`; use a same-origin token and
registered evidence ID, never accept arbitrary browser paths or tools. The
current standalone Codex preview has no authorized native-file bridge, so this
action is disabled and “复制路径” is available. Do not invent a codex://file URL,
bypass process authorization, or claim that copying a path opened a native tab.

The four native styles retain their original diagram CSS; the explorer shell
uses the same token block extracted at build time. Frutiger Aero's dark palette,
gloss and surface colors are adapted from Music Agent's
`workbench/static/themes/aero.css`. A light variant is an adaptation, not the
original dark skin. No runtime path to Music Agent is required. The skin is a
viewer layer; do not claim identical Aero styling in every image/vector export
without inspecting that export. The original renderer's canonical geometry and
semantic checks remain the authority for diagram delivery.

Legacy `.archify-design` journal paths, `archify-design` browser draft keys and
`X-Archify-Token` remain protocol compatibility details, not a dependency on the
original installed Archify Skill. New reader preferences use `system-atlas-reader`.
