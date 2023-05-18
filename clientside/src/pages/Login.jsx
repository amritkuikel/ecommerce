import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    axios.post('/auth/login',userData).then(
        (log)=>{
            if(log.data.success===true){
                localStorage.setItem("data",log.data.token)
                alert(log.data.msg)
                navigate('/dashboard')
            }
            else{
                alert(log.data.msg)
            }
        }
    );
  };
  return (
    <div>
      <div>Login</div>
      <form onSubmit={submitHandler}>
        <label>email</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label>password</label>
        <br />
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button>submit</button>
        <br />
        <Link to={"/register"}>not registered?click here to register</Link>
      </form>
    </div>
  );
};
export default Login;
