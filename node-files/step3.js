const fs = require("fs");
const axios = require("axios");

function cat(file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    }
    console.log(data);
  });
}

function catWrite(path, content) {
  fs.readFile(content, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR:", err);
      process.exit(1);
    } else {
      fs.writeFile(path, data, "utf8", (err) => {
        if (err) {
          console.log(`Could not write ${path} Error: ${err}`);
          process.exit(1);
        }
        console.log(`Successfully wrote to ${path}`);
      });
    }
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

async function webCatWrite(path, content) {
  try {
    const resp = await axios.get(content);
    fs.writeFile(path, resp.data, "utf8", (err) => {
      if (err) {
        console.log(`Could not write ${path} Error: ${err}`);
        process.exit(1);
      }
      console.log(`Successfully wrote to ${path}`);
    });
  } catch (err) {
    console.log(`Error fetching ${url}. Error: ${err}`);
    process.exit(1);
  }
}

function readData(argv2) {
  if (argv2 === "--out") {
    const path = process.argv[3];
    const content = process.argv[4];
    if (content.toLowerCase().includes("http")) {
      webCatWrite(path, content);
    } else {
      catWrite(path, content);
    }
  } else {
    if (argv2.toLowerCase().includes("http")) {
      webCat(argv2);
    } else {
      cat(argv2);
    }
  }
}

readData(process.argv[2]);
