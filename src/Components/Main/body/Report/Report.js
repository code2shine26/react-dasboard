import React, { useEffect, useState } from "react";
import axios from "axios";
import Metadata from '../util/Metadata/Metadata'
import ReportForm from "./ReportForm/ReportForm";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import "./Report.css";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
export default function Report(props) {
  const ACMA_CAPTION_END_POINT='http://localhost:3004/acmaCaption?'
  const CONTRACTUAL_CAPTION_END_POINT='http://localhost:3004/contractualCaption?'
  const classes = useStyles();
  const clearFields = () => {
    console.log("Clear fields called");
    setChannelState({
      acmaCategory: "",
      contractualCategory:"",
      hdChannel:false,
      sdChannel:false,
      fourkChannel:false,
      channelGroup: "",
      launchStartDate: null,
      launchEndDate: null,
      tier: ""
    });
    setAcmaCaption(0);
    setcontractualCaption(0)
  };
  const [display, setDisplay] = useState(false);
  const [acmaCaption,setAcmaCaption]=useState(0);
  const [contractualCaption,setcontractualCaption]=useState(0);
  const [channelState, setChannelState] = React.useState({
    acmaCategory: "",
    hdChannel:false,
    sdChannel:false,
    fourkChannel:false,
    plus2channel: false,
    channelGroup: "",
    launchEndDate: null,
    launchStartDate: null,
    tier: ""
  });

  const hideMetaData = flag => {
    console.log("hide Metadata called::", flag);
    setDisplay(flag);
  };
  const getChannelState = async (channelName, finYear) => {
    console.log("ChannName", channelName);
    console.log("finYear", finYear);
    const response = await axios.get(
      `${endpoint}channel=${channelName}&finYear=${finYear}`
    );
    
    console.log("Channel State response", response);
    if (response.status === 200 && response.data) {
      let acmaCategory = response.data[0]['acmaCategory']
      const captionDetails = await axios.get(
        `${ACMA_CAPTION_END_POINT}category=${acmaCategory}&finYear=${finYear}`
      );
      const contractualCaptionDetails = await axios.get(
        `${CONTRACTUAL_CAPTION_END_POINT}category=${acmaCategory}&finYear=${finYear}`
      );
     // console.log('captionDetails:::',captionDetails);
      if(captionDetails.data[0] && captionDetails.data[0].caption) {
        setAcmaCaption(captionDetails.data[0].caption)
      }
      if(contractualCaptionDetails.data[0] && contractualCaptionDetails.data[0].caption) {
        setcontractualCaption(contractualCaptionDetails.data[0].caption)
      }
      if(response.data[0]){
        setChannelState(response.data[0]);
      }
     
      setDisplay(true);
    }
  };
  const endpoint = "http://localhost:3004/channel?";
  return (
    <div className="Report">
      <ReportForm
        {...props}
        hideMetaData={hideMetaData}
        getChannelState={getChannelState}
        channelState={channelState}
        clearFields={clearFields}
      />
      {display && !channelState && (
        <div className="Data-not-found">
          <h3>Data not found !</h3>
          <p>
            No configuration data available. Try with a different financial year{" "}
          </p>
        </div>
      )}
      {display && channelState && (
        <div className="Report-Metadata">
          <Metadata
            color="#1ABC9C"
            message="ACMA Caption"
            percentage={acmaCaption}
          />
          <Metadata
            message="Contractual Caption"
            percentage={contractualCaption}
          />
          <TextField
            disabled
            label="Acma Category"
            value={channelState.acmaCategory}
            margin="normal"
            variant="standard"
          />
          <TextField
          disabled
          label="Channel Contractual Category"
          value={channelState.contractualCategory}
          margin="normal"
          variant="standard"
        />
          <TextField
            disabled
            label="Channel Group"
            value={channelState.channelGroup}
            margin="normal"
            variant="standard"
          />
          <TextField
            label="Tier"
            value={channelState.tier}
            margin="normal"
            disabled
            variant="standard"
          />
          <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
              disabled
                checked={channelState.sdChannel}
                value={channelState.sdChannel}
              />
            }
            label="SD"
          />
          <FormControlLabel
            control={
              <Checkbox
              disabled
                checked={channelState.hdChannel}
                value={channelState.hdChannel}
              />
            }
            label="HD"
          />
          <FormControlLabel
            control={
              <Checkbox
              disabled
                checked={channelState.fourkChannel}
                value={channelState.fourkChannel}
              />
            }
            label="4k"
          />
          <FormControlLabel
            control={
              <Checkbox
              disabled
                checked={channelState.plus2channel}
                value={channelState.plus2channel}
              />
            }
            label="+2"
          />
        </FormGroup>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          disabled
          autoOk={true}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Launch Start Date"
          value={channelState.launchStartDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          fullWidth
          disabled
          autoOk={true}
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Launch End Date"
          value={channelState.launchEndDate}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
         
        </div>
      )}
    </div>
  );
}
