"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
    };

    const buttonVariants = {
        hover: { scale: 1.03 },
        tap: { scale: 0.98 }
    };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-50 p-4"
    >
      <div
        className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-md"
      >
        <motion.h2
          variants={formVariants}
          className="text-3xl font-semibold mb-8 text-center text-gray-800 tracking-tight"
        >
          <svg className="inline-block w-8 h-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V8.25a4.5 4.5 0 00-9 0v2.25h9zm-7.5 0h6M8.25 17.25h.001v.001h.001v-.001H8.25zm3 0h.001v.001h.001v-.001H11.25zm3 0h.001v.001h.001v-.001H14.25z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.25c-1.866 0-3.375-1.5-3.375-3.375 0-.828.241-1.603.66-2.25H6.625c-.384 0-.75.241-.9.602-.3 1.08-.502 2.364-.502 3.652 0 3.375 2.73 6.125 6.125 6.125 3.375 0 6.125-2.73 6.125-6.125 0-1.288-.202-2.572-.502-3.652-.15-.361-.515-.602-.9-.602h-1.615c.418.647.66 1.422.66 2.25 0 1.875-1.509 3.375-3.375 3.375z" />
          </svg>
          Forgot Password
        </motion.h2>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleReset}
          className="space-y-6"
        >
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {message}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors duration-300
                         disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </motion.div>
        </motion.form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </motion.div>
  );
}
