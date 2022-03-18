import { useState, useEffect } from "react";

function useFetch() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        async function init() {
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [url]); // Executes after url changes

    return { data, error, loading }
}

export default useFetch;