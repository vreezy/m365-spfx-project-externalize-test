import * as fs from 'fs'
import crypto from 'crypto'
import child_process from 'child_process'
import { getDirectoriesSync } from './utils/getDirectoriesSync';
import { mkDirSync } from './utils/mkDirSync';
import { copyFileSync } from './utils/copyfileSync';
import { rmSync } from './utils/rmSync';




const source = process.argv[2]
const target = "out"
const errorTarget = `${target}/error`


const sourceDirectories = getDirectoriesSync(source);

  // delete target
  rmSync(target);

  // create target folder
  mkDirSync(target)

  sourceDirectories.forEach((directoryName, index) => {
    // if (index >= 30) {
    //   return
    // }


  const sourceDirectory = `${source}/${directoryName}`

  const uuid = crypto.randomUUID();
  const outfileName = `${uuid}.json`

  const sourceDirectoryWithFileName = `${sourceDirectory}/${outfileName}`;
  


  child_process.exec(`m365 spfx project externalize > ${outfileName}`, {cwd: sourceDirectory }, function(err, stdout, stderr) {
    console.log('err', err)
    console.log('stdout', stdout)
    console.log('stderr', stderr)

    const targetDirectory = `${target}/${directoryName}`
    const targetDirectoryWithFileName = `${targetDirectory}/output.json`;

    const errorTargetDirectory = `${target}/error/${directoryName}`




    if(err) {

      mkDirSync(errorTargetDirectory)

      fs.writeFile(`${errorTargetDirectory}/error.txt`, err.message, { flag: 'wx' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
      });

      // but move to target/error full folder

      // delete source file
      // rmSync(sourceDirectoryWithFileName);
    }
    else {
       // create out
      mkDirSync(targetDirectory)
      // copy to target
      copyFileSync(sourceDirectoryWithFileName, targetDirectoryWithFileName)


    }

    // finally
    // delete source file
    rmSync(sourceDirectoryWithFileName);
 


  });

  

  // fs.copyFile(`${source}/${directoryName}/.yo-rc.json`, `${target}/${directoryName}/.yo-rc.json`, (err) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   // throw err;
  //   //console.log('source.txt was copied to destination.txt');
  // });

  // fs.copyFile(`${source}/${directoryName}/package.json`, `${target}/${directoryName}/package.json`, (err) => {
  //   //if (err) throw err;
  //   // console.log('source.txt was copied to destination.txt');
  // });


  // try {
  //   if (fs.existsSync(`${source}/${directoryName}/package.json`) && fs.existsSync(`${source}/${directoryName}/.yo-rc.json`)) {
  //     // file exists
  //   }
  //   else {
  //     // delete folder. we don't need
  //     fs.rmSync(`${target}/${directoryName}`, { recursive: true, force: true });
  //   }
  // } catch(err) {
  //   console.error(err)
  // }


 

})
