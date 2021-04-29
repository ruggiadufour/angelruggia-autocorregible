import { useContext } from "react";
import { Typography, Tooltip, IconButton } from "@material-ui/core/";
import { AddCircle as Add, Cancel as Delete } from "@material-ui/icons/";

import { useRouter } from "next/router";

import HeroDetails from "../Components/HeroDetails";
import PowerStat from "../Components/PowerStat";

import { UserState } from "../Context/User";

//Reusable component for showing heroes main data
export default function Card({ hero, setOpenAlert, setAlert }) {
  const router = useRouter();
  const { state, dispatch } = useContext(UserState);
  const isInTeam = [hero.id] in state.HeroTeam;

  function addHeroTeam() {
    //If the user wants to remove/add a hero and is not logged, then is redirected to login
    if (!state.HeroToken) {
      router.push("/login");
      return;
    }

    const team = state.HeroTeam;
    //If there are 6 heroes in the team, we don't allow to add another one
    if (Object.entries(team).length < 6) {
      const alignment = hero.biography.alignment;

      const alignmentAmount = Object.keys(team).filter(
        (id) => team[id].biography.alignment === alignment
      ).length;

      //If there are 3 heroes with the same alignment in team, we don't allow to add another one
      if (alignmentAmount < 3) {
        dispatch({ type: "addHero", payload: hero });
      } else {
        //Show an alert to notify
        setAlert({
          message:
            "You can't add another hero to your Team because you already have 3 heroes of the same alignment.",
          type: "warning",
        });
        setOpenAlert(true);
      }
    } else {
      setAlert({
        message: "¡You already have 6 heroes in your Team!",
        type: "error",
      });
      setOpenAlert(true);
    }
  }

  function removeHeroTeam() {
    //If the user wants to remove/add a hero and is not logged, then is redirected to login
    if (!state.HeroToken) {
      router.push("/login");
      return;
    }

    dispatch({ type: "removeHero", payload: hero.id });
  }

  return (
    <div className="card-row">
      <div className="card-img">
        <img src={hero.image.url} alt="1° imagen" className="image" />
      </div>

      <div className="card-info">
        <Typography align="center" component="h5" variant="h5">
          {hero.name}
        </Typography>
        <Typography align="left" component="h6">
          Powerstats:
        </Typography>
        <div className="card-info-stats">
          <PowerStat name="Intelligence" value={hero.powerstats.intelligence} />
          <PowerStat name="Strength" value={hero.powerstats.strength} />
          <PowerStat name="Speed" value={hero.powerstats.speed} />
          <PowerStat name="Durability" value={hero.powerstats.durability} />
          <PowerStat name="Power" value={hero.powerstats.power} />
          <PowerStat name="Combat" value={hero.powerstats.combat} />
        </div>

        <div className="manage-publication">
          <Tooltip title={isInTeam ? "Remove ❌" : "Add 💯"}>
            <IconButton
              size="medium"
              onClick={isInTeam ? removeHeroTeam : addHeroTeam}
            >
              {isInTeam ? (
                <Delete color="secondary" />
              ) : (
                <Add color="primary" />
              )}
            </IconButton>
          </Tooltip>
        </div>

        <HeroDetails hero={hero} />
      </div>
      <style jsx>
        {`
          .card-row {
            width: 300px;
            min-height: 230px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            background-color: lightgray;
            border-radius: 5px;
            border: solid 2px black;
            transition: transform 0.3s;
          }
          .card-row:hover {
            transform: scale(1.02);
          }
          .card-row:hover img {
            transform: scale(1.3);
          }
          .card-img {
            flex: 1;
            height: 150px;
            border-bottom: solid 2px black;
            overflow: hidden;
          }
          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
          }
          .card-info {
            flex: 2;
            padding: 10px;
            text-align: center;
            position: relative;
          }
          .card-info-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            align-items: center;
            justify-content: center;
            margin: 0.65rem 0;
          }
          .manage-publication {
            position: absolute;
            top: 0;
            right: 0;
          }
        `}
      </style>
    </div>
  );
}
