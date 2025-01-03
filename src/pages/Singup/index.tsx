import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { SingnUpRequest } from "../../api/auth/authSingnUpRequest";
import axiosClient from "../../api/axiosClient";
import "../../assets/font/index.css";
import WithAuth from "../../hocs/WithAuth";
import Footer from "../../layout/Footer";
import HeaderLogin from "../Login/components/header";
import "./SingnUp.css";
import logotruong from "../../assets/svg/logotruong.jpg";

const SignUpForm = () => {
  const navigate = useNavigate();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      marketingConsent: false,
      profilingConsent: false,
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const result = await SingnUpRequest(values);
      if (!result) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Email or username already exists, please enter another email or username!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }
      try {
        await axiosClient.post("/users", values);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sign up successfully!",
        });
        navigate("/login");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again!",
        });
      }
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="container-fluid">
      <HeaderLogin />
      <Box className="singnUp-container">
        <Box className="singnUp-image"></Box>
        <Box className="login-form-container">
          <Box>
            <img
              src={logotruong}
              alt=""
              className="login-truong"
              style={{
                height: "80px",
                width: "80px",
                marginLeft: "30px",
                borderRadius: "50%",
              }}
            />
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: "500",
                fontSize: "2.3rem",
                fontFamily: "Giants",
              }}
              gutterBottom
            >
              CREATE ACCOUNT
            </Typography>
            <form className="singnUp-form" onSubmit={formik.handleSubmit}>
              {/* First Name */}
              <TextField
                fullWidth
                id="userName"
                name="userName"
                label="User Name "
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />

              {/* Last Name */}
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />

              {/* Email */}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="dense"
                sx={{ maxWidth: 556 }}
              />

              {/* Password */}
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="dense"
                sx={{ maxWidth: 556 }}
                InputProps={{
                  // Nút ẩn/hiện mật khẩu
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword} // Gọi hàm khi nhấn vào nút
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên trạng thái
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                margin="dense"
                sx={{ maxWidth: 556 }}
                InputProps={{
                  // Nút ẩn/hiện mật khẩu
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowPassword} // Gọi hàm khi nhấn vào nút
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 4,
                  maxWidth: 556,

                  bgcolor: "black",
                  color: "white",
                  borderColor: "black",
                  "&:hover": {
                    color: "black",
                    bgcolor: "white",
                    borderColor: "black",
                  },
                }}
              >
                AGREE AND CONTINUE
              </Button>
            </form>
            <div style={{ marginTop: "20px" }}>
              You already have an account? {""}
              <Link to="/login" style={{ color: "blue" }}>
                Login Account now
              </Link>
            </div>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default WithAuth(SignUpForm);
