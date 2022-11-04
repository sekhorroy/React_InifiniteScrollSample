import {
    useState, 
    useEffect,
} from "react";

import axios from 'axios';

function useFetch(page) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
   
    useEffect(()=>{
        // an async function is declared as the get request may take some time
        const fetchData = async() => {
            setLoading(true)
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
                //setData(prev => [...new Set([...prev, ...response.data])])
                setData(response.data)
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }
        fetchData();
    }, [page])

    const reFetch = async() => {
        setLoading(true)
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
            //setData(prev => [...new Set([...prev, ...response.data])])
            setData(response.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return {loading, error, data, reFetch}
}

export default useFetch