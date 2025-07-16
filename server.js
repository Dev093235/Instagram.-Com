const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve index.html from public

app.post("/collect", async (req, res) => {
  const data = req.body;
  const time = new Date().toISOString();
  const logEntry = `[${time}]\n${JSON.stringify(data, null, 2)}\n\n`;

  try {
    await fs.appendFile("rudra-log.txt", logEntry);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

app.get("/view-log", async (req, res) => {
  try {
    const logData = await fs.readFile("rudra-log.txt", "utf8");
    res.type("text").send(logData || "📂 No data logged yet.");
  } catch (err) {
    res.status(500).send("❌ Error reading log file.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SAFE RUDRA SERVER running at http://localhost:${PORT}`);
});
