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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var source = "samples";
var target = "dist";
var getDirectories = function (source) {
    return fs.readdirSync(source, { withFileTypes: true })
        .filter(function (dirent) { return dirent.isDirectory(); })
        .map(function (dirent) { return dirent.name; });
};
var targetFolders = getDirectories(source);
// create target
fs.mkdirSync(target, { recursive: true });
targetFolders.forEach(function (folder) {
    // create target
    fs.mkdirSync("".concat(target, "/").concat(folder), { recursive: true });
    fs.copyFile("".concat(source, "/").concat(folder, "/.yo-rc.json"), "".concat(target, "/").concat(folder, "/.yo-rc.json"), function (err) {
        if (err) {
            console.log(err);
        }
        // throw err;
        //console.log('source.txt was copied to destination.txt');
    });
    fs.copyFile("".concat(source, "/").concat(folder, "/package.json"), "".concat(target, "/").concat(folder, "/package.json"), function (err) {
        //if (err) throw err;
        // console.log('source.txt was copied to destination.txt');
    });
    try {
        if (fs.existsSync("".concat(target, "/").concat(folder, "/package.json")) && fs.existsSync("".concat(target, "/").concat(folder, "/.yo-rc.json"))) {
            // file exists
        }
        else {
            // delete folder. we don't need
            fs.rmSync("".concat(target, "/").concat(folder), { recursive: true, force: true });
        }
    }
    catch (err) {
        console.error(err);
    }
});
