const { findMostCommonErrors, alertAdminOnThresholExceed } = require("./index.js");
const cron = require("node-cron");

cron.schedule("1 0 * * *", () => {
  console.log("Running daily log analysis.");
  findMostCommonErrors();
  alertAdminOnThresholExceed();
});
