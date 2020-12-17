import { apiUrl } from "../config/config";
import axios from "axios";
export  async function getTableData() {
    try {
      const response =  await axios.get(apiUrl + "people");
      return response;
    } catch (error) {
    }
  }

export  async function getModalData(urls) {
  // console.log(urls);
  try {
    var response = await Promise.all(
        urls.map(
            url =>
                fetch(url).then(
                    (response) => response.json()
                )));

    return (response)
  } catch (error) {
      // console.log(error)
      throw (error)
  }
}