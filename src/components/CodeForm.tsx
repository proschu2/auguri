import React, { useEffect, useRef, useState } from "react";
import "../styles/CodeForm.css";
import data from "../assets/data/locations.json";
import Map from "./Map";

const CodeForm: React.FC<{
  setMapContent: (content: React.ReactNode) => void;
}> = ({ setMapContent }) => {
  const [char1, setChar1] = useState("");
  const [char2, setChar2] = useState("");
  const [char3, setChar3] = useState("");
  const [char4, setChar4] = useState("");

  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    nextInput?: React.RefObject<HTMLInputElement>
  ) => {
    if (e.target.value.match(/[a-zA-Z0-9]/)) {
      setInput(e.target.value.toUpperCase());
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    prevInput?: React.RefObject<HTMLInputElement>,
    setPrevInput?: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setInput("");
      if (input == "" && prevInput && prevInput.current) {
        prevInput.current.focus();
        if (setPrevInput) {
          setPrevInput("");
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const code = `${char1}${char2}${char3}${char4}`;
    validateCode(code);
  };

  const validateCode = (code: string) => {
    const loc = data.find((location) => location.id === code);
    if (loc) {
      setMapContent(<Map loc={loc} />);
    } else {
      alert("Sbagliato, riprova!");
      input4.current && input4.current.focus();
    }
  };

  useEffect(() => {
    input1.current && input1.current.focus();
  }, []);
  return (
    <form onSubmit={handleSubmit} className="otp-form">
      <h1 className="otp-title">codice</h1>
      <div className="otp-inputs">
        <input
          className="otp-input"
          ref={input1}
          type="text"
          value={char1}
          onChange={(e) => handleChange(e, setChar1, input2)}
          onKeyDown={(e) => handleKeyDown(e, char1, setChar1)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input2}
          type="text"
          value={char2}
          onChange={(e) => handleChange(e, setChar2, input3)}
          onKeyDown={(e) => handleKeyDown(e, char2, setChar2, input1, setChar1)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input3}
          type="text"
          value={char3}
          onChange={(e) => handleChange(e, setChar3, input4)}
          onKeyDown={(e) => handleKeyDown(e, char3, setChar3, input2, setChar2)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input4}
          type="text"
          value={char4}
          onChange={(e) => handleChange(e, setChar4)}
          onKeyDown={(e) => handleKeyDown(e, char4, setChar4, input3, setChar3)}
          required
          maxLength={1}
        />
      </div>
      <button type="submit" className="submit-button">
        check
      </button>
    </form>
  );
};

export default CodeForm;
