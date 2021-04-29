import { useReducer, createContext } from "react";

const initialState = {
  HeroToken: null,
  HeroTeam: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "setToken":
      return { ...state, HeroToken: action.payload };
    case "setTeam":
      return { ...state, Team: action.payload };
    default:
      return state;
  }
};

const UserState = createContext(initialState);

function ProviderUserState({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserState.Provider value={{ state, dispatch }}>
      {children}
    </UserState.Provider>
  );
}

export { UserState, ProviderUserState };
