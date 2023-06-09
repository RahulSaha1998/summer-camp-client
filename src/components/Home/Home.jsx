
import Loader from "../Loader/Loader";
import Banner from "../Banner/Banner";
import useAuth from "../../hooks/useAuth";
import DarkMode from "../../DarkMode/DarkMode";

const Home = () => {

    const { loading } = useAuth();

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <>
        <div>
            <DarkMode></DarkMode>
        </div>
            <div>
                <div>
                    <Banner></Banner>
                </div>
            </div>
        </>

    );
};

export default Home;