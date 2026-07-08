'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTripadvisor, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/qpick-logo.webp"
                alt="Q Pick logo"
                width={90}
                height={72}
                className="w-18 h-17 object-contain"
                priority
              />
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Premium chauffeur tours, airport transfers, and travel experiences delivered with care and professionalism.
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: FaFacebookF, href: '#facebook' },
                { icon: FaTwitter, href: '#twitter' },
                { icon: FaInstagram, href: '#instagram' },
                { icon: FaYoutube, href: '#youtube' },
                { icon: FaWhatsapp, href: '#whatsapp' },
                { icon: FaTripadvisor, href: '#tripadvisor' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-[#1EAEDB] hover:text-[#33C3F0] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: 'Destinations', path: '/destinations' },
                { name: 'Vehicles', path: '/vehicles' },
                { name: 'Blog', path: '/blog' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-base"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Our Values</h3>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                { name: 'Contact us', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-base"
                    onClick={() => {
                      if (item.path.includes('#')) {
                        setTimeout(() => {
                          document.getElementById('leadership-team')?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }, 100);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {[
                { name: 'FAQ', path: '/faq' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-base"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-[#1EAEDB] mt-1" />
                <p className="text-gray-400 text-base">
                  No. 230A, Palagathura,<br />
                  Negombo.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#1EAEDB]" />
                <a href="mailto:contact@quickpickapp.com" className="text-gray-400 hover:text-white transition-colors text-base">
                  contact@quickpickapp.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[#1EAEDB]" />
                <div className="space-y-1">
                  <a href="tel:+94114334334" className="block text-gray-400 hover:text-white transition-colors text-base">+94 11 433 4334</a>
                  <a href="tel:+94114734334" className="block text-gray-400 hover:text-white transition-colors text-base">+94 11 473 4334</a>
                  <a href="tel:+94773619000" className="block text-gray-400 hover:text-white transition-colors text-base">+94 77 361 9000</a>
                  <a href="tel:+94783619000" className="block text-gray-400 hover:text-white transition-colors text-base">+94 78 361 9000</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-[#1EAEDB]">Q Pick</span>. Design & Develop by{' '}
            <span className="text-[#1EAEDB]"> Tech Eagle Hub</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

