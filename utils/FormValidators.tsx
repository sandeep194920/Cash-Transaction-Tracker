import * as yup from 'yup'

export const customerValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  address: yup.string().required('Address is required'),
})
