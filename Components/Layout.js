import { useContext, useEffect } from "react";
import Nav from "./Nav";

import { useRouter } from "next/router";
import NProgress from "nprogress";
import nProgress from "nprogress";

import { UserState } from "../Context/User";

//Component that encloses all the pages/routes
export default function Layout({ children }) {
  const { dispatch } = useContext(UserState);
  const router = useRouter();

  useEffect(() => {
    //Getting the localstore data
    let token = localStorage.getItem("MyHeroToken");
    if (token) {
      dispatch({ type: "setToken", payload: token });
      let team = localStorage.getItem("MyHeroTeam");
      if (team) {
        dispatch({ type: "setTeam", payload: JSON.parse(team) });
      }
    }

    //Setting nProgress (shows a loading bar when the route is changin)
    const handleRouteChange = (url) => {
      NProgress.start();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => nProgress.done());
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <div className="body">
      <Nav />
      <div className="container">{children}</div>
      <footer className="flex-row">
        <a href="https://github.com/ruggiadufour/challenge" target="_blank">
          <img src="/github.png" alt="github" width="50px" />
        </a>
      </footer>
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
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: white;
        }
        footer {
          width: 100%;
          padding: 0.6rem 10%;
          background-color: lightgreen;
        }
      `}</style>
    </div>
  );
}
