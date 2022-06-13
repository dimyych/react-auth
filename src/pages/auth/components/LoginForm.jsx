import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import * as yup from "yup";
import { IconButton, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = ({
  handleLogin,
  navigate,
  errorMessages,
}) => {
  const [passwordVisibility, SetPasswordVisibility] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: pink[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#F50057",
      },
    },
  });
  let error = 'f';
  if(errorMessages.login){
    error = errorMessages.login;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Електронна пошта являється обов`язковим полем*")
        .email("Електронна пошта повинна мати коректний формат*"),
      password: yup
        .string()
        .required("Пароль являється обов`язковим полем*")
        .max(25, ""),
    }),
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
      if (!error) {
        navigate("/", { replace: true });
      }
    },
  });
  let passwordVis = "";
  if (passwordVisibility) {
    passwordVis = "text";
  } else passwordVis = "password";
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          color: "#fff",
          fontWeight: "600",
          fontSize: "40px",
          lineHeight: "112px",
          letterSpacing: "-1.5px",
          mb: "30px",
        }}
      >
        Log In
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          id="filled-required"
          label="Email"
          variant="filled"
          color="primary"
          focused
          fullWidth
          sx={{
            display: "block",
            height: "55px",
            width: "375px",
            color: "primary",
            input: {
              color: "#fff",
            },
          }}
          type="text"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p
            style={{
              marginTop: "-2px",
              color: "#fff",
              fontSize: "13px",
              textAlign: "left",
              letterSpacing: "1px",
            }}
          >
            {formik.errors.email}
          </p>
        )}

        <TextField
          id="filled-required"
          label="Password"
          variant="filled"
          color="primary"
          focused
          fullWidth
          sx={{
            display: "block",
            mt: "50px",
            width: "375px",
            input: {
              paddingRight: "50px",
              color: "#fff",
            },
          }}
          type={passwordVis}
          name="password"
          InputProps={{
            startAdornment: (
              <IconButton
                style={{ position: "absolute", left: "88%", color: "#fff" }}
                onClick={() => {
                  SetPasswordVisibility(!passwordVisibility);
                }}
              >
                {passwordVisibility ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <>
          {formik.touched.password && formik.errors.password && (
            <p
              style={{
                marginTop: "-2px",
                color: "#fff",
                fontSize: "13px",
                textAlign: "left",
                letterSpacing: "1px",
              }}
            >
              {formik.errors.password}
            </p>
          )}
        </>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: "50px", width: "375px", height: "45px" }}
        >
          log in
        </Button>
        {errorMessages.login ? (
          <p
            style={{
              color: "red",
              fontSize: "22px",
              textAlign: "left",
            }}
          >
            {errorMessages.login}
          </p>
        ) : (
          ""
        )}

        <Button
          onClick={() => {
            navigate("/auth/singup", { replace: true });
          }}
          type="button"
          variant="contained"
          sx={{
            mt: "50px",
            width: "200px",
            height: "45px",
            bgcolor: "white",
            color: "#e91e63",
          }}
        >
          Sing Up
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default LoginForm;
