const mongoose = require("mongoose");
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

    const note = await Note.create({
      title,
      content,
      category,
      isPinned,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
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

const createBulkNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of notes is required",
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
        message: "Title and content are required for update",
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

    const patchedNote = await Note.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!patchedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note patched successfully",
      data: patchedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const deleteBulkNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of note IDs",
        data: null,
      });
    }

    for (let i = 0; i < ids.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(ids[i])) {
        return res.status(400).json({
          success: false,
          message: `Invalid note ID format at index ${i}`,
          data: null,
        });
      }
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const validCategories = ["work", "personal", "study"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be one of: work, personal, study",
        data: null,
      });
    }

    const notes = await Note.find({ category });

    res.status(200).json({
      success: true,
      message: `Notes in category '${category}' retrieved successfully`,
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

const getNotesByStatus = async (req, res) => {
  try {
    const { isPinned } = req.params;

    if (isPinned !== "true" && isPinned !== "false") {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'true' or 'false'",
        data: null,
      });
    }

    const pinnedStatus = isPinned === "true";
    const notes = await Note.find({ isPinned: pinnedStatus });

    res.status(200).json({
      success: true,
      message: `Notes with isPinned='${pinnedStatus}' retrieved successfully`,
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

const getNoteSummaryById = async (req, res) => {
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

    const summaryLength = 50;
    const summaryText = note.content.length > summaryLength 
      ? note.content.substring(0, summaryLength) + "..." 
      : note.content;

    const summaryData = {
      title: note.title,
      summary: summaryText
    };

    res.status(200).json({
      success: true,
      message: "Note summary retrieved successfully",
      data: summaryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const filterNotes = async (req, res) => {
  try {
    const { category, isPinned } = req.query;
    let query = {};

    if (category) {
      const validCategories = ["work", "personal", "study"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be one of: work, personal, study",
          data: null,
        });
      }
      query.category = category;
    }

    if (isPinned) {
      if (isPinned !== "true" && isPinned !== "false") {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'true' or 'false'",
          data: null,
        });
      }
      query.isPinned = isPinned === "true";
    }

    const notes = await Note.find(query);

    res.status(200).json({
      success: true,
      message: "Notes filtered successfully",
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

const getPinnedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPinned: true });

    res.status(200).json({
      success: true,
      message: "Pinned notes retrieved successfully",
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

const filterNotesByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category query parameter is required",
        data: null,
      });
    }

    const validCategories = ["work", "personal", "study"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be one of: work, personal, study",
        data: null,
      });
    }

    const notes = await Note.find({ category });

    res.status(200).json({
      success: true,
      message: `Notes filtered by category '${category}' successfully`,
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

const filterNotesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Both startDate and endDate query parameters are required",
        data: null,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format provided",
        data: null,
      });
    }

    const notes = await Note.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    });

    res.status(200).json({
      success: true,
      message: "Notes filtered by date range successfully",
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

const paginateNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
        data: null,
      });
    }

    const skip = (page - 1) * limit;

    const notes = await Note.find({}).skip(skip).limit(limit);
    const totalNotes = await Note.countDocuments({});

    res.status(200).json({
      success: true,
      message: "Notes paginated successfully",
      data: {
        notes,
        totalNotes,
        totalPages: Math.ceil(totalNotes / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const paginateNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const validCategories = ["work", "personal", "study"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be one of: work, personal, study",
        data: null,
      });
    }

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
        data: null,
      });
    }

    const skip = (page - 1) * limit;

    const notes = await Note.find({ category }).skip(skip).limit(limit);
    const totalNotes = await Note.countDocuments({ category });

    res.status(200).json({
      success: true,
      message: `Notes in category '${category}' paginated successfully`,
      data: {
        notes,
        totalNotes,
        totalPages: Math.ceil(totalNotes / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const sortNotes = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field. Allowed fields: title, createdAt, updatedAt, category",
        data: null,
      });
    }

    const sortConfig = {};
    sortConfig[sortBy] = order;

    const notes = await Note.find({}).sort(sortConfig);

    res.status(200).json({
      success: true,
      message: `Notes sorted by ${sortBy} (${req.query.order === "asc" ? "ascending" : "descending"}) successfully`,
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

module.exports = { 
  createNote, 
  createBulkNotes, 
  getAllNotes, 
  getNoteById, 
  updateNote, 
  patchNote, 
  deleteNote, 
  deleteBulkNotes,
  getNotesByCategory,
  getNotesByStatus,
  getNoteSummaryById,
  filterNotes,
  getPinnedNotes,
  filterNotesByCategory,
  filterNotesByDateRange,
  paginateNotes,
  paginateNotesByCategory,
  sortNotes
};
