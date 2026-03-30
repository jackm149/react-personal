import "./App.css";
import Clock from "./components/timeComponent";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function App(): React.JSX.Element {
    //state for user, setUser, holds user's name
    //this will be formatted as an email later with AUTH, CAS
    const [user, setUser] = useState<string>("");

    //track last action for each user
    /*
     userStates would look like this for example data:
     {
        "Jack" : "IN",
        "Michael" : "IN",
        "Giancarlo" : "OUT"
     }
    */
    const [userStates, setUserStates] = useState<
        Record<string, "IN" | "OUT" | "">
    >({});

    function sendToSheet(message: string) {
        fetch(
            "https://script.google.com/macros/s/AKfycbyoSrQyadVTKPuT4aIR9w-n5Rua2bFH4L6SYixvJnd5dKkBIHDUoSknpIIMaEifB_D2/exec",
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

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setUser(event.target.value);
    }

    /*
    gets the current state of the user, "OUT" is default for disabling buttons
    */
    const currentState = userStates[user] || "OUT";

    function handleClock(message: "IN" | "OUT") {
        sendToSheet(message);
        setUserStates((prev) => ({ ...prev, [user]: message }));
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
                    onClick={() => handleClock("IN")}
                    disabled={currentState === "IN" || user === ""}
                >
                    IN
                </Button>

                <Button
                    onClick={() => handleClock("OUT")}
                    disabled={currentState === "OUT" || user === ""}
                >
                    OUT
                </Button>
            </div>
            {/* This is probably going to cause issues when formatting the page by the way
            so just make sure that you remove it. I literally just bumped the content of the 
            div which is not really the right way, making a container outside of .app css style
            and then formatting from there is a better approach.*/}
            <div style={{ padding: "300px", paddingRight: "900px" }}>
                Things to do:
                <li>Learn sql</li>
            </div>
        </div>
    );
}
