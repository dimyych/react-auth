import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { setUser } from "store/slices/userSlice";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginImg from "img/login_img.jpg";
import { Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";
import SingUpForm from "./components/SingUpForm";

const AuthPage = ({ navigate, auth, setErrorMessages, errorMessages }) => {

  const dispatch = useDispatch();
  const handleSingUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.token,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessages({ ...errorMessages, singup: error.message});
      });
  };

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessages({ ...errorMessages, login: error.message});
      });
  };

  return (
    <div>
      <Box
        height="100vh"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container height="100%">
          <Grid
            item
            lg={6}
            sx={{
              backgroundImage: `url(${LoginImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <span> </span>
          </Grid>
          <Grid
            item
            lg={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            pt="100px"
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                color: "#e91e63",
                fontWeight: "700",
                fontSize: "45px",
                lineHeight: "112px",
                letterSpacing: "-1.5px",
                mb: "60px",
              }}
            >
              MOVIE APP
            </Typography>

            <Routes>
              <Route
                path="/login"
                element={
                  <LoginForm
                    handleLogin={handleLogin}
                    navigate={navigate}
                    errorMessages={errorMessages}
                  />
                }
              />
              <Route
                path="/singup"
                element={
                  <SingUpForm
                    handleSingUp={handleSingUp}
                    navigate={navigate}
                    errorMessages={errorMessages}
                    setErrorMessages={setErrorMessages}
                  />
                }
              />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AuthPage;
