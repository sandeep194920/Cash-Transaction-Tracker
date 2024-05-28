import { Formik, FormikProps, FormikHelpers } from "formik";
import React from "react";

// Define the props for the FormWithValidation component
interface FormWithValidationProps<T> {
  validationSchema: any;
  initialValues: any;
  submitHandler: (values: T, formikHelpers: FormikHelpers<T>) => void;
  children: (props: FormikProps<T>) => React.ReactNode;
}

function FormWithValidation<T>({
  initialValues,
  validationSchema,
  submitHandler,
  children,
}: FormWithValidationProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => submitHandler(values, formikHelpers)}
    >
      {(formikProps) => (
        // Render the children with the Formik props
        <>{children(formikProps)}</>
      )}
    </Formik>
  );
}

export default FormWithValidation;
