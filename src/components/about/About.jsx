import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"
import { Link } from "react-router-dom"
// import { Link } from "react-router-dom/cjs/react-router-dom.min"

const About = () => {
  return (
    <>
     <section className='about'>
  <Back 
    name='Sobre Nós' 
    title='Benchmark Imobiliária – Especialistas em Imóveis de Leilão' 
    cover={img} 
  />

  <div className='container flex mtop'>
    <div className='left row'>
      <Heading 
        title='Quem Somos' 
        subtitle='Conectamos investidores às melhores oportunidades em imóveis de leilão' 
      />

      <p>
        A Benchmark Imobiliária é focada na compra e venda de imóveis provenientes de leilão. 
        Nosso trabalho é identificar boas oportunidades, analisar cada imóvel e ajudar nossos clientes 
        a investir com mais segurança e clareza.
      </p>

      <p>
        Atuamos desde a escolha do imóvel até as etapas que seguem a arrematação, oferecendo suporte para que o 
        investidor consiga transformar oportunidades de leilão em patrimônio real.
      </p>

      <p>
        Trabalhamos com imóveis residenciais, comerciais e terrenos, sempre buscando o melhor custo-benefício 
        para quem quer investir, revender ou gerar renda com imóveis.
      </p>

      <Link to="/imoveis">
      <button className='btn2' >Ver Imóveis Disponíveis</button>
      </Link>
    </div>

    <div className='right row'>
      <img src={`${process.env.PUBLIC_URL}/immio.jpg`} alt='Benchmark Imobiliária - Imóveis de Leilão' />
    </div>
  </div>
</section>
    </>
  )
}

export default About
