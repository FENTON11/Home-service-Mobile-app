import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useEffect,useState } from "react";
import {BASE_URL} from "@env"
export const useFetch = url =>{
    const { token } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);  
    const api = axios.create({
        baseURL:BASE_URL,
    }) 
    useEffect(() => {
        getData();
    }, [url]);
    const getData = async () => {
        try {
            console.log("URL:",url)
            setLoading(true);
            const res = await api.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Response:', res);
            
            if (res.data.success) {
                setData(res.data);
                console.log(res)
            } else {
                console.log(res);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return { data, loading, error };
}