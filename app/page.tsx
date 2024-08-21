import Footer from "./(pages)/home/Footer";
import LandingPage from "./(pages)/home/LandingPage";
import LpAbout from "./(pages)/home/LpAbout";
import LpLeadingCompanies from "./(pages)/home/LpLeadingCompanies";

export default function Home() {
  return (
    <div className="w-full min-h-screen text-white py-5 space-y-10">
      <LandingPage />
      <LpAbout />
      <LpLeadingCompanies />
      <Footer />
    </div>
  );
}
