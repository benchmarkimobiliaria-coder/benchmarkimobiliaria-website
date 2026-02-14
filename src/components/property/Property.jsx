import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { loadListFromCSV } from "../data/Data"
import { sendWhatsAppMessage } from "../../config/contact"
import "./property.css"
import { useFavorites } from "../../context/FavoritesContext"

const Property = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await loadListFromCSV()
        if (!mounted) return
        const found = data.find((d) => String(d.id) === String(id))
        setItem(found || null)
        setCurrentImageIndex(0)
        setImageErrors({})
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [id])

  const { toggleFavorite, isFavorite } = useFavorites()

  const handleHeartClick = (item) => {
    toggleFavorite(item)
  }


  const handleWhatsAppClick = () => {
    if (!item) return
    const address = item.location || ""
    const message = `Tenho interesse no imóvel: ${item.name} (ID: ${item.id}). Endereço: ${address}. Preço: ${item.price}. Leilão: ${item.leilao}`
    sendWhatsAppMessage(message)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (item.images.length - 1) : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    )
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  if (loading) return <div className="property-container">Carregando...</div>
  if (!item) return <div className="property-container">Imóvel não encontrado.</div>

  const address = item.location || ""

  const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const mapsQuery = encodeURIComponent(address)
  const mapsSrc = mapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${mapsQuery}`
    : `https://www.google.com/maps?q=${mapsQuery}&output=embed`

  return (
    <div className="property-container">
      <div className="property-main container">
        <div className="property-left">
          <div className="property-carousel">
            <div className="carousel-main">
              {imageErrors[currentImageIndex] ? (
                <div className="main-fallback">
                  <i className="fa-solid fa-house"></i>
                </div>
              ) : (
                <img
                  src={item.images[currentImageIndex]}
                  alt={`${item.name} - ${currentImageIndex + 1}`}
                  onError={() => handleImageError(currentImageIndex)}
                />
              )}
              {item.images.length > 1 && (
                <>
                  <button className="carousel-prev" onClick={handlePrevImage} title="Imagem anterior">
                    <i className="fa fa-chevron-left"></i>
                  </button>
                  <button className="carousel-next" onClick={handleNextImage} title="Próxima imagem">
                    <i className="fa fa-chevron-right"></i>
                  </button>
                  <div className="carousel-counter">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </>
              )}
            </div>
            {item.images.length > 1 && (
              <div className="carousel-thumbnails">
                {item.images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => goToImage(index)}
                  >
                    {imageErrors[index] ? (
                      <div className="thumbnail-fallback">
                        <i className="fa-solid fa-house"></i>
                      </div>
                    ) : (
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        onError={() => handleImageError(index)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="property-right">
          <div className="map-wrapper">
            <iframe
              title="map"
              src={mapsSrc}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <h3>{item.type} {item.leilao} em {item.city} / {item.UF}  <i className={`fa fa-heart ${isFavorite(item.id) ? 'liked' : ''}`} onClick={() => handleHeartClick(item)} style={{ cursor: 'pointer', color: isFavorite(item.id) ? '#dc3848' : '#999999' }}></i> </h3>

          <p className="simple-description">Valor do Imóvel </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <p className="property-price">{item.price}</p> <span className="discount"> {item.discountPercent}% <i class="fa-solid fa-arrow-down"></i></span>

          </div>
          <p className="simple-description">Valor Avaliado </p>
          <s>{item.avaliationPrice}</s>
          <div className="property-details">
            <strong>Leilão  {item.leilao} - {item.modalidadeDeVenda} </strong>  <br />
            {item.description} <br />
            <strong>Área Privativa:</strong> {item.area}
            <p className="property-address">
              <i className="fa fa-location-dot"></i> {address}
            </p>
            <div className="property-cta">
              <button className="btn-primary" onClick={handleWhatsAppClick} >
                Tenho Interesse  <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Property
