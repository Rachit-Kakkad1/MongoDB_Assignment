const express = require("express");
const router = express.Router();
const { createNote, createBulkNotes, getAllNotes, getNoteById, updateNote, patchNote, deleteNote, deleteBulkNotes, searchNotesByTitle, searchNotesByContent, searchAllNotes, filterAndSortNotes, filterAndPaginateNotes, sortAndPaginateNotes, searchAndFilterNotes, searchSortAndPaginateNotes, filterSortAndPaginateNotes } = require("../controllers/note.controller");

router.post("/bulk", createBulkNotes);
router.post("/", createNote);
router.get("/search/title", searchNotesByTitle);
router.get("/search/content", searchNotesByContent);
router.get("/search/all", searchAllNotes);
router.get("/query/filter-sort", filterAndSortNotes);
router.get("/query/filter-paginate", filterAndPaginateNotes);
router.get("/query/sort-paginate", sortAndPaginateNotes);
router.get("/query/search-filter", searchAndFilterNotes);
router.get("/query/search-sort-paginate", searchSortAndPaginateNotes);
router.get("/query/filter-sort-paginate", filterSortAndPaginateNotes);
router.get("/", getAllNotes);
router.delete("/bulk", deleteBulkNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.patch("/:id", patchNote);
router.delete("/:id", deleteNote);

module.exports = router;
