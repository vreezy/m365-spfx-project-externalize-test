import * as fs from 'fs'
import child_process from 'child_process'

child_process.exec('m365 spfx project externalize > output.json', {cwd: '/'}, function(err, stdout, stderr) {
  console.log('err', err)
  console.log('stdout', stdout)
  console.log('stderr', stderr)
});