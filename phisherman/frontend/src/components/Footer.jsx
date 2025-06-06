import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 mt-6 text-sm">
      <p className="text-gray-500 dark:text-gray-400 transition duration-300">
        Based on the work of <span className="text-red-500"></span> by{" "}
        <a
          href="https://github.com/jfmaes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          jfmaes 
        </a>
        enriched by {" "}
        <a
          href="https://github.com/MrSud0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          jfmaes 
        </a>      
      </p>
    </footer>
  );
};

export default Footer;
