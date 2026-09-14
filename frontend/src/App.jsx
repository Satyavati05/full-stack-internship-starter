import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hello")
      .then((response) => {
        setMessage(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setMessage("Unable to connect to backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Full-Stack Internship Project</h1>

      <h2>Hello World!</h2>

      {loading ? (
        <p>Connecting to backend...</p>
      ) : (
        <p>{message}</p>
      )}

      <p>Frontend: React + Vite</p>
      <p>Backend: Node.js + Express</p>
    </div>
  );
}

export default App;