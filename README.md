# System Atlas

**A shared system model for people and agents.**

System Atlas is a local system-design skill and interactive architecture explorer.
It combines nested graph views, source-backed details, bounded graph queries and
recoverable version history. The Human viewer and Agent CLI/API read the same
accepted model. It is an independent fork built on the bundled **Archify 2.16**
renderer, with additional exploration and Agent-interface capabilities.

**中文理念与产品方向： [核心哲学与独立 Agent 产品构想](PHILOSOPHY.zh-CN.md)**

That document is also a self-contained brief for ChatGPT Pro. It distinguishes
the founder's stated principles, the current implementation, and future product
questions. System Atlas is currently a skill and local preview server, not a
complete autonomous-agent product.

## Try it locally

Requires Node.js 18 or newer. Run commands from this repository:

```bash
git clone https://github.com/NikolaStarx/system-atlas.git
cd system-atlas
npm ci --ignore-scripts
npm test
node bin/system-atlas.mjs preview examples/service.system.json --repo-root . --port 53108
```

Open the loopback URL printed by the last command. If the port is occupied, omit
`--port` to let the server choose one. Ctrl-C stops the preview. The bundled
example is a design fixture, not evidence of a deployed service.

In a second terminal, from this repository:

```bash
node bin/system-atlas.mjs manifest examples/service.system.json
node bin/system-atlas.mjs query examples/service.system.json --mode overview
node bin/system-atlas.mjs query examples/service.system.json --mode local --target parser --depth 1 --hops 0 --detail full
node bin/system-atlas.mjs query examples/service.system.json --mode view --view overview --expanded parser
```

For a standalone offline HTML snapshot:

```bash
node bin/system-atlas.mjs deliver examples/service.system.json /tmp/system-atlas.html --repo-root .
```

The live preview supports source inspection, requests, synchronization and history.
Exported HTML is a reading snapshot; it is not a live authority.

## Use as a Codex skill

The repository root is the skill folder; `SKILL.md` is its entrypoint. For a new
installation, clone it to your user skill directory instead:

```bash
git clone https://github.com/NikolaStarx/system-atlas.git ~/.codex/skills/system-atlas
```

If that directory already exists, inspect and preserve its local changes before
updating it. Invoke `$system-atlas` in Codex. The bundled renderer is self-contained;
another Archify installation is not required. Maintenance commands and tests use
the development dependencies installed by `npm ci`.

## What is implemented

- Stable entities, typed directed relations, containment, reusable views and evidence.
- Overview, local scope, reachability, one shortest path, cyclic regions, exact
  view queries and deliberate full reads. Pagination is pinned to a version.
- Stable-ID additions, removals and before/after changes; resumable event notices.
- One accepted graph authority shared by the browser and Agent CLI/HTTP API.
  Invalid edits retain the last accepted graph. Valid edits publish new versions.
- Checked persistent history, offline accepted-snapshot reads, reconnect and
  conflict-checked rollback that preserves overwritten source bytes.
- Separate node selection, details, compact inline submaps and full-view entry.
  Trackpad zoom/pan, docked or floating details, theme and density controls.
- Classic, Signal Flow, Blueprint, Editorial and Frutiger Aero appearance.
- A task board over independent work items, optional many-to-many module links,
  scoped delete/restore, and signed member field grants. English/Chinese interface
  labels are independent of authored graph and task text.
- Shared Board and Canvas filter presets, bounded Agent projections, compact
  fixed-height Board cards, and resilient independent column scrolling.

Topology equivalence is defined at the **same version and scope**, including
expanded submaps. A filtered or folded view does not assert that omitted edges
do not exist. The viewer's **图数据** button exposes its matching Agent query.

Source/evidence checks run every second by default; publication events and browser
reconciliation provide local live updates, not a hard real-time guarantee.

## Team collaboration (0.4)

