const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/build/"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`NodeJS App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
