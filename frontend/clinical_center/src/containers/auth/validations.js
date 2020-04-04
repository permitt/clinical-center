import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required().min(6),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required()

});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
    .max(255),
  password: Yup.string().required().min(6)
});

