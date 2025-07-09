const express = require("express");
const {
  getFolders,
  createFolder,
  deleteFolder,
} = require("../controllers/folderController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/:userId", getFolders);
router.post("/", createFolder);
router.delete("/:id", auth, deleteFolder);

module.exports = router;
