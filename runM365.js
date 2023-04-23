"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
child_process_1.default.exec('m365 spfx project externalize > output.json', { cwd: '/' }, function (err, stdout, stderr) {
    console.log('err', err);
    console.log('stdout', stdout);
    console.log('stderr', stderr);
});
