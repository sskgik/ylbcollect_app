import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './infobody.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date: any, infomation: any) {
  return { date, infomation };
}

//リリースがあるたびにここにリリース情報を追加してください
const rows = [
  createData('2021/4', '独自CtoC & BtoC NFTプラットフォーム YLB Collectリリース '),
];

function Infobody() {
  const classes = useStyles();

  return (
    <div className='infomain'>
      <div className="Infobody">
        <h1 className='h1font'>Press Release</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Release Infomation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.date}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="left">{row.infomation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Infobody;
