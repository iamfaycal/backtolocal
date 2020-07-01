import React, { useReducer } from "react";
import { LIST, MAP } from "./types";

const initialState = {
    mapCenterCoordinates: [7.33705, 47.747446],
    vue: LIST,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "editCoordinates":
            return {
                ...state,
                mapCenterCoordinates: action.payload,
            };
        case "toggleVue":
            return {
                ...state,
                vue: state.vue == LIST ? MAP : LIST,
            };
        default:
            return;
    }
};

export const Context = React.createContext(initialState);

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};
