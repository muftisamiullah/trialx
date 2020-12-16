import {getTableData} from "../../api/tableApi.js";

export const getTableDataAction = (type) => {
    return async (dispatch) => {
      const data = await getTableData();
      // console.log(data);
      if(data.status === 200){
        dispatch({ type: type, value: data.data });
      }
    };
  };