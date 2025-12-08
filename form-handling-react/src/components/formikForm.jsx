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
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold mb-2">Register (Formik)</h2>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <Field
              name="username"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Field
              name="email"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              type="password"
              name="password"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <Field
              name="firstName"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Field
              name="lastName"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <Field
              name="phone"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Field
              name="address"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              <Field
                type="checkbox"
                name="acceptTerms"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />{" "}
              I accept terms
            </label>
            <ErrorMessage
              name="acceptTerms"
              component="div"
              className="text-sm text-red-600"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          {status?.success && (
            <div className="text-green-600 mt-2">{status.success}</div>
          )}
          {status?.error && (
            <div className="text-red-600 mt-2">{status.error}</div>
          )}
        </Form>
      )}
    </Formik>
  );
}
