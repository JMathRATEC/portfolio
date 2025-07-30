import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const PortfolioNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '#home', label: 'Início' },
        { href: '#about', label: 'Sobre' },
        { href: '#projects', label: 'Projetos' },
        { href: '#contact', label: 'Contato' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' 
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo com Foto */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400"
                        >
                            <img 
                                src="/images/profile.jpg" 
                                alt="João Matheus" 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/40x40/22d3ee/ffffff?text=JM';
                                }}
                            />
                        </motion.div>
                        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            João Matheus
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, color: '#22d3ee' }}
                                onClick={() => scrollToSection(item.href)}
                                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                        opacity: isOpen ? 1 : 0,
                        height: isOpen ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-4 space-y-4">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                onClick={() => scrollToSection(item.href)}
                                className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default PortfolioNav; 