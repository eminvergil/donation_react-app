import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCanditate";

const DCanditates = (props) => {
  // const [x, setX] = useState(0);
  // setX(5);
  useEffect(() => {
    props.fetchAllDCanditates;
  }, []);

  return <div>from DCanditates</div>;
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
