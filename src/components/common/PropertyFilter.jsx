import React, { useEffect, useRef, useState } from "react"
import "./property-filter.css"
import Select from "react-select";
import { loadListFromCSV } from "../data/Data"

/* global BigInt */

// Reusable property filter
// props:
// - types: array of available types (strings)
// - onChange: callback({ location, types: [], maxPrice })
// - initial: optional initial filter

const formatBRL = (digits) => {
  if (!digits) return ""
  const n = BigInt(digits || 0)
  const cents = Number(n % 100n)
  const units = Number(n / 100n)
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(units + cents / 100)
}

const unformatDigits = (formatted) => {
  // keep only digits
  return (formatted || "").replace(/\D/g, "")
}

const PropertyFilter = ({ types = [], onChange, initial = {} }) => {
  const [location, setLocation] = useState(initial.location || "")
  const [selectedTypes, setSelectedTypes] = useState(initial.types || [])
  const [priceDigits, setPriceDigits] = useState(unformatDigits(initial.maxPrice || ""))
  const [locationsList, setLocationsList] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState([])
  const containerRef = useRef(null)

  // Removed automatic onChange on every keystroke. Search will be triggered
  // only when the user clicks the search button or submits the form.

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    const maxPrice = priceDigits ? String(priceDigits) : ""
    setShowSuggestions(false)
    const locationToSend = selectedLocations && selectedLocations.length > 0 ? selectedLocations : location
    onChange({ location: locationToSend, types: selectedTypes, maxPrice })
  }

  const handleClear = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    const loc = initial.location || ""
    const typesInit = initial.types || []
    const priceInit = initial.maxPrice ? unformatDigits(initial.maxPrice) : ""
    setLocation(loc)
    setSelectedTypes(typesInit)
    setPriceDigits(priceInit)
    setSuggestions([])
    setShowSuggestions(false)
    setSelectedLocations([])
    // trigger change with cleared values
    onChange({ location: loc, types: typesInit, maxPrice: priceInit })
  }

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const data = await loadListFromCSV()
        if (!mounted) return
        const uniqueLocs = Array.from(new Set(data.map(i => (i.location || "").trim()).filter(Boolean)))
        setLocationsList(uniqueLocs)
      } catch (err) {
        // ignore
      }
    }
    load()
    return () => (mounted = false)
  }, [])

  // click outside to hide suggestions
  useEffect(() => {
    const handleDocClick = (e) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [])

  const handlePriceInput = (e) => {
    // maintain digits only in state; user sees formatted value
    const digits = unformatDigits(e.target.value)
    // limit to reasonable length
    const limited = digits.slice(0, 12)
    setPriceDigits(limited)
  }

  const formattedPrice = formatBRL(priceDigits)


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
    // add to selectedLocations if not present
    setSelectedLocations(prev => {
      if (prev.includes(s)) return prev
      return [...prev, s]
    })
    // clear input and suggestions
    setLocation("")
    setSuggestions([])
    setShowSuggestions(false)
  }

  const removeSelectedLocation = (s) => {
    setSelectedLocations(prev => prev.filter(x => x !== s))
  }

  return (
    <form className="property-filter" onSubmit={handleSearch} ref={containerRef}>
      <div className="pf-row">
        <label>Localização</label>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            {selectedLocations.map((s, i) => (
              <div key={i} style={{ background: '#eef1f6', padding: '4px 8px', borderRadius: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13 }}>{s}</span>
                <button type="button" onClick={() => removeSelectedLocation(s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#080101' }}>✕</button>
              </div>
            ))}
          </div>
          <input value={location} onChange={onLocationChange} placeholder="Cidade, bairro ou rua" autoComplete='off' />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="autocomplete-list" style={{ position: 'absolute', zIndex: 20, background: 'white', listStyle: 'none', margin: 0, padding: '6px 0', width: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', maxHeight: 220, overflowY: 'auto' }}>
              {suggestions.map((s, idx) => (
                <li key={idx} style={{ padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ cursor: selectedLocations.includes(s) ? 'default' : 'pointer' }} onClick={() => { if (!selectedLocations.includes(s)) chooseSuggestion(s) }}>{s}</span>
                  {selectedLocations.includes(s) ? (
                    <button type="button" aria-label={`Remover ${s}`} onClick={() => removeSelectedLocation(s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#080101' }}>✕</button>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="pf-row">
        <label>Tipo de imóvel</label>
        <div className="pf-types">

            <Select
                options={types.map(type => ({ value: type, label: type }))}
                isMulti
                placeholder="Tipo de imóvel"
                value={selectedTypes && selectedTypes.length > 0 ? selectedTypes.map(t => ({ value: t, label: t })) : []}
                onChange={(selected) =>
                  setSelectedTypes(selected ? selected.map(item => item.value) : [])
                }
              />
          {/* {types.map((t) => (
            <label className="pf-type" key={t}>
              <input type="checkbox" checked={selectedTypes.includes(t)} onChange={() => toggleType(t)} /> {t}
            </label>
          ))} */}
        </div>
      </div>

      <div className="pf-row">
        <label>Valor Máximo</label>
        <input value={formattedPrice} onChange={handlePriceInput} placeholder="R$ 0,00" />
      </div>

      <div className="pf-row" style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <button type="button" className="btn1" onClick={handleClear}>Limpar filtros</button>
        <button type="submit" className="btn1"><i className='fa fa-search'></i></button>
      </div>
    </form>
  )
}

export default PropertyFilter
