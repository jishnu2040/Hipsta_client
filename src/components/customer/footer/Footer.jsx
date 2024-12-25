import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-400 py-10">
      {/* Container */}
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">About Hipsta</h3>
            <p>
              Hipsta is your go-to platform for seamless salon, spa, and massage center bookings. 
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
        
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@hipsta.com"
                  className="hover:text-white transition-colors"
                >
                  support@hipsta.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-2 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hipsta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
