"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { motion } from 'framer-motion';
import { onAuthStateChanged } from "firebase/auth"; // make sure this is imported

const SuccessPage = () => {
  const router = useRouter();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);

      try {
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // Create the user document if it doesn't exist
          await setDoc(userRef, { hasPaid: true });
          console.log("User document created and payment status set.");
        } else {
          // If it exists, just update the payment status
          await updateDoc(userRef, { hasPaid: true });
          console.log("Payment status updated.");
        }
      } catch (error) {
        console.error("Error handling payment status:", error);
      }
    } else {
      console.warn("No user is signed in.");
    }
  });

  return () => unsubscribe();
}, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex flex-col items-center justify-center text-center p-4 sm:p-6"
    >
      <motion.div variants={titleVariants} className="flex items-center justify-center mb-8">
        <svg
          className="w-16 h-16 text-green-600 fill-current mr-4"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-700 tracking-tight">
          Success!
        </h1>
      </motion.div>
      <motion.p
        variants={paragraphVariants}
        className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl"
      >
        Your payment was successful, and you now have full access to our application.  Enjoy the enhanced experience!
      </motion.p>
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <button
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl
                     transition-all duration-300 text-lg sm:text-xl font-semibold border-2 border-transparent
                     hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPage;
