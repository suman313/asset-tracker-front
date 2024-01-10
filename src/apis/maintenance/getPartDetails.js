import axios from "axios";
import { setBaseUrl } from "../../config";

export async function getPartDetails () {
try {
    const {data} = await axios.get(`${setBaseUrl}/maintenance/get-parts-name`,{
        headers: {
            'Content-Type': 'application/json',
            'x-access-tokens': sessionStorage.getItem('token')
        }
    })
    return data;
} catch (error) {
    return error;
}
}