A leader computer can own the authoritative graph while GitHub carries signed
change requests and published snapshots. Members get explicit per-node and
per-field grants. The leader checks identity, permissions and field versions;
unrelated changes can proceed, while conflicting or unauthorized requests receive
rejections. Remote edits to a published graph never overwrite the leader's local
state. Both participants have local Human and Agent interfaces with sync status,
request receipts and recovery.

Start with **[the collaboration setup and protocol](references/collaboration.md)**.
Private state and keys must live outside Git worktrees. The protocol uses no
custom public server; `team serve` must run for ongoing synchronization. This is
an initial small-team implementation, not a replacement for repository access
controls, real-time presence or a high-volume message service.

## Boundaries

- No automatic codebase-to-architecture discovery or background agent dispatch.
- Single-user design requests are a manual CLI handoff. Team requests are processed
  by the leader permission engine; neither mode wakes an agent.
- Version time is not execution time. Runtime temporal/causal queries are not implemented.
- A cyclic graph region does not prove a completed business feedback loop.
- File hashes bind evidence to bytes, not to semantic correctness or user acceptance.
- Source rollback does not undo external code changes or runtime side effects.
- The preview binds to loopback and is not an authenticated multi-user hosting product.
- Native Codex file opening requires a trusted host adapter; the standalone server
  does not supply one.

## Read the implementation

| Purpose | Entry |
|---|---|
| Core philosophy and future product questions | [PHILOSOPHY.zh-CN.md](PHILOSOPHY.zh-CN.md) |
| Leader authority, permissions, signed requests and recovery | [Collaboration protocol](references/collaboration.md), [team/](team/), [team tests](test/team.test.mjs) |
| Agent-facing skill instructions | [SKILL.md](SKILL.md) |
| Model, evidence and requests | [Model contract](references/system-design-contract.md), [schema](schemas/system.schema.json) |
| Queries, pagination, synchronization and recovery | [Agent interface](references/agent-interface.md) |
| Interaction semantics and provenance | [Reader interactions](references/reader-interactions.md) |
| Shared graph queries | [design/query.mjs](design/query.mjs) |
| Accepted state and durable history | [design/authority.mjs](design/authority.mjs) |
| HTTP and CLI | [design/server.mjs](design/server.mjs), [design/cli.mjs](design/cli.mjs) |
| Human projection and viewer | [design/deliver.mjs](design/deliver.mjs), [design/viewer.html](design/viewer.html) |
| Interface and recovery integration tests | [test/agent-interface.test.mjs](test/agent-interface.test.mjs) |

[0.5.1 verification record](references/verification-0.5.1.md) covers shared
filters, board density, Windows write compatibility and team recovery fixes.
[0.5.0 verification record](references/verification-0.5.0.md) lists task-board,
Agent comprehension and browser checks, fixes and their limits. The earlier
[0.4.0 record](references/verification-0.4.0.md) covers the collaboration baseline.

`npm test` selects the maintained System Atlas regression suite. Other inherited
Archify tests remain as upstream development material; some expect upstream
website/release fixtures outside this standalone repository. They are not covered
by a claim that the complete upstream test collection passes here.

## License and provenance

[MIT](LICENSE). Original Archify and Cocoon AI copyright notices are preserved.
The renderer originates from [tt-a1i/archify](https://github.com/tt-a1i/archify);
the imported release identity is retained as
[upstream metadata](references/upstream-archify-release.json).

Lecture State Supervision informed the layered exploration and shared-authority
approach. Its production-control workflow is not bundled. The Aero appearance
was adapted during the author's Music Agent work; no Music Agent source tree or
private project data is required.

Brand marks retain their [source and rights notes](brand-marks/README.md).
Update this fork through its Git repository. Inherited Archify update scripts are
upstream tooling, not a supported System Atlas updater.

## Task board

Canvas and a Trello-style task board share one accepted model. Add optional tasks,
filter by member, inspect/edit cards, drag between four states, and locate linked
modules in Canvas. [Task model, Agent commands and team grants](references/task-board.md).
Task completion does not promote module verification.
