'use client'

import Footer from "./(pages)/home/Footer";
import LandingPage from "./(pages)/home/LandingPage";
import LpAbout from "./(pages)/home/LpAbout";
import LpJobs from "./(pages)/home/LpJobs";
import LpLeadingCompanies from "./(pages)/home/LpLeadingCompanies";
import Pricing from "./(pages)/home/Pricing";

const Home = () => {

  return (
    <div className="w-full min-h-screen text-white py-5 space-y-10 bg-black">
      <LandingPage />
      <LpAbout />
      <LpJobs />
      <LpLeadingCompanies />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home