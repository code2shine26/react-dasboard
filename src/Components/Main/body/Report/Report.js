import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportForm from "./ReportForm/ReportForm";
import Metadata from "../util/Metadata/Metadata";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
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
  const classes = useStyles();
  const clearFields = () => {
    console.log("Clear fields called");
    setChannelState({
      acmaCaption: 0,
      acmaCategory: "",
      channelConfig: [],
      channelGroup: "",
      contractualCaption: 0,
      launchEnd: "",
      launchStart: "",
      tier: ""
    });
  };
  const [display, setDisplay] = useState(false);
  const [channelState, setChannelState] = React.useState({
    acmaCaption: 0,
    acmaCategory: "",
    channelConfig: [],
    channelGroup: "",
    contractualCaption: 0,
    launchEnd: "",
    launchStart: "",
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
      `${endpoint}name=${channelName}&finYear=${finYear}`
    );
    console.log("Channel State response", response);
    if (response.status === 200 && response.data) {
      setChannelState(response.data[0]);
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
            percentage={channelState.acmaCaption}
          />
          <Metadata
            message="Contractual Caption"
            percentage={channelState.contractualCaption}
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
          <TextField
            label="Resolutions"
            value={channelState.channelConfig}
            margin="normal"
            disabled
            variant="standard"
          />
          <TextField
            label="Launch Start"
            value={channelState.launchStart}
            margin="normal"
            disabled
            variant="standard"
          />
          <TextField
            label="Launch End"
            value={channelState.launchEnd}
            margin="normal"
            disabled
            variant="standard"
          />
        </div>
      )}
    </div>
  );
}
