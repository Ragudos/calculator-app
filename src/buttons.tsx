
import * as React from "react";
import { cn } from "./lib/utils";
import { useCalculatorContext } from "./lib/calculator-context";

interface CalcButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function CalcButton({
    value,
    id,
    datatype
}: CalcButtonProps) {
    const { dispatch } = useCalculatorContext();

    function handleClick() {
        switch (datatype) {
            case "append":
                dispatch({
                    type: "currentOperation",
                    payload: value as string
                });
            break;
            case "operation": 
                dispatch({
                    type: "operation",
                    payload: value as string
                });
            break;
            case "answer":
                dispatch({
                    type: "answer",
                    payload: ""
                });
            break;
            case "clear":
                dispatch({
                    type: "clear",
                    payload: ""
                });
            break;
        }
    }


    return (
        <button
            type="button"
            id={id}
            value={value}
            className={cn("text-xl p-6 bg-primary w-full border-[1px] hover:bg-primary/60 active:bg-primary/80")}
            onClick={handleClick}
            data-type={datatype}
        >
            {value}
        </button>
    )
}