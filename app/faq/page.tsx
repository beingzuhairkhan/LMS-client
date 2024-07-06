'use client';
import React , {useState} from 'react'
import Heading from '../utils/Heading';
import Header from '../components/Header';
import FAQ from '../components/FAQ/FAQ'
import Footer from '../components/Footer/Footer';
type Props ={}

const Page = () =>{
    const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState('Login');

     return (
        <div>
            <Heading title={"FAQ  - Garuda Institute" }
            description={"Garuda Institute is a leading educational institution providing quality education to students. Our expert faculty, state-of-the-art infrastructure, and student-centric approach make us a top choice for students seeking academic excellence. "}
             keywords={"Garuda Institute"}
              />
            <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
            <FAQ/>
            <Footer/>
        </div>
     )
}

export default Page