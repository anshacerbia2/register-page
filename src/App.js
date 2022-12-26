import './App.css';
import { useState } from 'react';
import { companyNameFormater, phoneNumberFormater } from './helpers';

function App() {
  const [loginPwType, setLoginPwType] = useState('password');
  const pwVisibilitty = () => {
    if (loginPwType === 'password') {
      setLoginPwType('text');
    } else {
      setLoginPwType('password');
    }
  }
  const [inputVal, setInputVal] = useState({
    companyName: '',
    fName: '',
    lName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    tac: false
  });
  const handleChange = (e) => {
    let name = e.target.name;
    console.log(name);
    let value = e.target.value;
    if (name === "tac") {
      value = !inputVal.tac
      console.log(value);
    }
    if (name === "phoneNumber") {
      value = value
        .replace("+62", "")
        .replace(/[^0-9,.]+/gi, "");
    }
    setInputVal({ ...inputVal, [name]: value });
  }
  const [companyNameValidation, setCompanyNameValidation] = useState('');
  const [fNameValidation, setFNameValidation] = useState('');
  const [lNameValidation, setLNameValidation] = useState('');
  const [phoneValidation, setPhoneValidation] = useState('');
  const [tacValidation, setTacValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (inputVal.companyName.length < 3) {
      setCompanyNameValidation('Minimun 3 characters.');
      isValid = false;
    }
    if (inputVal.fName.length < 3) {
      setFNameValidation('Minimun 3 characters.');
      isValid = false;
    }
    if (inputVal.lName.length < 3) {
      setLNameValidation('Minimun 3 characters.');
      isValid = false;
    }
    if (inputVal.phoneNumber.length < 9) {
      setPhoneValidation('Minimun 9 digits.');
      isValid = false;
    }
    if (!inputVal.password.trim().length) {
      setPasswordValidation('Required.');
      isValid = false;
    }
    if (!inputVal.confirmPassword.trim()) {
      setConfirmPasswordValidation('Required.');
      isValid = false;
    }
    if (inputVal.password.trim().length &&
      inputVal.confirmPassword.trim().length &&
      (inputVal.password !== inputVal.confirmPassword)
    ) {
      setPasswordValidation('Password doesn\'t match.');
      setConfirmPasswordValidation('Password doesn\'t match.');
      isValid = false;
    }
    if (!inputVal.tac) {
      setTacValidation('Required.');
      isValid = false;
    }
    if (isValid) {
      console.log(inputVal);
      setInputVal({
        companyName: '',
        fName: '',
        lName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        tac: false
      })
    }
  }
  const clearValidation = () => {
    setCompanyNameValidation('');
    setFNameValidation('');
    setLNameValidation('');
    setPhoneValidation('');
    setTacValidation('');
    setPasswordValidation('');
    setConfirmPasswordValidation('');
  }
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit} style={{ maxWidth: 768, margin: '0 auto', textAlign: 'left', marginTop: 100 }}>
          <h1>Register</h1>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input name="companyName" value={companyNameFormater(inputVal.companyName)} type="text" className="form-control" id="companyName" onChange={handleChange} />
          </div>
          {
            companyNameValidation ? <small style={{ display: 'block', marginTop: -16 }}>{companyNameValidation}</small> : <></>
          }
          <label>CEO Name</label>
          <div className="d-flex">
            <div style={{ width: 'calc(50% - 10px)' }}>
              <div className="form-group">
                <input name="fName" value={inputVal.fName} type="text" className="form-control" id="fName" placeholder="First Name" onChange={handleChange} />
              </div>
              {
                fNameValidation ? <small style={{ display: 'block', marginTop: -16 }}>{fNameValidation}</small> : <></>
              }
            </div>
            <div style={{ width: 'calc(50% - 10px)', marginLeft: 20 }}>
              <div className="form-group">
                <input name="lName" value={inputVal.lName} type="text" className="form-control" id="lName" placeholder="Last Name" onChange={handleChange} />
              </div>
              {
                lNameValidation ? <small style={{ display: 'block', marginTop: -16 }}>{lNameValidation}</small> : <></>
              }
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input name="phoneNumber" value={phoneNumberFormater(inputVal.phoneNumber)} type="text" className="form-control" id="phoneNumber" placeholder="+62 xxx-xxxx-xxxx" onChange={handleChange} />
          </div>
          {
            phoneValidation ? <small style={{ display: 'block', marginTop: -16 }}>{phoneValidation}</small> : <></>
          }
          <div className="form-group" >
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input type={loginPwType} name="password" value={inputVal.password} className="form-control" id="password" onChange={handleChange} />
              <div className="password-visibility" onClick={(() => pwVisibilitty())} style={{ position: 'absolute', right: 20, top: 'calc(50% - 12px)', color: '#b3b7bb' }}>
                {
                  loginPwType === 'password' ?
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>visibility</span>
                    :
                    <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>visibility_off</span>
                }
              </div>
            </div>
          </div>
          {
            passwordValidation ? <small style={{ display: 'block', marginTop: -16 }}>{passwordValidation}</small> : <></>
          }
          <div className="form-group" >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input type={loginPwType} className="form-control" id="confirmPassword" name="confirmPassword" value={inputVal.confirmPassword} onChange={handleChange} />
            </div>
          </div>
          {
            confirmPasswordValidation ? <small style={{ display: 'block', marginTop: -16 }}>{confirmPasswordValidation}</small> : <></>
          }
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="tac" name="tac" value="tac" checked={inputVal.tac} onChange={handleChange} />
            <label className="form-check-label" htmlFor="tac">Terms and Conditions</label>
          </div>
          {
            tacValidation ? <small style={{ display: 'block', marginTop: -16 }}>{tacValidation}</small> : <></>
          }
          <button type="submit" onClick={clearValidation} className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
