import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";


const element = document.getElementById("root");
const root = createRoot(element);
root.render(<App />);