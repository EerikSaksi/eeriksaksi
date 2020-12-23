import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Paper, TableContainer, Grid, makeStyles } from '@material-ui/core';
type RowCols = Array<Array<string>>;

const useStyles = makeStyles(theme => ({
  tableCell: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.5em'
    },
  },
  row: {
    [theme.breakpoints.up('sm')]: {
      height: '2em'
    },
  },
  tableContainer: {
    boxShadow: 'none' 
  }
}))

const CourseTable: React.FC<{ children?: React.ReactNode; headers: Array<string>; rowCols: RowCols }> = ({ children, headers, rowCols }) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <TableContainer className = {classes.tableContainer} component={Paper} >
          <Table aria-label='simple table' size='small'>
            <TableHead>
              <TableRow className = {classes.row}>
                {headers.map((header) => (
                  <TableCell className = {classes.tableCell} key={header} align='left'>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowCols.map((row, index) => (
                <TableRow key={index}>
                  {row.map((element) => (
                    <TableCell className = {classes.tableCell}  key={element} align='left'>
                      {element}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default CourseTable;
