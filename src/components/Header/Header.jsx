import { Link } from 'react-router-dom';


const Header = () => {

   


    const navItems = <>
        
        <li> <Link className='font-semibold' to="/">Home</Link> </li>
        <li> <Link className='font-semibold' to="/allToys">Instructors</Link> </li>
        <li> <Link className='font-semibold' to="/myToys">Dashboard</Link> </li>
    </>

    const btn = <>
        <button className='btn btn-info'>Log out</button>
    </>
// fixed z-10 bg-opacity-30
    return (
        <div className="navbar z-10 bg-opacity-30 h-28 mb-4 rounded-lg shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                        {btn}
                    </ul>
                </div>

                <div className='flex items-center'>
                    
                    <div className='w-14 lg:w-52'>
                        <h2 className='font-bold lg:text-3xl'>SUMMER <span className='text-red-600 font-semibold'>CAMP</span></h2>
                    </div>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login'><button className='btn btn-outline btn-primary'>Login</button></Link>
            </div>
        </div>

    );
};

export default Header;