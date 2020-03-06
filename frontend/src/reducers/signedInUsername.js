import { GET_SIGNED_IN_USERNAME } from "../actions";

const initialState = {
  signedInUsername: ""
};

const signedInUsername = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIGNED_IN_USERNAME:
      return {
        ...state,
        signedInUsername: action.signedInUsername
      };
    default:
      return state;
  }
};

export default signedInUsername;
