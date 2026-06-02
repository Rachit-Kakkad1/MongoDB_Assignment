const Note = require("../models/note.model");

const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    const note = new Note({
      title,
      content,
      category,
      isPinned,
    });

    const savedNote = await note.save();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: savedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  createNote
};
