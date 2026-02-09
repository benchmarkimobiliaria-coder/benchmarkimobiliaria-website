import React, { useEffect, useState } from "react"
import Heading from "../common/Heading"
import RecentCard from "../home/recent/RecentCard"
import PropertyFilter from "../common/PropertyFilter"
import { loadListFromCSV } from "../data/Data"
import { useLocation } from "react-router-dom"
import "./imoveis.css"

const parseCurrencyToNumber = (value) => {
  if (!value) return 0
  const cleaned = String(value).replace(/[^0-9,.-]/g, "").trim()
  if (cleaned.indexOf(",") > -1 && cleaned.indexOf(".") > -1) {
    const replaced = cleaned.replace(/\./g, "").replace(/,/, ".")
    return parseFloat(replaced)
  }
  if (cleaned.indexOf(",") > -1) {
    return parseFloat(cleaned.replace(/,/, "."))
  }
  return parseFloat(cleaned) || 0
}

const Imoveis = () => {
  const location = useLocation()
  const [all, setAll] = useState([])
  const [filtered, setFiltered] = useState([])
  const [types, setTypes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const data = await loadListFromCSV()
      if (!mounted) return
      setAll(data)
      
      // Se veio dados filtrados do state (da busca em Hero), usar esses
      if (location.state && Array.isArray(location.state.filtered) && location.state.filtered.length > 0) {
        setFiltered(location.state.filtered)
        setCurrentPage(1)
      } else if (location.state && location.state.search) {
        // suporte para possíveis params em location.state.search
        // ex: { location: 'porto alegre', types: [...], maxPrice }
        const s = location.state.search
        if (s) {
          // support location as string or array
          const rawLoc = s.location
          let locArr = []
          if (Array.isArray(rawLoc)) {
            locArr = rawLoc.map(l => (l || "").toLowerCase().trim()).filter(Boolean)
          } else if (rawLoc) {
            const l = String(rawLoc).toLowerCase().trim()
            if (l) locArr = [l]
          }
          const selTypes = s.types || []
          const max = s.maxPrice || null
          const res = data.filter((p) => {
            const pLoc = (p.location || "").toLowerCase()
            const matchesLocation = locArr.length > 0 ? locArr.some(sub => pLoc.includes(sub)) : true
            const matchesType = selTypes && selTypes.length > 0 ? selTypes.includes(p.type) : true
            const priceNumber = parseCurrencyToNumber(p.price)
            const matchesPrice = max ? priceNumber <= max : true
            return matchesLocation && matchesType && matchesPrice
          })
          setFiltered(res)
          setCurrentPage(1)
        } else {
          setFiltered(data)
        }
      } else {
        setFiltered(data)
      }
      
      const unique = Array.from(new Set(data.map((d) => d.type).filter(Boolean)))
      setTypes(unique)
    }
    load()
    return () => (mounted = false)
  }, [location])

  const handleFilter = (filterObj) => {
    const locRaw = filterObj.location
    let locArr = []
    if (Array.isArray(locRaw)) {
      locArr = locRaw.map(l => (l || "").toLowerCase().trim()).filter(Boolean)
    } else if (locRaw) {
      const l = String(locRaw).toLowerCase().trim()
      if (l) locArr = [l]
    }
    const selTypes = filterObj.types || []
    let max = null
    if (filterObj.maxPrice !== undefined && filterObj.maxPrice !== null && filterObj.maxPrice !== "") {
      // aceitar número ou string com dígitos
      const raw = typeof filterObj.maxPrice === "number" ? String(filterObj.maxPrice) : String(filterObj.maxPrice)
      const digits = raw.replace(/\D/g, "")
      max = digits ? parseFloat(digits) / 100 : null
    }

    const res = all.filter((p) => {
      const pLoc = (p.location || "").toLowerCase()
      const matchesLocation = locArr.length > 0 ? locArr.some(sub => pLoc.includes(sub)) : true
      const matchesType = selTypes && selTypes.length > 0 ? selTypes.includes(p.type) : true
      const priceNumber = parseCurrencyToNumber(p.price)
      const matchesPrice = max ? priceNumber <= max : true
      return matchesLocation && matchesType && matchesPrice
    })

    setFiltered(res)
    setCurrentPage(1) // Reset to first page when filtering
  }

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filtered.slice(startIndex, endIndex)

  // Ensure currentPage stays within bounds when filtered/itemsPerPage change
  useEffect(() => {
    const total = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
    if (currentPage > total) {
      setCurrentPage(total)
    }
  }, [filtered, itemsPerPage, currentPage])

  const handlePageChange = (page) => {
    const total = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
    const next = Math.min(Math.max(1, page), total)
    console.log("Changing to page:", next)
    setCurrentPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value))
    // setCurrentPage(1)
  }

  return (
    <section className="imoveis padding">
      <div className="container">
        <Heading title="Imóveis" subtitle="Filtre e explore os imóveis disponíveis" />
        <div className="imoveis-grid">
          <div className="imoveis-filter">
            <PropertyFilter types={types} onChange={handleFilter} />
          </div>
          <div className="imoveis-list">
            <div className="pagination-controls">
              <div className="items-per-page">
                <label htmlFor="items-select">Itens por página: </label>
                <select 
                  id="items-select"
                  value={itemsPerPage} 
                  onChange={handleItemsPerPageChange}
                >
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
              <div className="pagination-info">
                Mostrando {startIndex + 1} - {Math.min(endIndex, filtered.length)} de {filtered.length} imóveis
              </div>
            </div>
            <RecentCard list={currentItems} />
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  type="button"
                  className="pagination-btn prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Anterior
                </button>
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      type="button"
                      key={page}
                      className={`pagination-number ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  type="button"
                  className="pagination-btn next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Próximo →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Imoveis
