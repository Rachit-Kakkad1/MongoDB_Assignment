const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, updateNote, patchNote, deleteNote } = require("../controllers/note.controller");

router.post("/bulk", createBulkNotes);
router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.patch("/:id", patchNote);
router.delete("/:id", deleteNote);

module.exports = router;
