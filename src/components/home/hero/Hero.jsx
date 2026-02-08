import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Encontre seu próximo investimento' subtitle='Descubra as melhores oportunidades de imóveis na sua cidade.' />

          <form className='flex'>
            <div className='box'>
              <span>Localização</span>
              <input type='text' placeholder='cidade, bairro ou rua' />
            </div>
            <div className='box'>
              <span>Tipo de imóvel</span>
              <input type='text' placeholder='Tipo de imóvel' />
            </div>
            <div className='box'>
              <span>Valor Máximo</span>
              <input type='text' placeholder='Escolha o valor' />
            </div>
            <div className='box'>
              <h4>Filtros Avançados</h4>
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
