import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <div>
            {/* <Carousel className="text-center">
                <div>
                    <img className="rounded-lg" src={img1} />
                </div>
                <div>
                    <img className="rounded-lg" src={img2} />
                </div>
                <div>
                    <img className="rounded-lg" src={img3} />
                </div>
            </Carousel> */}
            <Carousel
                showThumbs={false}
                autoPlay={false}
                infiniteLoop={true}
                interval={3000}
            >
                <div>
                    <img src="https://i.ibb.co/XtQyY50/pexels-juan-salamanca-61129.jpg" alt="Image 1" />
                </div>
                <div>
                    <img src="https://i.ibb.co/s2HdjK6/group-girls-camping-forest.jpg" alt="Image 2" />
                </div>
                <div>
                    <img src="https://i.ibb.co/9gk0BDd/25791736-7139226.jpg" alt="Image 3" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;