import Papa from "papaparse"

// Função para carregar dados do CSV
export const loadListFromCSV = async () => {
  try {
    const response = await fetch("/data/imoveis.csv")
    const csvText = await response.text()
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row) => ({
            id: parseInt(row.id),
            cover: row.cover,
            name: row.name,
            location: row.location,
            category: row.category,
            price: row.price,
            type:  row.type,
          }))
          resolve(data)
        },
        error: (error) => {
          reject(error)
        },
        delimiter: '|', // Ajustado para usar o delimitador '|
      })
    })
  } catch (error) {
    console.error("Erro ao carregar o CSV:", error)
    throw error
  }
}

// Variável que será preenchida com dados do CSV
export var list = []

// Carregar dados do CSV ao importar este módulo
loadListFromCSV().then((data) => {
  console.log("Dados carregados do CSV:", data) // Verificar os dados carregados
  list = data
})

export const nav = [
  {
    text: "home",
    path: "/",
  },
  {
    text: "sobre",
    path: "/about",
  },
  {
    text: "serviços",
    path: "/services",
  },
  {
    text: "blog",
    path: "/blog",
  },
  {
    text: "Planos",
    path: "/pricing",
  },
  {
    text: "contato",
    path: "/contact",
  },
]
export const featured = [
  {
    cover: "../images/hero/h1.png",
    name: "Casas",
    total: "",
  },
  {
    cover: "../images/hero/h2.png",
    name: "Sobrados",
    total: "",
  },
  {
    cover: "../images/hero/h3.png",
    name: "Apartamentos",
    total: "",
  },
  {
    cover: "../images/hero/h4.png",
    name: "Imóveis Comerciais",
    total: "",
  },
  {
    cover: "../images/hero/h6.png",
    name: "Casas em Condomínio",
    total: "",
  },
]
export const awards = [
  {
    icon: <i class='fa-solid fa-trophy'></i>,
    num: "32 M	",
    name: "Blue Burmin Award",
  },
  {
    icon: <i class='fa-solid fa-briefcase'></i>,
    num: "43 M",
    name: "Mimo X11 Award",
  },
  {
    icon: <i class='fa-solid fa-lightbulb'></i>,
    num: "51 M",
    name: "Australian UGC Award",
  },
  {
    icon: <i class='fa-solid fa-heart'></i>,
    num: "42 M",
    name: "IITCA Green Award",
  },
]
export const location = [
  {
    id: 1,
    name: "New Orleans, Louisiana",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-1.png",
  },
  {
    id: 2,
    name: "Jerrsy, United State",
    Villas: "12 Villas",
    Apartments: "10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-2.png",
  },
  {
    id: 3,
    name: "Liverpool, London",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-3.png",
  },
  {
    id: 4,
    name: "NewYork, United States",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-4.png",
  },
  {
    id: 5,
    name: "Montreal, Canada",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-5.png",
  },
  {
    id: 6,
    name: "California, USA",
    Villas: "12 Villas",
    Apartments: " 10 Apartments",
    Offices: "07 Offices",
    cover: "./images/location/city-6.png",
  },
]
export const team = [
  {
    list: "50",
    cover: "../images/customer/team-1.jpg",
    address: "Porto Alegre, RS",
    name: "Lucas Rodrigues",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "70",
    cover: "../images/customer/team-2.jpg",
    address: "Porto Alegre, RS",
    name: "Pietro Sartori",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "80",
    cover: "../images/customer/team-3.jpg",
    address: "Porto Alegre, RS",
    name: "Diego Martins",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "51",
    cover: "../images/customer/team-4.jpg",
    address: "Porto Alegre, RS",
    name: "Especialista 4",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "42",
    cover: "../images/customer/team-5.jpg",
    address: "Porto Alegre, RS",
    name: "Especialista 5",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    list: "38",
    cover: "../images/customer/team-5.jpg",
    address: "Porto Alegre, RS",
    name: "Especialista 6",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
]
export const price = [
  {
    plan: "Análise Prévia Completa",
    price: "350",
    ptext: "01 (um) imóvel",
    currency: "BRL",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Análise completa da matrícula do imóvel",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Análise detalhada do edital do leilão",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Levantamento de todas as dívidas do imóvel (propter rem)",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Verificação da existência processos judiciais",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Parecer técnico sobre a viabilidade do investimento",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Adicione mais imóveis à análise por R$ 100,00 cada",
      },
      { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Personal Help Support" },
      { change: "color", icon: <i class='fa-solid fa-x'></i>, text: "Enterprise SLA" },
    ],
  },
  {
    best: "Best Value",
    plan: "Standard",
    price: "49",
    ptext: "per user, per month",
    currency: "BRL",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "99.5% Uptime Guarantee",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "150GB CDN Bandwidth",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "10GB Cloud Storage",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Personal Help Support",
      },
      {
        change: "color",
        icon: <i class='fa-solid fa-x'></i>,
        text: "Enterprise SLA",
      },
    ],
  },
  {
    plan: "Platinum",
    price: "79",
    ptext: "2 user, per month",
    currency: "BRL",
    list: [
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "100% Uptime Guarantee",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "200GB CDN Bandwidth",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "20GB Cloud Storage",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Personal Help Support",
      },
      {
        icon: <i class='fa-solid fa-check'></i>,
        text: "Enterprise SLA",
      },
    ],
  },
]
export const footer = [
  {
    title: "LAYOUTS",
    text: [{ list: "Home Page" }, { list: "About Page" }, { list: "Service Page" }, { list: "Property Page" }, { list: "Contact Page" }, { list: "Single Blog" }],
  },
  {
    title: "ALL SECTIONS",
    text: [{ list: "Headers" }, { list: "Features" }, { list: "Attractive" }, { list: "Testimonials" }, { list: "Videos" }, { list: "Footers" }],
  },
  {
    title: "COMPANY",
    text: [{ list: "About" }, { list: "Blog" }, { list: "Pricing" }, { list: "Affiliate" }, { list: "Login" }, { list: "Changelog" }],
  },
]
