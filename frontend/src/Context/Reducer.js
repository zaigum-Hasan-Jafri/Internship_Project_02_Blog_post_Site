const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return (
                {
                    user: null,
                    loading: true,
                    error: false
                }

            );
        case "LOGIN_SUCCESS":
            return (
                {
                    user: action.payload,
                    loading: false,
                    error: false
                }

            );
        case "LOGIN_FAILURE":
            return (
                {
                    user: null,
                    loading: true,
                    error: true
                }

            );

        default:
            break;
    }
}

export default Reducer