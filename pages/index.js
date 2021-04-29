import Head from "next/head";
import { useContext } from "react";

import { UserState } from "../Context/User";

export default function Home() {
  const { state } = useContext(UserState);
  console.log(state)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hola</h1>
      </main>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
