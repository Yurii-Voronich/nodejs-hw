import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser } from '../controllers/authController.js';
import { registerUserSchema } from '../validations/authValidation.js';

const authRoutes = Router();
authRoutes.post('/register', celebrate(registerUserSchema), registerUser);

export default authRoutes;
