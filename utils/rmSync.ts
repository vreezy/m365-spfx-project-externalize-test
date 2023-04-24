import * as fs from 'fs'

export function rmSync(path: string): void {
  fs.rmSync(path, { recursive: true, force: true });
}
