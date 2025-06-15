// import { useState, useEffect } from "react";


// import axios from "axios";

// const API = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

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

// Use base API URL from .env
const API = process.env.REACT_APP_API_URL;

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}${endpoint}`);
        setData(res.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}${endpoint}`);
      setData(res.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
