import { useState } from "react";

export default function RegistrationForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
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
    if (!values.username) e.username = "Required";
    if (!values.email) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Invalid email";
    if (!values.password) e.password = "Required";
    else if (values.password.length < 8) e.password = "Min 8 characters";
    if (!values.confirmPassword) e.confirmPassword = "Required";
    else if (values.confirmPassword !== values.password)
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
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
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
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setStatus({
        loading: false,
        success: `Registered with id ${data.id ?? "N/A"}`,
        error: "",
      });
      setValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        acceptTerms: false,
      });
    } catch (err) {
      setStatus({ loading: false, success: "", error: "Registration failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <div>{errors.username}</div>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={values.email} onChange={handleChange} />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
      </div>
      <div>
        <label>First Name</label>
        <input
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <div>{errors.firstName}</div>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <div>{errors.lastName}</div>}
      </div>
      <div>
        <label>Phone</label>
        <input name="phone" value={values.phone} onChange={handleChange} />
        {errors.phone && <div>{errors.phone}</div>}
      </div>
      <div>
        <label>Address</label>
        <input name="address" value={values.address} onChange={handleChange} />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={values.acceptTerms}
            onChange={handleChange}
          />{" "}
          I accept terms
        </label>
        {errors.acceptTerms && <div>{errors.acceptTerms}</div>}
      </div>
      <button type="submit" disabled={status.loading}>
        {status.loading ? "Submitting..." : "Register"}
      </button>
      {status.success && <div>{status.success}</div>}
      {status.error && <div>{status.error}</div>}
    </form>
  );
}
