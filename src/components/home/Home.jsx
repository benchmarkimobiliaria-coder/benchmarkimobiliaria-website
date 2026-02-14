import React, { useEffect, useState } from "react"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import { loadListFromCSV } from "../data/Data"
import { useNavigate } from "react-router-dom"

const parseCurrencyToNumber = (value) => {
  if (!value) return 0
  // Remove currency symbols and whitespace
  const cleaned = String(value).replace(/[^0-9,.-]/g, "").trim()
  // Handle Brazilian format like 149.131,54 -> 149131.54
  if (cleaned.indexOf(",") > -1 && cleaned.indexOf(".") > -1) {
    const replaced = cleaned.replace(/\./g, "").replace(/,/, ".")
    return parseFloat(replaced)
  }
  if (cleaned.indexOf(",") > -1) {
    return parseFloat(cleaned.replace(/,/, "."))
  }
  return parseFloat(cleaned) || 0
}

const Home = () => {
  const navigate = useNavigate()
  const [allProperties, setAllProperties] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await loadListFromCSV()
        if (!mounted) return
        setAllProperties(data)
        setFiltered(data.slice(0, 6)) // Mostrar apenas os 6 mais recentes na home
      } catch (err) {
        console.error(err)
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  const handleSearch = ({ location, type, maxPrice }) => {
    const loc = (location || "").toLowerCase().trim()
    // type agora é um array de tipos
    const types = Array.isArray(type) ? type.map(t => (t || "").toLowerCase().trim()) : []
    const max = maxPrice ? parseFloat(maxPrice) : null

    const result = allProperties.filter((p) => {
      const matchesLocation = loc ? (p.location || "").toLowerCase().includes(loc) : true
      // Verifica se o tipo do imóvel está no array de tipos selecionados, ou se nenhum tipo foi selecionado
      const matchesType = types.length > 0 ? types.some(tp => (p.type || "").toLowerCase().includes(tp)) : true
      const priceNumber = parseCurrencyToNumber(p.price)
      const matchesPrice = max ? priceNumber <= max : true
      return matchesLocation && matchesType && matchesPrice
    })

    // Navegar para página de imóveis passando os filtrados pelo state
    navigate("/imoveis", { state: { filtered: result } })
  }

  return (
    <>
      <Hero onSearch={handleSearch} />
      <Recent list={filtered} />
      {/* <Awards /> */}
      {/* <Featured /> */}
      <Location properties={allProperties} />
      <Team />
      <Price />
    </>
  )
}

export default Home
