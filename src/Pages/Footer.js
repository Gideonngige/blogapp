export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-10 font-serif">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-center md:text-left">
            &copy; 2025 Gtech Company. All rights reserved.
          </p>
          
          <nav>
            <ul className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <li>
                <a href="/privacy" className="hover:underline hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline hover:text-gray-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
          
        </div>
      </footer>
    );
  }
  