import { useState } from "react";
import axios from "axios";

export default function Test() {

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const [errorMsg, setErrorMsg] = useState();

  const [passwordType, setPasswordType ] = useState("password");

  const {email, password} = data;

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const togglePassword = () => {
    if(passwordType === "password") {
      setPasswordType("text");
    } else if(passwordType === "text") {
      setPasswordType("password")
    }
  }

  const signIn = (e) => {
    e.preventDefault();
    console.log(data);

    axios.post('https://recruitment-portal-backend-production.up.railway.app/admin/postLogin ', data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setErrorMsg( error.response.data.error );
        setError(true);
      });
  }

  return (
    <div className='signup'>
      <div className="signup-box">
        <form className="signup-box__form" onSubmit={signIn}>

          <label className="signup-box_form_label"> email:
            <input type="email" name="email" className="signup-box_form_input" value={email} onChange={handleChange} required />
          </label>

          <label className="signup-box_form_label"> password:
            <span className="signup-box_form_input-box-password">
                    <input type={passwordType} name="password" className="signup-box_form_input-password" value={password} onChange={handleChange} required />
                    <div onClick={togglePassword} className='eye-box'></div>
                  </span>
          </label>

          <input type="submit" value="Log in" className="signup-box_form_button" />
        </form>
      </div>
    </div>
  )
}
