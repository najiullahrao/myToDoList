"use client";
import { useState } from "react";
import { auth } from "../../lib/firebase";
import { motion } from 'framer-motion';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ email: auth.currentUser?.email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed");
      setLoading(false);
    }
  };

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
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

    const descriptionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeInOut" },
      },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl text-center space-y-8">
        <motion.h1
          variants={titleVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700"
        >
          Upgrade to Premium
        </motion.h1>
        <motion.p
          variants={descriptionVariants}
          className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto"
        >
          Unlock the full potential of our app with a one-time payment. Enjoy
          unlimited access to all features and experience a seamless workflow.
        </motion.p>

        <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M24 12c0 1.69-1.34 3-3 3s-3-1.31-3-3s1.34-3 3-3s3 1.31 3 3z" />
            </svg>
            <h2 className="text-3xl font-semibold text-gray-900">Premium Access</h2>
          </div>
          <p className="text-xl text-gray-700">
            One-time payment for lifetime access
          </p>
          <div className="flex items-center gap-2 text-green-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-lg font-medium">All current features</span>
          </div>
          <div className="flex items-center gap-2 text-green-600">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-lg font-medium">All future updates</span>
          </div>
           <div className="flex items-center gap-2 text-green-600">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-lg font-medium">Priority support</span>
          </div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 rounded-full text-lg font-semibold
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Pay Now - $59.99"
              )}
            </button>
          </motion.div>
          <p className="text-sm text-gray-500">
            Secure checkout. You will be redirected to our payment provider.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
