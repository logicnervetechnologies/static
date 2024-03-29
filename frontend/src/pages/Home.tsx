import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  HomeClients,
  HomeHero,
  HomeOverview,
  HomeRoles,
  HomeFeatures,
  HomeTestimonials
} from '../components/home';
import gtm from '../lib/gtm';

const Home: FC = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Logic Nerve</title>
      </Helmet>
      <div>
        <HomeHero />
        <HomeOverview />
        <HomeRoles />
        <HomeTestimonials />
        <HomeFeatures />
        <HomeClients />
      </div>
    </>
  );
};

export default Home;
