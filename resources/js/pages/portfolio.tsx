import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import { 
    Github, 
    Linkedin, 
    Mail, 
    Code, 
    Database, 
    Globe, 
    Smartphone,
    ArrowRight,
    ExternalLink
} from 'lucide-react';
import PortfolioNav from '../components/portfolio-nav';
import ParticlesBackground from '../components/particles-background';
import SmoothScroll from '../components/smooth-scroll';
import LoadingScreen from '../components/loading-screen';
import ScrollToTop from '../components/scroll-to-top';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link: string;
    github?: string;
}

interface Skill {
    name: string;
    icon: React.ReactNode;
    level: 'Avançado' | 'Intermediário' | 'Básico';
    experience: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Sistema de Agendamento Online",
        description: "Sistema completo para clínicas médicas com agendamento online, gestão de pacientes, histórico médico e notificações automáticas",
        image: "/images/project1.jpg",
        technologies: ["React", "Laravel", "MySQL", "WebSocket", "API REST"],
        link: "",
        github: ""
    },
    {
        id: 2,
        title: "Plataforma de Eventos Online",
        description: "Sistema de eventos online e presenciais com integração ao gateway de pagamento Asaas, gestão de ingressos e streaming ao vivo",
        image: "/images/project2.jpg",
        technologies: ["React", "Node.js", "Socket.io", "Asaas API", "WebRTC"],
        link: "",
        github: ""
    },
    {
        id: 3,
        title: "Streaming de Cursos",
        description: "Plataforma de streaming educacional com sistema de assinaturas, progresso do aluno, certificados e conteúdo em vídeo",
        image: "/images/project3.jpg",
        technologies: ["React", "Laravel", "MySQL", "Video Streaming", "AWS S3"],
        link: "",
        github: ""
    },
    {
        id: 4,
        title: "Sistema Imobiliário",
        description: "Sistema completo de compra e venda de imóveis com cadastro de propriedades, busca avançada e gestão de clientes",
        image: "/images/project4.jpg",
        technologies: ["React", "Laravel", "MySQL", "Geolocalização", "API REST"],
        link: "",
        github: ""
    },
    {
        id: 5,
        title: "Hub Versão Holística",
        description: "Desenvolvimento e manutenção de plataformas web utilizando PHP, WordPress e SQL para criar soluções robustas e eficazes",
        image: "/images/project5.jpg",
        technologies: ["PHP", "WordPress", "SQL", "JavaScript", "CSS"],
        link: "",
        github: ""
    },
    {
        id: 6,
        title: "Sistema Fator3",
        description: "Desenvolvimento fullstack de sistemas abrangentes utilizando JavaScript, React, Vue3, Node.js, PostgreSQL e TypeScript",
        image: "/images/project6.jpg",
        technologies: ["React", "Vue3", "Node.js", "PostgreSQL", "TypeScript"],
        link: "",
        github: ""
    },
    {
        id: 7,
        title: "Aplicação Stridek",
        description: "Desenvolvimento de aplicações web dinâmicas e responsivas utilizando React, Nuxt.js, Firebase e Vuetify",
        image: "/images/project7.jpg",
        technologies: ["React", "Nuxt.js", "Firebase", "Vuetify", "Vue.js"],
        link: "",
        github: ""
    },
    {
        id: 8,
        title: "Plataforma Ibrapsi",
        description: "Criação e aprimoramento de sites e ferramentas para plataforma de cursos online utilizando WordPress e PHP",
        image: "/images/project8.jpg",
        technologies: ["WordPress", "PHP", "MySQL", "JavaScript", "CSS"],
        link: "",
        github: ""
    },
    {
        id: 9,
        title: "Otimização Zaya Software",
        description: "Otimização de aplicação Laravel/Vue com redução de tempo de consulta de 5 minutos para 1 minuto e 40 segundos",
        image: "/images/project9.jpg",
        technologies: ["Laravel", "Vue.js", "MySQL", "Performance", "Otimização"],
        link: "",
        github: ""
    },
    {
        id: 10,
        title: "Sistema Kolabs",
        description: "Desenvolvimento de sistemas web utilizando Next.js, React e integrações com APIs externas",
        image: "/images/project10.jpg",
        technologies: ["Next.js", "React", "APIs", "TypeScript", "Node.js"],
        link: "",
        github: ""
    },
    {
        id: 11,
        title: "2UP Systems",
        description: "Sistema para gerenciamento de projetos e manutenção com controle de versão e colaboração em equipe",
        image: "/images/project11.jpg",
        technologies: ["Laravel", "React", "MySQL", "GitHub", "Git"],
        link: "",
        github: ""
    },
    {
        id: 12,
        title: "Sistema Hotsales",
        description: "Melhoria e correção de bugs no sistema de vendas da empresa com integração AWS e APIs REST",
        image: "/images/project12.jpg",
        technologies: ["Laravel", "Docker", "MySQL", "JavaScript", "AWS"],
        link: "",
        github: ""
    }
];

