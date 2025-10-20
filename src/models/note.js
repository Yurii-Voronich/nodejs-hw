import { Schema, model } from 'mongoose';

const contactShchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
    },
  },
  { versionKey: false, timestamps: true },
);

const Note = model('note', contactShchema);

export default Note;
