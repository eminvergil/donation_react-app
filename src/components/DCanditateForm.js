import React, { useEffect } from "react";
import * as actions from "../actions/dCanditate";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";
import useForm from "./useForm";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullname: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCanditateForm = ({ classes, ...props }) => {
  //tost msg
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required!";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required!";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required!";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    resetForm,
    handleInputChange,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted succesfully", { appearance: "success" });
      };
      if (props.currentId == 0) props.createDCanditate(values, onSuccess);
      else props.updateDCanditate(props.currentId, values, onSuccess);
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.dCanditateList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullname"
            variant="outlined"
            label="Full Name"
            value={values.fullname}
            onChange={handleInputChange}
            {...(errors.fullname && {
              error: true,
              helperText: errors.fullname,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.email && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="0+">0+</MenuItem>
              <MenuItem value="0-">0-</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && {
              error: true,
              helperText: errors.mobile,
            })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dCanditateList: state.dCanditate.list,
});

const mapActionToProps = {
  createDCanditate: actions.create,
  updateDCanditate: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCanditateForm));
