import {getTableData, getModalData} from "../../api/tableApi.js";

export const getTableDataAction = (type) => {
    return async (dispatch) => {
      const data = await getTableData();
      // console.log(data);
      if(data.status === 200){
        dispatch({ type: type, value: data.data });
      }
    };
  };

export const getModalDataAction = (type,data) => {
    return async (dispatch) => {
      const responses = await getModalData(data);
      dispatch({ type: type, value: responses });
    };
  };