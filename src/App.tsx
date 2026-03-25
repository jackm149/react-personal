import "./App.css";
import Clock from "./components/timeComponent";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function App(): React.JSX.Element {
    //implement userAuth system, default value is me right now :(
    const user: string = "Jack";

    //which button is disabled
    const [whichDisabled, setWhichDisabled] = useState<string>("OUT");

    //sending to googleSheet, takes in a message string.
    function sendToSheet(message: string) {
        fetch(
            "https://script.google.com/macros/s/AKfycbyIUcJEcPKGCoVyhdwEJX6RJFvEBwUY9Wy5aH_GXKs65AmQL7jZRuPASlHmkWA97fVF/exec",
            {
                method: "POST",
                body: JSON.stringify({
                    message: message,
                    user: user,
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
                <Button
                    onClick={() => {
                        sendToSheet("IN");
                        setWhichDisabled("IN");
                    }}
                    disabled={whichDisabled === "IN"}
                >
                    IN
                </Button>

                <Button
                    onClick={() => {
                        sendToSheet("OUT");
                        setWhichDisabled("OUT");
                    }}
                    disabled={whichDisabled === "OUT"}
                >
                    OUT
                </Button>
            </div>
        </div>
    );
}
