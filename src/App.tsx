import "./App.css";
import Clock from "./components/timeComponent";
import React from "react";
import { Button } from "react-bootstrap";

export default function App(): React.JSX.Element {
    return (
        <div className="app">
            <div className="clock">
                <Clock />
            </div>
            <div className="buttonDefault">
                <Button>Send to GSheet</Button>
            </div>
        </div>
    );
}
