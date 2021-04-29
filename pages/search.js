import {  useState } from "react";
import { Typography } from "@material-ui/core/";
import Head from 'next/head'
import HeroCard from "../Components/Card";
import { fetching } from "../lib/fetchAPI";
import Alert from "../Components/Alert";

//Component for searching the heroes
export default function search({ heroes, name }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "success" });

  if (heroes.length == 0) {
    return (
      <>
        <Head>
          <title>{`Couldn't find: ${name}`}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className="flex-col">
          <img
            src="/notfound.png"
            width={"300px"}
            height={"300px"}
            className="center-image"
            alt="not found heroes"
          />
          <Typography
            component="h1"
            variant="h4"
          >{`Sorry, we couldn't find any results of: ${name}`}</Typography>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Reesults of: ${name}`}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Typography
        component="h1"
        variant="h4"
      >{`Showing results of: ${name}`}</Typography>

      <div className="list flex-row wrap gap10">
        {heroes.map((hero) => (
          <HeroCard
            hero={hero}
            key={hero.id}
            setOpenAlert={setOpen}
            setAlert={setAlert}
          />
        ))}
      </div>

      <Alert
        open={open}
        setOpen={setOpen}
        message={alert.message}
        type={alert.type}
      />

      <style jsx>{`
        .list {
          width: 100%;
        }
        h1 {
          flex: 1;
          width: 100%;
        }
      `}</style>
    </>
  );
}

//Server side rendering
export async function getServerSideProps({ query }) {
  const HERO_API = process.env.NEXT_PUBLIC_HERO_API;
  const HERO_TOKEN = process.env.HERO_TOKEN;

  const { data } = await fetching(
    `${HERO_API}${HERO_TOKEN}/search/${query.name}`
  );

  return {
    props: {
      heroes: data.error ? [] : data.results,
      name: query.name,
    },
  };
}
