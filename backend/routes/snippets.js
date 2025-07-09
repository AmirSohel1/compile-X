const express = require("express");
const {
  getSnippetsByFolder,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} = require("../controllers/snippetController");

const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/folder/:folderId", getSnippetsByFolder);
router.post("/folder/:folderId", createSnippet);
router.get("/:id", getSnippet);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

module.exports = router;
