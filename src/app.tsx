import { useCalculatorContext } from "./lib/calculator-context";
import { calculatorButtons } from "./consts";
import { CalcButton } from "./buttons";

export default function App() {
  const { state } = useCalculatorContext();

  return (
    <>
      <div className="p-8 shadow-black/50 shadow-xl">
        <div id="display" className="p-2 text-end bg-foreground text-background">
          <div id="previous-operations" className="mb-4">
            {state.previousOperation + state.operation}
          </div>

          <div id="result" className="text-4xl">
            {state.currentOperation || 0}
          </div>
        </div>
        <section className="grid grid-cols-[1fr,1fr,1fr,1fr] py-2">
          {
            calculatorButtons.map(button => (
              <CalcButton
                key={button.id}
                value={button.name}
                id={button.id}
                datatype={button.type}
              />
            ))
          }
        </section>
      </div>
    </>
  );
}