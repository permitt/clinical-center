import * as Yup from 'yup';

export const registerDoctorSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.number().required('Phone number name is required').typeError('Phone number must be a number'),
  email: Yup.string()
    .email()
    .required('Email address is required'),
  password: Yup.string().required('Password is required').min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')

});

export const editPatientSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.number().required('Phone number name is required').typeError('Phone number must be a number'),
  email: Yup.string()
    .email()
    .required('Email address is required'),
  password: Yup.string().required('Password is required').min(6),
  password2: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required')

});

export const addHallSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.number().required('Number is required').typeError('Operating room number must be a number')
});

export const addTypeSchema = Yup.object().shape({
  typeName: Yup.string().required('Name is required'),
  duration: Yup.string().required('Duration is required')
  .test('format',"Not correct format! Insert hh:MM",function(value) {
    return /[0-9][0-9] : [0-9][0-9] h/.test(value)
  })
,  price: Yup.number().required('Price is required')
});