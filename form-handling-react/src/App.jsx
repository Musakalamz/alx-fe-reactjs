import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">User Registration</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <RegistrationForm />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <FormikForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
