import debug from "debug";
type Logger = (...args: any[]) => void
export default function makeDebugger(name: string): Logger {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }
  const dbg = debug(name);
  debug.enable(name);
  return dbg;
}
