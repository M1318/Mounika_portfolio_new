
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  location?: string;
}

interface TimelineExperienceProps {
  experiences: ExperienceItem[];
}

export const TimelineExperience: React.FC<TimelineExperienceProps> = ({ experiences }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600"></div>
      
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex items-start"
          >
            {/* Timeline dot - simplified animation */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-4 border-black flex-shrink-0 mt-2"
              style={{ willChange: 'transform' }}
            >
              {/* Removed the infinite pulsing animation for better performance */}
              <div className="absolute inset-1 rounded-full bg-blue-400 opacity-80" />
            </motion.div>
            
            {/* Content card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="ml-8 bg-slate-800/90 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-slate-500 transition-all duration-200 w-full"
              style={{ willChange: 'transform' }}
            >
              <div className="flex flex-wrap items-start justify-between mb-4">
                <div>
                  <motion.h3 
                    className="text-xl font-semibold text-blue-400 mb-2 font-montserrat"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {exp.title}
                  </motion.h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={16} className="text-blue-300" />
                    <h4 className="text-lg text-blue-300 font-poppins">{exp.company}</h4>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-400 font-poppins">{exp.period}</span>
                  </div>
                  {exp.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-500" />
                      <span className="text-sm text-slate-500 font-poppins">{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <motion.p 
                className="text-slate-400 font-poppins leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              >
                {exp.description}
              </motion.p>
              
              {/* Simplified decorative element - removed infinite animation */}
              <div className="absolute top-2 right-2 opacity-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
