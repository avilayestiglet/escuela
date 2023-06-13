import React, { useState, useEffect } from "react";
import apiServices from "../../services/apiServices";
import translate from "../../utils/translate";
import storage from "../../services/storage";
import { Col, Nav, Tab } from 'react-bootstrap';
import './dashboard.css';
import Init from "./components/init/init";
import Teacher from "./components/teacher/teacher";
import Students from "./components/students/students";
import Matriculas from "./components/matriculas/matriculas";
import Eventos from "./components/eventos/eventos";

const Dashboard = () => {
  

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const closeSessionAndClearStorage = () => {
    console.log('closed')
    storage.empty();
    window.location.href = '/login';
  }
  
  useEffect(() => {
    const token = storage.isToken();
    if(!token){
      window.location.href = '/login';
      return;
    }
    apiServices.getUser()
    .then((result) => result.json())
    .then((x) => {
      setUser(x?.data);
    })
    .catch((error) => {
      const err = translate(error.message);
      setError({error: err ?? 'Error al obtener el usuario'});
      setIsOpen(true);
    });
  }, [])

  const HeaderNav = ({ user }) => <div className="d-flex flex-column mb-4">
    <p className="my-name m-0 text-white">{user?.full_name}</p>
    <label className="my-label m-0 text-white">{user?.email}</label>
    <label className="my-label m-0 text-white">{user?.tipo && `(${user?.tipo})`}</label>
  </div> 
  
  return <>
      <div className="tabbar-sidebar vh-100" style={{overflow: 'hidden'}}>
      <Tab.Container defaultActiveKey="first">
        <Col sm={3} className="sidebar">
          <Nav variant="pills" className="d-flex flex-column justify-content-between h-100">
            <div className="row">
              <HeaderNav user={user}/>      
              <hr className="hr-tab"/>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="first">Inicio</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="second">Profesores</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="third">Alumnos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="four">Matriculas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-white" eventKey="five">Eventos</Nav.Link>
              </Nav.Item>
            </div>
            <div className="row">
                <hr className="hr-tab"/>
                <Nav.Link className="theme-color-secondary" onClick={closeSessionAndClearStorage}>Cerrar sesión</Nav.Link>
            </div>
          </Nav>
        </Col>
        <Col sm={9} className="tab-content" style={{overflowY: 'scroll'}}>
        
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Init/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Teacher/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <Students/>
            </Tab.Pane>
            <Tab.Pane eventKey="four">
              <Matriculas/>
            </Tab.Pane>
            <Tab.Pane eventKey="five">
              <Eventos/>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Tab.Container>
    </div>
  </>
  
}

export default Dashboard;