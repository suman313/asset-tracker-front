import axios from "axios";
import { setBaseUrl } from "../../config";

const deleteDocument = async (id, section) => {
    
    try {
      // setLoader(true);
      const { response } = await axios.delete(
        `${setBaseUrl}/${section}/delete_attachment`,
        
        {
          data:{
            id: id
          },
          headers: {
            // "Content-Type": "multipart/form-data",
            "x-access-tokens": sessionStorage.getItem("token"),
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    } 
  };

  export default deleteDocument;