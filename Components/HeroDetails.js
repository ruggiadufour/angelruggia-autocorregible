import React, { useState } from "react";
import { Button, DialogContent, DialogTitle, Dialog } from "@material-ui/core/";

//Modal to show extra hero data
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
        />
        <p>
          <strong>Full name:</strong> {` ${hero.biography["full-name"]}`}
        </p>
        <p>
          <strong>Alter ego:</strong> {` ${hero.biography["alter-egos"]}`}
        </p>
        <p>
          <strong>Alignment:</strong> {` ${hero.biography.alignment} `}
        </p>
        <p>
          <strong>Gender:</strong> {` ${hero.appearance.gender} `}
          <strong>Race: </strong> {` ${hero.appearance.race}`}
        </p>
        <p>
          <strong>Height:</strong>{" "}
          {` ${hero.appearance.height[0]}/${hero.appearance.height[1]} `}
          <strong>Weight: </strong>{" "}
          {` ${hero.appearance.weight[0]}/${hero.appearance.weight[1]} `}
        </p>
        <p>
          <strong>Eye color:</strong> {` ${hero.appearance["eye-color"]} `}
          <strong>Hair color: </strong> {` ${hero.appearance["hair-color"]}`}
        </p>
        <p>
          <strong>Occupation:</strong> {` ${hero.work.occupation} `}
          <strong>Base: </strong> {` ${hero.work.base}`}
        </p>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Accept
        </Button>
      </DialogContent>

      <style jsx>
        {`
          img {
            object-fit: cover;
            display: block;
            margin: auto;
            max-width:400px;
            max-height:200px;
          }
          img:active {
            max-width: auto;
            height: auto;
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
        Details
      </Button>
      <HeroDetails hero={hero} open={open} onClose={handleClose} />
    </div>
  );
}
