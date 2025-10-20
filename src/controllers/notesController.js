import createHttpError from 'http-errors';
import Note from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const result = await Note.find();

  res.json(result);
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  const result = await Note.findById(id);
  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const result = await Note.findByIdAndDelete(id);
  if (!result) throw createHttpError(404, `Contact with id=${id} not found`);

  res.json(result);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const result = await Note.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) throw createHttpError(404, `Contact with id=${id} not found`);

  res.json(result);
};
