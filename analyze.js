"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var crypto_1 = __importDefault(require("crypto"));
var child_process_1 = __importDefault(require("child_process"));
var getDirectoriesSync_1 = require("./utils/getDirectoriesSync");
var mkDirSync_1 = require("./utils/mkDirSync");
var copyfileSync_1 = require("./utils/copyfileSync");
var rmSync_1 = require("./utils/rmSync");
var source = process.argv[2];
var target = "out";
var errorTarget = "".concat(target, "/error");
var sourceDirectories = (0, getDirectoriesSync_1.getDirectoriesSync)(source);
// delete target
(0, rmSync_1.rmSync)(target);
// create target folder
(0, mkDirSync_1.mkDirSync)(target);
sourceDirectories.forEach(function (directoryName, index) {
    // if (index >= 30) {
    //   return
    // }
    var sourceDirectory = "".concat(source, "/").concat(directoryName);
    var uuid = crypto_1.default.randomUUID();
    var outfileName = "".concat(uuid, ".json");
    var sourceDirectoryWithFileName = "".concat(sourceDirectory, "/").concat(outfileName);
    child_process_1.default.exec("m365 spfx project externalize > ".concat(outfileName), { cwd: sourceDirectory }, function (err, stdout, stderr) {
        console.log('err', err);
        console.log('stdout', stdout);
        console.log('stderr', stderr);
        var targetDirectory = "".concat(target, "/").concat(directoryName);
        var targetDirectoryWithFileName = "".concat(targetDirectory, "/output.json");
        var errorTargetDirectory = "".concat(target, "/error/").concat(directoryName);
        if (err) {
            (0, mkDirSync_1.mkDirSync)(errorTargetDirectory);
            fs.writeFile("".concat(errorTargetDirectory, "/error.txt"), err.message, { flag: 'wx' }, function (err) {
                if (err)
                    throw err;
                console.log("It's saved!");
            });
            // but move to target/error full folder
            // delete source file
            // rmSync(sourceDirectoryWithFileName);
        }
        else {
            // create out
            (0, mkDirSync_1.mkDirSync)(targetDirectory);
            // copy to target
            (0, copyfileSync_1.copyFileSync)(sourceDirectoryWithFileName, targetDirectoryWithFileName);
        }
        // finally
        // delete source file
        (0, rmSync_1.rmSync)(sourceDirectoryWithFileName);
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
});
