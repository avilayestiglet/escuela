import React from "react";
import Header from "../../components/header/header";

const Contact = () => (
  <>
  <Header colorTitle="text-dark"/>
    <section className="contact_section layout_padding">
    <div className="container">

      <h2 className="main-heading">
     Contáctanos ahora

      </h2>
      <p className="text-center">
        ¿Tienes algun incomeniente o difilculta no dudes en contáctanos?
      </p>
      <div className="">
        <div className="contact_section-container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="contact-form">
                <form action="">
                  <div>
                    <input type="text" placeholder="Nombre"/>
                  </div>
                  <div>
                    <input type="text" placeholder="Número de teléfono (000) 000-0000"/>
                  </div>
                  <div>
                    <input type="email" placeholder="Correo electrónico"/>
                  </div>
                  <div>
                    <input type="text" placeholder="Mensaje" className="input_message"/>
                  </div>
                  <div className="d-flex justify-content-center ">
                    <button type="submit" className="btn_on-hover btn theme-bg-secondary">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
  
  </>
);

export default Contact;