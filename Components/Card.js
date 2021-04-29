import { Typography, Tooltip, IconButton, Button } from "@material-ui/core/";
import Edit from "@material-ui/icons/Edit";
import { AddCircle as Add, Cancel as Delete } from "@material-ui/icons/";

import HeroDetails from '../Components/HeroDetails'

export default function Card({ hero }) {
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
          <Stat name="Intelligence" value={hero.powerstats.intelligence} />
          <Stat name="Strength" value={hero.powerstats.strength} />
          <Stat name="Speed" value={hero.powerstats.speed} />
          <Stat name="Durability" value={hero.powerstats.durability} />
          <Stat name="Power" value={hero.powerstats.power} />
          <Stat name="Combat" value={hero.powerstats.combat} />
        </div>

        <div className="manage-publication">
          <Tooltip title="Agregar a equipo">
            <IconButton onClick={() => {}}>
              <Add color="primary" />
            </IconButton>
          </Tooltip>
        </div>

        <HeroDetails hero={hero}/>
      </div>
      <style jsx>
        {`
          .card-row {
            width: 300px;
            min-height: 230px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            background-color: lightblue;
            border-radius: 5px;
            border: solid 2px black;
          }
          .card-img {
            flex: 1;
            height: 150px;
          }
          .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

function Stat({ name, value }) {
  let valueMessage = value;

  //Algunos personajes no tienen definido algunos stats
  if (value == "null") {
    value = 100;
    valueMessage = "no spec.";
  }

  console.log(value, valueMessage);
  const red = (255 * (100 - value)) / 100;
  const green = (255 * value) / 100;

  return (
    <>
      <span className="stat">
        {`${name} `}
        <span className="importance">{valueMessage}</span>
      </span>
      <style jsx>
        {`
          .stat {
            background: lightgreen;
            border-radius: 15px;
            padding: 0 0 0 5px;
            border: solid 2px black;
          }
          .importance {
            margin: 0;
            background-color: rgb(${red}, ${green}, 50);
            border-radius: 50%;
            padding: 0 2px;
          }
        `}
      </style>
    </>
  );
}
