import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MySnackbarContentWrapper from '../../util/MySnackBarContentWrapper'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from "axios";
import {isValidPecent} from '../../util/Validation/Validate';
import "./ChannelContractualForm.css";
import Snackbar from '@material-ui/core/Snackbar';
import FormControl from "@material-ui/core/FormControl";
export default function ChannelContractualCaptionForm(props) {
  const endpoint = "http://localhost:3004/contractualCaption";
  const SUCCESS_MESSAGE ="Changes are saved successfully";
  const FAILURE_MESSAGE ="OOPS! There was a problem in saving changes.Try later";
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = evt => {
    console.log('submit called');
    evt.preventDefault();
    

    // make the ajax reuqest to save the data
     async function saveChanges() {
      let splitCateory = values.acmaCategory.split(' ');
      let acmaCatTransform = splitCateory ? splitCateory.join('_') : values.acmaCategory;
      //console.log('Acma transofrm::',acmaCatTransform);
      let id=`${values.compliancePeriod}_${acmaCatTransform}`
      try{
      let response = await axios.put(`${endpoint}/${id}`, {
      caption: values.actualCaptionPercent,
      id:id,
      category: values.acmaCategory,
      finYear: values.compliancePeriod
     });
     console.log('Reponse', response);
     setOpen(true);
    }catch(err){
       console.error(err);
       setVariant("error");
       setMessage(FAILURE_MESSAGE);
       setOpen(true);
    }
     
    }
    saveChanges();
  };

  const isSaveAcmaConfigDisabled = () => {
    if (values.acmaCategory === "" || values.compliancePeriod === "") {
      return true;
    }
    return false;
  };

  const isHideSaveAcmaConfig = () => {
    if (
      isCaptionDisbaled(values.acmaCategory, values.compliancePeriod)
    ) {
      return true;
    }
    return false;
  };
  const isCaptionDisbaled = (category, captionPercent, finYear) => {
    //exempt categoey
    return isCaptionExempt(category) || isMaxCaptions(captionPercent);
  };

  const isMaxCaptions = percent => {
    if (percent && percent === 100) {
      return true;
    }
    return false;
  };
  const getCaptionValue = captionVal => {
    return captionVal;
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const[message,setMessage]= React.useState(SUCCESS_MESSAGE);
  const[variant,setVariant]= React.useState("success");
  const [open, setOpen] = React.useState(false);
  const handleFinYear = (evt) => {
    let isFiscalYear = isPastFiscalYear(evt.target.value);
    console.log('isFiscalYear::',isFiscalYear);
    setValues({...values,
      isPastFiscalYear:isFiscalYear,
      compliancePeriod:evt.target.value})
  }
  const isPastFiscalYear = (year) => {
    let today = new Date();
    let endDateStr = `30-06-${year+1}`;
    let startDateStr = `01-07-${year}`;
    //console.log('timessss:::',startDateStr,endDateStr);
    let fyearEnd = new Date(endDateStr.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    let fyearStart= new Date(startDateStr.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    console.log('timessss:::',fyearStart,fyearEnd);
    if((today.getTime() > fyearEnd.getTime()))
    {
      return false;
    }
    return true;
  
  
}
  const [values, setValues] = useState({
    acmaCategory: "",
    actualCaptionPercent: 0,
    compliancePeriod: "",
    prevYearCaptionPercent: 0,
    dataNotFound: false,
    isPastFiscalYear:true,
  });
  const isCurrentFinYear = () => {
    let currYear = new Date().getFullYear();
    if (values.compliancePeriod !== "") {
      if (currYear === values.compliancePeriod) {
        return true;
      }
    }
  };

  const isCaptionExempt = category => {
    if (category && category.toString().includes("Exempt")) {
      console.log('caption exempty');
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (values.compliancePeriod !== "" && values.acmaCategory !== "") {
      async function getCaptionCompliance() {
        let selectedYearResponse = await axios.get(
          `${endpoint}?finYear=${values.compliancePeriod}&category=${values.acmaCategory}`
        );
        let respCurrent = selectedYearResponse.data[0];
        let previousYearResponse = await axios.get(
          `${endpoint}?finYear=${values.compliancePeriod - 1}&category=${
            values.acmaCategory
          }`
        );
        let respPrevious = previousYearResponse.data[0];
        console.log("Anwitha:::", respCurrent, respPrevious);
        if (respCurrent && respPrevious) {
          setValues({
            ...values,
            prevYearCaptionPercent: respPrevious["caption"],
            actualCaptionPercent: respCurrent["caption"]
          });
        } else{
          
          setValues({
            ...values,
            actualCaptionPercent: 0,
           
            prevYearCaptionPercent: 0,
            dataNotFound: false
          });
        }
        //   if (respPrevious) {
        //     setValues({
        //       ...values,
        //       prevYearCaptionPercent: respPrevious["caption"]
        //     });
        //   }
        // }
      }
      getCaptionCompliance();
    }
  }, [values.compliancePeriod, values.acmaCategory]);

  return (
    <div className="ContractualCaptionForm">
      <AppBar position="static" style={{ background: "#5c5757" }}>
        <Typography variant="h7"><strong>Channel Contractual Configuration</strong></Typography>
      </AppBar>
      <form className="Acma-form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {values.dataNotFound && (
            <Grid item xs={12}>
              <div className="acma-data-not-found">
                <h3>Data not found !</h3>
                <p>
                  No caption data available. Please enter the caption % for the
                  financial year {values.compliancePeriod}
                </p>
              </div>
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl required fullWidth variant="standard">
              <InputLabel htmlFor="acma-category">Compliance Period</InputLabel>
              <Select
                value={values.compliancePeriod}
                onChange={handleFinYear}
              >
                <MenuItem value={0}>Select Compliance Period</MenuItem>
                {props.fyYears &&
                  props.fyYears.map(fyYear => {
                    return <MenuItem value={fyYear}>{`FY${fyYear}`}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl required fullWidth variant="standard">
              <InputLabel htmlFor="acma-category">Channel Contractual Category</InputLabel>
              <Select
                value={values.acmaCategory}
                onChange={handleChange("acmaCategory")}
              >
                <MenuItem value={0}>Select ACMA Category</MenuItem>
                {props.acmaCategories &&
                  props.acmaCategories.map(category => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              helperText="Enter valid % between 0 - 100"
              error={!isValidPecent(values.actualCaptionPercent)}
              disabled={isCaptionDisbaled(
                values.acmaCategory,
                values.actualCaptionPercent,
                values.compliancePeriod
              ) || !values.isPastFiscalYear}
              variant="standard"
              id="standard-required"
              label="Caption % "
              onChange={handleChange("actualCaptionPercent")}
              value={getCaptionValue(values.actualCaptionPercent)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled
              fullWidth
              variant="filled"
              id="standard-required"
              label="Caption %(Prev year) "
              value={getCaptionValue(values.prevYearCaptionPercent)}
            />
          </Grid>
          <Grid item xs={12}>
            {(!isHideSaveAcmaConfig() && values.isPastFiscalYear) && (
              <button
                disabled={isSaveAcmaConfigDisabled() || !isValidPecent(values.actualCaptionPercent,values.acmaCategory)}
                className="GenerateReport"
              >
                Save
              </button>
            )}
          </Grid>
          <Grid item xs={12}>
      
          <Snackbar
          anchorOrigin={
            { vertical: 'bottom', horizontal: 'left' }
          }
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={variant}
            message={message}
          />
        </Snackbar>
       
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
