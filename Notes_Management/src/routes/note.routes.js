const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, updateNote } = require("../controllers/note.controller");

router.post("/", createNote);
router.post("/bulk", createBulkNotes);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);

module.exports = router;