import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setBaseUrl } from "../config";

export function useSearchData () {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['getDataForSearch'],
        queryFn: async() => {
            const {data} = await axios.get(`${setBaseUrl}/asset/search`, {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-tokens": sessionStorage.getItem("token"),
                },
              });
              return data;
        }
    })
    return {isPending, isError, data, error};
}