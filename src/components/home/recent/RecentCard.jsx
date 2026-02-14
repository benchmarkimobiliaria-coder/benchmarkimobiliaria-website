import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../../../context/FavoritesContext"
import { sendWhatsAppMessage } from "../../../config/contact"
import "./recent.css"

const RecentCard = ({ list = [] }) => {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [imageErrors, setImageErrors] = useState({})

  const handleHeartClick = (item) => {
    toggleFavorite(item)
  }

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
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
          const { id, cover, category, location, name, price, type, leilao, modalidadeDeVenda, discountPercent, avaliationPrice } = val
          const imageSrc = cover
          const isFav = isFavorite(id)

          return (
            <div className='box shadow' key={index}>
              <Link to={`/property/${id}`} target="_blank" rel="noopener noreferrer">
                <div className='recent-card-img'>
                  {imageErrors[id] ? (
                    <div className="card-fallback">
                      <i className="fa-solid fa-house"></i>
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      alt={name}
                      onError={() => handleImageError(id)}
                    />
                  )}
                </div>
              </Link>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ color: "#515151", backgroundColor: "#f0f0f097", padding: "4px 8px", borderRadius: "4px" }}>{modalidadeDeVenda}</span>
                  <i className={`fa fa-heart ${isFav ? 'liked' : ''}`} onClick={() => handleHeartClick(val)} style={{ cursor: 'pointer', color: isFav ? '#dc3848' : '#999999' }}></i>
                </div>
                <Link to={`/property/${id}`} target="_blank" rel="noopener noreferrer">
                  <div className="price-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{price}</span>
                    <span className="discount"> {discountPercent}% <i class="fa-solid fa-arrow-down"></i></span>
                  </div>
                  <s style={{ color: "#2a2a2aff" }}>{avaliationPrice}</s>
                  <p>
                    <i className='fa fa-location-dot'></i> {location}
                  </p>
                </Link>
              </div>
              <div className='button flex'>
                <div>
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
