import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, User, Code, Briefcase, FileText, Download, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { CertificationsSection } from '@/components/CertificationsSection';
import { TimelineExperience } from '@/components/TimelineExperience';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [clickRipples, setClickRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Animation refs
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const flowLinesRef = useRef<HTMLDivElement[]>([]);
  const binaryRef = useRef<HTMLDivElement[]>([]);
  const barChartRef = useRef<HTMLDivElement>(null);
  const scatterPlotRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClickRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    };
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Enhanced scroll animations
      orbsRef.current.forEach((orb, i) => {
        if (orb) {
          const translateY = (currentScrollY * (0.3 + i * 0.05)) % window.innerHeight;
          const translateX = Math.sin(Date.now() * 0.001 + i) * 30 + (currentScrollY * 0.02);
          const rotate = currentScrollY * 0.1 + i * 30;
          const scale = 1 + Math.sin(Date.now() * 0.002 + i) * 0.2;
          
          orb.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`;
          orb.style.opacity = (0.3 + Math.sin(Date.now() * 0.003 + i) * 0.2).toString();
        }
      });

      // Enhanced neural network animations
      nodesRef.current.forEach((node, i) => {
        if (node) {
          const translateY = (currentScrollY * (0.4 + i * 0.02)) % (window.innerHeight + 100);
          const translateX = Math.sin(Date.now() * 0.002 + i) * 50;
          const scale = 1 + Math.sin(Date.now() * 0.003 + i) * 0.3;
          const glowIntensity = 5 + Math.sin(Date.now() * 0.004 + i) * 15;
          
          node.style.transform = `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`;
          node.style.opacity = (0.4 + Math.sin(Date.now() * 0.002 + i) * 0.4).toString();
          node.style.boxShadow = `0 0 ${glowIntensity}px rgba(6, 182, 212, 0.6), 0 0 ${glowIntensity * 2}px rgba(6, 182, 212, 0.3)`;
        }
      });

      // Enhanced data flow animations
      flowLinesRef.current.forEach((line, i) => {
        if (line) {
          const translateX = ((currentScrollY * 2 + i * 150) % (window.innerWidth + 300)) - 150;
          const opacity = Math.sin(Date.now() * 0.003 + i) * 0.4 + 0.5;
          const scaleX = 1 + Math.sin(Date.now() * 0.002 + i) * 0.3;
          
          line.style.transform = `translateX(${translateX}px) scaleX(${scaleX})`;
          line.style.opacity = opacity.toString();
        }
      });

      // Enhanced binary rain with color variations
      binaryRef.current.forEach((binary, i) => {
        if (binary) {
          const translateY = ((currentScrollY * 1.5 + i * 80) % (window.innerHeight + 200)) - 100;
          const opacity = Math.sin(Date.now() * 0.002 + i) * 0.5 + 0.4;
          const hue = (Date.now() * 0.01 + i * 30) % 360;
          
          binary.style.transform = `translateY(${translateY}px)`;
          binary.style.opacity = opacity.toString();
          binary.style.filter = `hue-rotate(${hue}deg)`;
          
          if (Math.random() > 0.97) {
            binary.textContent = Math.random() > 0.5 ? '1' : '0';
          }
        }
      });

      // Enhanced bar chart with pulse effects
      if (barChartRef.current) {
        const translateY = currentScrollY * 0.2;
        const rotate = Math.sin(Date.now() * 0.001) * 8;
        
        barChartRef.current.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
        
        const bars = barChartRef.current.children;
        for (let i = 0; i < bars.length; i++) {
          const bar = bars[i] as HTMLElement;
          const height = 20 + Math.sin(Date.now() * 0.003 + i) * 40 + 40;
          const pulse = 1 + Math.sin(Date.now() * 0.005 + i) * 0.2;
          
          bar.style.height = `${height}px`;
          bar.style.transform = `scaleY(${pulse})`;
          bar.style.opacity = (0.5 + Math.sin(Date.now() * 0.002 + i) * 0.4).toString();
        }
      }

      // Enhanced scatter plot with magnetic effects
      if (scatterPlotRef.current) {
        const translateY = currentScrollY * 0.3;
        const translateX = Math.sin(Date.now() * 0.001) * 25;
        
        scatterPlotRef.current.style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;
        
        const points = scatterPlotRef.current.children;
        for (let i = 0; i < points.length; i++) {
          const point = points[i] as HTMLElement;
          const top = 20 + Math.sin(Date.now() * 0.002 + i * 0.5) * 50;
          const left = 20 + Math.cos(Date.now() * 0.003 + i * 0.7) * 30;
          const scale = 1 + Math.sin(Date.now() * 0.003 + i) * 0.5;
          
          point.style.top = `${top}px`;
          point.style.left = `${left}px`;
          point.style.transform = `scale(${scale})`;
          point.style.opacity = (0.6 + Math.sin(Date.now() * 0.002 + i) * 0.4).toString();
        }
      }

      // Enhanced parallax with depth layers
      parallaxRef.current.forEach((element, i) => {
        if (element) {
          const depth = 0.5 + i * 0.15;
          const translateY = currentScrollY * depth;
          const translateX = Math.sin(Date.now() * 0.001 + i) * 50;
          const rotate = Math.sin(Date.now() * 0.002 + i) * 10;
          const scale = 1 + Math.sin(Date.now() * 0.002 + i) * 0.4;
          
          element.style.transform = `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`;
          element.style.opacity = (0.4 + Math.sin(Date.now() * 0.002 + i) * 0.5).toString();
        }
      });

      // Enhanced grid with wave effects
      if (gridRef.current) {
        const offsetX = (currentScrollY * 0.5) % 80;
        const offsetY = (Math.sin(Date.now() * 0.001) * 20) % 80;
        const opacity = 0.1 + Math.sin(Date.now() * 0.001) * 0.15;
        
        gridRef.current.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
        gridRef.current.style.opacity = opacity.toString();
      }

      // Update active section
      const scrollPosition = currentScrollY + 200;
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'certifications', 'contact'];
      
      for (const section of sections) {
        const element = sectionsRef.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const animationLoop = () => {
      handleScroll();
      requestAnimationFrame(animationLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    
    animationLoop();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      emailjs.init('6m45tPkOYEyW_5B7l');

      const result = await emailjs.send(
        'service_btoh7la',
        'template_df6d7u7',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Mounika Avutu',
        },
        '6m45tPkOYEyW_5B7l'
      );

      console.log('Email sent successfully:', result);

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Experience data with locations
  const experienceData = [
    {
      title: "Sr Data Engineer",
      company: "Caprus it",
      location: "Frisco, TX",
      period: "Jan 2024 - Present",
      description: "Spearheaded development of a resource onboarding website using Snowflake, driving 25% increase in efficiency. Implemented ETL pipelines, optimized SQL queries in Snowflake resulting in 30% performance improvement. Utilized Azure Data Factory, DevOps, and AWS services for scalable solutions."
    },
    {
      title: "Data Engineer",
      company: "Infokeys",
      location: "Irving, TX",
      period: "Nov 2022 - Dec 2023",
      description: "Designed and optimized Databricks-based ETL pipelines for large-scale data across AWS S3 and Snowflake. Developed PySpark scripts improving processing efficiency by 40%. Integrated Snowflake with Tableau for dynamic reporting and analytics."
    },
    {
      title: "Data Engineer",
      company: "Cognizant",
      location: "Hyderabad, India",
      period: "Feb 2021 - August 2022",
      description: "Implemented features and enhancements using Azure Data Factory, Master Data Services, Power BI, and SQL Server Integration Services. Developed automation scripts to streamline support processes and utilized big data technologies for processing large datasets."
    },
    {
      title: "Data Engineer",
      company: "Cloud Politian Tech India Pvt ltd",
      location: "Hyderabad, India",
      period: "Jan 2020 - Feb 2021",
      description: "Directed Agile sprints for machine learning models. Developed automation pipeline using Azure Databricks integrating over 250 data sources, reducing manual aggregation time by 30%. Led migration of SQL databases to Azure services."
    }
  ];

  // Technical skills data
  const skillsData = {
    dataTools: [
      "Azure Data Factory", "AWS", "Google Cloud Platform", "Master Data Services (MDS)", 
      "SSIS", "Tableau", "Power BI", "SSRS", "Snowflake"
    ],
    mlAlgorithms: [
      "Linear Regression", "Logistic Regression", "Decision Trees", "Supervised Learning", 
      "Unsupervised Learning", "SVM", "Random Forests", "Naive Bayes", "KNN", "K Means", 
      "CNN", "Classification", "NLP", "Computer Vision", "Transformers", "LLM", "Langchain"
    ],
    databases: [
      "Microsoft SQL Server", "SQL*Plus", "SQL*Loader", "Oracle SQL Developer", 
      "Google Big Query", "PostgreSQL", "MySQL"
    ],
    programmingLanguages: [
      "Unix Shell Scripting", "SQL", "PL/SQL", "Python", "R"
    ],
    packages: [
      "NumPy", "Pandas", "Matplotlib", "SciPy", "Scikit-learn", "Pyspark", 
      "Seaborn", "TensorFlow", "Ggplot2", "Open CV", "Keras", "Pytorch"
    ],
    operatingSystems: ["UNIX", "Windows Family"]
  };

  return (
    <div ref={containerRef} className="relative overflow-x-hidden bg-black font-poppins">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Click ripples */}
      {clickRipples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-50 w-4 h-4 bg-blue-400/30 rounded-full"
          initial={{ 
            x: ripple.x - 8, 
            y: ripple.y - 8, 
            scale: 0, 
            opacity: 1 
          }}
          animate={{ 
            scale: 20, 
            opacity: 0 
          }}
          transition={{ 
            duration: 1, 
            ease: "easeOut" 
          }}
        />
      ))}

      {/* Main navigation bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative cursor-pointer"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent font-montserrat">
                Mounika Avutu
              </span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500"
              ></motion.span>
            </motion.div>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ y: -3 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                      activeSection === item.id
                        ? 'text-blue-300'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-xs">{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="activeSection"
                        className="h-0.5 w-full bg-blue-300"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <button className="md:hidden bg-white/10 p-2 rounded-lg cursor-pointer">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with enhanced animations */}
      <motion.section 
        id="hero" 
        ref={(el) => (sectionsRef.current.hero = el)}
        className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80"></div>
        </div>

        <motion.div 
          className="relative z-20 text-center max-w-4xl mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut"
          }}
        >
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 relative inline-block font-montserrat">
                <span className="relative z-10">Hi, I'm</span>
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-blue-500 opacity-20 blur-lg"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [0.9, 1.05, 0.9] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 mb-8 font-montserrat"
              >
                Mounika Avutu
              </motion.h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 font-poppins"
            >
              <div className="inline-flex h-12 overflow-hidden">
                <div className="flex flex-col animate-slide-up">
                  <span className="h-12 flex items-center justify-center">Sr. Data Engineer</span>
                  <span className="h-12 flex items-center justify-center">Data Scientist</span>
                  <span className="h-12 flex items-center justify-center">ML Engineer</span>
                  <span className="h-12 flex items-center justify-center">Sr. Data Engineer</span>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-poppins"
            >
              Over 5+ years of IT experience as a <span className="font-bold text-blue-300">Data Engineer</span>, with expertise in designing, developing,
              enhancing, and testing data solutions across diverse industries. Specializing in ETL development,
              cloud-based data engineering, and machine learning implementations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experience')}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-500 group-hover:scale-105 transition-transform duration-500" />
                <span className="relative block px-8 py-3 bg-gradient-to-r from-blue-300 to-blue-500 bg-opacity-90 text-white font-semibold transition-all duration-300 group-hover:bg-opacity-0 z-10 font-poppins">
                  View My Experience
                </span>
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                download="Mounika_Avutu_Resume.pdf"
                className="relative group overflow-hidden rounded-lg border-2 border-blue-500 flex items-center justify-center cursor-pointer"
              >
                <span className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center justify-center gap-2 px-8 py-3 text-blue-300 group-hover:text-white font-semibold transition-colors duration-300 z-10 font-poppins">
                  <Download size={18} />
                  Download Resume
                </span>
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="text-blue-300 mb-8 font-poppins"
            >
              <p className="flex items-center justify-center gap-2">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:mounika.connect2@gmail.com" className="hover:text-white transition-colors cursor-pointer">
                  mounika.connect2@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <span className="text-blue-400">Phone:</span> +1 940 663 9380
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="flex justify-center space-x-6 mb-12"
            >
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                <Github size={28} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="mailto:mounika.connect2@gmail.com"
                className="text-white/70 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              >
                <Mail size={28} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ 
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <ChevronDown size={32} className="text-blue-400/80" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        ref={(el) => (sectionsRef.current.about = el)}
        className="min-h-screen bg-black/95 backdrop-blur-sm py-24 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-montserrat">About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 h-full">
                  <div className="w-full mb-6 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="relative cursor-pointer"
                      onClick={() => setIsImageModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img 
                        src="/lovable-uploads/8645af94-4841-484d-bf74-048495ece2ca.png" 
                        alt="Mounika Avutu"
                        className="w-48 h-48 object-cover rounded-full border-4 border-slate-600 shadow-xl hover:border-slate-500 transition-colors"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-slate-400/20 hover:to-slate-300/30 transition-all"></div>
                      <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                        <span className="text-white text-sm font-medium font-poppins">Click to enlarge</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center font-montserrat">Profile</h3>
                  <p className="text-slate-400 mb-4 text-center font-poppins">
                    Senior <span className="font-bold text-blue-300">Data Engineer</span> with expertise in building scalable data pipelines, optimizing database performance, 
                    and implementing cloud-based data solutions.
                  </p>
                  <div className="space-y-2 font-poppins">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name:</span>
                      <span className="text-blue-300">Mounika Avutu</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience:</span>
                      <span className="text-blue-300">5+ Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Education:</span>
                      <span className="text-blue-300">M.S. Data Science</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location:</span>
                      <span className="text-blue-300">Frisco, TX</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 font-montserrat">Professional Summary</h3>
                  <p className="text-slate-400 mb-6 font-poppins">
                    I have over 5 years of experience as a <span className="font-bold text-blue-300">Data Engineer</span>, focusing on designing, developing, and implementing
                    data solutions across different industries. My expertise spans cloud platforms (AWS, Azure), ETL development,
                    machine learning, and data visualization. I'm proficient in implementing scalable data architectures and have
                    a strong background in Python, SQL, and various data processing frameworks.
                  </p>
                  <p className="text-slate-400 mb-6 font-poppins">
                    I have successfully led projects involving Snowflake, Azure Data Factory, and AWS services, resulting in 
                    significant performance improvements and business value. My approach combines technical expertise with 
                    business acumen to deliver actionable insights from complex data.
                  </p>
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="text-slate-500" size={20} />
                    <span className="text-blue-300 font-poppins">Download my complete <a href="/resume.pdf" download="Mounika_Avutu_Resume.pdf" className="text-slate-400 underline hover:text-slate-300 transition-colors cursor-pointer">resume</a> for more details.</span>
                  </div>
                  <a href="/resume.pdf" download="Mounika_Avutu_Resume.pdf" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors text-blue-300 rounded-md font-poppins cursor-pointer">
                    <Download size={16} />
                    Resume PDF
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        ref={(el) => (sectionsRef.current.projects = el)}
        className="min-h-screen bg-black/90 backdrop-blur-sm py-24 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-16 text-center font-montserrat">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Data Pipeline Optimization",
                  description: "Optimized ETL pipelines using Snowflake and Azure Data Factory, resulting in 30% performance improvement.",
                  tech: ["Snowflake", "Azure Data Factory", "Python", "SQL"]
                },
                {
                  title: "ML Model Deployment",
                  description: "Deployed machine learning models for predictive analytics using AWS services and Python frameworks.",
                  tech: ["AWS", "Python", "TensorFlow", "Docker"]
                },
                {
                  title: "Real-time Analytics Dashboard",
                  description: "Built interactive dashboards using Tableau and Power BI for real-time business intelligence.",
                  tech: ["Tableau", "Power BI", "SQL Server", "Python"]
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-500 transition-all duration-300 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 font-montserrat">{project.title}</h3>
                  <p className="text-slate-400 mb-6 font-poppins">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-slate-700 text-blue-300 text-sm rounded-full font-poppins"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        ref={(el) => (sectionsRef.current.skills = el)}
        className="min-h-screen bg-black/95 backdrop-blur-sm py-24 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-16 text-center font-montserrat">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, rotateX: -5 }}
                  className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-500 transition-all duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <h3 className="text-xl font-semibold text-blue-300 mb-4 capitalize font-montserrat">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 bg-slate-700 text-blue-300 text-sm rounded-full hover:bg-slate-600 transition-colors cursor-default font-poppins"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section with Timeline */}
      <motion.section 
        id="experience" 
        ref={(el) => (sectionsRef.current.experience = el)}
        className="min-h-screen bg-black/90 backdrop-blur-sm py-24 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-16 text-center font-montserrat">Professional Experience</h2>
            <TimelineExperience experiences={experienceData} />
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <div ref={(el) => (sectionsRef.current.certifications = el)}>
        <CertificationsSection />
      </div>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        ref={(el) => (sectionsRef.current.contact = el)}
        className="min-h-screen bg-black/95 backdrop-blur-sm py-24 px-4 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-16 text-center font-montserrat">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 font-montserrat">Contact Information</h3>
                <div className="space-y-4 font-poppins">
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Mail className="text-blue-400" size={20} />
                    <div>
                      <p className="text-blue-300">Email</p>
                      <a href="mailto:mounika.connect2@gmail.com" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                        mounika.connect2@gmail.com
                      </a>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <User className="text-blue-400" size={20} />
                    <div>
                      <p className="text-blue-300">Phone</p>
                      <p className="text-slate-400">+1 940 663 9380</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Github className="text-blue-400" size={20} />
                    <div>
                      <p className="text-blue-300">GitHub</p>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                        github.com/mounika
                      </a>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Linkedin className="text-blue-400" size={20} />
                    <div>
                      <p className="text-blue-300">LinkedIn</p>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                        linkedin.com/in/mounika
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 font-montserrat">Send Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <motion.input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-poppins transition-colors"
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <div>
                    <motion.input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none font-poppins transition-colors"
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <div>
                    <motion.textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none font-poppins transition-colors"
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    disabled={isSubmitting}
                    className={`w-full py-3 font-semibold rounded-lg transition-all duration-300 font-poppins cursor-pointer ${
                      isSubmitting
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-300 to-blue-500 text-white hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-3xl w-full h-auto p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">Profile Picture</DialogTitle>
          <DialogDescription className="sr-only">
            Full size view of Mounika Avutu's profile picture
          </DialogDescription>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img 
              src="/lovable-uploads/8645af94-4841-484d-bf74-048495ece2ca.png" 
              alt="Mounika Avutu - Full Size"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
