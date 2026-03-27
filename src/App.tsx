import "./App.css";
import Clock from "./components/timeComponent";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function App(): React.JSX.Element {
    //implement userAuth system, default value is me right now :(
    const user: string = "Dan";

    //which button is disabled depending on user clock
    const [whichDisabled, setWhichDisabled] = useState<string>("OUT");

    //sending to googleSheet, takes in a message string.
    function sendToSheet(message: string) {
        fetch(
            "https://script.google.com/macros/s/AKfycbx4cjXYRjU-MkjzxOMqWLHSvfCkWNXGfq0JLLPYy1J36LzTzitGOub9DeJLI7cUxpvr/exec",
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
