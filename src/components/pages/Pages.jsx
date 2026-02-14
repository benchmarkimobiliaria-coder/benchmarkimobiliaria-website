import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Property from "../property/Property"
import MyList from "../mylist/MyList"
import Imoveis from "../imoveis/Imoveis"
import ScrollToTop from "./ScrollToTop"

const Pages = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/property/:id' element={<Property />} />
          <Route path='/mylist' element={<MyList />} />
          <Route path='/imoveis' element={<Imoveis />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
