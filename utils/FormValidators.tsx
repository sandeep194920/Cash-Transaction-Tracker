import * as yup from 'yup'

export const customerValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
});

export const AuthValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});


export const ItemInputSchema = yup.object().shape({
  itemName: yup.string().required("Please enter the item name"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("What's the price of this item")
    .min(1, "Price must be greater than 0"),
  qty: yup
    .number()
    .typeError("Quantity must be a number")
    .required("How many of these")
    .min(1, "Quantity must be greater than 0"),
});