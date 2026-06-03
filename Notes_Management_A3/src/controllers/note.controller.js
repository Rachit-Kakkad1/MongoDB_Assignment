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
        message: "Request body must contain a non-empty 'ids' array",
        data: null,
      });
    }

    const validIds = ids.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
      return res.status(400).json({
        success: false,
        message: "One or more provided IDs are invalid",
        data: null,
      });
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} notes deleted successfully`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const searchNotesByTitle = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }

    const notes = await Note.find({
      title: { $regex: query, $options: "i" }
    });

    res.status(200).json({
      success: true,
      message: "Notes searched by title successfully",
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

const searchNotesByContent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }

    const notes = await Note.find({
      content: { $regex: query, $options: "i" }
    });

    res.status(200).json({
      success: true,
      message: "Notes searched by content successfully",
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

const searchAllNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: null,
      });
    }

    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    });

    res.status(200).json({
      success: true,
      message: "Notes searched successfully",
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

const filterAndSortNotes = async (req, res) => {
  try {
    const { category, isPinned, sortBy = "createdAt", order = "desc" } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }
    if (isPinned !== undefined) {
      query.isPinned = isPinned === "true";
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
        data: null
      });
    }

    const notes = await Note.find(query).sort({ [sortBy]: sortOrder });

    res.status(200).json({
      success: true,
      message: "Notes filtered and sorted successfully",
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

const filterAndPaginateNotes = async (req, res) => {
  try {
    const { category, isPinned, page = 1, limit = 10 } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }
    if (isPinned !== undefined) {
      query.isPinned = isPinned === "true";
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        data: null
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const notes = await Note.find(query).skip(skip).limit(limitNumber);
    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      success: true,
      message: "Notes filtered and paginated successfully",
      data: {
        notes,
        pagination: {
          totalNotes,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const sortAndPaginateNotes = async (req, res) => {
  try {
    const { sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    const sortOrder = order === "asc" ? 1 : -1;
    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
        data: null
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        data: null
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const notes = await Note.find({}).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNumber);
    const totalNotes = await Note.countDocuments({});
    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      success: true,
      message: "Notes sorted and paginated successfully",
      data: {
        notes,
        pagination: {
          totalNotes,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const searchAndFilterNotes = async (req, res) => {
  try {
    const { query, category, isPinned } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: null
      });
    }

    let filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    };

    if (category) {
      filter.category = category;
    }
    
    if (isPinned !== undefined) {
      filter.isPinned = isPinned === "true";
    }

    const notes = await Note.find(filter);

    res.status(200).json({
      success: true,
      message: "Notes searched and filtered successfully",
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

const searchSortAndPaginateNotes = async (req, res) => {
  try {
    const { query, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: null
      });
    }

    const filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    };

    const sortOrder = order === "asc" ? 1 : -1;
    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
        data: null
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        data: null
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const notes = await Note.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNumber);
    const totalNotes = await Note.countDocuments(filter);
    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      success: true,
      message: "Notes searched, sorted and paginated successfully",
      data: {
        notes,
        pagination: {
          totalNotes,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const filterSortAndPaginateNotes = async (req, res) => {
  try {
    const { category, isPinned, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (isPinned !== undefined) {
      filter.isPinned = isPinned === "true";
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
        data: null
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        data: null
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const notes = await Note.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNumber);
    const totalNotes = await Note.countDocuments(filter);
    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      success: true,
      message: "Notes filtered, sorted and paginated successfully",
      data: {
        notes,
        pagination: {
          totalNotes,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const masterQueryNotes = async (req, res) => {
  try {
    const { query, category, isPinned, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    let filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (isPinned !== undefined) {
      filter.isPinned = isPinned === "true";
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const allowedSortFields = ["title", "createdAt", "updatedAt", "category"];
    
    if (!allowedSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
        data: null
      });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid pagination parameters",
        data: null
      });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const notes = await Note.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNumber);
    const totalNotes = await Note.countDocuments(filter);
    const totalPages = Math.ceil(totalNotes / limitNumber);

    res.status(200).json({
      success: true,
      message: "Master query executed successfully",
      data: {
        notes,
        pagination: {
          totalNotes,
          totalPages,
          currentPage: pageNumber,
          limit: limitNumber
        }
      },
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
  searchNotesByTitle,
  searchNotesByContent,
  searchAllNotes,
  filterAndSortNotes,
  filterAndPaginateNotes,
  sortAndPaginateNotes,
  searchAndFilterNotes,
  searchSortAndPaginateNotes,
  filterSortAndPaginateNotes,
  masterQueryNotes
};
