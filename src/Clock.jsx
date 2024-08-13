import { useState } from 'react';
import './Clock.css';

function Clock(props) {
    // Functions to get the current time & date in the user's local
    const getTime = () => new Date().toLocaleTimeString(props.locale);
    const getDate = () => new Date().toLocaleDateString(props.locale);

    // Hooks for state.
    const [currentTime, setCurrentTime] = useState(getTime());
    const [currentDate, setCurrentDate] = useState(getDate());

    setInterval(() => {
        setCurrentTime(getTime());
        setCurrentDate(getDate());
    }, 1000);

    return (
        <div className="clock">
            <h1>{currentTime}</h1>
            <p>{currentDate}</p>
        </div>
    );

}

Clock.defaultProps = {
    locale: "en-US"
}


export default Clock;