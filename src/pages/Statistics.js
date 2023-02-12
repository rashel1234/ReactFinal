import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '0 auto',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    padding: theme.spacing(2),
  },
}));

const data = [
  { country: 'USA', properties: 20, averagePrice: 150 },
  { country: 'France', properties: 25, averagePrice: 200 },
  { country: 'Germany', properties: 15, averagePrice: 125 },
  { country: 'Spain', properties: 18, averagePrice: 160 },
  { country: 'Italy', properties: 22, averagePrice: 180 },
];

const Statistics = () => {
  const classes = useStyles();

  return (
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
  );
};

export default Statistics;
