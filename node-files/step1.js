const fs = require("fs");

function readMyFile(file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log(data);
  });
}

readMyFile(process.argv[2]);
