const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = (userId) => {
  return {
    type: LOGIN,
    payload: {
      userId: userId,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      isLogin: false,
    },
  };
};

const initState = {
  loginUser: null,
  isLogin: false,
};

export default function loginReducer(state = initState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        loginUser: payload.userId,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        loginUser: null,
      };
    default:
      return {
        ...state,
      };
  }
}


