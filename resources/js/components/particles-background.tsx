import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
}

const ParticlesBackground = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Criar partículas iniciais
        const initialParticles: Particle[] = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        setParticles(initialParticles);

        // Atualizar posição do mouse
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animação das partículas
        const animateParticles = () => {
            setParticles(prev => 
                prev.map(particle => {
                    let newY = particle.y - particle.speed;
                    let newX = particle.x;

                    // Resetar partícula quando sair da tela
                    if (newY < -10) {
                        newY = window.innerHeight + 10;
                        newX = Math.random() * window.innerWidth;
                    }

                    // Efeito de atração pelo mouse
                    const dx = mousePosition.x - particle.x;
                    const dy = mousePosition.y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        newX += dx * force * 0.01;
                        newY += dy * force * 0.01;
                    }

                    return {
                        ...particle,
                        x: newX,
                        y: newY,
                    };
                })
            );
        };

        const interval = setInterval(animateParticles, 50);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, [mousePosition]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: particle.x,
                        top: particle.y,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
            
            {/* Linhas de conexão */}
            {particles.slice(0, 20).map((particle, index) => {
                const nextParticle = particles[index + 1];
                if (!nextParticle) return null;

                const distance = Math.sqrt(
                    Math.pow(particle.x - nextParticle.x, 2) + 
                    Math.pow(particle.y - nextParticle.y, 2)
                );

                if (distance < 150) {
                    return (
                        <motion.div
                            key={`line-${particle.id}`}
                            className="absolute bg-gradient-to-r from-cyan-400/20 to-purple-500/20"
                            style={{
                                left: particle.x,
                                top: particle.y,
                                width: distance,
                                height: 1,
                                transformOrigin: 'left center',
                                transform: `rotate(${Math.atan2(nextParticle.y - particle.y, nextParticle.x - particle.x)}rad)`,
                                opacity: 1 - distance / 150,
                            }}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ParticlesBackground; 