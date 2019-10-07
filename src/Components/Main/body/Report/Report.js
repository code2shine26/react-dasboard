import React, { useEffect } from "react";
import axios from "axios";
import ReportForm from "./ReportForm/ReportForm";
import ConfigDisplay from "../util/ConfigDisplay/ConfigDisplay";
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
  const [channelState, setChannelState] = React.useState({
    acmaCaption: 0,
    acmaCategory: 0,
    channelConfig: [],
    channelGroup: 0,
    contractualCaption: 0,
    launchEnd: "",
    launchStart: "",
    tier: ""
  });
  const getChannelState = async (channelName, finYear) => {
    console.log("ChannName", channelName);
    console.log("finYear", finYear);
    const response = await axios.get(
      `${endpoint}name=${channelName}&finYear=${finYear}`
    );
    console.log("Channel State response", response.data);
    setChannelState(response.data[0]);
  };
  const endpoint = "http://localhost:3004/channel?";
  return (
    <div className="Report">
      <ReportForm
        {...props}
        getChannelState={getChannelState}
        channelState={channelState}
      />
      {channelState.acmaCaption !== 0 && (
        <div className="Report-Metadata">
          <TextField
            style={{
              color: "none"
            }}
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
          <ConfigDisplay
            color="#1ABC9C"
            message="ACMA Caption"
            percentage={channelState.acmaCaption}
          />
          <ConfigDisplay
            message="Contractual Caption"
            percentage={channelState.contractualCaption}
          />
        </div>
      )}
    </div>
  );
}
