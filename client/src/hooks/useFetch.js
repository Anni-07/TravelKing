// import { useState, useEffect } from "react";


// import axios from "axios";



// const useFetch = (url) => {
//  const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);   
//     const [error, setError] = useState(false);   
    
//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const res = await axios.get(url);
//                 setData(res.data);
//             } catch (err) {
//                 setError(true);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [url]);

//  const reFetch = async () => {
//     setLoading(true);
//         try {
//             const res = await axios.get(url);
//             setData(res.data);
//         } catch (err) {
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     }


//     return { data, loading, error, reFetch };

// }

// export default useFetch;



import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(false);   

    const fullUrl = `${API_BASE_URL}${endpoint}`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(fullUrl);
                setData(res.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fullUrl]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(fullUrl);
            setData(res.data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, reFetch };
}

export default useFetch;
