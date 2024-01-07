import React, { useState } from "react";
import "./styles/App.css";
import DigitForm from "./components/DigitForm";
import { Router, Route } from "wouter";
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";

function App() {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  return (
    <div className="background-wrapper">
      <div className="App">
        <Navigation setModalContent={setModalContent} />
        <main>
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="/digit" component={DigitForm} />
          </Router>
          <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
            {modalContent}
          </Modal>
        </main>
      </div>
    </div>
  );
}

export default App;
