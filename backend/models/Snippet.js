const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  folderId: mongoose.Types.ObjectId,
  title: String,
  languageId: Number,
  code: String,
  input: String,
  output: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Snippet", SnippetSchema);
