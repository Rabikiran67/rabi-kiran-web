import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillTree = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeConnections, setActiveConnections] = useState([]);

  // Enhanced skill tree with better spacing and no overlapping
  const skillTreeData = [
    {
      category: 'Core Languages',
      icon: '💻',
      color: '#3B82F6',
      skills: [
        { 
          name: 'JavaScript', 
          level: 90, 
          color: '#F7DF1E', 
          icon: '⚡',
          x: 20, 
          y: 30,
          description: 'Advanced JavaScript with ES6+, async/await, and modern patterns',
          experience: '4+ years',
          projects: ['ByteEat', 'Learnify', 'Portfolio'],
          connections: ['React', 'Node.js', 'TypeScript', 'Express.js', 'Next.js', 'Redux']
        },
        { 
          name: 'Python', 
          level: 85, 
          color: '#3776AB', 
          icon: '🐍',
          x: 20, 
          y: 60,
          description: 'Python development with Django, Flask, and data science libraries',
          experience: '3+ years',
          projects: ['IMDB Sentiment Analysis', 'ML Models'],
          connections: ['Django', 'Pandas', 'Scikit-learn']
        },
        { 
          name: 'Java', 
          level: 80, 
          color: '#ED8B00', 
          icon: '☕',
          x: 20, 
          y: 90,
          description: 'Java development with Spring Boot and enterprise patterns',
          experience: '2+ years',
          projects: ['Spring Boot APIs'],
          connections: ['Spring Boot', 'Maven']
        },
      ]
    },
    {
      category: 'Frontend',
      icon: '🎨',
      color: '#8B5CF6',
      skills: [
        { 
          name: 'React', 
          level: 88, 
          color: '#61DAFB', 
          icon: '⚛️',
          x: 45, 
          y: 25,
          description: 'React development with hooks, context, and modern patterns',
          experience: '3+ years',
          projects: ['Portfolio', 'ByteEat Frontend'],
          connections: ['Next.js', 'Redux', 'TypeScript']
        },
        { 
          name: 'Next.js', 
          level: 82, 
          color: '#000000', 
          icon: '▲',
          x: 45, 
          y: 55,
          description: 'Full-stack React framework with SSR and SSG',
          experience: '2+ years',
          projects: ['Portfolio', 'E-commerce Platform'],
          connections: ['React', 'Vercel', 'TypeScript']
        },
        { 
          name: 'Tailwind CSS', 
          level: 85, 
          color: '#06B6D4', 
          icon: '🎨',
          x: 45, 
          y: 85,
          description: 'Utility-first CSS framework for rapid UI development',
          experience: '2+ years',
          projects: ['Portfolio', 'All Frontend Projects'],
          connections: ['Responsive Design', 'Component Libraries']
        },
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      color: '#10B981',
      skills: [
        { 
          name: 'Node.js', 
          level: 85, 
          color: '#339933', 
          icon: '🟢',
          x: 70, 
          y: 30,
          description: 'Server-side JavaScript with Express and REST APIs',
          experience: '3+ years',
          projects: ['ByteEat Backend', 'API Services'],
          connections: ['Express.js', 'MongoDB', 'REST APIs']
        },
        { 
          name: 'Express.js', 
          level: 80, 
          color: '#000000', 
          icon: '🚀',
          x: 70, 
          y: 60,
          description: 'Web application framework for Node.js',
          experience: '3+ years',
          projects: ['Backend APIs', 'Microservices'],
          connections: ['Node.js', 'MongoDB', 'JWT']
        },
        { 
          name: 'MongoDB', 
          level: 75, 
          color: '#47A248', 
          icon: '🍃',
          x: 70, 
          y: 90,
          description: 'NoSQL database with Mongoose ODM',
          experience: '2+ years',
          projects: ['ByteEat Database', 'Data Models'],
          connections: ['Node.js', 'Express.js', 'Database Design']
        },
      ]
    },
    {
      category: 'AI & Machine Learning',
      icon: '🤖',
      color: '#F59E0B',
      skills: [
        { 
          name: 'Scikit-learn', 
          level: 85, 
          color: '#F7931E', 
          icon: '🔬',
          x: 85, 
          y: 15,
          description: 'Machine learning library for Python with comprehensive algorithms',
          experience: '2+ years',
          projects: ['IMDB Sentiment Analysis', 'Fake News Detector'],
          connections: ['Python', 'Pandas', 'NLP']
        },
        { 
          name: 'TensorFlow', 
          level: 75, 
          color: '#FF6F00', 
          icon: '🧠',
          x: 85, 
          y: 40,
          description: 'Deep learning framework for neural networks and ML models',
          experience: '1+ years',
          projects: ['Neural Networks', 'Image Recognition'],
          connections: ['Python', 'Deep Learning', 'Keras']
        },
        { 
          name: 'PyTorch', 
          level: 70, 
          color: '#EE4C2C', 
          icon: '🔥',
          x: 85, 
          y: 65,
          description: 'Deep learning framework with dynamic computational graphs',
          experience: '1+ years',
          projects: ['Computer Vision', 'NLP Models'],
          connections: ['Python', 'Deep Learning', 'Research']
        },
        { 
          name: 'OpenCV', 
          level: 80, 
          color: '#5C3EE8', 
          icon: '👁️',
          x: 85, 
          y: 90,
          description: 'Computer vision library for image and video processing',
          experience: '2+ years',
          projects: ['Smart Attendance System', 'Face Recognition'],
          connections: ['Python', 'Computer Vision', 'Image Processing']
        },
        { 
          name: 'Pandas', 
          level: 85, 
          color: '#130654', 
          icon: '🐼',
          x: 85, 
          y: 115,
          description: 'Data manipulation and analysis library for Python',
          experience: '3+ years',
          projects: ['Data Analysis', 'ML Preprocessing'],
          connections: ['Python', 'Data Science', 'NumPy']
        },
      ]
    },
    {
      category: 'DevOps & Tools',
      icon: '🛠️',
      color: '#EF4444',
      skills: [
        { 
          name: 'Git', 
          level: 90, 
          color: '#F05032', 
          icon: '📚',
          x: 32, 
          y: 120,
          description: 'Version control and collaborative development',
          experience: '4+ years',
          projects: ['All Projects', 'Team Collaboration'],
          connections: ['GitHub', 'GitLab', 'CI/CD']
        },
        { 
          name: 'Docker', 
          level: 70, 
          color: '#2496ED', 
          icon: '🐳',
          x: 55, 
          y: 120,
          description: 'Containerization and deployment',
          experience: '1+ years',
          projects: ['Deployment', 'Microservices'],
          connections: ['Containerization', 'Kubernetes']
        },
        { 
          name: 'VS Code', 
          level: 95, 
          color: '#007ACC', 
          icon: '💻',
          x: 78, 
          y: 120,
          description: 'Primary development environment with extensions',
          experience: '4+ years',
          projects: ['All Development'],
          connections: ['Extensions', 'Debugging', 'Productivity']
        },
      ]
    }
  ];

  const allSkills = skillTreeData.flatMap(category => category.skills);

  // Enhanced connections with better flow
  const connections = [
    // JavaScript rays - connecting to multiple technologies
    { from: 'JavaScript', to: 'React', weight: 0.9 },
    { from: 'JavaScript', to: 'Node.js', weight: 0.9 },
    { from: 'JavaScript', to: 'Express.js', weight: 0.8 },
    { from: 'JavaScript', to: 'Next.js', weight: 0.7 },
    { from: 'JavaScript', to: 'TypeScript', weight: 0.8 },
    { from: 'JavaScript', to: 'Redux', weight: 0.7 },
    
    // React ecosystem connections
    { from: 'React', to: 'Next.js', weight: 0.8 },
    { from: 'React', to: 'Redux', weight: 0.8 },
    { from: 'React', to: 'TypeScript', weight: 0.7 },
    
    // Node.js ecosystem connections
    { from: 'Node.js', to: 'Express.js', weight: 0.9 },
    { from: 'Node.js', to: 'MongoDB', weight: 0.7 },
    
    // Python AI/ML ecosystem
    { from: 'Python', to: 'Pandas', weight: 0.9 },
    { from: 'Python', to: 'Scikit-learn', weight: 0.8 },
    { from: 'Python', to: 'TensorFlow', weight: 0.7 },
    { from: 'Python', to: 'PyTorch', weight: 0.7 },
    { from: 'Python', to: 'OpenCV', weight: 0.8 },
    { from: 'Pandas', to: 'Scikit-learn', weight: 0.9 },
    { from: 'Scikit-learn', to: 'TensorFlow', weight: 0.6 },
    { from: 'TensorFlow', to: 'PyTorch', weight: 0.5 },
    { from: 'OpenCV', to: 'Computer Vision', weight: 0.9 },
    
    // DevOps connections
    { from: 'Git', to: 'GitHub', weight: 0.9 },
    { from: 'Express.js', to: 'MongoDB', weight: 0.8 },
  ];

  const getSkillByName = (name) => allSkills.find(skill => skill.name === name);

  const handleSkillHover = (skillName) => {
    setHoveredSkill(skillName);
    const skill = getSkillByName(skillName);
    if (skill) {
      const relatedConnections = connections.filter(
        conn => conn.from === skillName || conn.to === skillName
      );
      setActiveConnections(relatedConnections.map(c => `${c.from}-${c.to}`));
    }
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    setActiveConnections([]);
  };

  const getSkillSize = (level) => {
    return Math.max(40, Math.min(60, level / 2 + 30));
  };

  return (
    <div className="relative w-full h-[1000px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden border border-slate-600/30 shadow-2xl">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 animate-pulse"></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Category Labels with Icons - Better positioned */}
      {skillTreeData.map((category, index) => (
        <motion.div 
          key={category.category}
          className="absolute z-10"
          style={{ 
            left: `${category.skills[0].x}%`, 
            top: `${category.skills[0].y - 18}%`,
            transform: 'translateX(-50%)'
          }}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <div className="text-center">
            <div className="text-4xl mb-3 filter drop-shadow-lg">{category.icon}</div>
            <div 
              className="text-lg font-bold text-white bg-gradient-to-r px-6 py-3 rounded-2xl border shadow-xl backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`,
                borderColor: `${category.color}60`
              }}
            >
              {category.category}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Enhanced Skill Connections with better visibility */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((connection, index) => {
          const fromSkill = getSkillByName(connection.from);
          const toSkill = getSkillByName(connection.to);
          
          if (!fromSkill || !toSkill) return null;
          
          const isActive = activeConnections.includes(`${connection.from}-${connection.to}`);
          const isHovered = hoveredSkill === connection.from || hoveredSkill === connection.to;
          const isJavaScriptConnection = connection.from === 'JavaScript' || connection.to === 'JavaScript';
          
          return (
            <motion.line
              key={`${connection.from}-${connection.to}`}
              x1={`${fromSkill.x}%`}
              y1={`${fromSkill.y}%`}
              x2={`${toSkill.x}%`}
              y2={`${toSkill.y}%`}
              stroke={
                isJavaScriptConnection
                  ? isActive || isHovered 
                    ? "rgba(247, 223, 30, 0.9)" 
                    : "rgba(247, 223, 30, 0.5)"
                  : isActive || isHovered 
                    ? "rgba(139, 92, 246, 0.8)" 
                    : "rgba(139, 92, 246, 0.3)"
              }
              strokeWidth={
                isJavaScriptConnection
                  ? isActive || isHovered ? "5" : "3"
                  : isActive || isHovered ? "4" : "2"
              }
              strokeDasharray={isActive ? "10,5" : "none"}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: isActive || isHovered ? 1 : 0.6 
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.8 + index * 0.1,
                pathLength: { duration: 1 }
              }}
            />
          );
        })}
      </svg>

      {/* Enhanced Skill Nodes */}
      {allSkills.map((skill, index) => {
        const isHovered = hoveredSkill === skill.name;
        const skillSize = getSkillSize(skill.level);
        
        return (
          <motion.div
            key={skill.name}
            className="absolute cursor-pointer group"
            style={{
              left: `${skill.x}%`,
              top: `${skill.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: isHovered ? 1.2 : 1,
              opacity: 1,
              rotate: 0
            }}
            transition={{ 
              duration: 0.6,
              delay: 1 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => handleSkillHover(skill.name)}
            onMouseLeave={handleSkillLeave}
          >
            {/* Enhanced Skill Circle with Level Ring */}
            <div className="relative">
              {/* Outer Ring - Skill Level */}
              <svg
                className="absolute inset-0 w-full h-full transform -rotate-90"
                style={{ width: skillSize + 16, height: skillSize + 16 }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.2)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke={skill.name === 'JavaScript' ? "rgba(247, 223, 30, 0.8)" : "rgba(139, 92, 246, 0.8)"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${skill.level} 100` }}
                  transition={{ duration: 2, delay: 1.5 + index * 0.1 }}
                />
              </svg>

              {/* Main Skill Circle */}
              <div
                className="relative rounded-full flex items-center justify-center text-white font-bold shadow-2xl border-4 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                style={{
                  width: skillSize,
                  height: skillSize,
                  background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
                  boxShadow: isHovered 
                    ? `0 0 30px ${skill.color}80, 0 0 60px ${skill.color}40` 
                    : skill.name === 'JavaScript' 
                      ? `0 0 25px ${skill.color}70, 0 0 50px ${skill.color}50, 0 0 75px ${skill.color}30` 
                      : `0 8px 25px rgba(0,0,0,0.4), 0 0 20px ${skill.color}40`
                }}
              >
                {/* Skill Icon */}
                <div className="text-2xl filter drop-shadow-lg">
                  {skill.icon}
                </div>
                
                {/* Enhanced Glow Effect for JavaScript */}
                {(isHovered || skill.name === 'JavaScript') && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ opacity: 0, scale: 1.3 }}
                    animate={{ 
                      opacity: skill.name === 'JavaScript' ? 0.6 : 0.4, 
                      scale: skill.name === 'JavaScript' ? 2.5 : 2 
                    }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                
                {/* Enhanced Ray Effect for JavaScript */}
                {skill.name === 'JavaScript' && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: `conic-gradient(from 0deg, transparent, ${skill.color}60, transparent, ${skill.color}60, transparent)`,
                        animation: 'rotate 3s linear infinite'
                      }}
                      initial={{ opacity: 0, scale: 1.8 }}
                      animate={{ opacity: 0.8, scale: 2.8 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: `conic-gradient(from 180deg, transparent, ${skill.color}40, transparent, ${skill.color}40, transparent)`,
                        animation: 'rotate 2s linear infinite reverse'
                      }}
                      initial={{ opacity: 0, scale: 2.2 }}
                      animate={{ opacity: 0.5, scale: 3.2 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    />
                  </>
                )}
              </div>
              
              {/* Enhanced Level Badge */}
              <motion.div 
                className="absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                {skill.level}
              </motion.div>
            </div>

            {/* Enhanced Skill Name Tooltip */}
            <motion.div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-sm text-white bg-slate-800/95 backdrop-blur-sm px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 border border-slate-600 shadow-xl"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: isHovered ? 1 : 0 }}
            >
              <div className="font-bold text-lg">{skill.name}</div>
              <div className="text-slate-300 text-xs">Level {skill.level}% • {skill.experience}</div>
              <div className="text-slate-400 text-xs mt-1">{skill.description}</div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Enhanced Legend */}
      <motion.div 
        className="absolute bottom-8 left-8 bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 text-sm border border-slate-600/50 shadow-2xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <h4 className="font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <span className="text-lg">Skill Tree Guide</span>
        </h4>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 animate-pulse"></div>
            <span>JavaScript = Central Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <span>Circle size = Skill level</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <span>Lines = Skill connections</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></div>
            <span>Hover for details</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
            <span>Icons = Technology type</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Skill Summary */}
      <motion.div 
        className="absolute top-8 right-8 bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 text-sm border border-slate-600/50 shadow-2xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <h4 className="font-bold text-white mb-4 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <span className="text-lg">Skill Overview</span>
        </h4>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex justify-between items-center">
            <span>Total Skills:</span>
            <span className="font-bold text-blue-400 text-lg">{allSkills.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Average Level:</span>
            <span className="font-bold text-green-400 text-lg">{Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Expert (90%+):</span>
            <span className="font-bold text-yellow-400">{allSkills.filter(skill => skill.level >= 90).length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Advanced (80%+):</span>
            <span className="font-bold text-blue-400">{allSkills.filter(skill => skill.level >= 80).length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>AI/ML Skills:</span>
            <span className="font-bold text-purple-400">{skillTreeData[3].skills.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Categories:</span>
            <span className="font-bold text-green-400">{skillTreeData.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Central JavaScript Highlight */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4 filter drop-shadow-2xl">⚡</div>
          <div className="text-2xl font-bold text-yellow-400 bg-slate-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-yellow-400/30 shadow-2xl">
            JavaScript Central Hub
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillTree; 