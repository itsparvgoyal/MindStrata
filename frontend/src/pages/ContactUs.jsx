import { useState } from "react";
import { FiMail, FiPhone, FiClock, FiMapPin, FiSend } from "react-icons/fi";
import { toast } from "react-hot-toast";
import api from "../services/service";



const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    queryRegarding: "Course Enrollment",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendReqToDB = async (formData) =>{
    try{
        const response = await api.post('/contactUs' , formData);
        // console.log(response?.data)
        if(response?.data?.success){
            toast.success("Thank you! Your query has been submitted.");
        }
    }
    catch(error){
      console.log(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await sendReqToDB(formData);
    }
    catch(error){
      console.log(error.message);
    }
    finally{  
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        queryRegarding: "Course Enrollment",
        message: "",
      });
  };
};

  return (
    <div className="bg-[#09090b] text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
            Have questions about our courses, platform, or enrollment? Reach out to us and our support team will get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 shrink-0">
                <FiMail size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">Email Us</h3>
                <p className="text-gray-400 text-xs mb-2">Our support team is here to help.</p>
                <a href="mailto:support.mindstrata@gmail.com" className="text-gray-200 font-semibold text-sm hover:underline">
                  support.mindstrata@gmail.com
                </a>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 shrink-0">
                <FiPhone size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">Helpline Number</h3>
                <p className="text-gray-400 text-xs mb-2">Toll-free student support line.</p>
                <a href="tel:+9118001234567" className="text-gray-200 font-semibold text-sm hover:underline">
                  +91 1800-123-4567
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 shrink-0">
                <FiClock size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">Support Hours</h3>
                <p className="text-gray-400 text-xs mb-1">Monday – Saturday</p>
                <p className="text-gray-200 font-medium text-sm">9:00 AM – 7:00 PM IST</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 shrink-0">
                <FiMapPin size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-1">Head Office</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  MindStrata EdTech Pvt Ltd,<br />
                  Tech Park Tower 3, Bengaluru, India
                </p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#121217] border border-[#22222c] rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-6">
                Fill out the form below and we will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Query Regarding <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="queryRegarding"
                    value={formData.queryRegarding}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    <option value="Course Enrollment">Course Enrollment</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing & Payment">Billing & Payment</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Instructor Guidance">Instructor Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Query Details / Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your query or message here..."
                    className="w-full bg-[#181820] border border-[#2a2a34] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-gray-950 font-bold py-3.5 px-6 rounded-full text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <FiSend size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
  
};

export default ContactUs;
