import axios from "axios";

export default function HomePage() {
  const url = "https://random-word-api.herokuapp.com/word?lang=it";
  const wordArray = [];
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const fetchWorld = (url) => {
    axios.get(url).then((res) => {
      return wordArray.push(res.data[0]);
    });
  };
  fetchWorld(url);
  console.log(wordArray);

  return (
    <div className="container d-flex justify-content-around">
      {alphabet.map((letter, i) => (
        <div key={i} className="letter-container">
          {letter}
        </div>
      ))}
    </div>
  );
}
