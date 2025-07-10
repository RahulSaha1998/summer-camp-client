import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SocialLogin = () => {

    const [role, setRole] = useState("student");
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { signInWGoogle,
    } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role }
                fetch('https://summer-camp-server-main.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'top-bottom',
                            icon: 'success',
                            title: 'Successfully Login!',
                            showConfirmButton: false,
                            timer: 2000
                        })
                        navigate(from, { replace: true });
                    })
            })
            .catch(error => console.log(error))

    }


    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-info">
                    <FaGoogle className='m-1' />
                    signin with google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;