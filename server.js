const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/collect", async (req, res) => {
  const data = req.body;
  const time = new Date().toISOString();
  const logEntry = `[${time}]
${JSON.stringify(data, null, 2)}\n\n`;

  try {
    await fs.appendFile("collected_data.txt", logEntry);
    await fs.appendFile("rudra-log.txt", logEntry); // custom file added

    console.log("✅ Data saved to both logs.");
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).json({ status: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 RUDRA SERVER running at http://localhost:${PORT}`);
});
