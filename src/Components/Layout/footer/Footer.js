import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@material-ui/core/Badge";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    background: "linear-gradient(45deg, #333333 30%, #333334 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px #ccc",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className="MainFooter">
      {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
      <div className="footer"></div>
    </div>
  );
}
