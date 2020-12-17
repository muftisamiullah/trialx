import React,{useEffect,forwardRef,useState} from "react";
import { GET_TABLE_DATA } from '../src/store/actions/actionTypes'
import { getTableDataAction } from '../src/store/actions/tableAction'
import { connect } from "react-redux";
import MaterialTable from "material-table";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MaxDialog from './MaxDialog';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
function App({getTableData, tabledata}){

  let rowsPerPage = 10;

    useEffect(() => {
      getTableData();
    }, []);

    useEffect(() => {
      setData(tabledata)
    }, [tabledata]);

    const handleClickOpen = (fieldName,data) => {
      setModalData(data);
      // setModalHeading(fieldName);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [data, setData]=useState([]);
    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);
    // const [modalHeading, setModalHeading] = React.useState('');

      const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Height', field: 'height', initialEditValue: 'initial edit value',type: 'numeric' },
        { title: 'Mass', field: 'mass', type: 'numeric' },
        { title: 'Bmi', field: '', render: rowData => <p>{(rowData.mass/((rowData.height/100)*(rowData.height/100))).toFixed(2)}</p>,editable: 'never'},
        { title: 'Gender', field: 'gender',lookup: {male: 'Male', female: 'Female', 'n/a':'Other' }, },
        { title: 'Films', field: 'films',  render: rowData => <p onClick={()=>{ handleClickOpen("Films",rowData.films);}}>{rowData.films.length}</p>,editable: 'never' },
        { title: 'Vehicles', field: 'vehicles',  render: rowData => <p onClick={()=>{ handleClickOpen("Vehicles", rowData.vehicles);}}>{rowData.vehicles.length}</p>,editable: 'never' },
        {
          title: 'Starships',
          field: 'starships',
          render: rowData => <p onClick={()=>{ handleClickOpen("Starships",rowData.starships);}}>{rowData.starships.length}</p>,editable: 'never'
        }

      ]);

      const editable= {
        isDeletable: rowData => false
      };
      return (
        <>
        <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
        <MaterialTable
          title="TrialX Task / Editable Table"
          columns={columns}
          // localization={{
          //   header: {
          //       actions: false
          //   },
          //   pagination: {
          //     labelDisplayedRows: '1 of 10',
          //     labelRowsPerPage:'{10, 25,100}',
          //     labelRowsPerPage: "10",
          //   },
          // }}
          icons={tableIcons}
          data={data ? data : []}
          options={{
            search: false,
            pageSize: rowsPerPage,
            paging: true,
            actionsColumnIndex: -1
          }}
          editable={{
            onBulkUpdate: (rows) =>
            
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  let array = data;
                  array.map( (option,key)=>{
                    if(rows[key] !== undefined){
                      let newdatas = rows[key].newData;
                      // let arrayIndex = array[key];
                      console.log(option,key)
                      // console.log(array[key], rows[key].oldData );console.log({...array, arrayIndex: newdata})
                      // return (array[key].name == rows[key].oldData.name ? option=newdatas: {...array});
                    }
                  })
                  console.log(array);
                  setData(array);
                  // setData([rows[0].newData]); 

                  // setData([rows[0].newData]); 
                  resolve();
                }, 1000);
              }),     
            // onRowDelete: oldData =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       resolve();
            //     }, 1000);
            //   }),    
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }), 
          }}
        />
        </Grid>
        </Grid>

        <MaxDialog
          openDialog={open}
          closeDialog={handleClose}
          data={modalData}
      />
        </>
       
      
      )
}

const mapStateToProps = (state) => {
      return {  
        tabledata: state.table !== null ? state.table.results : null
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTableData: () =>dispatch(getTableDataAction(GET_TABLE_DATA)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App)