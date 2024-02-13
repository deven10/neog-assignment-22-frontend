import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Templates/Navbar";

import Events from "./Pages/Events/Events";
import Volunteers from "./Pages/Volunteers/Volunteers";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App px-4 py-4">
      <h2>Volunteer Management Application</h2>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/volunteers" element={<Volunteers />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
