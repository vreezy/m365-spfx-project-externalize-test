"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var child_process_1 = __importDefault(require("child_process"));
var getDirectoriesSync_1 = require("./utils/getDirectoriesSync");
var mkDirSync_1 = require("./utils/mkDirSync");
var copyfileSync_1 = require("./utils/copyfileSync");
var rmSync_1 = require("./utils/rmSync");
var writeFileSync_1 = require("./utils/writeFileSync");
// OPTIONS
var source = "../sp-dev-fx-webparts/samples/";
var target = "out";
var errorTarget = "".concat(target, "/error");
var uuid = crypto_1.default.randomUUID();
var debug = false;
// DO NOT MOD
var sourceDirectories = (0, getDirectoriesSync_1.getDirectoriesSync)(source);
// delete target
(0, rmSync_1.rmSync)(target);
// create target folder
(0, mkDirSync_1.mkDirSync)(target);
sourceDirectories.forEach(function (directoryName, index) {
    var sourceDirectory = "".concat(source, "/").concat(directoryName);
    var outfileName = "output-".concat(uuid, ".json");
    var sourceDirectoryWithFileName = "".concat(sourceDirectory, "/").concat(outfileName);
    // createexternalize output
    child_process_1.default.exec("m365 spfx project externalize > ".concat(outfileName), { cwd: sourceDirectory }, function (err, stdout, stderr) {
        if (debug) {
            console.log("err", err);
            console.log("stdout", stdout);
            console.log("stderr", stderr);
        }
        var targetDirectory = "".concat(target, "/").concat(directoryName);
        var targetDirectoryWithFileName = "".concat(targetDirectory, "/output.json");
        var errorTargetDirectory = "".concat(errorTarget, "/").concat(directoryName);
        if (err) {
            // create out/error
            (0, mkDirSync_1.mkDirSync)(errorTargetDirectory);
            // create error.txt
            (0, writeFileSync_1.writeFileSync)("".concat(errorTargetDirectory, "/error.txt"), err.message);
        }
        else {
            // create out/projectName
            (0, mkDirSync_1.mkDirSync)(targetDirectory);
            // copy to target
            (0, copyfileSync_1.copyFileSync)(sourceDirectoryWithFileName, targetDirectoryWithFileName);
            // gather some doctor infos
            var doctorOutfileName_1 = "doctor-".concat(uuid, ".txt");
            child_process_1.default.exec("m365 spfx doctor -o text > ".concat(doctorOutfileName_1), { cwd: sourceDirectory }, function (err, stdout, stderr) {
                if (!err) {
                    var doctorSourceDirectoryWithFileName = "".concat(sourceDirectory, "/").concat(doctorOutfileName_1);
                    var doctorTargetDirectoryWithFileName = "".concat(targetDirectory, "/doctor.txt");
                    // copy doctor file to target directory
                    (0, copyfileSync_1.copyFileSync)(doctorSourceDirectoryWithFileName, doctorTargetDirectoryWithFileName);
                    // delete temp doctor file
                    (0, rmSync_1.rmSync)(doctorSourceDirectoryWithFileName);
                }
            });
        }
        // finally
        // delete temp externalize file
        (0, rmSync_1.rmSync)(sourceDirectoryWithFileName);
    });
});
