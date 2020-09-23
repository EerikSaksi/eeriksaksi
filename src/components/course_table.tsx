import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Paper, TableContainer, Grid } from '@material-ui/core';
type RowCols = Array<Array<string>>;

const CourseTable: React.FC<{ children?: React.ReactNode; headers: Array<string>; rowCols: RowCols }> = ({ children, headers, rowCols }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table' size='small'>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key = {header}  align='left'>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowCols.map((row, index) => (
                <TableRow key={index}>
                  {row.map((element) => (
                    <TableCell align='left'>{element}</TableCell>
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
