import { useContext, useEffect } from "react";
import Nav from "./Nav";

import { UserState } from "../Context/User";

export default function Layout({ children }) {
  const { dispatch } = useContext(UserState);

  useEffect(() => {
    let token = localStorage.getItem("MyHeroToken");
    let team = localStorage.getItem("MyHeroTeam");

    if (token) {
      dispatch({ type: "setToken", payload: token });
    }
    if (team) {
      dispatch({ type: "setTeam", payload: team });
    }
  }, []);

  return (
    <div className="body">
      <Nav />
      <div className="container">{children}</div>
      <Nav />
      <style jsx>{`
        .body {
          height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .container {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: stretch;
          justify-content: center;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
