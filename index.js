require("dotenv").config();
const fs = require("fs");

const { alertEmail, alertThreshold } = require("./config");

const filePath = process.env.LOG_FILE_PATH;

function findMostCommonErrors() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");

    let errorCount = {};
    let warnCount = {};
    let infoCount = {};

    lines.forEach((line) => {
      if (line.includes("ERROR")) {
        const errorMessage = line.split("ERROR: ")[1];
        // console.log(errorMessage)
        errorCount[errorMessage] = (errorCount[errorMessage] || 0) + 1;
      }
      if (line.includes("WARN")) {
        const warnMessage = line.split("WARN: ")[1];
        warnCount[warnMessage] = (warnCount[warnMessage] || 0) + 1;
      }
      if (line.includes("INFO")) {
        const infoMessage = line.split("INFO: ")[1];
        infoCount[infoMessage] = (infoCount[infoMessage] || 0) + 1;
      }
    });

    // console.log(errorCount);

    // error count
    const sortErrors = Object.entries(errorCount).sort((a, b) => a[1] - b[1]);
    // console.log(sortErrors);

    console.log("Most common erros...");

    sortErrors.forEach(([error, count]) => {
      console.log(`Errors : ${error} - Occurences: ${count}`);
    });

    // warn count
    const sortWarns = Object.entries(warnCount).sort((a, b) => a[1] - b[1]);
    console.log("Most common warns...");
    sortWarns.forEach(([error, count]) => {
      console.log(`Warns : ${error} - Occurences: ${count}`);
    });
    // console.log(sortWarns);

    // info count
    const sortInfo = Object.entries(infoCount).sort((a, b) => a[1] - b[1]);

    console.log("Most common info...");
    sortInfo.forEach(([error, count]) => {
      console.log(`Info : ${error} - Occurences: ${count}`);
    });
  } catch (error) {
    console.error("Error to read file path: ", error);
  }
}
// findMostCommonErrors();

function alertAdminOnThresholExceed() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");

    let errorCount = {};
    let warnCount = {};
    let infoCount = {};

    lines.forEach((line) => {
      // ERROR
      if (line.includes("ERROR")) {
        const errorMessage = line.split("ERROR: ")[1];
        // console.log(errorMessage)
        errorCount[errorMessage] = (errorCount[errorMessage] || 0) + 1;
      }

      // WARN
      if (line.includes("WARN")) {
        const warnMessage = line.split("WARN: ")[1];
        warnCount[warnMessage] = (warnCount[warnMessage] || 0) + 1;
      }
      // INFO
      if (line.includes("INFO")) {
        const infoMessage = line.split("INFO: ")[1];
        infoCount[infoMessage] = (infoCount[infoMessage] || 0) + 1;
      }
    });

    // errorCount
    for (const [error, count] of Object.entries(errorCount)) {
      if (count > alertThreshold) {
        console.log(
          `Alert! ${error} exceeded threshold with ${count} Occurrences. Alert sent to ${alertEmail}`
        );
      }
    }

    // warnCount
    for (const [error, count] of Object.entries(warnCount)) {
      if (count > alertThreshold) {
        console.log(
          `Alert! ${error} exceeded threshold with ${count} Occurrences. Alert sent to ${alertEmail}`
        );
      }
    }

    // infoCount
    for (const [error, count] of Object.entries(infoCount)) {
      if (count > alertThreshold) {
        console.log(
          `Alert! ${error} exceeded threshold with ${count} Occurrences. Alert sent to ${alertEmail}`
        );
      }
    }
  } catch (error) {
    console.log("Error reading the log file", error);
  }
}

// alertAdminOnThresholExceed();

module.exports = {
  findMostCommonErrors,
  alertAdminOnThresholExceed,
};
