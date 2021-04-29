import axios from "axios";

export default async (req, res) => {
  try {
    let response = await axios.post(
      "http://challenge-react.alkemy.org",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({error: "Email o contraseña inconrrectos"});
  }
};
