import { Card, Divider } from "@mui/material";
import { colors } from "@utils";
import { FC, ReactElement } from "react";
import { Box } from "../box";
import { Typography } from "../typography";

interface IDataCard {
  title: string,
  count: number,
  percentage: {
    amount: number,
    label: string
  }
  icon: ReactElement
}

export const DataCard: FC<IDataCard> = ({ icon, title, percentage, count }) => {

  return <Box sx={{ position: "relative" }}>
    <Card sx={{ width: 280, margin: 2, marginTop: 4, borderRadius: 2 }}>
      <Box display="flex" justifyContent="right" paddingY={1} paddingX={2} >
        <Box textAlign="right" lineHeight={1.25} justifySelf="right">
          <Typography fontWeight="light">
            {title}
          </Typography>
          <Typography variant="h5">{count}</Typography>
        </Box>
      </Box>
      <Divider
        variant="middle"
      />
      <Box paddingX={2} paddingY={1}>
        <Typography component="p" display="flex">
          <Typography
            component="span"
            fontWeight="bold"
            color="secondary"
          >
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </Box>
    </Card>
    <Box
      variant="gradient"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: colors.primary,
        color: "white",
        borderRadius: 2,
        display: "flex",
        width: "4rem",
        height: "4rem",
        boxShadow: `0 0 4px ${colors.primary}`,
        position: "absolute",
        top: "16px",
        marginLeft: 4
      }}
    >
      {icon}
    </Box>
  </Box>
};
