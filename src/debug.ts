import debug from "debug";
type Logger = (...args: any[]) => void
export default function makeDebugger(name: string): Logger {
  const dbg = debug(name);
  debug.enable(name);
  return dbg;
}
