import { Helmet } from 'react-helmet-async';
import BannerSlider from "../../Components/BannerSlider/BannerSlider";
import FAQSection from "../../Components/FAQSection/FAQSection";
import FavoriteReadsSection from "../../Components/FavoriteReadsSection/FavoriteReadsSection";
import FeaturedCategories from "../../Components/FeaturedCategories/FeaturedCategories";
import PopularBooks from "../../Components/PopularBooks/PopularBooks";

const Home = () => {
    return (
        <div className="space-y-16 lg:space-y-24">
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Explore top books, featured categories, and favorite reads on our homepage." />
            </Helmet>

            <BannerSlider></BannerSlider>
            <PopularBooks></PopularBooks>
            <FeaturedCategories></FeaturedCategories>
            <FAQSection></FAQSection>
            <FavoriteReadsSection></FavoriteReadsSection>
        </div>
    );
};

export default Home;