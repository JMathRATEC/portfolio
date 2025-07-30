import { motion } from 'framer-motion';

const Test = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    Teste Inertia
                </h1>
                <p className="text-xl text-gray-300">
                    Se você está vendo esta página, o Inertia está funcionando!
                </p>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mt-8"
                />
            </motion.div>
        </div>
    );
};

export default Test; 