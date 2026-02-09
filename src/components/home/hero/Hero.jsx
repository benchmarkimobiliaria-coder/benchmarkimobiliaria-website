import React, { useState, useEffect } from "react"
import Heading from "../../common/Heading"
import "./hero.css"
import { list, loadListFromCSV } from "../../data/Data"
import Select from "react-select";

/* global BigInt */


const Hero = ({ onSearch }) => {
  const [location, setLocation] = useState("")
  const [selectedTypes, setSelectedTypes] = useState([])
  const [maxPrice, setMaxPrice] = useState("")
  const [availableTypes, setAvailableTypes] = useState([])
  const [locationsList, setLocationsList] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    // Extrair tipos únicos do CSV
    const uniqueTypes = [...new Set(list.map(item => item.type))].filter(Boolean)
    setAvailableTypes(uniqueTypes)

    // carregar lista de localizações para sugestões
    const loadLoc = async () => {
      try {
        const data = await loadListFromCSV()
        const uniqueLocs = Array.from(new Set(data.map(i => (i.location || "").trim()).filter(Boolean)))
        setLocationsList(uniqueLocs)
      } catch (err) {
        // fallback para variável estática
        const uniqueLocs = Array.from(new Set(list.map(i => (i.location || "").trim()).filter(Boolean)))
        setLocationsList(uniqueLocs)
      }
    }
    loadLoc()
  }, [])

  const options = availableTypes.map(type => ({
  value: type,
  label: type,
}));

  const formatBRL = (digits) => {
  if (!digits) return ""
  const n = BigInt(digits || 0)
  const cents = Number(n % 100n)
  const units = Number(n / 100n)
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(units + cents / 100)
}

  const unformatDigits = (formatted) => {
    return (formatted || "").replace(/\D/g, "")
  }

  const handlePriceChange = (e) => {
    const digits = unformatDigits(e.target.value)
    const limited = digits.slice(0, 12)
    setMaxPrice(limited)
  }

  const onLocationChange = (e) => {
    const v = e.target.value
    setLocation(v)
    if (v && v.length >= 1) {
      const list = locationsList.filter(l => l.toLowerCase().includes(v.toLowerCase()))
      setSuggestions(list.slice(0, 8))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const chooseSuggestion = (s) => {
    setLocation(s)
    setSuggestions([])
    setShowSuggestions(false)
  }



  const submit = (e) => {
    e.preventDefault()
    // Converter maxPrice (dígitos) para número com centavos corretos
    const priceAsNumber = maxPrice ? parseFloat(maxPrice) / 100 : ""
    onSearch({ location, type: selectedTypes, maxPrice: priceAsNumber })
  }

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading 
          title='Encontre seu próximo investimento' 
          subtitle='Descubra as melhores oportunidades de imóveis na sua cidade.' />
          <div className='hero-form'>
          <form className='flex' onSubmit={submit}>
            <div className='box'>
              <span>Localização</span>
              <div style={{ position: 'relative' }}>
                <input value={location} onChange={onLocationChange} type='text' placeholder='Cidade, bairro ou rua' autoComplete='off' />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="autocomplete-list" style={{ position: 'absolute', zIndex: 20, background: 'white', listStyle: 'none', margin: 0, padding: '6px 0', width: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', maxHeight: 220, overflowY: 'auto' }}>
                    {suggestions.map((s, idx) => (
                      <li key={idx} onClick={() => chooseSuggestion(s)} style={{ padding: '8px 12px', cursor: 'pointer' }}>{s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className='box'>
              <span>Tipo de imóvel</span>
              <Select
                options={options}
                isMulti
                placeholder="Tipo de imóvel"
                onChange={(selected) =>
                  setSelectedTypes(selected.map(item => item.value))
                }
              />
            </div>
            <div className='box'>
              <span>Valor Máximo (R$)</span>
              <input value={formatBRL(maxPrice)} onChange={handlePriceChange} type='text' placeholder='Ex: R$ 200.000,00' />
            </div>
            <div style={{margin: "3%"}}>
            <button className='btn1' type='submit'>
              <i className='fa fa-search'></i>
            </button>
            </div>
          </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
