// import AwesomeSlider from 'react-awesome-slider';
// import withAutoplay from 'react-awesome-slider/dist/autoplay';
// import 'react-awesome-slider/dist/styles.css';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';


// const AutoplaySlider = withAutoplay(AwesomeSlider);


// const Banner = () => {
//     return (
//         <div>

//             <AutoplaySlider
//                 animation="cubeAnimation"
//                 play={true}
//                 cancelOnInteraction={false} // should stop playing on user interaction
//                 interval={6000}
//             >
//                 <div>
//                     <img src="https://i.ibb.co/XtQyY50/pexels-juan-salamanca-61129.jpg" alt="Image 1" />
//                 </div>
//                 <div>
//                     <img src="https://i.ibb.co/s2HdjK6/group-girls-camping-forest.jpg" alt="Image 2" />
//                 </div>
//                 <div>
//                     <img src="https://i.ibb.co/9gk0BDd/25791736-7139226.jpg" alt="Image 3" />
//                 </div>
//             </AutoplaySlider>


//         </div>
//     );
// };

// export default Banner;

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

import './Banner.css'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    return (
        <div>
            <AutoplaySlider
                animation="cubeAnimation"
                play={false}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={5000}
            >
                <div>
                    <img
                        src="https://i.ibb.co/J72gwbk/toomas-tartes-Yizrl9-N-e-DA-unsplash.jpg"
                        alt="Image 1"
                    />
                    <div className="text-overlay">
                        <h2 className='text-white-800 text-2xl lg:text-4xl font-bold uppercase text-amber-400'>Explore Your Camping <br /> <span className='text-slate-950 font-bold'>Like an Adventure!!</span></h2>
                        <hr />
                    </div>
                </div>
                <div>
                    <img
                        src="https://i.ibb.co/2y7bQmT/luke-porter-m-GFJIUD9yi-M-unsplash.jpg"
                        alt="Image 2"
                    />
                </div>
                
                <div>
                    <img
                        src="https://i.ibb.co/TTm0Lvr/artem-kniaz-Dqg-MHzeio7g-unsplash.jpg"
                        alt="Image 3"
                    />
                </div>
                <div>
                    <img
                        src="https://i.ibb.co/Btpy6Zf/stephen-leonardi-6-E6o-Mx-69-Ns-unsplash.jpg"
                        alt="Image 2"
                    />
                </div>
                <div>
                    <img
                        src="https://i.ibb.co/s2HdjK6/group-girls-camping-forest.jpg"
                        alt="Image 2"
                    />
                </div>
                
                
            </AutoplaySlider>
        </div>
    );
};

export default Banner;
