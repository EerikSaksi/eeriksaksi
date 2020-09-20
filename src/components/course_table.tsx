import React from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Paper, TableContainer } from '@material-ui/core';
type TwoColRows = Array<Array<string>>
const CourseTable: React.FC<{ twoColRows: TwoColRows }> = ({ twoColRows }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>First Semester</TableCell>
            <TableCell align='left'>Second Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {twoColRows.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell align='left'>{row[0]}</TableCell>
                <TableCell align='left'>{row[1]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CourseTable;
