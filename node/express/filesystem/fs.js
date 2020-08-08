const express = require("express");
const fs = require("fs");
const fileName = "./file.txt";
//watch function is watch file If content is change and presss ctrl+s it start giving output
fs.watch(fileName, () => {
  console.log("object");
});
// readfile( ) is used for read file content
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log("err", err);
  }
  console.log("data", data.toString());
});
// in asyn this is print is first
console.log("first this is print ***************");
