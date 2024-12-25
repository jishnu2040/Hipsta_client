export default function Promo() {
  return (
    <div className="relative overflow-hidden bg-white mt-24">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-2">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">

          {/* New Features Section */}
          <div className="lg:mt-24 text-xl text-gray-500">
            <h2 className="font-bold text-2xl text-gray-700">Why Partner with Us?</h2>
            <ul className="mt-4 space-y-2">
              <li>🗓️ Appointment Reminders for customers</li>
              <li>✨ Improve Customer Experience</li>
              <li>🤖 Business Automation for efficiency</li>
              <li>⏰ 24/7 Appointment Scheduling</li>
              <li>👨‍💻 Manage Your Employees with ease</li>
              <li>📈 Increase Profit and Visibility</li>
              <li>📱 Timely Communication with customers</li>
            </ul>
          </div>

          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://timeular.com/wp-content/uploads/2023/08/Blog-image-10-1.png"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://storage.googleapis.com/cdn-website-bolddesk/2023/10/0f176fbf-596x-334@2x.png"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://trafft.com/wp-content/uploads/2023/06/appointment-reminder-template-scaled.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CWtYjr7x-QKHdcySzxkN_TSd0VpYTfBIlA&s"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://leapmax.ai/wp-content/uploads/2024/03/employee-perfomance-managenent.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-44 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://future.nexastrive.uk/assets/images/nexastrive_services-banner-aman/bpa2.png"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://media.istockphoto.com/id/852240644/vector/neon-signboard-24-7-open-time.jpg?s=612x612&w=0&k=20&c=ofmdpEX3TdaS52VIPjO6B7bH1hAehDHPu3DKepztPIk="
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
