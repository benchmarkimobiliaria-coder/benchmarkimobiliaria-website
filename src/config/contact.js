// Configuração de contato
export const CONTACT_CONFIG = {
  // Número do WhatsApp no formato internacional (sem caracteres especiais)
  // Exemplo: "5585988776666" para +55 85 98877-6666
  whatsappNumber: "5551993559546",
  
  // Email para contato (deixe vazio se não quiser usar email)
  email: "contato@benchmarkimobiliaria.com.br",
}

// Função para enviar mensagem via WhatsApp
export const sendWhatsAppMessage = (message, customNumber = null) => {
  const number = customNumber || CONTACT_CONFIG.whatsappNumber
  if (!number) {
    alert("Número de WhatsApp não configurado!")
    return false
  }
  
  try {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodedMessage}`
    window.open(url, "_blank")
    return true
  } catch (error) {
    console.error("Erro ao enviar WhatsApp:", error)
    return false
  }
}

// Função para enviar email via backend
export const sendEmail = async ({ name, email, subject, message }) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    })

    if (!response.ok) {
      throw new Error("Erro ao enviar email")
    }

    return true
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return false
  }
}

