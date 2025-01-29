'use client'

import LandingPage from "./(pages)/home/LandingPage";
import LpAbout from "./(pages)/home/LpAbout";
import Pricing from "./(pages)/home/Pricing";
import LpLeadingCompanies from "./(pages)/home/LpLeadingCompanies";
import Footer from "./(pages)/home/Footer";
import mainImage from '../public/main.svg'
import LpJobs from "./(pages)/home/LpJobs";

const Home = () => {

  return (
    <div className="w-full min-h-screen text-white py-5 space-y-10 bg-black">
      <img
        src={mainImage.src}
        alt="Main Image"
        className="w-full h-full absolute top-0 left-0 object-center"
      />
      <LandingPage />
      <LpAbout />
      {/* <LpLeadingCompanies /> */}
      <LpJobs />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home