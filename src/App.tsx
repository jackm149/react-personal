import "./App.css";
import Clock from "./components/timeComponent";
import React from "react";
import { Button } from "react-bootstrap";

export default function App(): React.JSX.Element {
    //sending to googleSheet
    function sendToSheet() {
        fetch(
            "https://script.google.com/macros/s/AKfycbwK7HN6e5rKJBMa2TiTSLpv4JY9KF15alWJd0om1LnfSZEVXMfhW3Sz3ngOXXhGH9kr/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    message: "chief keef",
                }),
                headers: {
                    "Content-Type": "text/plain",
                },
            },
        );
    }

    return (
        <div className="app">
            <div className="clock">
                <Clock />
            </div>
            <div className="buttonDefault">
                <Button onClick={sendToSheet}>Send to GSheet</Button>
            </div>
        </div>
    );
}
