import axios from "axios";
export default async (req, res) => {
  const API = process.env.HERO_API
  const TOKEN = process.env.HERO_TOKEN

  console.log(API, TOKEN)
  res.send(API+TOKEN)
  // try {
  //   let response = await axios.get(
  //     "https://superheroapi.com/api/1596476157223549/search/spider"
  //   );

  //   res.status(200).json(response.data);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Something broke!", error);
  // }
};
