import React from 'react';
import business from '../../../assets/dashbrd.png';

const Business = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-8 lg:px-4">
        <div className="relative isolate overflow-hidden bg-white px-6 pt-8 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#FFA500" /> {/* Lighter orange */}
                <stop offset={1} stopColor="#FF4500" /> {/* Darker orange */}
              </radialGradient>
            </defs>
          </svg>
          <div className="flex flex-col justify-center lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-back sm:text-4xl">
              Hipsta for business.
            </h2>
            <p className="mt-6 text-pretty text-lg/8 text-gray-900">
              Grow your business with India’s #1 booking platform for salons, spas, and wellness centers—trusted by
              professionals nationwide.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="/for-business"
                className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Become Partner
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8 lg:w-1/2 flex-none">
            <img
              src="https://cdn.visily.ai/editor/production/thumbnails/f4a0fde0-9637-4372-937f-33fc73392731-large-size"
              alt="Business Dashboard"
              width={1824}
              height={1080}
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
