import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Added for the menu icon
import img from '../../../assets/hipsta-high-resolution-logo-transparent1.png';

export default function Heroes() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Custom handler to navigate to the login page
  const handleLoginNavigation = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="bg-white">
      <header>
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Hipsta</span>
              <img alt="Hipsta Logo" src={img} className="h-12 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* Using a <a> tag with an onClick event to navigate */}
            <a
              href="/auth/signup"
              onClick={handleLoginNavigation}
              className="text-sm font-semibold text-gray-900"
            >
              Become partner <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between p-6">
              <a href="/" className="flex items-center">
                <img src={img} alt="Logo" className="h-11 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <div className="h-6 w-6 bg-gray-700" />
              </button>
            </div>
            <div className="space-y-2 px-6 py-6">
              {/* Using <a> tag with onClick event */}
              <a
                href="#"
                onClick={handleLoginNavigation}
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Become a Partner
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Gradient background */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>

        <div className="mx-auto max-w-2xl relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Empower Your Business with Hipsta
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              Join a growing community of salons, spas, and wellness centers. Discover how Hipsta can help you manage bookings, attract more customers, and streamline your operations effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
