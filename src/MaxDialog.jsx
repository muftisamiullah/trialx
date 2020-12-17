import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { GET_MODAL_DATA } from '../src/store/actions/actionTypes'
import { getModalDataAction } from '../src/store/actions/tableAction'
import Grid from '@material-ui/core/Grid';

function MaxDialog({setModalDataFrom,modalData, ...props}){
  useEffect(() => {
    setModalDataFrom();
  }, [setModalDataFrom]);

    return(
        <>
        <Dialog
        open={props.openDialog}
        onClose={props.closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><b></b></DialogTitle>
        <DialogContent>
        <Grid container justify="center" alignItems="center">
          {/* <DialogContentText id="alert-dialog-description"> */}
            {modalData && modalData.length>0 ? (modalData.map((option,key)=>{
              // console.log(option)
              return (
              <React.Fragment key={key}>
                  <Grid item xs={12} sm md>
                    {option.name}
                    {option.producer}
                    {/* all other field in the same manner */}
                  </Grid>
               </React.Fragment>
                )
            })): <p>Not Found</p>}
          {/* </DialogContentText> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}

const mapStateToProps = (state) => {
// console.log(state.modal)
    return {  
      modalData: state.modal !== null ? state.modal : null
  };
};
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    setModalDataFrom:() =>dispatch(getModalDataAction(GET_MODAL_DATA, ownProps.data)),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MaxDialog);