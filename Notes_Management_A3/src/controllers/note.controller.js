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

const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must contain a non-empty 'notes' array",
        data: null,
      });
    }

    const insertedNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${insertedNotes.length} notes created successfully`,
      data: insertedNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});

    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const mongoose = require("mongoose");

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for a complete update",
        data: null,
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const patchNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body cannot be empty for partial update",
        data: null,
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note partially updated successfully",
      data: updatedNote,
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
  createNote,
  createBulkNotes,
  getAllNotes,
  getNoteById,
  updateNote,
  patchNote
};
