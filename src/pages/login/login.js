import React, { useEffect, useState } from "react";
import apiServices from "../../services/apiServices";
import ModalError from '../../components/modal/modal';
import storage from "../../services/storage";
import utils from "../../utils/utils";

const Loading = ({ isLoading }) => !isLoading ? "Ingresar" : <div className="spinner-border" role="status"></div>

const keypress = (e) => console.log(e);

const Email = ({ email, setEmail, isLoading, errorMessage}) => <div className="form-group">
    <div className="form-group">
      <label >Ingrese correo electronico</label>
      <input 
        onKeyUp={keypress}
        className={`form-control ${errorMessage!=null ? 'is-invalid' : ''}`} 
        disabled={isLoading} 
        id="email" 
        name="email"  
        type="email" 
        placeholder="Correo electrónico" 
        value={email} onChange={(e) => setEmail(e.target.value)}/>
      <div className="invalid-feedback">{errorMessage!=null ? errorMessage : ''}</div>
    </div>
  </div>

const Password = ({ password, setPassword, isLoading, errorMessage }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open);

  return (<div className="form-group">
  <label>Ingrese su clave</label>
  <div className="input-with-icon">
    <input 
      className={`form-control ${errorMessage!=null ? 'is-invalid' : ''}`} 
      disabled={isLoading} 
      id="password" 
      name="password" 
      type={open ? "text" : "password" }
      placeholder="Contraseña" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
    />
    <div className="invalid-feedback">{errorMessage!=null ? errorMessage : ''}</div>
    <span onClick={handleOpen} className={open ? "icon-open-lock" : "icon-lock"}></span>
  </div>
</div>);
}

const Buttons = ({ isLoading, go }) => <div className="row">
  <div className="col-6 d-flex">
    <button id="buttonLogin" type="submit" disabled={isLoading} className="btn_on-hover btn theme-bg-secondary w-100">
      <Loading isLoading={isLoading}/>
    </button>
  </div>
  <div className="col-6 d-flex">
    <button type="button" disabled={isLoading} className="btn_on-hover btn theme-bg-primary bg-dark text-white w-100" onClick={go}>
      Registrarse
    </button>
  </div>
</div>



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {setIsOpen(false)};
  
  const isTokenStorage = () => {
    setIsLoading(false);
    const token = storage.isToken();
    if(token){
      window.location.href = "/dashboard";
    }
  }

  useEffect(isTokenStorage);

  const validateErrors = () => {
    if(!email && !password){
      setError({
        email: 'El correo electrónico no puede estar vacio',
        password: 'La contraseña no puede estar vacia'
      });
      setIsLoading(false);
      return true;
    }
    if(!utils.validarEmail(email)){
      setError({email: 'Ingrese un correo electrónico válido'});
      setIsLoading(false);
      return true;
    }
    if(!password){
      setError({password: 'La contraseña no puede estar vacia'});
      setIsLoading(false);
      return true;
    }
    if(password.length < 4){
      setError({password: 'La contraseña no puede ser menor a 4 digitos'});
      setIsLoading(false);
      return true;
    }
    return false;
  } 


  const loginService = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isError = validateErrors();

    if(isError){
      console.log('hay errores');
      return;
    }
    
    setError(null);

    apiServices.login({email: email, password: password}).
    then((res) => res.json())
    .then((result) => {
      if(result.status === 200){
        const token = result.token;
        if(token!=null){
          setIsLoading(false);
          storage.saveToken(token);
          window.location.href = "/dashboard";
        }
      }else{
        setIsLoading(false);
        setError(result);
        setIsOpen(true);
      }
    })
    .catch((err) => {
        setError(err.message ?? "error al iniciar sesión");
        setIsLoading(false);
        setIsOpen(true)
        console.log(err);
    });
    
  };

  const goRegister = () => {
    window.location.href = "/register";
  };
  


    return (<section className="contact_section layout_padding-bottom d-flex flex-row justify-content-center">
    <ModalError isOpen={isOpen} title={"Error al iniciar sesión"} onClose={handleCloseModal}>
      {error && 
        <div>
          <p>{`${error.error ?? "error al realizar la consulta "} ${error.status ?? ""}`}</p>
        </div>}
    </ModalError>
    <div className="container mt-5 d-flex flex-column justify-content-center">
        <div className="row d-flex flex-row justify-content-center">
            <div className="col-lg-6">
                <div className="card p-4">
      
                    <h2 className="main-heading">
                      <br/>
                      U.E"Rafael Maria Baralt"
                    </h2>
                    <p className="text-center">
                    </p>
                    <div className="">
                      <div className="contact_section-container">
                        <div className="row">
                          <div className="col-md-12 mx-auto">
                            <div className="contact-form">
                              <form id="loginForm" name="loginForm" onSubmit={loginService}>
                                <Email email={email} setEmail={setEmail}  isLoading={isLoading} errorMessage={error?.email}/>
                                <Password password={password} setPassword={setPassword} isLoading={isLoading} errorMessage={error?.password}/>
                                <Buttons isLoading={isLoading}  go={goRegister}/>                   
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              
                  </div>
            </div>
        </div>
    </div>
  </section>);
};

export default Login;