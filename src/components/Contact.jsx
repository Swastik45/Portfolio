import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Terminal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSending, setIsSending] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isSending) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSending]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSending(true);
    // Logic for system transmission simulation
    setTimeout(() => {
      setIsSending(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // FIX: Forced solid background (Deep Crimson) and killed gradients
    <section id="contact" className="min-h-screen bg-[#8A1515] py-20 px-4 !opacity-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Industrial Style */}
        <div className="mb-16 inline-block">
          <h1 className="text-6xl md:text-7xl font-black text-[#FFFFFF] uppercase tracking-tighter">
            Establish <span className="text-[#000000]">Link</span>
          </h1>
          <div className="h-4 bg-[#000000] w-full mt-2"></div>
          <p className="text-[#FFFFFF] font-bold mt-4 uppercase tracking-widest text-sm">
            // Direct line for freelance inquiries and technical collaboration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Left Side - System Nodes (Contact Info) */}
          <div className="space-y-6">
            {[
              { label: "Location", val: "Kathmandu, Nepal", icon: <MapPin />, color: "#DC2626" },
              { label: "Comms", val: "+977 976-7929476", icon: <Phone />, color: "#2563EB" },
              { label: "Interface", val: "psamarpaudel@gmail.com", icon: <Mail />, color: "#000000" }
            ].map((node, i) => (
              <div key={i} className="bg-[#FFFFFF] border-4 border-[#000000] p-6 shadow-[8px_8px_0px_0px_#000000]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#000000] text-[#FFFFFF] border-2 border-[#000000]">
                    {node.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tighter text-[#000000]">{node.label}</h3>
                </div>
                <p className="font-black text-[#4B5563] break-all uppercase text-sm leading-tight">
                  {node.val}
                </p>
              </div>
            ))}

            {/* Terminal Aesthetic Note */}
            <div className="bg-[#000000] p-4 border-2 border-[#FFFFFF] hidden md:block">
              <div className="flex items-center gap-2 text-[#DC2626] mb-2">
                <Terminal size={16} />
                <span className="text-[10px] font-black tracking-widest uppercase">System_Log</span>
              </div>
              <p className="text-[#FFFFFF] text-[10px] font-mono leading-tight">
                READY FOR DEPLOYMENT.<br/>
                LOCATED IN NEPAL (UTC +5:45).<br/>
                AVERAGE RESPONSE: &lt; 24H.
              </p>
            </div>
          </div>

          {/* Right Side - Transmission Form */}
          <div className="md:col-span-2">
            <div className="bg-[#FFFFFF] border-4 border-[#000000] p-8 md:p-12 shadow-[16px_16px_0px_0px_#000000]">
              <h2 className="text-3xl font-black text-[#000000] mb-8 uppercase tracking-tighter">Initial Message Packet</h2>
              
              <form onSubmit={handleSend} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-[#000000] uppercase mb-2 tracking-widest">Operator Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-4 border-[#000000] bg-[#F3F4F6] text-[#000000] font-bold focus:bg-[#FFFFFF] outline-none transition-all"
                      placeholder="IDENTIFY YOURSELF"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-[#000000] uppercase mb-2 tracking-widest">Return Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-4 border-[#000000] bg-[#F3F4F6] text-[#000000] font-bold focus:bg-[#FFFFFF] outline-none transition-all"
                      placeholder="EMAIL@DOMAIN.COM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-[#000000] uppercase mb-2 tracking-widest">Subject Header</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-4 border-[#000000] bg-[#F3F4F6] text-[#000000] font-bold focus:bg-[#FFFFFF] outline-none transition-all"
                    placeholder="PROJECT_TYPE / INQUIRY"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-[#000000] uppercase mb-2 tracking-widest">Message Data</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-4 border-[#000000] bg-[#F3F4F6] text-[#000000] font-bold focus:bg-[#FFFFFF] outline-none transition-all resize-none"
                    placeholder="ENTER TECHNICAL DETAILS OR INQUIRY DATA..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#000000] text-[#FFFFFF] font-black py-5 uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#DC2626] transition-colors border-4 border-[#000000] disabled:opacity-50"
                >
                  {isSending ? (
                    <span className="animate-pulse">TRANSMITTING DATA...</span>
                  ) : (
                    <>
                      <span>Execute Send</span>
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </button>

                {showMessage && (
                  <div className="bg-[#DC2626] text-[#FFFFFF] p-4 border-4 border-[#000000] flex items-center gap-4 animate-bounce">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-black uppercase tracking-tighter">Packet Delivered Successfully.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}