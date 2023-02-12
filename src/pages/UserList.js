import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const mockData = [
  { name: 'John Doe', email: 'johndoe@example.com', registeredDate: '2022-12-01' },
  { name: 'Jane Doe', email: 'janedoe@example.com', registeredDate: '2022-11-15' },
  { name: 'Bob Johnson', email: 'bobjohnson@example.com', registeredDate: '2022-10-20' },
  { name: 'Amy Smith', email: 'amysmith@example.com', registeredDate: '2022-09-01' },
];

export const UserList = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Registered Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map((user) => (
            <TableRow key={user.email}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.registeredDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
