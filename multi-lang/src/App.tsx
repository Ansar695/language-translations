import { LanguageSwitcher } from "./components/LanguageSwitcher";

function App() {
  return (
    <div className="p-10 text-xl">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">Welcome to My App</h1>
      <p>This is a multilingual React application using Google Translate.</p>
      <p>All text will be translated without needing language tags.</p>
    </div>
  );
}

export default App;
