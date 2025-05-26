"use client";
import { auth } from "../../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const GoogleSignInButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      alert(`Google Sign-in failed: ${error.message}`);
    }
  };

  return (
     <motion.button
            whileHover={{ scale: 1.05, borderColor: '#d1d5db' }} // Added hover effect
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-6 border rounded-xl shadow-md transition-all duration-300
                       bg-white hover:bg-gray-100 text-gray-800 font-semibold
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border-gray-300" // Changed border color
        >
            <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-6 w-6"
            />
            <span className="text-base">Sign in with Google</span>
        </motion.button>
  );
};

export default GoogleSignInButton;
