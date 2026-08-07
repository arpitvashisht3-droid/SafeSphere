import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FiShield, 
  FiHome, 
  FiInfo, 
  FiMail, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';

export default function Navbar({ 
  links = [
    { label: 'Home', path: '/', icon: FiHome },
    { label: 'About', path: '/about', icon: FiInfo },
    { label: 'Contact', path: '/contact', icon: FiMail }
  ],
  brandName = "SafeSphere"
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
      isActive
        ? 'bg-violet-50 text-violet-700 font-bold border border-violet-200/80 shadow-2xs'
        : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100/70'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={closeMobileMenu} 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-md shadow-violet-600/20 group-hover:scale-110 group-hover:shadow-violet-600/30 transition-all duration-300">
              <FiShield className="w-6 h-6 text-white stroke-[2.2]" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-violet-700 transition-colors duration-200">
              Safe<span className="text-violet-600">Sphere</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  end={link.path === '/'}
                  className={getNavLinkClass}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm bg-violet-600 text-white hover:bg-violet-700 shadow-md shadow-violet-600/20 btn-animated"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen 
              ? <FiX className="w-6 h-6 transition-transform duration-200 rotate-0" /> 
              : <FiMenu className="w-6 h-6 transition-transform duration-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={closeMobileMenu}
                className={getNavLinkClass}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{link.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 btn-animated"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
