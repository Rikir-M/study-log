import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="p-5 bg-background min-h-dvh">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
