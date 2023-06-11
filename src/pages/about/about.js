import React from "react";
import kids from "../../assets/images/kids.jpg";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";

const AboutUs = () => (
      <>
    <Header colorTitle="text-dark"/>

<section className="about_section layout_padding">
    <div className="container">
      <h2 className="main-heading ">
        Acerca de la escuela
      </h2>
      <p className="text-center">
        Ofrecer un servicio educativo de calidad que promueva una educación activa,
         abierta e integral del niño/a, formándole en valores morales, éticos y 
         culturales que le ayuden a desarrollar todo su potencial personal y talento,
          involucrando y trabajando conjuntamente en este proceso con las familias,
           para conseguir una armonía en su formación como persona.
      </p>
      <div className="about_img-box ">
        <img src={kids} alt="" className="img-fluid w-100"/>
      </div>
      
    </div>
  
  </section>
    </>
);

export default AboutUs;