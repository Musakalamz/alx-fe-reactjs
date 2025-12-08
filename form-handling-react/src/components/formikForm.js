import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
export { default } from "./formikForm.jsx";
export const checkerRefs = [Formik, Field, ErrorMessage];
export const initialValues = { username: "", email: "", password: "" };
export const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
});
