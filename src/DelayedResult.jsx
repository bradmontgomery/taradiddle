import {useState, useEffect} from 'react';


function DelayedResult() {
    const [content, setContent] = useState("waiting...");

    const n = (Math.floor(Math.random()) * 3) + 2;
    let url = "https://httpbin.org/delay/" + n;

    function fetchApi() {
        const request = new Request(url);
        fetch(request)
            .then((response) => response.json())
            .then((json) => {
                setContent(json.url);
            })
    }
    useEffect(fetchApi); // https://react.dev/reference/react/useEffect

    return (
        <div>
            <pre>{content}</pre>
        </div>
    )
}

export default DelayedResult;
