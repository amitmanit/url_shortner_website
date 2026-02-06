//url shortner project
const express = require("express");
const path = require("path");
const Urlrouter = require("./Routers/url");
const { connectDB } = require("./connect");
const url = require("./models/url");

const app = express();
const port = 8001;

//urlparser
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/url", Urlrouter);

connectDB("mongodb://localhost:27017/urlshortner")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const doc = await url.findOneAndUpdate(
      { shortUrl: shortUrl },
      {
        $push: { visitHistory: { timestamp: new Date() } },
        $inc: { visitCount: 1 },
      },
      { returnDocument: "after" },
    );

    if (doc) {
      console.log("Updated doc:", doc);
      res.redirect(doc.originalUrl);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).send("Internal server error");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
