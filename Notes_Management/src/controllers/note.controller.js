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

module.exports = {createNote};