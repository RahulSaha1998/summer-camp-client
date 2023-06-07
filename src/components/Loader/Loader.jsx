import Lottie from "lottie-react";
import loading from '../../../public/95634-spinner-loader.json'

const Loader = () => {
    return (
        <div className='m-4'>
            <Lottie className='w-52 mx-auto' animationData={loading}></Lottie>
        </div>
    );
};

export default Loader;