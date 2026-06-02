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
  getNotesByStatus,
  getNoteSummaryById,
  filterNotes,
  getPinnedNotes,
  filterNotesByCategory,
  filterNotesByDateRange
} = require("../controllers/note.controller");

router.post("/", createNote);
router.post("/bulk", createBulkNotes);
router.get("/", getAllNotes);
router.delete("/bulk", deleteBulkNotes);
router.get("/category/:category", getNotesByCategory);
router.get("/status/:isPinned", getNotesByStatus);
router.get("/filter", filterNotes);
router.get("/filter/pinned", getPinnedNotes);
router.get("/filter/category", filterNotesByCategory);
router.get("/filter/date-range", filterNotesByDateRange);
router.get("/:id/summary", getNoteSummaryById);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.patch("/:id", patchNote);
router.delete("/:id", deleteNote);

module.exports = router;
