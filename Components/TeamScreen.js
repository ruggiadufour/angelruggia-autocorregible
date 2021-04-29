import { useContext, useEffect, useState } from "react";
import { UserState } from "../Context/User";

import { Typography } from "@material-ui/core";
import HeroCard from "../Components/Card";
import PowerStat from "../Components/PowerStat";

export default function TeamScreen() {
  const { state } = useContext(UserState);
  const init1 = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  };
  const [powerstats, setPowerstats] = useState({ ...init1 });
  const init2 = {
    height: 0,
    weight: 0,
  };
  const [appearance, setAppearance] = useState({ ...init2 });

  useEffect(() => {
    const team = state.HeroTeam;
    const length = Object.keys(team).length;

    //Function to format the data 
    function getNotNull(str) {
      return str == "null" ? 0 : Number(str);
    }
    function getWeightNumber(w) {
      return Number(w.replace(" kg", ""));
    }
    function getHeightNumber(w) {
      return Number(w.replace(" cm", ""));
    }
    /**************************/

    let _powerstats_ = { ...init1 };
    let _appearance_ = { ...init2 };

    //Calculating the stat (powerstats and appareance) average 
    Object.keys(team).map((key) => {
      const pwsts = team[key].powerstats;
      _powerstats_ = {
        intelligence:
          _powerstats_.intelligence + getNotNull(pwsts.intelligence) / length,
        strength: _powerstats_.strength + getNotNull(pwsts.strength) / length,
        speed: _powerstats_.speed + getNotNull(pwsts.speed) / length,
        durability:
          _powerstats_.durability + getNotNull(pwsts.durability) / length,
        power: _powerstats_.power + getNotNull(pwsts.power) / length,
        combat: _powerstats_.combat + getNotNull(pwsts.combat) / length,
      };

      const app = team[key].appearance;
      _appearance_ = {
        height: _appearance_.height + getHeightNumber(app.height[1]) / length,
        weight: _appearance_.weight + getWeightNumber(app.weight[1]) / length,
      };
    });

    setAppearance(_appearance_);
    setPowerstats(_powerstats_);
  }, [state]);

  //Sorting the stats and setting the team category
  function getSortedStats() {
    const sortedObj = Object.entries(powerstats).sort((a, b) => b[1] - a[1]);

    return (
      <>
        <div className="flex-row wrap gap10 powerstats">
          {sortedObj.map((el) => (
            <PowerStat key={el[0]} name={el[0]} value={el[1].toFixed(2)} />
          ))}
        </div>
        <Typography align="center">
          Team category: <strong>{sortedObj[0][0]}</strong>{" "}
        </Typography>
      </>
    );
  }

  //If the user doesn't have any team we render:
  if (Object.keys(state.HeroTeam).length === 0) {
    return (
      <>
        <Typography variant="h4" align="center">
          My Team
        </Typography>
        <Typography variant="h5">
          You don't have any team yet, pleas search (🔎) some and add them to
          your team.
        </Typography>
      </>
    );
  }

  //If the user has a team we render:
  return (
    <>
      <div>
        <Typography variant="h4" align="center">
          My Team
        </Typography>
        <Typography variant="h5">Powerstats average:</Typography>

        {/* Sorting the powerstats' averages */}
        {getSortedStats()}

        <Typography variant="h5">Average weight and height:</Typography>
        <div className="flex-row wrap gap10 powerstats">
          <span>
            <strong>{`Weight: `}</strong>
            {`${appearance.weight.toFixed(2)} kg `}
          </span>
          <span>
            <strong>{`Height: `}</strong>
            {`${appearance.height.toFixed(2)} cm `}
          </span>
        </div>

        {/* Showing the heroes' cards */}
        <div className="flex-row wrap gap10">
          {Object.keys(state.HeroTeam).map((key) => (
            <HeroCard
              key={key}
              hero={state.HeroTeam[key]}
              setOpenAlert={() => {}}
              setAlert={() => {}}
            />
          ))}
        </div>
      </div>

      <style jsx>
        {`
          .powerstats {
            justify-content: left;
            margin-bottom: 0.7rem;
          }
          :global(strong) {
            text-transform: capitalize;
          }
        `}
      </style>
    </>
  );
}
