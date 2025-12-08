import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Min 8 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\-()\s]{7,}$/, "Invalid phone")
    .nullable(),
  address: Yup.string().nullable(),
  acceptTerms: Yup.boolean().oneOf([true], "You must accept terms"),
});

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    acceptTerms: false,
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    setStatus(undefined);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setStatus({ success: `Registered with id ${data.id ?? "N/A"}` });
      resetForm();
    } catch {
      setStatus({ error: "Registration failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <h2>Register (Formik)</h2>
          <div>
            <label>Username</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label>Email</label>
            <Field name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label>Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>
          <div>
            <label>First Name</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="div" />
          </div>
          <div>
            <label>Last Name</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="div" />
          </div>
          <div>
            <label>Phone</label>
            <Field name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>
          <div>
            <label>Address</label>
            <Field name="address" />
          </div>
          <div>
            <label>
              <Field type="checkbox" name="acceptTerms" /> I accept terms
            </label>
            <ErrorMessage name="acceptTerms" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          {status?.success && <div>{status.success}</div>}
          {status?.error && <div>{status.error}</div>}
        </Form>
      )}
    </Formik>
  );
}
