import { useState } from "react";
import { Formik, Form } from "formik";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [values, setValues] = useState({
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const validate = () => {
    const e = {};
    if (!username) e.username = "Required";
    if (!email) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Invalid email";
    if (!password) e.password = "Required";
    else if (password.length < 8) e.password = "Min 8 characters";

    if (!values.confirmPassword) e.confirmPassword = "Required";
    else if (values.confirmPassword !== password)
      e.confirmPassword = "Passwords do not match";

    if (!values.firstName) e.firstName = "Required";
    if (!values.lastName) e.lastName = "Required";

    if (values.phone && !/^\+?[0-9\-()\s]{7,}$/.test(values.phone))
      e.phone = "Invalid phone";

    if (!values.acceptTerms) e.acceptTerms = "You must accept terms";

    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const next = type === "checkbox" ? checked : value;
    if (name === "username") setUsername(String(next));
    if (name === "email") setEmail(String(next));
    if (name === "password") setPassword(String(next));
    setValues((v) => ({ ...v, [name]: next }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vErrors = validate();
    setErrors(vErrors);
    if (Object.keys(vErrors).length) return;

    setStatus({ loading: true, success: "", error: "" });

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, ...values }),
      });

      const data = await res.json();
      setStatus({
        loading: false,
        success: `Registered with id ${data.id ?? "N/A"}`,
        error: "",
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setValues({
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        acceptTerms: false,
      });
    } catch {
      setStatus({ loading: false, success: "", error: "Registration failed" });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={() => {}}
      >
        <Form className="hidden" />
      </Formik>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Register</h2>
        {/* USERNAME */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="username"
            value={username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-sm text-red-600">{errors.username}</div>
          )}
        </div>
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-sm text-red-600">{errors.email}</div>
          )}
        </div>
        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-sm text-red-600">{errors.password}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-sm text-red-600">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className="text-sm text-red-600">{errors.firstName}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="text-sm text-red-600">{errors.lastName}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="text-sm text-red-600">{errors.phone}</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="address"
            value={values.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={values.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            I accept terms
          </label>
          {errors.acceptTerms && (
            <div className="text-sm text-red-600">{errors.acceptTerms}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={status.loading}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {status.loading ? "Submitting..." : "Register"}
        </button>
        {status.success && (
          <div className="text-green-600 mt-2">{status.success}</div>
        )}
        {status.error && (
          <div className="text-red-600 mt-2">{status.error}</div>
        )}
      </form>
    </>
  );
}