const skills: Skill[] = [
    { name: "React", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "4+ anos" },
    { name: "Laravel", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "3+ anos" },
    { name: "Node.js", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "3+ anos" },
    { name: "Vue.js", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "3+ anos" },
    { name: "TypeScript", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "3+ anos" },
    { name: "JavaScript", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "5+ anos" },
    { name: "Next.js", icon: <Code className="w-6 h-6" />, level: "Avançado", experience: "3+ anos" },
    { name: "MySQL", icon: <Database className="w-6 h-6" />, level: "Avançado", experience: "4+ anos" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, level: "Intermediário", experience: "1+ ano" },
    { name: "WordPress", icon: <Globe className="w-6 h-6" />, level: "Intermediário", experience: "2+ anos" },
    { name: "APIs REST", icon: <Globe className="w-6 h-6" />, level: "Avançado", experience: "4+ anos" },
    { name: "AWS", icon: <Globe className="w-6 h-6" />, level: "Básico", experience: "1+ ano" },
    { name: "Docker", icon: <Smartphone className="w-6 h-6" />, level: "Básico", experience: "1+ ano" }
];

const Portfolio = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <LoadingScreen />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
                <SmoothScroll />
                <PortfolioNav />
                <ScrollToTop />
            
            {/* Cursor personalizado */}
            <motion.div
                className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Partículas de fundo */}
                <ParticlesBackground />

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                    {/* Foto do Perfil */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1"
                            />
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800">
                                <img 
                                    src="/images/profile.jpg" 
                                    alt="João Matheus" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/128x128/22d3ee/ffffff?text=JM';
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                    >
                        <TypeAnimation
                            sequence={[
                                'Transformo ideias em experiências digitais',
                                2000,
                                'Criando soluções web inovadoras',
                                2000,
                                'Desenvolvimento fullstack moderno',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-300 mb-8"
                    >
                        Desenvolvedor Fullstack especializado em criar experiências digitais únicas
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 cursor-pointer"
                        >
                            Ver Projetos
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 cursor-pointer"
                        >
                            Entre em Contato
                        </motion.a>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Sobre Section */}
            <section id="about" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Sobre Mim
                        </h2>
                                                 <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                             Sou João Matheus, um desenvolvedor fullstack com ampla experiência em sistemas empresariais. 
                             Trabalhei em empresas como Fator3, Stridek, Zaya Software, Kolabs, 2UP Systems e Hotsales, 
                             desenvolvendo soluções com React, Laravel, Vue.js, Node.js, TypeScript e PostgreSQL. 
                             Especializado em otimização de performance e integração com APIs, busco sempre entregar 
                             sistemas robustos que agreguem valor real aos negócios.
                         </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                            >
                                                                 <div className="flex items-center justify-center mb-4 text-cyan-400">
                                     {skill.icon}
                                 </div>
                                 <h3 className="text-lg font-semibold text-center mb-3">{skill.name}</h3>
                                 <div className="flex flex-col items-center gap-2">
                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                         skill.level === 'Avançado' 
                                             ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                             : skill.level === 'Intermediário'
                                             ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                             : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                     }`}>
                                         {skill.level}
                                     </span>
                                     <p className="text-sm text-gray-400 text-center">{skill.experience}</p>
                                 </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projetos Section */}
            <section id="projects" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Projetos
                        </h2>
                                                 <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                             Experiências profissionais em diversas empresas, demonstrando expertise em múltiplas tecnologias e domínios de negócio
                         </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, rotateY: 5 }}
                                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-500"
                            >
                                                                 <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                     <div className="text-6xl text-cyan-400 opacity-50">
                                         {project.id === 1 && "🏥"}
                                         {project.id === 2 && "🎫"}
                                         {project.id === 3 && "📚"}
                                         {project.id === 4 && "🏠"}
                                         {project.id === 5 && "🌐"}
                                         {project.id === 6 && "⚡"}
                                         {project.id === 7 && "🚀"}
                                         {project.id === 8 && "🎓"}
                                         {project.id === 9 && "⚡"}
                                         {project.id === 10 && "🔧"}
                                         {project.id === 11 && "📊"}
                                         {project.id === 12 && "💰"}
                                     </div>
                                 </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                                                         <div className="flex items-center justify-center pt-4">
                                         <span className="text-sm text-gray-400 italic">
                                             Projeto Corporativo
                                         </span>
                                     </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contato Section */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            Vamos Conversar?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Estou sempre aberto a novos projetos e oportunidades. 
                            Entre em contato e vamos criar algo incrível juntos!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <motion.a
                            href="mailto:j.matheusalbuquerque1@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                        >
                            <Mail className="w-5 h-5" />
                            Enviar Email
                        </motion.a>

                                                 <motion.a
                             href="https://www.linkedin.com/in/joao-matheus-engsoftware/"
                             target="_blank"
                             rel="noopener noreferrer"
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             className="flex items-center gap-3 px-8 py-4 border-2 border-blue-400 rounded-full font-semibold text-lg hover:bg-blue-400 hover:text-black transition-all duration-300"
                         >
                             <Linkedin className="w-5 h-5" />
                             LinkedIn
                         </motion.a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex justify-center gap-6 mt-12"
                    >
                        <motion.a
                            href="https://github.com/JMathRATEC"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all duration-300"
                        >
                            <Github className="w-6 h-6" />
                        </motion.a>

                                                 <motion.a
                             href="https://www.linkedin.com/in/joao-matheus-engsoftware/"
                             target="_blank"
                             rel="noopener noreferrer"
                             whileHover={{ scale: 1.1, y: -5 }}
                             className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300"
                         >
                             <Linkedin className="w-6 h-6" />
                         </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-400">
                        © 2024 João Matheus. Desenvolvido com ❤️ e muito café ☕
                    </p>
                </div>
            </footer>
        </div>
        </>
    );
};

export default Portfolio; 