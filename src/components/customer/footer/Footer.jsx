import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      {/* Container */}
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">About Us</h3>
            <p>
              We are dedicated to providing top-notch services and exceptional
              customer experiences. Join us and explore the best services
              tailored just for you!
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
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
                  href="mailto:info@example.com"
                  className="hover:text-white transition-colors"
                >
                  info@example.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 234 567 890
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Visit Our Office
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
