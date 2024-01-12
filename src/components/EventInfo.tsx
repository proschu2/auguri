import React from "react";
import ReactMarkdown from "react-markdown";

const markdown = `
# Event Information

This is some information about the event.

## Schedule

- 10:00 - Introduction
- 11:00 - Main Talk
- 12:00 - Lunch
- Blahaha

## HEHEHE

## Mearede

MefefefMfeededM
MEefefde

Mucusssss

MElodiesma

Merdloace mnbefje
MMEEMEE


Mancguguefne


Lelelelelmsmen

Loidekjbwkfjhbqd

`;

const EventInfo: React.FC = () => {
  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default EventInfo;
