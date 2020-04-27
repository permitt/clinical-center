import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  policyNumber: Yup.number().required(),
  phoneNumber: Yup.number().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required().min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required()

});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .max(255),
  password: Yup.string().required().min(6)
});

