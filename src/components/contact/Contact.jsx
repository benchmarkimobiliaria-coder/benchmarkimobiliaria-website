import React from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (response.ok) alert("Email enviado com sucesso!")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      alert("Erro ao enviar email. Tente novamente mais tarde.")
    }
  }

  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='container'>
          <form className='shadow' onSubmit={handleSubmit}>
            <h4>Qual sua dúvida?</h4> <br />
            <div>
              <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} required />
              <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
            </div>
            <input type='text' name='subject' placeholder='Subject' value={formData.subject} onChange={handleChange} required />
            <textarea name='message' cols='30' rows='10' value={formData.message} onChange={handleChange} required></textarea>
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
