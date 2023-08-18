import ReactDOM from "react-dom/client"
import App from "./app"
import "./index.css"
import { CalculatorContextProvider } from "./lib/calculator-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CalculatorContextProvider>
    <App />
  </CalculatorContextProvider>
);