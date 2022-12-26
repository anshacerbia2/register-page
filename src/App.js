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
    ceoName: '',
    phoneNumber: ''
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "phoneNumber") {
      value = value
        .replace("+62", "")
        .replace(/[^0-9,.]+/gi, "");
    }
    setInputVal({ ...inputVal, [name]: value });
  }
  const [companyNameValidation, setCompanyNameValidation] = useState('');
  const [ceoNameValidation, setCeoNameValidation] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.companyName.length < 3) setCompanyNameValidation('Minimun 3 characters.');
    if (inputVal.ceoName.length < 3) setCeoNameValidation('Minimun 3 characters.');
  }
  const clearValidation = () => {
    setCompanyNameValidation('');
    setCeoNameValidation('');
  }
  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit} style={{ maxWidth: 768, margin: '0 auto', textAlign: 'left', marginTop: 100 }}>
          <h1>Register</h1>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input name="companyName" value={companyNameFormater(inputVal.companyName)} type="email" className="form-control" id="companyName" onChange={handleChange} />
          </div>
          {
            companyNameValidation ? <div>{companyNameValidation}</div> : <></>
          }
          <label>CEO Name</label>
          <div className="d-flex">
            <div className="form-group">
              <input name="ceoName" value={inputVal.ceoName} type="text" className="form-control" id="ceoName" onChange={handleChange} />
            </div>
            <div className="form-group">
              <input name="ceoName" value={inputVal.ceoName} type="text" className="form-control" id="ceoName" onChange={handleChange} />
            </div>
          </div>
          {
            ceoNameValidation ? <div>{ceoNameValidation}</div> : <></>
          }
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input name="phoneNumber" value={phoneNumberFormater(inputVal.phoneNumber)} type="text" className="form-control" id="phoneNumber" placeholder="+62 xxx-xxxx-xxxx" onChange={handleChange} />
          </div>
          <div className="form-group" >
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input type={loginPwType} className="form-control" id="password" />
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
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="tac" />
            <label className="form-check-label" htmlFor="tac">Terms and Conditions</label>
          </div>
          <button type="submit" onClick={clearValidation} className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
