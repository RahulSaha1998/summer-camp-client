import { NavLink, Outlet } from "react-router-dom";
import { FaPlusCircle, FaSave, FaUsers } from 'react-icons/fa'
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {


    // const isAdmin = true;
    const isInstructor = true;
    const [isAdmin] = useAdmin();


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side bg-pink-400">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80">
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/admin/home' className='font-semibold'><FaPlusCircle />Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/admin/manageClass' className='font-semibold'><FaPlusCircle />Manage class</NavLink></li>
                            <li><NavLink to='/dashboard/admin/manageUsers' className='font-semibold'><FaUsers />Manage Users</NavLink></li>
                        </>
                            : isInstructor ? <>

                            </>
                                : <>
                                    <li><NavLink to='/dashboard/instructor/addClass' className='font-semibold'><FaPlusCircle />Add a class</NavLink></li>
                                    <li><NavLink to='/dashboard/instructor/myClass' className='font-semibold'><FaSave />My Class</NavLink></li>
                                </>
                    }


                    <div className="divider"></div>

                    <li> <NavLink className='font-semibold' to="/">Home</NavLink> </li>
                    <li> <NavLink className='font-semibold' to="/instructors">Instructors</NavLink> </li>
                    <li> <NavLink className='font-semibold' to="/classes">Classes</NavLink> </li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;