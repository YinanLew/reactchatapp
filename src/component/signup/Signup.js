import React from 'react';
// import signup from "../signup/signup.png";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

function Signup() {

    const signup = () => {

    }

    return (
            <div className={"signup"}>
                <div className={"signup__container"}>
                    {/*<img src={signup} alt="signup"/>*/}
                    <div className="signup__text">
                        <h1>Sing up to Wassup</h1>
                    </div>

                    <form action="">
                        <TextField size={"small"} label={"Username"} placeholder={"Enter username"} fullWidth required/>
                        <br/>
                        <br/>
                        <TextField size={"small"} label={"Password"} placeholder={"Enter password"} type={"password"} fullWidth required/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked color={"secondary"}/>} label="Remember me" />
                        </FormGroup>
                        <br/>
                        <br/>
                        <Button size={"small"} variant={"contained"} type={"submit"} color={"secondary"} fullWidth>Log in</Button>
                        <br/>
                        <br/>
                        {/*<Typography >*/}
                        {/*    <NavLink style={{textDecoration: 'none', color: "#8e24aa"}} to={"/forgot"}>*/}
                        {/*        Forgot password*/}
                        {/*    </NavLink>*/}
                        {/*</Typography>*/}
                        <br/>
                        <Typography>
                            Do you have an account?&nbsp;
                            <NavLink style={{textDecoration: 'none', color: "#8e24aa"}} to={"/signup"}>
                                Sign up
                            </NavLink>
                        </Typography>
                        <Button size={"small"} variant={"contained"} type={"submit"} color={"secondary"} onClick={signup}>
                            Sing in with Google
                        </Button>
                    </form>
                </div>
            </div>
    );
}

export default Signup;