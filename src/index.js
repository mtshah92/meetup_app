import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MeetUpProvider } from "./context/meetupContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <MeetUpProvider>
        {" "}
        <App />
      </MeetUpProvider>
    </Router>
  </React.StrictMode>
);
