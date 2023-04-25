import * as fs from "fs";

export function writeFileSync(path: string, data: string): void {
  fs.writeFileSync(path, data, { flag: "wx" });
}
