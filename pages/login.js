import { useState, useContext } from "react";
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

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
        let { token } = response.data;

        localStorage.setItem("MyHeroToken", token);
        dispatch({ type: "setToken", payload: token });

        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setMessage("Contraseña o email incorrectos");
      });
  }

  return (
    <>
      <form className="login" onSubmit={logIn}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" align="center">
              Iniciar Sesión
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              type="email"
              value={data.email}
              name="email"
              label="📧 Correo electrónico"
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
              label="🔒 Contraseña"
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
              Iniciar
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
