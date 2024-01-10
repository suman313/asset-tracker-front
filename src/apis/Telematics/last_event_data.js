import axios from "axios";
import { setBaseUrl } from "../../config";

export const lastEventData = async (id) => {
    try {
        const response = await axios.get(`${setBaseUrl}/asset/get_device/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-tokens": sessionStorage.getItem("token"),
            },
          }); 
        //   console.log(response);
          return response.data;
    } catch (error) {
        console.log(error)
    }
  
//   const response = await fetch('/todos/' + todoId)

};