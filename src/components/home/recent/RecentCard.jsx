import React from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../../../context/FavoritesContext"
import { sendWhatsAppMessage } from "../../../config/contact"

const RecentCard = ({ list = [] }) => {
  const { toggleFavorite, isFavorite } = useFavorites()

  const handleHeartClick = (item) => {
    toggleFavorite(item)
  }

  const handleWhatsAppClick = (item) => {
    const { id, name, location, price } = item
    const address = location || ""
    const auction = item.auction || item.leilao || "Desconhecido"
    const message = `Tenho interesse no imóvel: ${name} (ID: ${id}). Endereço: ${address}. Preço: ${price}. Leilão: ${auction}`
    sendWhatsAppMessage(message)
  }

  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { id, cover, category, location, name, price, type } = val
          const imageSrc = cover 
          const isFav = isFavorite(id)

          return (
            <div className='box shadow' key={index}>
              <Link to={`/property/${id}`}>
              <div className='img'>
                <img src={imageSrc} alt={name} />
              </div>
                </Link>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "Venda" ? "#25b5791a" : "#ff98001a", color: category === "Venda" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className={`fa fa-heart ${isFav ? 'liked' : ''}`} onClick={() => handleHeartClick(val)} style={{ cursor: 'pointer', color: isFav ? '#dc3848' : 'inherit' }}></i>
                </div>
              <Link to={`/property/${id}`}>

                <div className="price-item">
                <span>{price}</span>
                </div>

                <h4>{name}</h4>
                <span style={{ fontSize: "14px" }}>{type}</span>

                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
                                </Link>

              </div>

              <div className='button flex'>
                <div>
                  <Link to={`/property/${id}`} className='btn2'>Ver Imóvel</Link> <label htmlFor=''></label>
                  <div>
                    <button className="btn-primary" onClick={() => handleWhatsAppClick(val)}>
                      Tenho Interesse
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
