import React from "react"
import Heading from "../../common/Heading"
import { team } from "../../data/Data"
import "./team.css"

const Team = () => {
  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='Nossa Equipe' subtitle='Conheça os profissionais que estão à sua disposição para ajudar no seu investimento imobiliário.' />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
              <div className='box' key={index}>
                {/* <button className='btn3'>{val.list}</button> */}
                <div className='details'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <i className='fa fa-location-dot'></i>
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <div className='button flex'>
                    <button formAction={`mailto:${val.email}`} className='btn3'>
                      <i className='fa fa-envelope'></i>
                      Entrar em Contato
                    </button>
                    <button className='btn4' formAction={`tel:${val.phone}`}>
                      <i className='fa fa-phone-alt'></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
