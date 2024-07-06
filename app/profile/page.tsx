'use client';

import React, { FC, useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header'; // Corrected import path
import Protected from '../hooks/userProtected'; // Corrected import path
import {useSelector} from 'react-redux'
import Profile from '../components/Profile/Profile'
import Footer from '../components/Footer/Footer';
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="min-h-screen" >
      <Protected>
        <Heading
          title={`${user?.name} profile - Garuda Institute`}
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
        <Profile user={user}/>
        <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
