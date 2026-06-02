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

module.exports = { createNote, createBulkNotes };