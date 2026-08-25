import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaGithub size={15} />, href: "https://github.com", label: "GitHub" },
    { icon: <FaLinkedin size={15} />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaYoutube size={15} />, href: "https://youtube.com", label: "YouTube" },
    { icon: <FaInstagram size={15} />, href: "https://instagram.com", label: "Instagram" },
  ];

  const exploreLinks = [
    { label: "All Courses", to: "/courses" },
    { label: "Web Development", to: "/courses" },
    { label: "Data Science", to: "/courses" },
    { label: "Career Paths", to: "/courses" },
  ];

  const dashboardLinks = [
    { label: "My Profile", to: "/dashboard/profile" },
    { label: "Enrolled Courses", to: "/dashboard/enrolledCourses" },
    { label: "Shopping Cart", to: "/dashboard/cart" },
    { label: "Settings", to: "/dashboard/settings" },
  ];

  const companyLinks = [
    { label: "About Us", to: "/" },
    { label: "Contact Us", to: "/contactUs" },
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ];

  return (
    <footer className="bg-[#09090b] border-t border-[#18181b] mt-20">
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 pb-12 border-b border-[#18181b]">
          
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="MindStrata Logo" className="w-8 h-8 object-contain rounded-[20%] " />
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                MindStrata
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering learners worldwide with expert-led coding courses. Learn at your pace, build real projects, and accelerate your engineering career.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-[#27272a] flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-xs font-bold uppercase tracking-wider">
                Explore
              </h3>
              <ul className="flex flex-col gap-2.5">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white text-xs font-bold uppercase tracking-wider">
                Dashboard
              </h3>
              <ul className="flex flex-col gap-2.5">
                {dashboardLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h3 className="text-white text-xs font-bold uppercase tracking-wider">
                Company
              </h3>
              <ul className="flex flex-col md:flex-col gap-2.5 grid grid-cols-2 md:grid-cols-1">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} MindStrata. All rights reserved.
          </p>
          <p className="text-gray-600 text-[10px] tracking-wide">
            Shaping the future of tech learning.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
