import { useState, useContext } from "react";
import { Typography, Button, TextField } from "@material-ui/core/";
import { useRouter } from "next/router";

import { UserState } from "../Context/User";

export default function Nav() {
  const { state, dispatch } = useContext(UserState);
  const [search, setSearch] = useState("");
  const router = useRouter();

  function searchHeroes() {
    if (search !== "") {
      router.push("/search?name=" + search);
    }
  }

  //Logout deletes the state and the localStorage
  function logout() {
    localStorage.removeItem("MyHeroToken");
    dispatch({ type: "deleteToken" });
    dispatch({ type: "deleteTeam" });
  }

  return (
    <>
      <nav className="navbar">
        <Typography
          variant="h6"
          className="title"
          onClick={() => {
            router.push("/");
          }}
        >
          HeroTeam 🐱‍🏍
        </Typography>
        <div className="search">
          <TextField
            value={search}
            color="primary"
            variant="outlined"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            label="Search heroes 🕵️‍♀️"
          />
          <Button color="primary" onClick={searchHeroes}>
            🔎
          </Button>
        </div>

        <div className="button">
          {!state.HeroToken ? (
            <Button
              color="inherit"
              size="large"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login 🙌
            </Button>
          ) : (
            <Button color="inherit" size="large" onClick={logout}>
              Logout 👋
            </Button>
          )}
        </div>
      </nav>
      <style jsx>
        {`
          .navbar {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 0.6rem 10%;
            background-color: lightgreen;
          }
          .search {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 1rem;
          }

          .button {
            margin-left: auto;
          }
          @media (max-width: 600px) {
            .button {
              margin: auto;
            }
          }
          .title {
            flex-grow: 1;
            cursor: pointer !important;
          }
        `}
      </style>
    </>
  );
}
