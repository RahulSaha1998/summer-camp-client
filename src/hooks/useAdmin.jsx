import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem('access-token');
    // console.log(token);

    // use axios secure with react query
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            if (user?.email) {
                const res = await axios.get(`https://summer-camp-server-main.vercel.app/users/admin/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${token}`
                    }
                });

                return res.data.admin;
            }
            return false;
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin;