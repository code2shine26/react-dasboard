import React, { Component } from "react";
import "./Search.css";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
class Search extends Component {
  state = {};
  render() {
    return (
      <div className="Search">
        <AppBar position="static">
          <Typography variant="h7">Simple Search</Typography>
        </AppBar>

        <div className="Search-area"></div>
      </div>
    );
  }
}

export default Search;
