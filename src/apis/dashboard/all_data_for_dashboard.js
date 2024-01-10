import axios from "axios";
import { setBaseUrl } from "../../config";

export const allDashboardData = async () => {
  const response = await fetch(`${setBaseUrl}/dashboard/get_all_details`, {
    headers: {
      "Content-Type": "application/json",
      "x-access-tokens": sessionStorage.getItem("token"),
    },
  });
//   const response = await fetch('/todos/' + todoId)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
};

