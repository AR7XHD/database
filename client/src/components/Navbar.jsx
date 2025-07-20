import React from 'react';

// Tailwind styled navigation bar with brand and basic links
export default function Navbar() {
  return (
    <nav className="z-50 sticky top-4 mx-4 mt-4 flex items-center justify-between rounded-xl border border-green-400/20 bg-gray-900/80 px-6 py-3 text-white backdrop-blur-md shadow-lg shadow-green-400/10 transition-all hover:shadow-green-400/20">
      <div className="font-bold">{'<'}<span className="text-green-400">PassOP</span>{'/>'}</div>
      <ul className="flex gap-6 text-sm">
        <li><a className="hover:text-green-300" href="#home">Home</a></li>
        <li><a className="hover:text-green-300" href="#about">About</a></li>
        <li><a className="hover:text-green-300" href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
