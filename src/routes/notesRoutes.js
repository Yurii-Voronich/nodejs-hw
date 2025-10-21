import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const notesRoutes = Router();

notesRoutes.get('/', getAllNotes);
notesRoutes.post('/', createNote);
notesRoutes.get('/:noteId', getNoteById);
notesRoutes.delete('/:noteId', deleteNote);
notesRoutes.patch('/:noteId', updateNote);

export default notesRoutes;
