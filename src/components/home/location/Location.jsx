import React from "react"
import Heading from "../../common/Heading"
import PropertiesMap from "./PropertiesMap"
import "./style.css"

const Location = ({ properties = [] }) => {
  return (
    <>
      <section className='location padding'>
        <div className='container'>
          <Heading title='Explore por Região' subtitle='Encontre as melhores oportunidades de investimento em diferentes regiões.' />

          {properties.length > 0 && (
            <div className='map-section mtop'>
              <h3>Mapa de Imóveis</h3>
              <PropertiesMap properties={properties} />
            </div>
          )}
        {properties.length === 0 && <p className='empty-message'>Nenhum imóvel encontrado para exibir no mapa.</p>}

        </div>
      </section>
    </>
  )
}

export default Location