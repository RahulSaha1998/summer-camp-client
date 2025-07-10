import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
const useCart = () => {
    const { user, loading } = useAuth();
    const token = localStorage.getItem('access-token');
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://summer-camp-server-main.vercel.app/carts?email=${user?.email}`, { headers: {
                authorization: `bearer ${token}`
            }})
            return res.json();
        },
    })

    return [cart, refetch]

}
export default useCart;
