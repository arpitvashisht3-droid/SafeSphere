import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShield, 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiInstagram, 
  FiHeart 
} from 'react-icons/fi';

export default function Footer({
  brandName = "SafeSphere",
  contactEmail = "contact@safesphere.org",
  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Explore Places', path: '/search' },
    { label: 'Submit Report', path: '/add-review' }
  ],
  socialLinks = [
    { name: 'Github', href: 'https://github.com', icon: FiGithub },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: FiLinkedin },
    { name: 'Instagram', href: 'https://instagram.com', icon: FiInstagram }
  ]
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 border-t border-slate-700/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-slate-700/60">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-violet-500 transition-all duration-300">
                <FiShield className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight group-hover:text-violet-300 transition-colors duration-200">
                Safe<span className="text-violet-400">Sphere</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering urban commuters and travelers with real-time, crowdsourced safety scores, night lighting data, and community reports.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-9 h-9 rounded-xl bg-slate-700/70 border border-slate-600/60 flex items-center justify-center text-slate-300 hover:text-white hover:bg-violet-600 hover:border-violet-500 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="hover:text-violet-400 hover:translate-x-1 inline-flex items-center transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-violet-400 hover:scale-105 transition-all duration-200 font-medium"
              >
                <FiMail className="w-4 h-4 text-violet-400" />
                <span>{contactEmail}</span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                24/7 Community Monitoring & Safety Data Verification.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} {brandName} Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built for safer cities with</span>
            <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 hover:scale-125 transition-transform duration-200" />
          </p>
        </div>

      </div>
    </footer>
  );
}
