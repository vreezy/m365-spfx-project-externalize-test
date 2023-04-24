import * as fs from 'fs'

export function mkDirSync(target: string): void {
  fs.mkdirSync(target, { recursive: true })
}
