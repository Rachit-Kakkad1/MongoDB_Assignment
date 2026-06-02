const express = require("express");
const router = express.Router();
const { 
  createNote, 
  createBulkNotes, 
  getAllNotes, 
  getNoteById, 
  updateNote, 
  patchNote, 
  deleteNote, 
  deleteBulkNotes,
  getNotesByCategory,
  getNotesByStatus
} = require("../controllers/note.controller");

router.post("/", createNote);
router.post("/bulk", createBulkNotes);
router.get("/", getAllNotes);
router.delete("/bulk", deleteBulkNotes);
router.get("/category/:category", getNotesByCategory);
router.get("/status/:isPinned", getNotesByStatus);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.patch("/:id", patchNote);
router.delete("/:id", deleteNote);

module.exports = router;
