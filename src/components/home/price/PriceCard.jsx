import React from "react"
import { price } from "../../data/Data"

const PriceCard = () => {
  return (
    <>
      <div className='content flex mtop'>
        {price.map((item, index) => (
          <div className='box shadow' key={index}>
            <div className='topbtn'>
              <button className='btn3'>{item.best}</button>
            </div>
            <h3>{item.plan}</h3>
            <h1>
              <span>{item.currency === "BRL" ? "R$" : "$"}</span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>

            <ul>
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
              className='btn5'
              style={{
                background: item.plan === "Standard" ? "#2f8cba" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#2f8cba",
              }}
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
