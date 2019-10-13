import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {isValidPecent} from '../../util/Validation/Validate';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from '@material-ui/core/Snackbar';
import "./acmaConfigForm.css";
import MySnackbarContentWrapper from '../../util/MySnackBarContentWrapper'
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));
export default function AcmaCaptionForm(props) {
  const endpoint = "http://localhost:3004/acmaCaption";
  const SUCCESS_MESSAGE ="Changes are saved successfully";
  const FAILURE_MESSAGE ="OOPS! There was a problem in saving changes.Try later";
  const classes = useStyles();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

 
  
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
  const handleSubmit = evt => {
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
        console.error('Acma caption Form saving failed ',err);
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
      isCaptionDisbaled(values.actualCaptionPercent, values.compliancePeriod)
    ) {
      return true;
    }
    return false;
  };
  const isCaptionDisbaled = (captionPercent, finYear) => {
    //exempt categoey
    return (isCaptionExempt(values.acmaCategory) || isMaxCaptions(captionPercent));
  };

  const isMaxCaptions = percent => {
    if (percent && percent === 100) {
      return true;
    }
    return false;
  };
  const getCaptionValue = captionVal => {
    if (isCaptionExempt(captionVal)) {
      return 0;
    }
    return captionVal;
  };
  const handleFinYear = (evt) => {
    let isFiscalYear = isPastFiscalYear(evt.target.value);
    console.log('isFiscalYear::',isFiscalYear);
    setValues({...values,
      isPastFiscalYear:isFiscalYear,
      compliancePeriod:evt.target.value})
  }
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const[message,setMessage]= React.useState(SUCCESS_MESSAGE);
  const[variant,setVariant]= React.useState("success");
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    acmaCategory: "",
    isPastFiscalYear:true,
    actualCaptionPercent: 0,
    compliancePeriod: "",
    prevYearCaptionPercent: 0,
    dataNotFound: false
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
        try{
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
          }else{
            setValues({
              ...values,
              actualCaptionPercent: 0,
             
              prevYearCaptionPercent: 0,
              dataNotFound: false
            });
          }
        }catch(err){
           console.error('Could not fetch the data ',err);
           setVariant("error");
           setMessage(FAILURE_MESSAGE);
           setOpen(true)
        }
        
       
      }
      getCaptionCompliance();
    }
  }, [values.compliancePeriod, values.acmaCategory]);

  return (
    <div className="AcmaCaptionForm">
      <AppBar position="static" style={{ background: "#3161a3" }}>
        <Typography variant="h7"><strong>ACMA Configuration</strong></Typography>
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
              <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
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
            type="number"
            error={!isValidPecent(values.actualCaptionPercent)}
            helperText="Enter valid % between 0 - 100"
              required
              fullWidth
              disabled={isCaptionDisbaled(
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
              type="number"
              fullWidth
              variant="filled"
              id="standard-required"
              label="Caption %(Prev year) "
              value={getCaptionValue(values.prevYearCaptionPercent)}
            />
          </Grid>
          <Grid item xs={12}>
            {(!isHideSaveAcmaConfig() && values.isPastFiscalYear ) && (
              <button
                disabled={isSaveAcmaConfigDisabled() || !isValidPecent(values.actualCaptionPercent)}
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
            variant="success"
            message="Changes have been saved successfuly"
          />
        </Snackbar>
       
          </Grid>
        </Grid>
        
      </form>
    </div>
  );
}
