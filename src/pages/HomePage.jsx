import axios from "axios";
import { useEffect, useState } from "react";

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

const url = "https://random-word-api.herokuapp.com/word?lang=it";

export default function HomePage() {
  const [wordArray, setWordArray] = useState([]);
  const [newWord, setNewWord] = useState("");
  const [selectedLetter, setSelectedLetter] = useState(null);

  const fetchWord = () => {
    axios.get(url).then((res) => {
      const word = res.data[0];
      setNewWord(word);
      setWordArray((prev) => [...prev, word]);
      console.log(word);
    });
  };
  useEffect(fetchWord, []);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    console.log(letter);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <h1>HangMan</h1>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center m-5 gap-4">
          {newWord.split("").map((char, index) => (
            <span key={index}> __ </span>
          ))}
        </div>
        <div className="container d-flex justify-content-around">
          {alphabet.map((letter, i) => (
            <div
              onClick={() => handleLetterClick(letter)}
              key={i}
              className="letter-container">
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
