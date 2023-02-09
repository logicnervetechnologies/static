import { useEffect } from 'react';
import Head from 'next/head';
import { Divider } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { HomeCore } from '../components/home/home-core';
import { HomeHero } from '../components/home/home-hero';
import { HomeAbout } from '../components/home/home-about';
import { HomeMission } from '../components/home/home-mission';
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
          LogicNerve
        </title>
      </Head>
      <main>
        <HomeHero />
        <Divider />
        <HomeMission />
        <Divider />
        <HomeAbout />
        {/* <HomeTestimonials />
        <HomeFeatures /> */}
        <Divider />
        <HomeCore />
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
