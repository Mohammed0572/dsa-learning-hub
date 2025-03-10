import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun, ChevronDown, Linkedin, Instagram, Twitter, Facebook, BookOpen, Code2, Home } from 'lucide-react';
import Program1 from './components/Program1';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const programs = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Program ${i + 1}${i === 4 ? 'A' : i === 5 ? 'B' : ''}`,
    href: `/program-${i + 1}`,
  }));

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <nav className={`fixed w-full z-50 transition-all duration-300 ${
            isNavbarScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link to="/" className="text-2xl font-bold text-orange-500">DSA Learning Hub</Link>
                
                <div className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="flex items-center space-x-1 hover:text-orange-500 transition-colors">
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link to="/notes" className="flex items-center space-x-1 hover:text-orange-500 transition-colors">
                    <BookOpen size={18} />
                    <span>Study Notes</span>
                  </Link>
                  
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
                    >
                      <Code2 size={18} />
                      <span>Programs & Outputs</span>
                      <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                        {programs.map((program) => (
                          <Link
                            key={program.id}
                            to={program.href}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {program.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/program-1" element={<Program1 />} />
            <Route path="/" element={
              <section className="pt-32 pb-20 px-4 text-center" id="home">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                    Master Data Structures & Algorithms
                  </h2>
                  <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                    Explore comprehensive study materials and coding programs to ace DSA.
                  </p>
                  <Link
                    to="/notes"
                    className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Get Started
                  </Link>
                </div>
              </section>
            } />
          </Routes>

          <footer className="bg-white/10 backdrop-blur-lg py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="mb-6">&copy; 2025 DSA Learning Hub</p>
              <div className="flex justify-center space-x-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
