export default function Stat({ name, value }) {
  let valueMessage = value;

  //Some heroes don't have defined some stats
  if (value == "null") {
    value = 100;
    valueMessage = "no spec.";
  }

  //We calculate the color red and green by the value of stat
  const red = (255 * (100 - value)) / 100;
  const green = (255 * value) / 100 / (value > 35 ? 1 : 2);

  return (
    <>
      <span className="powerstat">
        {`${name} `}
        <span className="powerstat-importance">{valueMessage}</span>
      </span>
      <style jsx>
        {`
          .powerstat {
            background: white;
            border-radius: 15px;
            padding: 0 0 0 5px;
            border: solid 2px black;
            overflow: hidden;
            text-transform: capitalize;
          }
          .powerstat-importance {
            margin: 0;
            background-color: rgb(${red}, ${green}, 50);
            padding: 0 2px;
          }
        `}
      </style>
    </>
  );
}
