import React, { useState } from "react";
import {
  Button,
  DialogContentText,
  DialogContent,
  List,
  DialogTitle,
  Dialog,
} from "@material-ui/core/";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

function HeroDetails({ onClose, open, hero }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{hero.name}</DialogTitle>
      <DialogContent>
        <img
          src={hero.image.url}
          alt="hero imagen"
          width="400px"
          height="250px"
        />
        <p>
          <strong>Nombre completo:</strong> {` ${hero.biography["full-name"]}`}
        </p>
        <p>
          <strong>Alias:</strong> {` ${hero.biography["alter-egos"]}`}
        </p>
        <p>
          <strong>Genero:</strong> {` ${hero.appearance.gender} `}
          <strong>Raza: </strong> {` ${hero.appearance.race}`}
        </p>
        <p>
          <strong>Altura:</strong>{" "}
          {` ${hero.appearance.height[0]}/${hero.appearance.height[1]} `}
          <strong>Peso: </strong>{" "}
          {` ${hero.appearance.weight[0]}/${hero.appearance.weight[1]} `}
        </p>
        <p>
          <strong>Color de pelo:</strong> {` ${hero.appearance["eye-color"]} `}
          <strong>Color de ojos: </strong> {` ${hero.appearance["hair-color"]}`}
        </p>
        <p>
          <strong>Ocupación:</strong> {` ${hero.work.occupation} `}
          <strong>Lugar: </strong> {` ${hero.work.base}`}
        </p>
      </DialogContent>

      <style jsx>
        {`
          img {
            object-fit: cover;
            display: block;
            margin: auto;
          }
        `}
      </style>
    </Dialog>
  );
}

export default function ButtonDialog({ hero }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver detalles
      </Button>
      <HeroDetails hero={hero} open={open} onClose={handleClose} />
    </div>
  );
}
