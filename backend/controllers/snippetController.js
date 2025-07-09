const Snippet = require("../models/Snippet");

exports.getSnippetsByFolder = async (req, res) => {
  try {
    const snippets = await Snippet.find({ folderId: req.params.folderId });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch snippets" });
  }
};

exports.getSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch snippet" });
  }
};

exports.createSnippet = async (req, res) => {
  try {
    const snippet = new Snippet({
      folderId: req.params.folderId,
      title: req.body.title,
      languageId: req.body.languageId,
      code: req.body.code,
      input: req.body.input,
      output: req.body.output,
    });
    await snippet.save();
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to create snippet" });
  }
};

exports.updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Failed to update snippet" });
  }
};

exports.deleteSnippet = async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete snippet" });
  }
};
