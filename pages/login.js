import { useState, useContext, useEffect } from "react";
import Head from "next/head";
//Material UI
import {
  Grid,
  LinearProgress,
  Typography,
  TextField,
  Hidden,
  Button,
  Divider,
} from "@material-ui/core";

import axios from "axios";
import { useRouter } from "next/router";
import { UserState } from "../Context/User";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(UserState);
  const LOGIN_API = process.env.NEXT_PUBLIC_LOGIN_API;

  const router = useRouter();

  //If the user isn' logged then is redirected to home
  useEffect(() => {
    if (state.HeroToken) {
      router.push("/");
    }
  }, [state]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //Handling all inputs
  const handleChange = (e) => {
    let value = e.target.value;
    let field = e.target.name;
    setData({
      ...data,
      [field]: value,
    });

    if (message !== "") {
      setMessage("");
    }
  };

  async function logIn(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`${LOGIN_API}?email=${data.email}&password=${data.password}`)
      .then(async (response) => {
        setLoading(false);
        const { token } = response.data;

        localStorage.setItem("MyHeroToken", token);
        dispatch({ type: "setToken", payload: token });

        const team = localStorage.getItem("MyHeroTeam");

        if (team) {
          dispatch({ type: "setTeam", payload: JSON.parse(team) });
        }

        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Email/password incorrect");
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Create your account in HeroTeam 🐱‍🏍"
        />
        <meta name="author" content="Angel Ruggia Dufour" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="login, marvel team, dc team, heroe team maker"
        />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content="Login" />
        <meta
          name="og:description"
          property="og:description"
          content="Create your account in HeroTeam 🐱‍🏍"
        />
        <meta property="og:site_name" content="Login" />
      </Head>
      <form className="login" onSubmit={logIn}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" align="center">
              Login
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              type="email"
              value={data.email}
              name="email"
              label="📧 Email"
              variant="filled"
              className="w-100"
              required
            />
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              name="password"
              value={data.password}
              required
              type="password"
              label="🔒 Password"
              variant="filled"
              className="w-100"
            />
          </Grid>

          <Hidden xlDown={message === ""}>
            <Typography color="error">{message}</Typography>
          </Hidden>

          <div hidden={!loading} className="w-100">
            <LinearProgress />
          </div>

          <Grid item xs={12} align="center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Accept
            </Button>
          </Grid>

          <Divider />
        </Grid>
      </form>
      <style jsx>
        {`
          .login {
            max-width: 400px;
          }
        `}
      </style>
    </>
  );
}
