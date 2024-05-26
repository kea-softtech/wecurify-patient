import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    width: 480
  },
  indeterminateColor: {
    color: "#f50057"
  },
  selectAllText: {
    fontWeight: 500
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

// const options = [
//   "grass and tree pollen", 
// "dust mites",
// "animal dander", 
// "tiny flakes of skin or hair",
// "food" ,
// "insect bites and stings",
// "medicines" 
// ];

export { useStyles, MenuProps };
