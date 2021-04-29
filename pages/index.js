import Head from "next/head";
import { useContext } from "react";
import { UserState } from "../Context/User";

import TeamScreen from "../Components/TeamScreen";
import UnloggedScreen from "../Components/UnloggedScreen";

export default function Home() {
  const { state } = useContext(UserState);

  return (
    <>
      <Head>
        <title>HeroTeam 🐱‍🏍</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="In this website you will be able to create your own team of heroes."
        />
        <meta name="author" content="Angel Ruggia Dufour" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="marvel team, dc team, heroe team maker"
        />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content="HeroTeam 🐱‍🏍" />
        <meta
          name="og:description"
          property="og:description"
          content="In this website you will be able to create your own team of heroes."
        />
        <meta property="og:site_name" content="HeroTeam 🐱‍🏍" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="HeroTeam 🐱‍🏍" />
        <meta
          name="twitter:description"
          content="In this website you will be able to create your own team of heroes."
        />
        <meta name="twitter:site" content="@RuggiaAngel" />
        <meta name="twitter:creator" content="@RuggiaAngel" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta
          property="og:image"
          content="https://www.superherodb.com/pictures2/portraits/10/100/10618.jpg"
        />
        <meta
          name="twitter:image"
          content="https://www.superherodb.com/pictures2/portraits/10/100/10618.jpg"
        />
      </Head>

      <main>{state.HeroToken ? <TeamScreen /> : <UnloggedScreen />}</main>
    </>
  );
}
