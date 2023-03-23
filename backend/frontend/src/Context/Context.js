import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('userdata')) || null,
    loading: false,
    error: null,
}

export const Context = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: false
            }
        case "LOGIN_FAIL":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: false,
            }

        default:
            return { state }
    }
}





export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    useEffect(() => {
        localStorage.setItem('userdata', JSON.stringify(state.user))
    }, [state.user])
    return (
        <Context.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error, dispatch
            }}
        >
            {children}
        </Context.Provider>
    );
}