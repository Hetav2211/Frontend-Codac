import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import axios from 'axios';

const url = import.meta.env.MODE === 'development' 
  ? import.meta.env.VITE_BACKEND_URL 
  : 'https://codec-backend.onrender.com';

const Signup = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const particlesOptions = {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: ['#F83002', '#6b7280', '#111827'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#9ca3af',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' }
      }
    }
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && value.length < 2) {
      error = 'Name must be at least 2 characters';
    }
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format';
    }
    if (name === 'password' && value.length < 6) {
      error = 'Password must be at least 6 characters';
    }
    if (name === 'confirmPassword' && value !== form.password) {
      error = 'Passwords do not match';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = true;
    Object.keys(form).forEach(key => {
      isValid = validateField(key, form[key]) && isValid;
    });

    if (!isValid) return;

    setLoading(true);

    try {
      const res = await axios.post(`${url}/api/auth/signup`, {
        name: form.name,
        email: form.email,
        password: form.password
      });
      toast.success('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute w-full h-full"
      />

      <motion.div 
        className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-[#F83002]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join Us
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Create your account in seconds
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3 text-black bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F83002]/50 transition-all duration-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3 text-black bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F83002]/50 transition-all duration-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3 text-black bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F83002]/50 transition-all duration-300"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-5 py-3 text-black bg-white/70 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F83002]/50 transition-all duration-300"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="pt-2"
          >
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 ${
                loading 
                  ? 'bg-gray-700' 
                  : 'bg-gradient-to-r from-gray-900 to-[#F83002] hover:shadow-lg hover:shadow-[#F83002]/30'
              } relative overflow-hidden group`}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#F83002] to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
         <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-[#F83002] hover:text-[#F83002]/80 transition-colors duration-300"
            >
              Login
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;