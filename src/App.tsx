import "./App.css";
import Clock from "./components/timeComponent";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function App(): React.JSX.Element {
    //which button is disabled depending on user clock
    const [whichDisabled, setWhichDisabled] = useState<string>("OUT");
    const [user, setUser] = useState<string>("");

    //sending to googleSheet, takes in a message either IN | OUT based on buttons.
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

    //changing name in textbox controller
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setUser(event.target.value);
    }

    return (
        <div className="app">
            <div className="clock">
                <Clock />
            </div>

            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control value={user} onChange={updateName} />
            </Form.Group>
            <div>Curr User: {user}</div>

            <div className="buttonDefault">
                <Button
                    onClick={() => {
                        sendToSheet("IN");
                        setWhichDisabled("IN");
                    }}
                    disabled={whichDisabled === "IN" || user === ""}
                >
                    IN
                </Button>

                <Button
                    onClick={() => {
                        sendToSheet("OUT");
                        setWhichDisabled("OUT");
                    }}
                    disabled={whichDisabled === "OUT" || user === ""}
                >
                    OUT
                </Button>
            </div>

            <ul>
                Bugs right now :(
                <li>Cannot clock in as another user one is not clocked out</li>
                <li>Need to reset buttons when user is changed</li>
                <li>Read the state off of the google sheet</li>
            </ul>
        </div>
    );
}
