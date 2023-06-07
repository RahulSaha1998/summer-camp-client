// import Banner from "../Banner/Banner";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Loader from "../Loader/Loader";

const Home = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
           {/* <Banner></Banner> */}
        </div>
    );
};

export default Home;