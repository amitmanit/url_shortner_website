const express = require("express");
const router = express.Router();
const { generateShortUrl } = require("../controllers/url");
//get analytics
router.get("/analytics/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
});

router.post("/", generateShortUrl);
module.exports = router;
