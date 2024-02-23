// https://github.com/TypeStrong/ts-node/issues/2026

// https://stackoverflow.com/questions/43528123/visual-studio-code-debug-console-colors
// https://stackoverflow.com/questions/43528123/visual-studio-code-debug-console-colors/55493884#55493884

const RESET = '\u001b[0m';

const FG_RED = '\u001b[1;31m';
const FG_GREEN = '\u001b[1;32m';
const FG_YELLOW = '\u001b[1;33m';
const FG_BLUE = '\u001b[1;34m';
const FG_PURPLE = '\u001b[1;35m';
const FG_CYAN = '\u001b[1;36m';

const BG_RED = '\u001b[1;41m';
const BG_GREEN = '\u001b[1;42m';
const BG_YELLOW = '\u001b[1;43m';
const BG_BLUE = '\u001b[1;44m';
const BG_PURPLE = '\u001b[1;45m';
const BG_CYAN = '\u001b[1;46m';

// logError.js
process.setUncaughtExceptionCaptureCallback((error) => {
    console.error(`\n${FG_RED}---=== Loader Error ===---${RESET}`);
    console.error(error);
    process.exit(1);
});
