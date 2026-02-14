import React from "react"
import { price } from "../../data/Data"

const PriceCard = () => {
  const handleContractClick = (planName) => {
    const message = `Tenho interesse em contratar o plano: ${planName}`
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <div className='content flex mtop'>
        {price.map((item, index) => (
          <div className='box shadow' key={index}>
            <h3>{item.icon}<br />{item.plan}</h3>
            <h1>
              <span>{item.currency === "BRL" ? "R$" : "$"}</span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>
            <p>{item.ptext2}</p>

            <ul style={{ textAlign: "left" }}>
              {item.list.map((val) => {
                const { icon, text, change } = val
                return (
                  <li>
                    <label
                      style={{
                        background: change === "color" ? "#dc35451f" : "#2f8cba1f",
                        color: change === "color" ? "#dc3848" : "#2f8cba",
                      }}
                    >
                      {icon}
                    </label>
                    <p>{text}</p>
                  </li>
                )
              })}
            </ul>
            <button
              className='btn3'
              onClick={() => handleContractClick(item.plan)}
            >
              Contratar {item.plan}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PriceCard
