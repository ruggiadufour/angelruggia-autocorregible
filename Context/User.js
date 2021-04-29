import { useReducer, createContext } from "react";

const initialState = {
  HeroToken: null,
  HeroTeam: {},
};

const reducer = (state, action) => {
  const newTeam = state.HeroTeam;

  switch (action.type) {
    case "setToken":
      return { ...state, HeroToken: action.payload };
    case "deleteToken":
      return { ...state, HeroToken: null };
    case "setTeam":
      return { ...state, HeroTeam: action.payload };
    case "removeHero":
      delete newTeam[action.payload];

      //Saving updated team
      localStorage.setItem("MyHeroTeam", JSON.stringify(newTeam));

      return { ...state, HeroTeam: newTeam };
    case "addHero":
      newTeam[action.payload.id] = action.payload;

      //Saving updated team
      localStorage.setItem("MyHeroTeam", JSON.stringify(newTeam));
      return {
        ...state,
        HeroTeam: newTeam,
      };
    case "deleteTeam":
      return { ...state, HeroTeam: {} };
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
