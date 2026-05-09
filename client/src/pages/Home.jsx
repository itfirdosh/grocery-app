import Category from "../component/Category";
import Hero from "../component/Hero";
import BestSeller from "../component/BestSeller";
import NewsLetter from "../component/NewsLetter";
import ProductDetails from "./ProductDetails";




const Home = () => {
  return (
    <div className="mt-10">
    <Hero />
    <Category/>
    <BestSeller />
    <NewsLetter />
    <ProductDetails />
    </div>
  )
}

export default Home

