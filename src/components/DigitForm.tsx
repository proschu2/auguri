import React, { useRef, useState } from "react";
import "../styles/DigitForm.css";
const DigitForm: React.FC = () => {
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");

  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    nextInput?: React.RefObject<HTMLInputElement>
  ) => {
    if (e.target.value.match(/\d/)) {
      setInput(e.target.value);
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    prevInput?: React.RefObject<HTMLInputElement>,
    setPrevInput?: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setInput("");
      if (prevInput && prevInput.current) {
        prevInput.current.focus();
        if (setPrevInput) {
          setPrevInput("");
        }
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const otp = `${digit1}${digit2}${digit3}${digit4}`;
    validateOTP(otp);
  };

  const validateOTP = (otp: string) => {
    const validOTPs = ["1234", "5678", "9012"]; // replace with your valid OTPs
    if (validOTPs.includes(otp)) {
      alert("OTP is valid");
    } else {
      alert("OTP is invalid");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="otp-form">
      <div className="otp-inputs">
        <input
          className="otp-input"
          ref={input1}
          type="text"
          value={digit1}
          onChange={(e) => handleChange(e, setDigit1, input2)}
          onKeyDown={(e) => handleKeyDown(e, setDigit1)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input2}
          type="text"
          value={digit2}
          onChange={(e) => handleChange(e, setDigit2, input3)}
          onKeyDown={(e) => handleKeyDown(e, setDigit2, input1, setDigit1)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input3}
          type="text"
          value={digit3}
          onChange={(e) => handleChange(e, setDigit3, input4)}
          onKeyDown={(e) => handleKeyDown(e, setDigit3, input2, setDigit2)}
          required
          maxLength={1}
        />
        <input
          className="otp-input"
          ref={input4}
          type="text"
          value={digit4}
          onChange={(e) => handleChange(e, setDigit4)}
          onKeyDown={(e) => handleKeyDown(e, setDigit4, input3, setDigit3)}
          required
          maxLength={1}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default DigitForm;
