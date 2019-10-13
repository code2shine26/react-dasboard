import React, { Component, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../util/MySnackBarContentWrapper'
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./ChannelConfig.css";
import axios from 'axios';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import { isValid } from "date-fns";
export default function ChannelConfig(props) {
  const CHANNEL_ENDPOINT = 'http://localhost:3004/channel';
  const SUCCESS_MESSAGE ="Changes are saved successfully";
  const FAILURE_MESSAGE ="OOPS! There was a problem in saving changes.Try later";
  const [isFormValid,setIsFormValid]= useState(true);
  const [isNewRecord,setisNewRecord] = useState(false);
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
    finYear: 0,
    tier: 0,
    isPastFiscalYear:true,
    acmaCategory: 0,
    contractualCategory:0,
    channel: 0,
    channelGroup: 0,
    hdChannel: false,
    sdChannel: false,
    fourkChannel: false,
    plus2channel: false,
    launchStartDate:null,
    launchEndDate:null,
    launchStartTime:null,
    launchEndTime:null
  });
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (evt) => {
   evt.preventDefault();
   // make the ajax reuqest to save the data
   async function saveChanges() {
    let splitCateory = values.acmaCategory.split(' ');
    //let acmaCatTransform = splitCateory ? splitCateory.join('_') : values.acmaCategory;
    //console.log('Acma transofrm::',acmaCatTransform);
    let id=`${values.finYear}_${values.channel}`
    try{
      let response ;
      if(isNewRecord) {
        response = await axios.post(`${CHANNEL_ENDPOINT}`, {
          ...values
         });
      }else {
        response = await axios.put(`${CHANNEL_ENDPOINT}/${id}`, {
          ...values
         });
      }
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
  }

  useEffect(() => {
    if (values.finYear !== 0  && values.channel !== 0) {
      async function getChannelConfiguration() {
        try{
          let channelResponse = await axios.get(
            `${CHANNEL_ENDPOINT}?finYear=${values.finYear}&channel=${values.channel}`
          );
          let channelData = channelResponse.data;
          console.log('Channel data ',channelData.length);
          if (channelData && channelData.length > 0) {
            let payLoad = channelData[0];
            if(payLoad) {
             
              setValues({
                ...values,
                acmaCategory:payLoad['acmaCategory'],
                contractualCategory:payLoad['contractualCategory'],
                tier: payLoad['tier'],
                channelGroup: payLoad['channelGroup'],
                hdChannel: payLoad['hdChannel'],
                sdChannel: payLoad['sdChannel'],
                fourkChannel: payLoad['fourkChannel'],
                plus2channel: payLoad['plus2channel'],
                launchStartDate:payLoad['launchStartDate'] ? new Date(payLoad['launchStartDate']) : null,
                launchEndDate:payLoad['launchEndDate'] ? new Date(payLoad['launchEndDate']) : null,
                launchStartTime:payLoad['launchStartTime'] ? new Date(payLoad['launchStartTime']): null,
                launchEndTime: payLoad['launchEndTime'] ?  new Date(payLoad['launchEndTime']) : null
                
              });
            }
            
          }else{
            let splitCateory = values.acmaCategory.split(' ');
            //let acmaCatTransform = splitCateory ? splitCateory.join('_') : values.acmaCategory;
            //console.log('Acma transofrm::',acmaCatTransform);
            let id=`${values.finYear}_${values.channel}`
            setValues({
              ...values,
              id:id,
              tier: 0,
              channelGroup: 0,
              hdChannel: false,
              sdChannel: false,
              fourkChannel: false,
              plus2channel: false,
              launchStartDate:null,
              launchEndDate:null,
              launchStartTime:null,
              launchEndTime:null

              
            });
            setisNewRecord(true);
          }
        }catch(err){
           console.error('Could not fetch the data ',err);
           setVariant("error");
           setMessage(FAILURE_MESSAGE);
           setOpen(true)
        }
        
       
      }
      getChannelConfiguration();
    }
  }, [values.finYear,values.channel]);

const isEnableLuanchtDate = (dateType) => {
if(values[dateType] == null) {
  return true;
}
return false;
}
  const handleChangeCheckbox = name => event => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleFiscalYear = (evt) => {
    console.log('fffyear::',evt.target.value)
      let isFiscalYear = isPastFiscalYear(evt.target.value);
      console.log('isFiscalYear::',isFiscalYear);
      setValues({...values,
        isPastFiscalYear:isFiscalYear,
        finYear:evt.target.value})
  }
  const handleChange = name => event => {
    console.log("name::", name);
    console.log("event::", event);
    
    setValues({ ...values, [name]: event.target.value });
  };
  const[message,setMessage]= React.useState(SUCCESS_MESSAGE);
  const[variant,setVariant]= React.useState("success");
  const [open, setOpen] = React.useState(false);
  
  const isChannelSaveButtonDisabled = () => {
     if(values.finYear === 0 || values.acmaCategory === 0 || values.channel === 0 || validateDates() ){
       return true;
     }
     return false;
  }
  const validateDates =() => {
  console.log('validate called');
    // if both start date and end date are entered 
    console.log('StartDate',values.handleLaunchStartDate)
    console.log('EndDate',values.handleLaunchEndDate)
    if(values.launchStartDate != null && values.launchEndDate != null) {
   
     if(values.launchEndDate.getTime() < values.launchStartDate.getTime()) {
      //setIsFormValid(false);
       return true
     }else{
       return false;
     }
      
    }


    // if both start date and end time and start time
    return false;
  }
  const handleLaunchStartDate = date => {
    console.log('Event from date::',date);
    setValues({...values,"launchStartDate": date});
  };
  const handleLaunchStartTime = time => {
    console.log('time::',time);
    console.log('Hours::',time.getHours());
    console.log('Minutes::',time.getMinutes());
    let launchTime = new Date(values.launchStartDate.setTime(time.getTime()));
    console.log('Launch Time::',launchTime);
    setValues({...values,"launchStartTime":launchTime });
  };
  const handleLaunchEndTime = time => {
    setValues({...values,"launchEndTime": time});
  };
  const handleLaunchEndDate = date => {
    setValues({...values,"launchEndDate": date});
  };
  return (
    <div className="ChannelConfig">
      <AppBar position="static" style={{ background: "#5c5757" }}>
        <Typography variant="h7"><strong>Channel Configuration</strong></Typography>
      </AppBar>
      <div>
        <form onSubmit={handleSubmit} className="ChannelConfig-form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">
                  Compliance Period
                </InputLabel>
                <Select
                  value={values.finYear}
                  onChange={handleFiscalYear}
                >
                  <MenuItem value={0}>Select Compliance Period</MenuItem>

                  {props.fyYears &&
                    props.fyYears.map(fyYear => {
                      return (
                        <MenuItem value={fyYear}>{`FY${fyYear}`}</MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Channel</InputLabel>
                <Select
                  value={values.channel}
                  onChange={handleChange("channel")}
                >
                  <MenuItem value={0}>Select Channel</MenuItem>
                  {props.channelList &&
                    props.channelList.map(channel => {
                      return <MenuItem value={channel}>{channel}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl  required fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">ACMA Category</InputLabel>
                <Select
                disabled={!values.isPastFiscalYear}
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
            <Grid item xs={12}>
              <FormControl required fullWidth variant="standard">
                <InputLabel htmlFor="contractual-category">Channel Contractual Category</InputLabel>
                <Select
                  disabled={!values.isPastFiscalYear}
                  value={values.contractualCategory}
                  onChange={handleChange("contractualCategory")}
                >
                  <MenuItem value={0}>Select Contractual Category</MenuItem>
                  {props.acmaCategories &&
                    props.acmaCategories.map(category => {
                      return <MenuItem value={category}>{category}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Channel Group</InputLabel>
                <Select
                disabled={!values.isPastFiscalYear}
                  value={values.channelGroup}
                  onChange={handleChange("channelGroup")}
                >
                  <MenuItem value={0}>Select Channel Group</MenuItem>
                  {props.channelGroups &&
                    props.channelGroups.map(channelGroup => {
                      return   <MenuItem value={channelGroup}>{channelGroup}</MenuItem>;
                      
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="acma-category">Teir</InputLabel>
                <Select value={values.tier} onChange={handleChange("tier")} disabled={!values.isPastFiscalYear}>
                  <MenuItem value={0}>Select Teir</MenuItem>
                  {props.tier &&
                    props.tier.map(tier => {
                      return <MenuItem value={tier}>{tier}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <div className="ChannelConfig-type">
                <FormGroup row>
                  <FormControlLabel
                    onChange={handleChangeCheckbox("sdChannel")}
                    control={
                      <Checkbox
                      disabled={!values.isPastFiscalYear}
                        checked={values.sdChannel}
                        value={values.sdChannel}
                      />
                    }
                    label="SD"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("hdChannel")}
                    control={
                      <Checkbox
                      disabled={!values.isPastFiscalYear}
                        checked={values.hdChannel}
                        value={values.hdChannel}
                      />
                    }
                    label="HD"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("fourkChannel")}
                    control={
                      <Checkbox
                      disabled={!values.isPastFiscalYear}
                        checked={values.fourkChannel}
                        value={values.fourkChannel}
                      />
                    }
                    label="4k"
                  />
                  <FormControlLabel
                    onChange={handleChangeCheckbox("plus2channel")}
                    control={
                      <Checkbox
                      disabled={!values.isPastFiscalYear}
                        checked={values.plus2channel}
                        value={values.plus2channel}
                      />
                    }
                    label="+2"
                  />
                </FormGroup>
              </div>
            </Grid>
           
             
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
              <KeyboardDatePicker
              fullWidth
              autoOk={true}
              disableToolbar
              variant="inline"
              disabled={!values.isPastFiscalYear}
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Launch Start Date"
              value={values.launchStartDate}
              onChange={handleLaunchStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
              fullWidth
                disabled={isEnableLuanchtDate('launchStartDate') ||  !values.isPastFiscalYear}
                  margin="normal"
                  id="time-picker"
                  label="Launch Start Time"
                  value={values.launchStartTime}
                   onChange={handleLaunchStartTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
        />
        </Grid>
        <Grid item xs={6}>
              <KeyboardDatePicker
              disabled={!values.isPastFiscalYear}
              fullWidth
              autoOk={true}
              disableToolbar
              error={validateDates()}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Launch End Date"
              value={values.launchEndDate}
              onChange={handleLaunchEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            </Grid>
            <Grid item xs={6}>
              <KeyboardTimePicker
              fullWidth
                  margin="normal"
                  disabled={isEnableLuanchtDate('launchEndDate') ||  !values.isPastFiscalYear}
                  id="time-picker"
                  label="Launch End Time"
                  value={values.launchEndTime}
                  onChange={handleLaunchEndTime}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
        />
        </Grid>
        </MuiPickersUtilsProvider>
            
            
            <Grid ullWidth xs={12}>
            { values.isPastFiscalYear && 
              <button disabled={isChannelSaveButtonDisabled()} className="GenerateReport">Save</button>}
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
    </div>
  );
}
