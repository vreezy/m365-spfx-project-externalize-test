import * as fs from 'fs'

export function getDirectoriesSync(source: string): string[] {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}