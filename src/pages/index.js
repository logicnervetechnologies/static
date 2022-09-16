import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { HomeClients } from '../components/home/home-clients';
import { HomeHero } from '../components/home/home-hero';
import { HomeDevelopers } from '../components/home/home-developers';
import { HomePatients } from '../components/home/home-patients';
import { HomeDoctors } from '../components/home/home-doctors';
import { HomeFeatures } from '../components/home/home-features';
import { HomeTestimonials } from '../components/home/home-testimonials';
import { gtm } from '../lib/gtm';

const Home = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Material Kit Pro
        </title>
      </Head>
      <main>
        <HomeHero />
        <Divider />
        <HomeDoctors />
        <Divider />
        <HomePatients />
        <Divider />
        <HomeDevelopers />
        {/* <HomeTestimonials /> */}
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default Home;
