# Guia de Configuração - Contato via WhatsApp e Email

## Configuração do WhatsApp

Para fazer com que o botão de WhatsApp envie mensagens para um número específico, você precisa:

1. Abra o arquivo: `src/config/contact.js`

2. Localize a configuração:
```javascript
export const CONTACT_CONFIG = {
  whatsappNumber: "5585988776666",  // Altere este valor
  email: "",
}
```

3. Substitua `"5585988776666"` pelo seu número de WhatsApp no formato internacional:
   - Remova todos os caracteres especiais (-, parênteses, espaços)
   - Comece com o código do país (55 para Brasil)
   - Após o código do país, coloque o DDD (sem o zero)
   - Depois o número do celular

**Exemplos:**
- Para `+55 (85) 9 8877-6666` → `"5585988776666"`
- Para `+55 (11) 9 9999-8888` → `"5511999998888"`
- Para `+1 (555) 123-4567` → `"15551234567"`

## Configuração do Email

Se quiser que o botão "Enviar por Email" tenha um email pré-preenchido:

1. No mesmo arquivo `src/config/contact.js`, adicione seu email:
```javascript
export const CONTACT_CONFIG = {
  whatsappNumber: "5585988776666",
  email: "seu.email@example.com",  // Adicione aqui
}
```

Se deixar vazio (`email: ""`), o email abrirá com o cliente de email padrão do usuário sem destinatário pré-preenchido.

## Como Funciona

### Botão "Tenho Interesse" (RecentCard e Property)
- Envia uma mensagem via WhatsApp para o número configurado
- A mensagem inclui detalhes do imóvel (nome, endereço, preço, leilão)

### Botão "Enviar Lista" (MyList)
- **WhatsApp**: Envia a lista de favoritos para o número configurado
- **Email**: Envia a lista em formato HTML para o email configurado ou abre o cliente de email

## Funcionalidades

✅ **WhatsApp para número específico** - Clique e converse direto com a empresa
✅ **Email** - Envie listas completas de imóveis
✅ **Configuração centralizada** - Altere em um único lugar
✅ **Reutilizável** - Funções podem ser usadas em qualquer componente

## Usando as Funções em Outros Componentes

Se precisar usar essas funcionalidades em outros lugares:

```javascript
import { sendWhatsAppMessage, sendEmail } from "../config/contact"

// Para WhatsApp
const handleContact = () => {
  const message = "Olá, gostaria de informações!"
  sendWhatsAppMessage(message)
}

// Para Email
const handleEmail = () => {
  const subject = "Interesse em Imóvel"
  const body = "Gostaria de receber mais informações..."
  sendEmail(subject, body)
}
```

Pronto! Sua configuração está completa.
