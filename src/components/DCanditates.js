import React, { useEffect, useState } from "react";
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
  withStyles,
  TableCell,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

import DCanditateForm from "./DCanditateForm";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DCanditates = ({ classes, ...props }) => {
  //tost msg
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);
  // const [x, setX] = useState(0);
  // setX(5);
  useEffect(() => {
    props.fetchAllDCanditates();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record ? "))
      props.deleteDCanditates(id, () =>
        addToast("Deleted succesfully", { appearance: "info" })
      );
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCanditateForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dCanditateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullname}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
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
  deleteDCanditates: actions.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCanditates));
