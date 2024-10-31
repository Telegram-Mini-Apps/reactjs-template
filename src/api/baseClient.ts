import axios from "axios";

import { API_PATH } from "@/constants";

export const baseInstance = axios.create({
  baseURL: `${API_PATH}/api/`,
  headers: {
    mode: 'no-cors',
  },
  withCredentials: false,
})
