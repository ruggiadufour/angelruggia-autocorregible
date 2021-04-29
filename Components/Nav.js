import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";
import { useRouter } from "next/router";

export default function ButtonAppBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function searchHeroes() {
    if (search !== "") {
      router.push("/busqueda?name="+search)
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="title">
          News
        </Typography>
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          label="Buscar heroes"
        />
        <Button color="primary" onClick={searchHeroes}>
          🔎
        </Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <style jsx>
        {`
          .title {
            flex-grow: 1;
          }
        `}
      </style>
    </AppBar>
  );
}
