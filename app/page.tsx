// import { ProtectedRoute } from "@/lib/ProtectedRoute";
import LandingPage from "./(pages)/home/LandingPage";
import LpAbout from "./(pages)/home/LpAbout";
import Pricing from "./(pages)/home/Pricing";
import LpLeadingCompanies from "./(pages)/home/LpLeadingCompanies";
import Footer from "./(pages)/home/Footer";


const Home = () => {

  return (
    <div className="w-full min-h-screen text-white py-5 space-y-10 bg-black">
      <LandingPage />
      <LpAbout />      
      <Pricing />
      <LpLeadingCompanies />
      <LpLeadingCompanies />
      <Footer />
    </div>
  );
}

export default Home