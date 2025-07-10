import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


const Main = () => {
    return (
        <div>
            <div className='w-[80%] mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            <div className='mt-5'>
                <Footer></Footer>
            </div>
        </div>
        </div>
    );
};

export default Main;