import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">
            Moazzam<span className="text-orange-500">.</span>
          </div>
          <p className="text-slate-300 mb-6 max-w-md mx-auto">
            Computer Science Student & Developer passionate about creating innovative solutions.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={16} />
            <span>by <span className="text-orange-500">Moazzam Azam</span></span>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </div>
          <a className="text-orange-500 hover:underline" href="mailto:moazzam@example.com">moazzam@example.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;