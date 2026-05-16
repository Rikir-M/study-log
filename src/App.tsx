import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

function App() {
    return (
        <Theme panelBackground="solid" className="p-3">
            <Navbar />
            <Outlet />
        </Theme>
    );
}

export default App;
