"use client";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const CancelPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center text-center p-4"
    >
      <motion.div
        variants={titleVariants}
        className="flex items-center justify-center gap-4"
      >
        <svg
          className="w-12 h-12 text-red-600 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L12 3.656l-7.59 15.344c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-700 tracking-tight">
          Payment Canceled
        </h1>
      </motion.div>

      <motion.p
        variants={paragraphVariants}
        className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl"
      >
        We're sorry to hear you've canceled your payment.  Don't worry, you can easily retry the process at any time.  We're here to help you get access to our amazing features whenever you're ready.
      </motion.p>
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <button
          onClick={() => router.push("/pricing")}
          className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl
                    transition-all duration-300 text-lg sm:text-xl font-semibold border-2 border-transparent
                    hover:from-indigo-600 hover:to-purple-700"
        >
          Return to Pricing
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CancelPage;
