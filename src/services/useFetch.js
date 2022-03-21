import { useState, useRef, useEffect } from "react";

function useFetch(url) {
    const isMounted = useRef(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        isMounted.current = true;
        async function init() {
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    if (isMounted.current) setData(json);
                } else {
                    throw response;
                }
            } catch (err) {
                if (isMounted.current) setError(err);
            } finally {
                if (isMounted.current) setLoading(false);
            }
        }
        init();

        return () => isMounted.current = false;
    }, [baseUrl, url]); // Executes after url changes

    return { data, error, loading }
}

export default useFetch;