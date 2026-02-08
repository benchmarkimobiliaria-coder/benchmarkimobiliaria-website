import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Imóveis em leilão recentemente listados' subtitle='Encontre a melhor oportunidade de investimento e entre em contato com nossos especialistas.' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Recent
