import { LinearProgress, LinearProgressProps } from "@mui/material";
import React, { FC } from "react";

export const Loading: FC<LinearProgressProps> = (props) => {
  return <LinearProgress color="primary" {...props} sx={{ marginY: 4, maxWidth: 300, marginX: "auto" }} />;
};
