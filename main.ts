import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "One Line of Earned Pride"
// bounty. The program writes a single line to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt): a quiet, earned moment of pride —
// a father who could not read the letter his son sent from
// overseas taught himself, one word a night, flashlight under
// the blanket, until he could read it aloud. Pass 2 note: the
// polish changed "he learned" to "he taught himself", putting
// the effort — and the pride — in his own hands; runners-up were
// a stutterer's flawless thank-you and a cook's thirty-year recipe.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const PRIDE_BEATS = [
  "He couldn't read the letter his son sent from overseas, so he taught himself",
  "— one word a night, flashlight under the blanket — until he could read it aloud.",
] as const;

export function buildEntryLine(): string {
  return PRIDE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 240;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
