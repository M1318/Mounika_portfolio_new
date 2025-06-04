
import { motion } from 'framer-motion';
import { Award, Star, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: "Salesforce Administration",
    provider: "Salesforce",
    description: "Certified in managing Salesforce environments, user management, data management, and system configuration.",
    logo: "https://logos-world.net/wp-content/uploads/2022/01/Salesforce-Logo.png",
    color: "from-blue-400 to-blue-600"
  },
  {
    title: "Salesforce Platform Developer I (PD1)",
    provider: "Salesforce", 
    description: "Certified in developing custom applications on the Salesforce platform using Apex, Visualforce, and Lightning components.",
    logo: "https://logos-world.net/wp-content/uploads/2022/01/Salesforce-Logo.png",
    color: "from-purple-400 to-purple-600"
  },
  {
    title: "Salesforce AI Associate",
    provider: "Salesforce",
    description: "Certified in implementing AI solutions within Salesforce, including Einstein Analytics and AI-powered features.",
    logo: "https://logos-world.net/wp-content/uploads/2022/01/Salesforce-Logo.png",
    color: "from-green-400 to-green-600"
  },
  {
    title: "AWS Certified Data Engineer - Associate",
    provider: "Amazon Web Services",
    description: "Certified in designing and implementing data engineering solutions on AWS cloud platform.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    color: "from-orange-400 to-orange-600"
  }
];

export const CertificationsSection = () => {
  return (
    <motion.section 
      id="certifications"
      className="min-h-screen bg-black/95 backdrop-blur-sm py-24 px-4 relative z-10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`cert-orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                i % 4 === 0 ? 'rgba(59,130,246,0.8)' : 
                i % 4 === 1 ? 'rgba(168,85,247,0.8)' : 
                i % 4 === 2 ? 'rgba(34,197,94,0.8)' :
                'rgba(249,115,22,0.8)'
              }, transparent)`,
              width: `${120 + i * 20}px`,
              height: `${120 + i * 20}px`,
              left: `${10 + (i * 8)}%`,
              top: `${15 + (i * 6)}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.2, 0.4, 0.1, 0.2]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Data streams */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              width: '200px',
              top: `${20 + i * 10}%`,
              left: '-200px'
            }}
            animate={{
              x: [0, window.innerWidth + 200],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Award className="text-yellow-400 drop-shadow-lg" size={32} />
              </motion.div>
              <h2 className="text-4xl font-bold text-white font-montserrat">Certifications</h2>
              <motion.div
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Star className="text-yellow-400 drop-shadow-lg" size={28} />
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto font-poppins"
            >
              Professional certifications that validate my expertise in cloud platforms, 
              data engineering, and enterprise software development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative group perspective-1000"
              >
                <div className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-500 h-full relative overflow-hidden">
                  {/* Enhanced gradient background overlay with glaze effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-xl`} />
                  
                  {/* Glaze effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  
                  {/* Animated border glow */}
                  <motion.div 
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-30 blur-sm -z-10`}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div 
                        className="w-16 h-16 flex items-center justify-center bg-white/95 rounded-lg p-2 shadow-lg"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <img 
                          src={cert.logo} 
                          alt={`${cert.provider} logo`}
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3 
                          className="text-xl font-semibold text-slate-200 mb-2 font-montserrat group-hover:text-white transition-colors duration-300"
                          whileHover={{ x: 5 }}
                        >
                          {cert.title}
                        </motion.h3>
                        <div className="flex items-center gap-2 mb-3">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 360]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <CheckCircle className="text-green-400 drop-shadow-lg" size={16} />
                          </motion.div>
                          <span className="text-slate-400 font-poppins group-hover:text-slate-300 transition-colors">
                            {cert.provider}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 leading-relaxed font-poppins group-hover:text-slate-300 transition-colors duration-300">
                      {cert.description}
                    </p>
                  </div>

                  {/* Corner sparkle effects */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute bottom-2 left-2 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.p 
              className="text-slate-400 font-poppins"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Continuously expanding knowledge through industry-leading certification programs
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
