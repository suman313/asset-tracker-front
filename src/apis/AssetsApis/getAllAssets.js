import axios from "axios";
import { setBaseUrl } from "../../config";

export const asset_by_category = async (category) => {
  try {
    const { data } = await axios.get(`${setBaseUrl}/asset/get_all`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-tokens": sessionStorage.getItem("token"),
        category: category,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const inactive_assets = (offset, limit) =>
  axios.get(`${setBaseUrl}/asset/get_all`, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-access-tokens": sessionStorage.getItem("token"),
      offset:offset,
      limit:limit,
      "unassigned-asset": "true",
    },
  });

export const asset_in_maintenance = (offset, limit) =>
axios.get(`${setBaseUrl}/asset/get_all`, {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-access-tokens": sessionStorage.getItem("token"),
    offset:offset,
    limit:limit,
    "not-in-maintenance": "false",
  },
});

export const asset_by_type = (offset, limit, SearchType,searchData) =>
axios.get(`${setBaseUrl}/asset/get_all`, {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-access-tokens": sessionStorage.getItem("token"),
    offset:offset,
    limit:limit,
    [`${SearchType}`]: searchData
  },
});

export const get_all_assets = (offset, limit) =>
axios.get(`${setBaseUrl}/asset/get_all`, {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-access-tokens": sessionStorage.getItem("token"),
    offset:offset,
    limit:limit,
    "unassigned-asset": "false"
  },
});