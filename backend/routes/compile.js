const express = require("express");
const axios = require("axios");
const router = express.Router();

const JUDGE0_URL = process.env.JUDGE0_URL;
const headers = {
  "x-rapidapi-host": process.env.JUDGE0_HOST,
  "x-rapidapi-key": process.env.JUDGE0_KEY,
  "content-type": "application/json",
};

router.post("/run", async (req, res) => {
  const { source_code } = req.body;
  let stdin = req.body.stdin;
  const language_id = parseInt(req.body.language_id);
  // const source_code = "Print('hello')";
  // const stdin = "";
  // const language_id = 71;

  if (stdin == null) {
    stdin = "";
  }

  if (!source_code || !language_id) {
    return res
      .status(400)
      .json({ error: "Missing source_code or language_id" });
  }

  try {
    const submission = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true&fields=*`,
      {
        source_code,
        language_id,
        stdin: stdin || "",
      },
      { headers }
    );
    // console.log(submission.data);
    res.json(submission.data);
  } catch (err) {
    console.error("Judge0 Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
