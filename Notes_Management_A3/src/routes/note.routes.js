const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, updateNote, patchNote, deleteNote, deleteBulkNotes, searchNotesByTitle, searchNotesByContent, searchAllNotes } = require("../controllers/note.controller");

router.post("/bulk", createBulkNotes);
router.post("/", createNote);
router.get("/search/title", searchNotesByTitle);
router.get("/search/content", searchNotesByContent);
router.get("/search/all", searchAllNotes);
router.get("/", getAllNotes);
router.delete("/bulk", deleteBulkNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.patch("/:id", patchNote);
router.delete("/:id", deleteNote);

module.exports = router;
