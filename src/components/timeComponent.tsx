import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // no css className here, it is where the component is actually called
    return <div>{time.toLocaleTimeString()}</div>;
}
