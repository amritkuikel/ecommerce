import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    if (!(watch("pwd") === watch("cpwd"))) {
      alert("passwords not matching");
    } else {
      const userData = {
        "name":data.name,
        "email":data.email,
        "password":data.pwd,
      }
      axios.post("/auth/register",userData).then(
        (log)=>{
          if (log.data.success===true) {
            alert(log.data.msg)
            navigate('/')
          } else {
            alert(log.data.msg)
          }
        }
      );
    }
  };
  return (
    <div>
      <div>Register</div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label>name</label>
        <br />
        <input
          type="text"
          {...register("name", { required: true, minLength: 8 })}
        />
        {errors.name && <div>enter full name of minimum 8 letters</div>}
        <br />
        <label>email</label>
        <br />
        <input
          type="text"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && <div>enter valid email only</div>}
        <br />
        <label>password</label>
        <br />
        <input
          type="text"
          {...register("pwd", {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
        />
        {errors.pwd && (
          <div>
            Password must be at least 8 characters long and contain at least one
            letter and one number
          </div>
        )}
        <br />
        <label>confirm password</label>
        <br />
        <input
          type="text"
          {...register("cpwd", {
            required: true,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
        />
        {errors.cpwd && (
          <div>
            Password must be at least 8 characters long and contain at least one
            letter and one number
          </div>
        )}
        <br />
        <button>submit</button>
        <br />
        <Link to={"/"}>already registered?click here to login</Link>
      </form>
    </div>
  );
};
export default Register;
