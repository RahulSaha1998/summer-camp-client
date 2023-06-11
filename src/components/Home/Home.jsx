
import Loader from "../Loader/Loader";
import Banner from "../Banner/Banner";
import useAuth from "../../hooks/useAuth";
import DarkMode from "../../DarkMode/DarkMode";
import PopularClass from "../PopularClass/PopularClass";

const Home = () => {

    const { loading } = useAuth();

    if (loading) {
        return <Loader></Loader>
    }

    return (
        <>
            <div>
                <Banner></Banner>
            </div>
            <div className="mt-5">
                <PopularClass></PopularClass>
            </div>
        </>

    );
};

export default Home;