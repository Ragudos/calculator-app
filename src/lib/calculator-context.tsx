import * as React from "react";

type Operations = "" | "+" | "-" | "/" | "x" | "=";

interface CalculatorState {
    currentOperation: string;
    previousOperation: string;
    operation: Operations;
}

interface Action {
    type: "currentOperation" | "operation" | "answer" | "clear";
    payload: string;
}

const initialState: CalculatorState = {
    currentOperation: "",
    previousOperation: "",
    operation: "",
}

const CalculatorContext = React.createContext<{
    state: CalculatorState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => { }
});

const handleInput = (valueToChange: string, valueToAdd: string) => {
    if (valueToChange.includes(".") && valueToAdd === ".") {
        return valueToChange;
    }

    if (valueToChange === "0" && valueToAdd === "0") {
        return valueToChange;
    }

    if (valueToChange === "0") {
        return valueToAdd;
    }

    return valueToChange += valueToAdd;
};

const handleCompute = (state: CalculatorState) => {
    const left = parseFloat(state.previousOperation);
    const right = parseFloat(state.currentOperation);

    if (isNaN(left) || isNaN(right)) {
        return;
    }

    switch (state.operation) {
        case "+":
            state.currentOperation = (left + right).toString();
            break;
        case "-":
            state.currentOperation = (left - right).toString();
            break;
        case "/":
            state.currentOperation = (left / right).toString();
            break;
        case "x":
            state.currentOperation = (left * right).toString();
            break;
        default:
            return;
    }
    state.operation = "";
    state.previousOperation = "";
};

const checkIfPayloadIsAnOperation = (payload: string) => {
    const operations: Operations[] = ["+", "-", "/", "x"];
    for (const operation of operations) {
        if (operation === payload) {
            return true;
        }
    }

    return false;
};

const CalculatorReducer = (state: CalculatorState, action: Action) => {
    switch (action.type) {
        case "currentOperation":
            state.currentOperation = handleInput(state.currentOperation, action.payload);
            break;
        case "operation":
            if (!state.currentOperation || state.currentOperation === "-") {
                if (state.operation && checkIfPayloadIsAnOperation(action.payload)) {
                    if (action.payload === "-") {
                        state.currentOperation = "-";
                    } else {
                        if (state.currentOperation === "-") {
                            state.currentOperation = "";
                        }
                        state.operation = action.payload as Operations;
                    }
                }
                break;
            }
            if (state.previousOperation) {
                handleCompute(state);
            }
            state.operation = action.payload as Operations;
            state.previousOperation = state.currentOperation;
            state.currentOperation = "";
            break;
        case "answer":
            handleCompute(state);
            break;
        case "clear":
            state.operation = "";
            state.previousOperation = "";
            state.currentOperation = "";
            break;
    }
    console.log(state)
    return {
        currentOperation: state.currentOperation,
        previousOperation: state.previousOperation,
        operation: state.operation
    } as CalculatorState;
};

export function CalculatorContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [state, dispatch] = React.useReducer(CalculatorReducer, initialState);
    return (
        <CalculatorContext.Provider value={{ state, dispatch }}>
            {children}
        </CalculatorContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCalculatorContext() {
    return React.useContext(CalculatorContext);
}