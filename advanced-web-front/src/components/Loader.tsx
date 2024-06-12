import React from 'react';

const Loader = () => {
  return (
    <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 animate-pulse">
      <style jsx>{`
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
