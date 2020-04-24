import { ACTION_TYPES } from "../actions/dCanditate";

const initialState = {
  list: [],
};

export const dCanditate = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        list: [...action.payload],
      };

    default:
      return state;
  }
};
