import React from "react";
import Link from "next/link";

import { Typography } from "@material-ui/core/";

//If the user isn't logged we show the next component, that has some texts and images so the user knows what the app is about
export default function UnloggedScreen() {
  return (
    <>
      <Typography align="center" component="h1" variant="h4">
        Create your favorite Hero Team
      </Typography>

      <Typography align="center">
        {`You can choose any heroe or villain  and build the
              best team. `}
        <br />
        <Link href="/login">
          <a>Click here</a>
        </Link>
        {` to login and do it.`}
      </Typography>

      <div className="flex-row wrap gap10">
        <div className="flex-col desc-image ">
          <Typography align="left" component="h2" variant="h5">
            Watch the cards and pick up your Heroes.
          </Typography>
          <img src="/card.png" alt="heroe card" />
        </div>

        <div className="desc-image">
          <Typography align="left" component="h2" variant="h5">
            Check the specs.
          </Typography>
          <img src="/specs.png" alt="heroe specs" />
        </div>

        <div className="flex-col desc-image ">
          <Typography align="left" component="h2" variant="h5">
            Build your team.
          </Typography>
          <img src="/team.png" alt="heroe team" />
        </div>
      </div>

      <style jsx>
        {`
          .desc-image {
            margin: 1rem 0;
            justify-content: center;
            align-items: center;
            background-color: lightgray;
            padding: 0.6rem;
          }
          img{
            width: 100%
          }
        `}
      </style>
    </>
  );
}
