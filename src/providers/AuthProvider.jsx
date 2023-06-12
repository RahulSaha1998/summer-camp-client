import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserData = (name, photoURL) => {
        updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
            .then(() => {
                console.log('user profile updated')
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const signInWGoogle = () => {
        return signInWithPopup(auth, googleAuthProvider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                axios.post('https://summer-camp-server-side-five.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);

                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false);
            }

        });
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        registerUser,
        signIn,
        logOut,
        updateUserData,
        signInWGoogle

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;