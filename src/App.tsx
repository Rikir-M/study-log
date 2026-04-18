import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Sessions from "./pages/Sessions";
import { Home } from "lucide-react";
import "@radix-ui/themes/styles.css";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </>
  );
}

export default App;
