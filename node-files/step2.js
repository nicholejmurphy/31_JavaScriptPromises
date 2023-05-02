const fs = require("fs");
const axios = require("axios");

function fileCat(file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log(`Error fetching ${url}. Error: ${err}`);
    process.exit(1);
  }
}

function readData(cmdData) {
  if (cmdData.toLowerCase().includes("http")) {
    webCat(cmdData);
  } else {
    fileCat(cmdData);
  }
}

readData(process.argv[2]);
