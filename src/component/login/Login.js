import React from 'react';
import {Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography} from "@mui/material";
import login from "./login.png";
import {auth, provider} from "../../firebase";

import "./style.css";
import {useStateValue} from "../../StateProvider";
import {actionTypes} from "../../reducer";
import {NavLink} from "react-router-dom";


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            }))
            .catch(error => console.log(error.message));
    }

    return (
        <div className={"login"}>
            <div className={"login__container"}>
                <img src={login} alt="Login"/>
                <div className="login__text">
                    <h1>Sing in to Wassup</h1>
                </div>

                {/*<form action="">*/}
                {/*    <TextField size={"small"} label={"Username"} placeholder={"Enter username"} fullWidth required/>*/}
                {/*    <br/>*/}
                {/*    <br/>*/}
                {/*    <TextField size={"small"} label={"Password"} placeholder={"Enter password"} type={"password"} fullWidth required/>*/}
                {/*    <FormGroup>*/}
                {/*        <FormControlLabel control={<Checkbox defaultChecked color={"secondary"}/>} label="Remember me" />*/}
                {/*    </FormGroup>*/}
                {/*    <br/>*/}
                {/*    <br/>*/}
                {/*    <Button size={"small"} variant={"contained"} type={"submit"} color={"secondary"} fullWidth>Log in</Button>*/}
                {/*    <br/>*/}
                {/*    <br/>*/}
                {/*    /!*<Typography >*!/*/}
                {/*    /!*    <NavLink style={{textDecoration: 'none', color: "#8e24aa"}} to={"/forgot"}>*!/*/}
                {/*    /!*        Forgot password*!/*/}
                {/*    /!*    </NavLink>*!/*/}
                {/*    /!*</Typography>*!/*/}
                {/*    <br/>*/}
                {/*    <Typography>*/}
                {/*        Do you have an account?&nbsp;*/}
                {/*        <NavLink style={{textDecoration: 'none', color: "#8e24aa"}} to={"/signup"}>*/}
                {/*            Sign up*/}
                {/*        </NavLink>*/}
                {/*    </Typography>*/}
                    <Button size={"small"} variant={"contained"} type={"submit"} color={"primary"} onClick={signIn}>
                        Sing in with Google
                    </Button>
                {/*</form>*/}
            </div>
        </div>
    );
}

export default Login;