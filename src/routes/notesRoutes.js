import { Router } from 'express';
import {
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const notesRoutes = Router();

notesRoutes.get('/', getAllNotes);
notesRoutes.get('/:id', getNoteById);
notesRoutes.delete('/:id', deleteNote);
notesRoutes.patch('/:id', updateNote);

export default notesRoutes;
