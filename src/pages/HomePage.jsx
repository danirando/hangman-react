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
  const [selectedLetter, setSelectedLetter] = useState([]);
  const [errorCount, setErroCount] = useState(0);
  const [wrongLetters, setWrongLetters] = useState([]);

  const hasWon =
    newWord &&
    newWord.length > 0 &&
    newWord.split("").every((char) => selectedLetter.includes(char));

  const hasLost = errorCount >= 10;

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
    setSelectedLetter([...selectedLetter, letter]);
    if (newWord.includes(letter)) {
      for (let char of newWord) {
        if (char === letter) {
          console.log(letter);
        }
      }
    } else {
      // Se la lettera non è presente, incrementa errorCount
      setErroCount(errorCount + 1);
      setWrongLetters([...wrongLetters, letter]);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <h1>HangMan</h1>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center m-5 gap-4">
          {newWord.split("").map((char, index) => (
            <span key={index}>
              {selectedLetter && selectedLetter.includes(char) ? char : "__"}
            </span>
          ))}
        </div>
        <div className="container d-flex justify-content-around">
          {alphabet.map((letter, i) => {
            const isClicked = selectedLetter.includes(letter);
            const isWrong = wrongLetters.includes(letter);
            const isCorrect = isClicked && !isWrong;

            let classNames = "letter-container";
            if (isClicked) classNames += " clicked";
            if (isCorrect) classNames = "letter-container correct";
            if (isWrong) classNames = "letter-container wrong";

            return (
              <div
                key={i}
                onClick={() => {
                  if (!isClicked && !hasLost) handleLetterClick(letter);
                }}
                className={classNames}>
                {letter.toUpperCase()}
              </div>
            );
          })}
        </div>
        {hasWon && (
          <div className="container win-container">
            Hai vinto! 🎉
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}>
              Nuova Parola
            </button>
          </div>
        )}
        <div>
          {hasLost && (
            <div className="container lose-container">
              Hai perso! 😞
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}>
                Nuova Parola
              </button>
            </div>
          )}
        </div>

        <div className="container error-container">Errori: {errorCount}</div>
      </div>
    </>
  );
}
