#!/usr/bin/env node
// System Atlas owns the design interface; the bundled Archify CLI is its renderer.
import { runDesign } from '../design/cli.mjs';
await runDesign(process.argv.slice(2));
