import React, { useEffect, useState } from "react"
import "./properties-map.css"

const PropertiesMap = ({ properties = [] }) => {
  const [groupedByAddress, setGroupedByAddress] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  useEffect(() => {
    // Agrupar imóveis por endereço
    const grouped = {}
    properties.forEach((prop) => {
      const addr = prop.location || "Endereço desconhecido"
      if (!grouped[addr]) {
        grouped[addr] = {
          address: addr,
          count: 0,
          items: [],
        }
      }
      grouped[addr].count += 1
      grouped[addr].items.push(prop)
    })

    const result = Object.values(grouped).sort((a, b) => b.count - a.count)
    setGroupedByAddress(result)

    // Definir primeiro endereço como selecionado por padrão
    if (result.length > 0 && !selectedAddress) {
      setSelectedAddress(result[0].address)
    }
  }, [properties, selectedAddress])


  const mapQuery = selectedAddress ? encodeURIComponent(selectedAddress) : (properties.length > 0 ? encodeURIComponent(properties[0].location || "Brazil") : "Brazil")
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`

  return (
    <div className='properties-map-container'>
      <div className='map-wrapper'>
        <iframe
          title='Mapa de Imóveis'
          width='100%'
          height='600'
          style={{ border: 0, borderRadius: "8px" }}
          src={mapSrc}
          allowFullScreen=''
          loading='lazy'
        ></iframe>
      </div>

      <div className='addresses-list'>
        <h3>Localidades com Imóveis ({groupedByAddress.length})</h3>
        {groupedByAddress.length === 0 ? (
          <p className='empty-message'>Nenhum imóvel encontrado</p>
        ) : (
          <div className='addresses-scroll'>
            {groupedByAddress.map((group, idx) => (
              <div
                className={`address-item ${selectedAddress === group.address ? "active" : ""}`}
                key={idx}
                onClick={() => setSelectedAddress(group.address)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedAddress === group.address ? "#f0f0f0" : "transparent",
                  borderLeft: selectedAddress === group.address ? "4px solid #FF0000" : "4px solid transparent",
                  transition: "all 0.3s ease",
                }}
              >
                <div className='address-header'>
                  <i className='fa fa-map-marker-alt'></i>
                  <span className='address-name'>{group.address}</span>
                  {group.count > 1 && <span className='address-count badge'>{group.count}</span>}
                </div>
                {group.count > 1 && (
                  <div className='address-items'>
                    {group.items.map((item, i) => (
                      <div className='address-item-detail' key={i}>
                        <span className='item-name'>{item.name}</span>
                        <span className='item-price'>{item.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesMap
