import { apiUrl } from "../config/config";
import axios from "axios";
export  async function getTableData() {
    try {
      const response =  await axios.get(apiUrl + "people");
      return response;
    } catch (error) {
    }
  }