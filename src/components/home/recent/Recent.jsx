import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = ({ list = [] }) => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Imóveis em leilão recentemente listados' subtitle='Encontre a melhor oportunidade de investimento e entre em contato com nossos especialistas.' />

          <div className="imoveis-list">
            <RecentCard list={list} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Recent
