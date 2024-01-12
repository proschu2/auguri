import React, { useState } from "react";
import "./styles/App.css";

import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import Modal from "./components/Modal";

function App() {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [pageContent, setPageContent] = useState<React.ReactNode>(<HomePage />);
  return (
    <div className="background-wrapper">
      <div className="App">
        <Navigation
          setModalContent={setModalContent}
          setPageContent={setPageContent}
        />
        {pageContent}
        <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}

export default App;
