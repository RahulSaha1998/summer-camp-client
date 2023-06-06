import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import reg from '../../../public/reg.json';
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Register = () => {
    const {registerUser, updateUserData, logOut} = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        setIsButtonDisabled(watch("password") !== watch("c_password"));
    }, [watch("password"), watch("c_password")]);

    const onSubmit = (data) => {
        console.log(data);
        registerUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserData(data.name, data.photoURL);
                logOut()
                Swal.fire({
                    position: 'top-bottom',
                    icon: 'success',
                    title: 'Registration Successful!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/login')
        })
    };

    return (
        <div className="grid md:grid-cols-2 mx-auto">
            <div>
                <h2>
                    <Lottie animationData={reg}></Lottie>
                </h2>
            </div>
            <div className="hero">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Register Here!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="name"
                                    name="name"
                                    className="input input-bordered"
                                />
                                
                            </div>
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
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL")}
                                    placeholder="Photo URL"
                                    name="photoURL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 15,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 15 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase and one special character.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("c_password")}
                                    placeholder="password"
                                    name="c_password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" disabled={isButtonDisabled}>
                                    Sign up
                                </button>
                            </div>
                        </form>
                        <p className="my-4 text-center">
                            Already have an account?
                            <Link
                            className="text-orange-600 font-bold" to="/login">
                                Login
                            </Link>{" "}
                        </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Register;