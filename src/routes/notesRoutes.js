import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRoutes = Router();

notesRoutes.get('/', celebrate(getAllNotesSchema), getAllNotes);
notesRoutes.post('/', celebrate(createNoteSchema), createNote);
notesRoutes.get('/:noteId', celebrate(noteIdSchema), getNoteById);
notesRoutes.delete('/:noteId', celebrate(noteIdSchema), deleteNote);
notesRoutes.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default notesRoutes;
