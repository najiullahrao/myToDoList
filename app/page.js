const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1
          className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight drop-shadow-lg"
        >
          <svg
            className="inline-block w-16 h-16 sm:w-20 sm:h-20 mr-4 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          TaskMaster
        </h1>

        <p
          className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light"
        >
          Harness the power of cosmic organization. TaskMaster transcends conventional to-do lists, offering an intuitive interface to structure your reality.
        </p>

        <div
          className="flex justify-center gap-6"
        >
          <a
            href="/login"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full shadow-2xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-2
                       border-2 border-purple-500/30 hover:border-purple-500/50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3l4 4-4 4h-7m9 9H4a2 2 0 01-2-2v-1l1-1m5 6v-2a3 3 0 00-3-3H6m3 6H9a3 3 0 003-3v-2m0 0l-1-1v-1m3 1l1 1v1m-3-3v-2a2 2 0 00-2-2H2z"
              />
            </svg>
            Enter the Nexus
          </a>
          <a
            href="/signup"
            className="px-8 py-3 bg-transparent text-gray-200 font-semibold rounded-full shadow-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2
                       border-2 border-gray-700 hover:border-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h6l2 2h6a2 2 0 012 2v7a2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 17v-4"
              />
            </svg>
            Initiate Protocol
          </a>
        </div>

        <div
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 text-sm">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 mb-2 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0-13c0 1.105-1.008 2-2 2s-2-.895-2-2V5a2 2 0 114 0v3z"
                />
              </svg>
              <span className="font-mono">User Capacity: ∞</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 mb-2 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono">Quantum Encryption</span>
            </div>
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 mb-2 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l-4 4-4-4M6 16v4h12v-4"
                />
              </svg>
              <span className="font-mono">Adaptive AI Core</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
