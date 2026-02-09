import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { loadListFromCSV } from "../data/Data"
import { sendWhatsAppMessage } from "../../config/contact"
import "./property.css"

const Property = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await loadListFromCSV()
        if (!mounted) return
        const found = data.find((d) => String(d.id) === String(id))
        setItem(found || null)
        setCurrentImageIndex(0)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => (mounted = false)
  }, [id])

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
              <img src={item.images[currentImageIndex]} alt={`${item.name} - ${currentImageIndex + 1}`} />
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
                    <img src={img} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="property-info">
            <h2>{item.name}</h2>
            <p className="property-price">{item.price}</p>
            <p>
              <strong>Tipo:</strong> {item.type} &nbsp; • &nbsp; <strong>Categoria:</strong> {item.category}
            </p>
            <p className="property-address">
              <i className="fa fa-location-dot"></i> {address}
            </p>
            <p className="property-auction">
              <strong>Leilão:</strong> {item.auction || item.leilao || "Desconhecido"}
            </p>
            <div className="property-cta">
              <button className="btn-primary" onClick={handleWhatsAppClick} >
                Tenho Interesse (WhatsApp)
              </button>
            </div>
          </div>
        </div>

        <div className="property-right">
          <h3>Localização</h3>
          <div className="map-wrapper">
            <iframe
              title="map"
              src={mapsSrc}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <h4>Detalhes</h4>
          <ul className="property-details">
            <li>
              <strong>Nome:</strong> {item.name}
            </li>
            <li>
              <strong>Endereço:</strong> {address}
            </li>
            <li>
              <strong>Preço:</strong> {item.price}
            </li>
            <li>
              <strong>Tipo:</strong> {item.type}
            </li>
            <li>
              <strong>Categoria:</strong> {item.category}
            </li>
            <li>
              <strong>Leilão:</strong> {item.leilao}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Property
