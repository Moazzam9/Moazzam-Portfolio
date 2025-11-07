import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            Moazzam<span className="text-orange-500">.</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Computer Science Student & Developer passionate about creating innovative solutions.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={16} />
            <span>by <span className="text-orange-500">Moazzam Azam</span></span>
          </div>
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          <a 
            className="mt-2 inline-block text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors" 
            href="mailto:moazzamkk13@gmail.com"
          >
            moazzamkk13@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;