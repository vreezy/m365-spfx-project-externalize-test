import * as fs from 'fs'

export function copyFileSync(source: string, target: string): void {
  fs.copyFileSync(source, target)
}
