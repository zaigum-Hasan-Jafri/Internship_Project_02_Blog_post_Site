export const LoginStart = (userCreds) => ({
    type: "LOGIN_START"
});
export const LoginSuccess = (user) => ({
    type: "LOGIN_START",
    payload:user, 
});
export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});