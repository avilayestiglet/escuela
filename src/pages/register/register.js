import React, { useState } from "react";
import apiServices from "../../services/apiServices";
import ModalError from '../../components/modal/modal';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const registerService = (e) => {
    e.preventDefault();
    
    if(!email && !password) {
      setError({error: 'Usuario o contraseña incorrecta'});
      setIsOpen(true);
      return;
    }
    
    

    apiServices.register({email, password}).
    then((res) => res.json())
    .then((result) => {
      if(result.status === 200){
        const message = result.message;
        if(message!=null){
          window.location.href = "/login";
        }
      }else{
        setError(result);
        setIsOpen(true);
      }
    })
    .catch((err) => {
      setIsOpen(true)
        console.log(err);
    });
    
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
                              <form id="registerForm" name="registerForm" onSubmit={registerService}>
                                {/* <div className="form-group">
                                  <label >Matricula</label>
                                  <input className="form-control" id="matricula" name="matricula"  type="text" placeholder="Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)}/>
                                </div> */}
                                {/* <div className="form-group">
                                  <label>Nombre completo</label>
                                  <input className="form-control" id="full_name" name="full_name"  type="text" placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                                </div> */}
                                <div className="form-group">
                                  <label >Ingrese correo electronico</label>
                                  <input className="form-control" id="email" name="email"  type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                
                                <div className="form-group">
                                  <label >Ingrese su clave</label>
                                  <input className="form-control" id="password" name="password" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <button id="buttonLogin" type="submit" className="btn_on-hover btn theme-bg-secondary">
                                    Registrar
                                  </button>
                                </div>
                                
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