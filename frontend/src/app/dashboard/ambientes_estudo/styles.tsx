import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const background: SxProps<Theme> = {
  backgroundColor: "white",
  minHeight: "100vh",
  flexGrow: 1,
  marginLeft: {
    xs: 0,
  },
  paddingTop: 2,
};

export const dataStyle: SxProps = {
  marginTop: 1,
  paddingLeft: 12,
  paddingRight: 2,
};
