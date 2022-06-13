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

const SingUpForm = ({ handleSingUp, navigate, errorMessages, setErrorMessages }) => {
  const [passwordVisibility, SetPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, SetConfirmPasswordVisibility] =
    useState(false);

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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Електронна пошта являється обов`язковим полем*")
        .email("Електронна пошта повинна мати коректний формат*"),
      phone: yup
        .string()
        .required("Номер телефону являється обов'язковим полем")
        .matches(
          /^(\s*)(\+)([- _():=+]?\d[- _():=+]?){12}(\s*)?$/,
          `Номер повинен мати коректний формат Наприклад(+380 63 877 6241)`
        ),
      password: yup
        .string()
        .required("Пароль является обязательным полем")
        .min(
          8,
          "Пароль не може бути коротшим за 8 символів і не може бути довшим за 25 символів"
        )
        .max(
          25,
          "Пароль не може бути коротшим за 8 символів і не може бути довшим за 25 символів"
        ),
      confirmPassword: yup
        .string()
        .required("Поле Повторіть пароль є обов'язковим полем")
        .oneOf([yup.ref("password"), null], "Паролі не співпадають"),
    }),
    onSubmit: (values) => {
      handleSingUp(values.email, values.password);
      if (!errorMessages.singup) {
        navigate("/auth/login ", { replace: true });
        setErrorMessages({ ...errorMessages, login: "" });
      }
    },
  });

  let passwordVis = "",
    confirmPasswordVis = "";
  if (passwordVisibility) {
    passwordVis = "text";
  } else passwordVis = "password";
  if (confirmPasswordVisibility) {
    confirmPasswordVis = "text";
  } else confirmPasswordVis = "password";
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
        Sing Up
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
          label="Phone"
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
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p
            style={{
              marginTop: "-2px",
              color: "#fff",
              fontSize: "13px",
              textAlign: "left",
              letterSpacing: "1px",
            }}
          >
            {formik.errors.phone}
          </p>
        )}

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
            mt: "50px",

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
        <TextField
          id="filled-required"
          label="Confirm Password"
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
          type={confirmPasswordVis}
          name="confirmPassword"
          InputProps={{
            startAdornment: (
              <IconButton
                style={{ position: "absolute", left: "88%", color: "#fff" }}
                onClick={() => {
                  SetConfirmPasswordVisibility(!confirmPasswordVisibility);
                }}
              >
                {confirmPasswordVisibility ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            ),
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confrimPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p
            style={{
              marginTop: "-2px",
              color: "#fff",
              fontSize: "13px",
              textAlign: "left",
              letterSpacing: "1px",
            }}
          >
            {formik.errors.confirmPassword}
          </p>
        )}

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            mt: "50px",
            width: "375px",
            height: "45px",
          }}
        >
          Sign up
        </Button>

        {errorMessages.singup ? (
          <p
            style={{
              color: "red",
              fontSize: "22px",
              textAlign: "left",
            }}
          >
            {errorMessages.singup}
          </p>
        ) : (
          ""
        )}
      </form>
    </ThemeProvider>
  );
};

export default SingUpForm;
