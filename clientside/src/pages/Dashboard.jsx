import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [typedEmail, setTypedEmail] = useState('');
  const [typedPwd, setTypedPwd] = useState('');
  const [typedNewPwd, setTypedNewPwd] = useState('');

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("data");
    navigate("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("data");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios.get("/auth/getuserdata", { headers }).then((log) => {
      setUser(log.data.data.name);
      setEmail(log.data.data.email);
    });
  }, []);
  const pwdUpdateHandler=async(e)=>{
    e.preventDefault()
    const userData = {
      email:typedEmail,
      oldPassword:typedPwd,
      newPassword:typedNewPwd,
    } 
    axios.post('/auth/updateuserdata',userData).then((log)=>{if (log.data.success) {
      alert(log.data.msg)
      navigate('/')
      localStorage.removeItem("data");
    } else {
      alert(log.data.msg)
    }})
  }
  return (
    <div>
      <div>Dashboard</div>
      <div>name: {user}</div>
      <div>email: {email}</div>
      <button onClick={logoutHandler}>logout</button>
      <div>update password</div>
      <form onSubmit={pwdUpdateHandler}>
        <label>email</label>
        <br />
        <input type="text" onChange={(e)=>{setTypedEmail(e.target.value)}}/>
        <br />
        <label>old password</label>
        <br />
        <input type="text" onChange={(e)=>{setTypedPwd(e.target.value)}}/>
        <br />
        <label>new password</label>
        <br />
        <input type="text" onChange={(e)=>{setTypedNewPwd(e.target.value)}}/>
        <br />
        <label>confirm new password</label>
        <br />
        <input type="text" />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
};
export default Dashboard;
