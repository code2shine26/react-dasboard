import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import "./acmaConfigForm.css";
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
  const classes = useStyles();

  const handleSubmit = evt => {
    evt.preventDefault();
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
    return isCaptionExempt(captionPercent) || isMaxCaptions(captionPercent);
  };

  const isMaxCaptions = percent => {
    if (percent && percent === 100) {
      return true;
    }
    return false;
  };
  const getCaptionValue = captionVal => {
    if (isCaptionExempt(captionVal)) {
      return "N/A";
    }
    return captionVal;
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  const [values, setValues] = useState({
    acmaCategory: "",
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

  const isCaptionExempt = percent => {
    if (percent && percent === -1) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (values.compliancePeriod !== "" && values.acmaCategory !== "") {
      async function getCaptionCompliance() {
        let selectedYearResponse = await axios.get(
          `${endpoint}?finYear=${values.compliancePeriod}&catgory=${values.acmaCategory}`
        );
        let respCurrent = selectedYearResponse.data[0];
        let previousYearResponse = await axios.get(
          `${endpoint}?finYear=${values.compliancePeriod - 1}&catgory=${
            values.acmaCategory
          }`
        );
        let respPrevious = previousYearResponse.data[0];
        console.log("Anwitha:::", respCurrent, respPrevious);
        if (respCurrent) {
          setValues({
            ...values,
            prevYearCaptionPercent: respPrevious["caption"],
            actualCaptionPercent: respCurrent["caption"]
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
    <div className="AcmaCaptionForm">
      <AppBar position="static" style={{ background: "#484c7f" }}>
        <Typography variant="h7">ACMA Configuration</Typography>
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
                onChange={handleChange("compliancePeriod")}
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
              required
              fullWidth
              disabled={isCaptionDisbaled(
                values.actualCaptionPercent,
                values.compliancePeriod
              )}
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
            {!isHideSaveAcmaConfig() && (
              <button
                disabled={isSaveAcmaConfigDisabled()}
                className="GenerateReport"
              >
                Save
              </button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
