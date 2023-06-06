import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import login from '../../../public/121421-login.json';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
    const {signIn} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        console.log(data);
        signIn(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
        })
    };

    return (
        <div className="grid md:grid-cols-2 mx-auto">
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login Please!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("email")}
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            New to this site?
                            <Link className="text-orange-600 font-bold" to="/register">
                                 Signup
                            </Link>
                        </p>
                        {/* <SocialLogin></SocialLogin> */}
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    <Lottie animationData={login}></Lottie>
                </h2>
            </div>
        </div>
    );
};

export default Register;