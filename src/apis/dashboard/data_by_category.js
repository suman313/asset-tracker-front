import axios from "axios";
import { setBaseUrl } from "../../config";

export const get_data_by_categories = async () => {
  try {
    const { data } = await axios.get(
      `${setBaseUrl}/dashboard/get-data-by-model-category`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": sessionStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
