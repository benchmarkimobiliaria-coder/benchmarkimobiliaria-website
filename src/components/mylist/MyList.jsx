import React from "react"
import Back from "../common/Back"
import { useFavorites } from "../../context/FavoritesContext"
import { Link } from "react-router-dom"
import { sendWhatsAppMessage, sendEmail } from "../../config/contact"
import img from "../images/pricing.jpg"
import "./mylist.css"

const MyList = () => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites()

  const generateWhatsAppMessage = () => {
    if (favorites.length === 0) return ""
    const message = favorites
      .map((item) => `• ${item.name} - ${item.location} - ${item.price}`)
      .join("\n")
    return `Minha lista de imóveis de interesse:\n\n${message}`
  }

  const generateEmailBody = () => {
    if (favorites.length === 0) return ""
    const html = favorites
      .map((item) => `<tr><td>${item.name}</td><td>${item.location}</td><td>${item.price}</td><td>${item.type}</td></tr>`)
      .join("")
    return `
      <html>
        <body>
          <h2>Minha Lista de Imóveis de Interesse</h2>
          <table border="1" cellpadding="10" cellspacing="0">
            <tr>
              <th>Nome</th>
              <th>Localização</th>
              <th>Preço</th>
              <th>Tipo</th>
            </tr>
            ${html}
          </table>
        </body>
      </html>
    `
  }

  const sendWhatsApp = () => {
    const message = generateWhatsAppMessage()
    if (!message) {
      alert("Sua lista está vazia!")
      return
    }
    sendWhatsAppMessage(message)
  }

  const sendEmailList = () => {
    if (favorites.length === 0) {
      alert("Sua lista está vazia!")
      return
    }
    const subject = "Minha Lista de Imóveis de Interesse"
    const body = generateEmailBody()
    sendEmail(subject, body)
  }

  return (
    <>
      <section className='mylist mb'>
        <Back name='Minha Lista de Imóveis' title='Imóveis Salvos' cover={img} />
        <div className='mylist-container container'>
          {favorites.length === 0 ? (
            <div className='empty-state'>
              <p>Sua lista está vazia. Clique no coração para adicionar imóveis!</p>
              <Link to='/' className='btn-primary-link'>Voltar para Início</Link>
            </div>
          ) : (
            <>
              <h2>Total de Imóveis: {favorites.length}</h2>
              <div className='favorites-list'>
                {favorites.map((item, index) => (
                  <div className='favorite-item box shadow' key={index}>
                    <div className='fav-image'>
                      <img src={item.cover} alt={item.name} />
                    </div>
                    <div className='fav-info'>
                      <h3>{item.name}</h3>
                      <p><strong>Tipo:</strong> {item.type}</p>
                      <p><strong>Categoria:</strong> {item.category}</p>
                      <p><i className='fa fa-location-dot'></i> {item.location}</p>
                      <p><strong>Preço:</strong> <span className='price-highlight'>{item.price}</span></p>
                    </div>
                    <div className='fav-actions'>
                      <Link to={`/property/${item.id}`} className='btn-view'>Ver Detalhes</Link>
                      <button className='btn-remove' onClick={() => removeFavorite(item.id)}>
                        <i className='fa fa-trash'></i> Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className='list-actions'>
                <button className='btn-whatsapp' onClick={sendWhatsApp}>
                  <i className='fa-brands fa-whatsapp'></i> Enviar Lista via WhatsApp
                </button>
                <button className='btn-email' onClick={sendEmailList}>
                  <i className='fa fa-envelope'></i> Enviar Lista por Email
                </button>
                <button className='btn-clear' onClick={clearFavorites}>
                  <i className='fa fa-trash-alt'></i> Limpar Lista
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default MyList
