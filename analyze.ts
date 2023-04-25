import crypto from "crypto";
import child_process from "child_process";
import { getDirectoriesSync } from "./utils/getDirectoriesSync";
import { mkDirSync } from "./utils/mkDirSync";
import { copyFileSync } from "./utils/copyfileSync";
import { rmSync } from "./utils/rmSync";
import { writeFileSync } from "./utils/writeFileSync";

// OPTIONS
const source = "../sp-dev-fx-webparts/samples/";
const target = "out";
// some projects will generate errors. because of beta spfx or no src folder... we dont need to analyze them. so we put them in another folder.
const errorTarget = `${target}/error`;
 // the uuid is used to create temp files in the source direcotries. The temp files will be deleted after process.
const uuid = crypto.randomUUID();
const debug = false;

// DO NOT MOD

const sourceDirectories = getDirectoriesSync(source);

// delete target
rmSync(target);

// create target folder
mkDirSync(target);

sourceDirectories.forEach((directoryName, index) => {
  console.log(`Analyze ${index + 1}/${sourceDirectories.length}: ${directoryName}`)
  const sourceDirectory = `${source}/${directoryName}`;
  const outfileName = `output-${uuid}.json`;
  const sourceDirectoryWithFileName = `${sourceDirectory}/${outfileName}`;

  // createexternalize output
  child_process.exec(
    `m365 spfx project externalize > ${outfileName}`, { cwd: sourceDirectory }, function (err, stdout, stderr) {
      if(debug) {
        console.log("err", err);
        console.log("stdout", stdout);
        console.log("stderr", stderr);
      }
      
      const targetDirectory = `${target}/${directoryName}`;
      const targetDirectoryWithFileName = `${targetDirectory}/output.json`;
      const errorTargetDirectory = `${errorTarget}/${directoryName}`;

      if (err) {
        // create out/error
        mkDirSync(errorTargetDirectory);

        // create error.txt
        writeFileSync(`${errorTargetDirectory}/error.txt`, err.message)

      } else {
        // create out/projectName
        mkDirSync(targetDirectory);
        // copy to target
        copyFileSync(sourceDirectoryWithFileName, targetDirectoryWithFileName);

        // gather some doctor infos
        const doctorOutfileName = `doctor-${uuid}.txt`;
        child_process.exec(
          `m365 spfx doctor -o text > ${doctorOutfileName}`,
          { cwd: sourceDirectory },
          function (err, stdout, stderr) {
            if (!err) {
              const doctorSourceDirectoryWithFileName = `${sourceDirectory}/${doctorOutfileName}`;
              const doctorTargetDirectoryWithFileName = `${targetDirectory}/doctor.txt`;

              // copy doctor file to target directory
              copyFileSync(
                doctorSourceDirectoryWithFileName,
                doctorTargetDirectoryWithFileName
              );

              // delete temp doctor file
              rmSync(doctorSourceDirectoryWithFileName);
            }
          }
        );
      }

      // finally
      // delete temp externalize file
      rmSync(sourceDirectoryWithFileName);
    }
  );
});