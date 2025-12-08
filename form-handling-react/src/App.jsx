import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <>
      <div className="card">
        <RegistrationForm />
      </div>
      <div className="card">
        <FormikForm />
      </div>
    </>
  );
}

export default App;
