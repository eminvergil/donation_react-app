import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCanditate";
import {
  Grid,
  Paper,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import DCanditateForm from "./DCanditateForm";

const DCanditates = (props) => {
  // const [x, setX] = useState(0);
  // setX(5);
  useEffect(() => {
    props.fetchAllDCanditates();
  }, []);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={6}>
          <DCanditateForm />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dCanditateList.map((record, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{record.fullname}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    dCanditateList: state.dCanditate.list,
  };
};

const mapActionToProps = {
  fetchAllDCanditates: actions.fetchAll,
};

export default connect(mapStateToProps, mapActionToProps)(DCanditates);
