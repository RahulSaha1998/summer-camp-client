import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading]= useAdmin()
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }
    
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace={true}></Navigate>;
};

export default AdminRoute;