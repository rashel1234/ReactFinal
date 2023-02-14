import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useLogedInUserType from "../components/Auth/LoginTypeHook";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    padding: theme.spacing(2),
  },
}));

const Statistics = () => {
  const userType = useLogedInUserType(localStorage.getItem("user"));
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/statistics")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      {userType == "Admin" ? (
        <div className={classes.root}>
          <h2>Statistics</h2>
          <Paper className={classes.root}>
            <h3>Number of Properties per Country</h3>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="properties" fill="#8884d8" />
            </BarChart>
            <h3>Average Price of Property per Country</h3>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averagePrice" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </div>
      ) : (
        <Typography variant="h3">Not Admin</Typography>
      )}
    </>
  );
};

export default Statistics;
