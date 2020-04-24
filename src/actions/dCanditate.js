import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

export const fetchAll = () => (dispatch) => {
  api
    .dCanditate()
    .fetchAll()
    .then((repsonse) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: Response.data,
      });
    })
    .catch((err) => console.log(err));
};
