import { useState } from 'react';
import './ApiFetcher.css'

// TODO: API (Application Programming Interface)
//       ReST-full APIs.
// 1. render a button
// 2. When clicked, fetch data from httpbin.org.
// 3. when we get an HTTP Response, show some content from that response.
//
// UPDATE!
// - Network requests are a good place to use:
// -- A <Suspense /> https://react.dev/reference/react/Suspense
// -- The `useEffect` Hook: https://react.dev/reference/react/useEffect

function ApiFetcher() {
    const [result, setResult] = useState("");
    const [buttonText, setButtonText] = useState("Get UUID");
    const url = "https://httpbin.org/uuid";

    function sendRequest(event) {
        const request = new Request(url);
        fetch(request)
            .then((response) => response.json())
            .then((json) => {
                /*
                Response looks something like:

                    {
                    "uuid": "095ed986-c6f2-4d1c-b62c-3bc4d7dabb4b"
                    }
                */
                setResult(json.uuid);
                setButtonText("Get Another UUID");
            });
    }

    return (
        <div className="api-fetcher">
            <h1>API Fetcher</h1>
            <button onClick={sendRequest}>{buttonText}</button>
            {result && <p>Here's a UUID: {result}</p>}
        </div>
    );
}

export default ApiFetcher;