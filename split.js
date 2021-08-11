const fs = require("fs");

const FILE_PATH = "2 5.txt";
const splitLine = text => text.match(/[^\r\n]+/g);

fs.readFile(FILE_PATH, "utf-8", (err, data) => {
  if (err) throw err;
  console.log(splitLine(data))
});
