import { object, string, InferType } from 'yup';
import { FirebaseCollectionReference } from '../../utils';
import { auth } from 'firebase';
export const loginSchema = object({
  email: string().required('email is required'),
  password: string().required('password is required'),
});

export const signupSchema = object({
  email: string().required('email is required'),
  password: string().required('password is required'),
  username: string().required('username is required'),
});
export type Login = InferType<typeof loginSchema>;

export const signin = (
  {
    email,
    password,
  }: {
    email: string;
    password: string;
  },
  cb: (value: boolean) => void
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      cb(true);
    })
    .catch((error) => cb(false));
};
