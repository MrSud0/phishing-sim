import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 mt-6 text-sm">
      <p className="text-gray-500 dark:text-gray-400 transition duration-300">
        Based on the work of <span className="text-red-500"></span> {" "}
        <a
          href="https://github.com/jfmaes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-300 hover:underline dark:text-emerald-300"
        >
          jfmaes 
        </a>
        <br />
        Enriched by {" "}
        <a
          href="https://github.com/MrSud0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-300 hover:underline dark:text-emerald-300"
        >
        MrSud0 
        </a>      
      </p>
    </footer>
  );
};

export default Footer;
