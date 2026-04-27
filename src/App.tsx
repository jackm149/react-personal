import "./App.css";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router";

import Home from "./page_home";
import Timesheet from "./page_timesheet";
import Settings from "./page_settings";

export default function App(): React.JSX.Element {
    return (
        <BrowserRouter>
            <Nav className="" style={{ padding: "10px", gap: "1000px" }}>
                <Nav.Link as={Link} to="/">
                    Home
                </Nav.Link>
                <Nav.Link as={Link} to="/timesheet">
                    Timesheet
                </Nav.Link>
                <Nav.Link as={Link} to="/settings">
                    Settings
                </Nav.Link>
            </Nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/timesheet" element={<Timesheet />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}
