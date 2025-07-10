// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { personalInfo } from '../config';
import ParticlesBackground from './ParticlesBackground';
import LazyImage from './LazyImage';
import { useForm, ValidationError } from '@formspree/react';
import { FaPaperPlane } from 'react-icons/fa';

// Animated gradient border styles
const animatedBorder = `relative p-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x`;

const REASONS = [
  'Project Inquiry',
  'Collaboration',
  'Just Saying Hi',
  'Feedback',
  'Other',
];

const MAX_MESSAGE_LENGTH = 500;

const Contact = () => {
  const [state, handleSubmit] = useForm("xpwrvzoj");
  const [reason, setReason] = useState(REASONS[0]);
  const [message, setMessage] = useState('');
  const [buttonFly, setButtonFly] = useState(false);

  // Reset fly animation after submit
  React.useEffect(() => {
    if (state.submitting) setButtonFly(true);
    if (!state.submitting) setTimeout(() => setButtonFly(false), 800);
  }, [state.submitting]);

  if (state.succeeded) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex flex-col items-center justify-center text-center p-4">
        <FiCheckCircle className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-3xl font-bold mb-2">Thanks for reaching out!</h2>
        <p className="text-lg text-gray-300">Your message has been sent. I'll get back to you soon.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <ParticlesBackground />
      {/* Animated corner background design */}
      <div className="absolute bg-primary/20 rounded-full w-96 h-96 -top-20 -left-20 blur-3xl animate-pulse -z-10" />
      <div className="absolute bg-secondary/20 rounded-full w-96 h-96 -bottom-20 -right-20 blur-3xl animate-pulse delay-1000 -z-10" />
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Heading and subtext */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Get in <span className="text-primary">Touch</span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions. My inbox is always open, so feel free to send a message!
        </motion.p>
        {/* Contact Form Box */}
        <div className="w-full max-w-2xl mx-auto">
          <div className={animatedBorder}>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-container rounded-2xl p-12 md:p-16 shadow-xl w-full"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              {/* Contact Reason Dropdown */}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium mb-2">Reason for Contact</label>
                <select
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  {REASONS.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <ValidationError prefix="Reason" field="reason" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              {/* Animated Send Button */}
              <motion.button
                type="submit"
                disabled={state.submitting}
                className="w-full flex items-center justify-center gap-2 text-lg font-semibold py-3 px-6 rounded-lg bg-primary text-dark-background transition-all duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed overflow-hidden relative hover:bg-secondary"
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence>
                  {buttonFly && (
                    <motion.span
                      key="plane"
                      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                      animate={{ x: 120, y: -40, opacity: 0, rotate: 40 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeIn' }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <FaPaperPlane className="w-6 h-6 text-white drop-shadow-lg" />
                    </motion.span>
                  )}
                </AnimatePresence>
                {!buttonFly && <><FiSend /> {state.submitting ? 'Sending...' : 'Send Message'}</>}
              </motion.button>
            </motion.form>
          </div>
        </div>
        {/* --- SOCIALS & HANDSHAKE SECTION --- */}
        <div className="text-center mt-28 md:mt-40">
          <h3 className="text-3xl font-bold mb-2">FIND ME ON</h3>
          <p className="text-lg text-gray-400 mb-8">Feel free to <span className="text-primary">connect</span> with me</p>
          {/* Social Icons with floating/animated effect */}
          <div className="flex justify-center gap-6 mb-16">
            {personalInfo.socials.map((social, i) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.18, rotate: [0, 10, -10, 0], transition: { type: 'spring', stiffness: 400 } }}
                  className="w-16 h-16 bg-dark-container rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/40 transition-shadow"
                >
                  <IconComponent className="w-8 h-8 transition-colors duration-300 hover:text-white" />
                </motion.a>
              );
            })}
          </div>
          {/* The Handshake Animation with your single image */}
          <div className="relative h-40 w-full flex items-center justify-center">
              <LazyImage 
                src="/handshake.jpg" 
                alt="Handshake" 
                className="h-32 md:h-40 mx-auto rounded-full object-cover" 
              />
          </div>
        </div>
      </div>
      {/* Custom CSS for animated gradient border */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
