const Folder = require("../models/Folder");
const mongoose = require("mongoose");

exports.getFolders = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const folders = await Folder.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate("userId", "email");

    res.json(folders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch folders" });
  }
};

exports.createFolder = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const folder = new Folder({
      name,
      userId: new mongoose.Types.ObjectId(userId),
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create folder" });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({ error: "Invalid folder ID" });
    }

    const deleted = await Folder.deleteOne({
      _id: new mongoose.Types.ObjectId(folderId),
      userId: req.user.id,
    });

    if (deleted.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Folder not found or unauthorized" });
    }

    res.json({ message: "Folder deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete folder" });
  }
};
