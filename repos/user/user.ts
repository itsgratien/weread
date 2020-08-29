import { object, string } from 'yup';

export const loginSchema = object({
  email: string().required('email is required'),
  password: string().required('password is required'),
});

export const signupSchema = object({
  email: string().required('email is required'),
  password: string().required('password is required'),
  username: string().required('username is required'),
});
