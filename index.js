import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { createUseStyles } from "react-jss";

const user_styles = createUseStyles({
    "@global": {
        "*": {
            boxSizing: "border-box"
        },
        html: {
            margin: 0,
            padding: 0,
            height: "100%"
        },
        body: {
            background: "lightblue",
            border: "5px solid green",
            margin: 0,
            padding: 0,
            height: "100%"
        }
    },
    app_label: {
        display: "block",
        composes: "form-label",
        marginBottom: ".5rem"
    },
    app_heading: {
        color: "red",
        fontFamily: "Ariel, Helvetica",
        composes: "$crazy_type"
    },
    crazy_type: {
        color: "green",
        textDecoration: "underline",
        fontStyle: "italic"
    }
});

function TextInput({
    id,
    label,
    placeholder,
    value,
    handleChange
}) {

    const styles = user_styles();

    return (
        <div className="form-group">
            <label htmlFor={id} className={styles.app_label}>{label}</label>
            <input
                id={id}
                onChange={(e) => handleChange(id, e)}
                placeholder={placeholder || ""}
                type="text"
                value={value}
            />
        </div>
    )
}

function App() {

    const styles = user_styles();

    const initial_state = {
        form_values: {
            "test-input": ""
        }
    }

    function reducer(state, action) {
        switch(action.type) {
            case "FORM_UPDATE": return {
                ...state,
                form_values: {
                    ...state.form_values,
                    [action.payload.id]: action.payload.value
                }
            }
            default: 
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initial_state);

    function handleChange(id, e) {
        dispatch({
            type: "FORM_UPDATE",
            payload: {
                id,
                value: e.target.value
            }
        });
    }

    return (
        <>
            <h1 className={styles.app_heading}>Hello from react!</h1>
            <TextInput
                label="Test Input"
                id="test-input"
                value={state.form_values["test-input"]}
                handleChange={handleChange}
            />
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);
