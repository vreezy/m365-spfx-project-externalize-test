import * as fs from 'fs'

const source = "samples"
const target = "dist"
const getDirectories = (source: string) =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const targetFolders= getDirectories(source);

  // create target
  fs.mkdirSync(target, { recursive: true })

targetFolders.forEach(folder => {

  // create target
  fs.mkdirSync(`${target}/${folder}`, { recursive: true })

  fs.copyFile(`${source}/${folder}/.yo-rc.json`, `${target}/${folder}/.yo-rc.json`, (err) => {
    if (err) {
      console.log(err)
    }
    // throw err;
    //console.log('source.txt was copied to destination.txt');
  });

  fs.copyFile(`${source}/${folder}/package.json`, `${target}/${folder}/package.json`, (err) => {
    //if (err) throw err;
    // console.log('source.txt was copied to destination.txt');
  });


  try {
    if (fs.existsSync(`${target}/${folder}/package.json`) && fs.existsSync(`${target}/${folder}/.yo-rc.json`)) {
      // file exists
    }
    else {
      // delete folder. we don't need
      fs.rmSync(`${target}/${folder}`, { recursive: true, force: true });
    }
  } catch(err) {
    console.error(err)
  }
 

})
