import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./pages/Homepage";
const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <Homepage />
    </StrictMode>
);

