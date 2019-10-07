import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ClosedCaptionOutlinedIcon from "@material-ui/icons/ClosedCaptionOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ClosedCaptionOutlinedIcon
                style={{
                  color: "#fff",
                  backgroundColor: "#000",
                  fontSize: "40px",
                  marginRight: "7px"
                }}
              />{" "}
              Dorito - Caption Compliance
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
