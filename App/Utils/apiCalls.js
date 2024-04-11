import axios from "axios"
import{BASE_URL} from "@env";
const api = axios.create({
baseURL:BASE_URL
});
console.log(BASE_URL,"FROM API CALL");
export const getData = async(url,token)=>{
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.get(url, config);
    console.log(res)
    return res.data;  
}
export const postData = async (url, payload, token) => {
    console.log(`booking url :${url}`)
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.post(url, payload, config);
    return res.data;
};
export const updateData = async (url, payload, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.patch(url, payload, config);
    return res.data;
};
export const deleteData = async (url,token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const res = await api.delete(url,config);
    return res.data;
};