import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1921 }, items: 1 },
    desktop: { breakpoint: { max: 1920, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const CustomLeftArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary text-base-100 rounded-full p-2 z-10 hover:bg-opacity-90"
        aria-label="Previous Slide"
    >
        ‹
    </button>
);

const CustomRightArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-base-100 rounded-full p-2 z-10 hover:bg-opacity-90"
        aria-label="Next Slide"
    >
        ›
    </button>
);

const BannerSlider = () => {
    return (
        <div className="bg-base-100">
            <Carousel
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={5000}
                keyBoardControl
                showDots
                pauseOnHover
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
            >
                <Slide1 />
                <Slide2 />
                <Slide3 />
                <Slide4 />
            </Carousel>
        </div>
    );
};

export default BannerSlider;