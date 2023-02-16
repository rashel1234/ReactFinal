import { useState , useRef } from 'react';
import { useHistory  } from 'react-router-dom';

import classes from './AuthForm.module.css';

const ProfileForm = () => {
  let navigate = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef(); 
  const fullNameInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("");

  const handleUserType = (event) => {
    setUserType(event.target.value)
  };

const submitHandler = (event) =>{
  event.preventDefault();

  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;
  const enteredFullName = fullNameInputRef.current.value;

  setIsLoading(true);

  let url =  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGevo_cp7rWRF1Xwig_8YrcyLFbGkz17s' ; 
  
  fetch (url ,
    {
      method: 'POST',
      body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then ( res => {
      setIsLoading(false);
      if(res.ok) {
      return res.json();
      }else{
        return res.json ().then((data) => {
        let errorMessage = 'Auth failed';
      
        throw new Error( errorMessage);
        });
      }
    }).then( (data) => {
      console.log(data);
      navigate.push("/profile");
    }).catch (err => {
      alert (err.message);
    });

    fetch("http://localhost:9000/users", {
      method: 'POST',
      body: JSON.stringify({
          email: enteredEmail,
          fullName: enteredFullName,
          type: userType
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      return res.text();
    })
    .then(data => {
      localStorage.setItem("user", enteredEmail);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}

  return (
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref = {emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref = {passwordInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='fullName'>Full Name</label>
          <input type='text' id='fullName' required ref = {fullNameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='userType'>User Type</label>
            <label className={classes.radioLabel}>Owner</label>
          <input className={classes.radio} type="radio" name="userType" value="Owner" checked={userType === "Owner"} onChange={handleUserType}/>
            <label className={classes.radioLabel}>Customer</label>
          <input className={classes.radio} type="radio" name="userType" value="Customer" checked={userType === "Customer"} onChange={handleUserType}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Create Account</button>}
          {
            isLoading && <p> Loading ... </p>
          }
        </div>
      </form>
  );
};

export default ProfileForm;
