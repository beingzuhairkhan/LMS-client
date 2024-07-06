'use client'
import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Route/Hero'
import Courses from './components/Route/Courses'
// import Reviews from './components/Routes/Reviews'
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/Footer"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route, setRoute] = useState("Login")

  return (
    <div >
      <Heading
        title={" Garuda Institute"}
        description={"Garuda Institute is a leading educational institution providing quality education to students. Our expert faculty, state-of-the-art infrastructure, and student-centric approach make us a top choice for students seeking academic excellence. "}
        keywords={"Garuda Institute"}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />



    </div>
  )
};

export default Page;