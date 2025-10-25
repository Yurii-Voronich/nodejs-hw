import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { getAllNotesSchema } from '../validations/notesValidation.js';

const notesRoutes = Router();

notesRoutes.get('/', celebrate(getAllNotesSchema), getAllNotes);
notesRoutes.post('/', createNote);
notesRoutes.get('/:noteId', getNoteById);
notesRoutes.delete('/:noteId', deleteNote);
notesRoutes.patch('/:noteId', updateNote);

export default notesRoutes;
