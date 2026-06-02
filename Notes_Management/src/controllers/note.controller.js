const mongoose = require("mongoose");
const Note = require("../models/note.model");

const createNote = async (req, res) => {
  try {
    // 1. Extract data from the incoming request body
    // We expect the client to send title, content, category, and isPinned
    const { title, content, category, isPinned } = req.body;

    // 2. Validate the required fields
    // If title or content is missing, we stop here and send a 400 Bad Request error
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: null,
      });
    }

    // 3. Create a new note in the database
    // We pass the extracted data to our Note model. Mongoose will automatically
    // save this new document to the MongoDB database.
    const note = await Note.create({
      title,
      content,
      category,
      isPinned,
    });

    // 4. Send a success response
    // We use status 201 (Created) to indicate a new resource was successfully created
    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    // 5. Handle any unexpected errors (e.g., database connection issues)
    // We use status 500 (Internal Server Error)
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const createBulkNotes = async (req, res) => {
  try {
    // 1. Extract the array of notes from the request body
    // We expect req.body to be an array of objects
    const notesArray = req.body;

    // 2. Validate that the input is actually an array and is not empty
    if (!Array.isArray(notesArray) || notesArray.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of notes",
        data: null,
      });
    }

    // 3. Validate each note in the array
    // Every note must have a title and content. We loop through to check.
    for (let i = 0; i < notesArray.length; i++) {
      const note = notesArray[i];
      if (!note.title || !note.content) {
        return res.status(400).json({
          success: false,
          message: `Note at index ${i} is missing title or content`,
          data: null,
        });
      }
    }

    // 4. Insert all notes into the database at once
    // insertMany is a powerful Mongoose method that saves an array of documents
    // efficiently in a single operation.
    const createdNotes = await Note.insertMany(notesArray);

    // 5. Send a success response
    res.status(201).json({
      success: true,
      message: "Notes created successfully in bulk",
      data: createdNotes,
    });
  } catch (error) {
    // 6. Handle any unexpected errors
    res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    // 1. Fetch all notes from the database
    // We use the empty object {} inside find() to say "find everything"
    // We also use .sort({ createdAt: -1 }) to show the newest notes first
    const notes = await Note.find({}).sort({ createdAt: -1 });

    // 2. Send a success response
    // We use status 200 (OK) which is the standard for successful GET requests
    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    // 3. Handle any unexpected errors
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

    // 1. Validate if the provided ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    // 2. Fetch the specific note by its ID
    const note = await Note.findById(id);

    // 3. Check if the note exists in the database
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // 4. Send success response
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

    // 1. Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    // 2. Validate required fields for a full update
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required for update",
        data: null,
      });
    }

    // 3. Update the note in the database
    // { new: true } tells Mongoose to return the updated document, not the old one
    // { runValidators: true } ensures the updated data still follows our schema rules
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category, isPinned },
      { new: true, runValidators: true }
    );

    // 4. Check if the note existed before trying to update it
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // 5. Send success response
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

    // 1. Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    // 2. Perform a partial update
    // PATCH requests only update the fields that the user sends.
    // By passing req.body directly with $set, Mongoose will only overwrite those specific fields.
    const patchedNote = await Note.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // 3. Check if the note existed
    if (!patchedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // 4. Send success response
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

    // 1. Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID format",
        data: null,
      });
    }

    // 2. Delete the note from the database
    // findByIdAndDelete locates the document and removes it in one step
    const deletedNote = await Note.findByIdAndDelete(id);

    // 3. Check if the note actually existed before deleting
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }

    // 4. Send success response
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
    // 1. Extract the array of IDs from the request body
    const { ids } = req.body;

    // 2. Validate that 'ids' is actually an array and not empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of note IDs to delete",
        data: null,
      });
    }

    // 3. Validate the format of every single ID in the array
    for (let i = 0; i < ids.length; i++) {
      if (!mongoose.Types.ObjectId.isValid(ids[i])) {
        return res.status(400).json({
          success: false,
          message: `Invalid note ID format at index ${i}`,
          data: null,
        });
      }
    }

    // 4. Delete all matching notes from the database at once
    // We use the $in operator which tells MongoDB to match any _id that exists in our 'ids' array
    const result = await Note.deleteMany({ _id: { $in: ids } });

    // 5. Send success response
    // deleteMany returns an object with 'deletedCount' showing how many documents were actually removed
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

module.exports = { createNote, createBulkNotes, getAllNotes, getNoteById, updateNote, patchNote, deleteNote, deleteBulkNotes };