import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { TextField, Typography, Container, Button ,Link as Linkm } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    axios.post("/auth/login", userData).then((log) => {
      if (log.data.success === true) {
        localStorage.setItem("data", log.data.token);
        alert(log.data.msg);
        navigate("/dashboard");
      } else {
        alert(log.data.msg);
      }
    });
  };
  return (
    <div className="login-container">
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#E8AA42",
          padding: 5,
          borderRadius: 5,
          border: 5,
          borderColor: "#E8AA42",
        }}
      >
        <Typography align="center" variant="h3" marginBottom={3}>
          LOGIN
        </Typography>
        <form onSubmit={submitHandler}>
          <Typography variant="h6" >Enter Your Email Below:</Typography>
          <br />
          <TextField
            color="secondary"
            size="small"
            label="Input Email Here"
            placeholder="your_mail@example.com"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <Typography variant="h6" marginTop={3}>Enter Your Password:</Typography>
          <br />
          <TextField
            color="secondary"
            size="small"
            label="Input Password Here"
            placeholder="your_mail@example.com"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <Button variant="contained" color="secondary" sx={{ mt: 3 ,mb:3 }}>
            SUBMIT
          </Button>
          <br />
            
          <Link to={"/register"} ><Linkm  underline="none" color='primary'>not registered?click here to register</Linkm></Link>
        </form>
      </Container>
    </div>
  );
};
export default Login;
