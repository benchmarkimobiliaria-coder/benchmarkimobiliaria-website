import React, { useState } from "react"
import { footer } from "../../data/Data"
import { sendEmail } from "../../../config/contact"
import "./footer.css"

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("")

  const handleContactClick = () => {
    const subject = "Solicitação de Contato - Benchmark Imobiliária"
    const body = "Olá,\n\nGostaria de entrar em contato com a equipe de especialistas para esclarecer minhas dúvidas sobre as oportunidades de investimento.\n\nAguardo o retorno.\n\nObrigado."
    sendEmail(subject, body)
  }

  const handleNewsletterSubmit = () => {
    if (!footerEmail.trim()) {
      alert("Por favor, digite um email válido")
      return
    }
    const subject = "Inscrição na Newsletter - Benchmark Imobiliária"
    const body = `Olá,\n\nGostaria de receber informações sobre os serviços e oportunidades de investimento.\n\nMeu email: ${footerEmail}\n\nObrigado.`
    sendEmail(subject, body)
    setFooterEmail("")
    alert("Email enviado com sucesso! Entraremos em contato em breve.")
  }
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Possui dúvidas?</h1>
              <p>Entre em contato com nossos especialistas.</p>
            </div>
            <button className='btn5' onClick={handleContactClick}>Entre em contato</button>
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src={`${process.env.PUBLIC_URL}/images/logo-light.png`} alt='' />
              <h2>Precisa de ajuda?</h2>
              <p>Receba informações sobre nossos serviços e oportunidades de investimento.</p>

              <div className='input flex'>
                <input
                  type='email'
                  placeholder='Email'
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSubmit()}
                />
                <div className='button' style={{ marginLeft: "2%" }}>
                  <button
                    className="fa fa-angle-double-right"
                    onClick={handleNewsletterSubmit}
                    title="Inscrever-se"
                  ></button>
                </div>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li key={items.list}><a href={items.link} style={{ color: "rgba(214, 214, 214, 0.85)" }}>{items.list}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span>© 2026 Benchmark Imobiliária. Developed By Winckler & Rodrigues.</span>
      </div>
    </>
  )
}

export default Footer
