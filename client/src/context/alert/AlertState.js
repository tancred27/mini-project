import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
    const initialState = {
        alert: null
    };
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert:
    const setAlert = (msg, type, timeout) => {
        const id = uuid();
        dispatch({
            type: SET_ALERT,
            payload: { msg, type, id },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
    };

    return (
        <AlertContext.Provider
        value={{
            alert: state.alert,
            setAlert,
        }}>
        {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
