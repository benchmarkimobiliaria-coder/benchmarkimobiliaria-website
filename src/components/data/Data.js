import Papa from "papaparse"

// Função para carregar dados do CSV
export const loadListFromCSV = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/imoveis.csv`)
    const csvText = await response.text()

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row) => ({
            id: parseInt(row.id),
            cover: `${process.env.PUBLIC_URL}${row.cover}`,
            images: (row.images || row.cover)
              .split(';')
              .map(img => `${process.env.PUBLIC_URL}${img.trim()}`),
            name: row.name,
            location: row.location,
            category: row.category,
            price: row.price,
            type: row.type,
            leilao: row.leilao,
            area: row.area,
            description: row.description,
            discountPercent: row.discountPercent,
            avaliationPrice: row.avaliationPrice,
            modalidadeDeVenda: row.modalidadeDeVenda,
            UF: row.UF,
            city: row.city,
            neighborhood: row.neighborhood,

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
    text: "Sobre",
    path: "/about",
  },
  {
    text: "Imóveis",
    path: "/imoveis",
  },
  // {
  //   text: "blog",
  //   path: "/blog",
  // },
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
    cover: `${process.env.PUBLIC_URL}/images/hero/h1.png`,
    name: "Casas",
    total: "",
  },
  {
    cover: `${process.env.PUBLIC_URL}/images/hero/h2.png`,
    name: "Sobrados",
    total: "",
  },
  {
    cover: `${process.env.PUBLIC_URL}/images/hero/h3.png`,
    name: "Apartamentos",
    total: "",
  },
  {
    cover: `${process.env.PUBLIC_URL}/images/hero/h4.png`,
    name: "Imóveis Comerciais",
    total: "",
  },
  {
    cover: `${process.env.PUBLIC_URL}/images/hero/h6.png`,
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
    color: "#888888",
  },
]


// Função para carregar dados do CSV
export const loadLocationFromCSV = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/location.csv`)
    const csvText = await response.text()

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row) => ({
            id: parseInt(row.id),
            name: row.name,
            Villas: row.villas,
            Apartments: row.apartments,
            Offices: row.offices,
            cover: `${process.env.PUBLIC_URL}/images/location/${row.cover}`
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
export var location = []

// Carregar dados do CSV ao importar este módulo
loadLocationFromCSV().then((data) => {
  console.log("Dados carregados do CSV:", data) // Verificar os dados carregados
  location = data
})

export const team = [
  {
    // list: "50",
    cover: `${process.env.PUBLIC_URL}/favicon.png`,
    address: "Porto Alegre, RS",
    name: "Lucas Rodrigues",
    email: "contato@benchmarkimobiliaria.com.br",
    phone: "+55 51 99999-9999",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    // list: "70",
    cover: `${process.env.PUBLIC_URL}/favicon.png`,
    address: "Porto Alegre, RS",
    name: "Pietro Sartori",
    email: "contato@benchmarkimobiliaria.com.br",
    phone: "+55 51 99999-9999",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  },
  {
    // list: "80",
    cover: `${process.env.PUBLIC_URL}/favicon.png`,
    address: "Porto Alegre, RS",
    name: "Diego Martins",
    email: "contato@benchmarkimobiliaria.com.br",
    phone: "+55 51 99999-9999",
    icon: [<i class='fa-brands fa-facebook-f'></i>, <i class='fa-brands fa-linkedin'></i>, <i class='fa-brands fa-twitter'></i>, <i class='fa-brands fa-instagram'></i>],
  }
]

export const price = [
  {
    icon: <i className="fa-solid fa-award" style={{ color: "rgba(168, 168, 168, 1.00)" }}></i>,
    plan: "Análise Prévia Completa",
    price: "350",
    ptext: "por imóvel",
    currency: "BRL",
    list: [
      { icon: <i className="fa-solid fa-check"></i>, text: "Análise completa da matrícula do imóvel" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Análise detalhada do edital do leilão" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Levantamento de dívidas (IPTU e condomínio)" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Verificação de processos e riscos relevantes" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Parecer técnico sobre viabilidade e segurança do investimento" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Imóvel adicional por R$ 100,00" },
      { change: "color", icon: <i className="fa-solid fa-x"></i>, text: "Acompanhamento durante o leilão" },
      { change: "color", icon: <i className="fa-solid fa-x"></i>, text: "Registro do imóvel no cartório" },
    ],
  },

  {
    icon: <i className="fa-solid fa-award" style={{ color: "rgba(217, 94, 0, 1.00)" }}></i>,
    plan: "Acompanhamento de Arrematação",
    price: "3%",
    ptext: "do valor do arremate",
    ptext2: "(mínimo R$ 5.000)",
    currency: "BRL",
    list: [
      { icon: <i className="fa-solid fa-check"></i>, text: "Inclui todos os itens do Plano Análise Prévia Completa" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Cadastro e orientação na plataforma do leilão" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Acompanhamento durante a arrematação" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Análise do contrato, escritura pública ou carta de arrematação" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Emissão e conferência da guia de ITBI" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Orientação para transferência do IPTU" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Registro em cartório" },
      { change: "color", icon: <i className="fa-solid fa-x"></i>, text: "Desocupação do imóvel" },
      { change: "color", icon: <i className="fa-solid fa-x"></i>, text: "Negociação de dívidas" },
      { change: "color", icon: <i className="fa-solid fa-x"></i>, text: "Baixa de gravames" },
    ],
  },

  {
    icon: <i className="fa-solid fa-trophy" style={{ color: "rgba(240, 189, 0, 1.00)" }}></i>,
    plan: "Assessoria Completa",
    price: "5%",
    ptext: "do valor do arremate",
    ptext2: "(mínimo R$ 8.000)",
    currency: "BRL",
    list: [
      { icon: <i className="fa-solid fa-check"></i>, text: "Inclui todos os itens do Acompanhamento de Arrematação" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Desocupação do imóvel" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Negociação de dívidas e regularização completa" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Baixa de gravames (penhora, indisponibilidade, etc.)" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Troca de chaves e entrega formal do imóvel" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Desconto nas reformas e obras com servidores parceiros" },
      { icon: <i className="fa-solid fa-check"></i>, text: "Acompanhamento até o imóvel estar pronto para uso ou venda" },
    ],
  },
];


export const footer = [
  {
    title: "Nossos Serviços",
    text: [{ list: "Contato", link: "/contact" }, { list: "Sobre", link: "/about" }],
  },
  {
    title: "Imóveis",
    text: [{ list: "Home", link: "/" }, { list: "Favoritos", link: "/mylist" }],
  },
]
