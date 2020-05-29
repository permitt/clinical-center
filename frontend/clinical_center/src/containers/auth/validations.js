import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  policyNumber: Yup.number().required('Policy number is required').typeError('Policy number must be a number'),
  phoneNumber: Yup.number().required('Phone number name is required').typeError('Phone number must be a number'),
  email: Yup.string()
    .email()
    .required('Email address is required'),
  password: Yup.string().required('Password is required').min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')

});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required()
    .max(255),
  password: Yup.string().required().min(6)
});


export const changePassSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')
});

