const { nanoid } = require("nanoid");
const Url = require("../models/url");

async function generateShortUrl(req, res) {
  try {
    const body = req.body;
    if (!body.originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const shortUrl = nanoid(8);
    const doc = await Url.create({
      originalUrl: body.originalUrl,
      shortUrl: shortUrl,
      visitHistory: [],
      visitCount: 0,
    });

    return res.json({ shortUrl: shortUrl, id: doc._id });
  } catch (err) {
    console.error("Error creating short URL:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getAnalytics(req, res) {
  const shortUrl = req.params.shortUrl;
  const result = await Url.findOne({ shortUrl: shortUrl });
  return res.json({
    totalvisits: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { generateShortUrl, getAnalytics };
