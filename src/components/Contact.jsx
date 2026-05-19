import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Terminal } from "lucide-react";

export default function Contact() {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); 
  // "success" | "error" | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (isSending) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus("error");
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus("error");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Missing EmailJS env variables");
      setStatus("error");
      return;
    }

    setIsSending(true);
    setStatus(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setIsSending(false);
  };

  return (
    <section id="contact" className="section-split min-h-screen bg-transparent py-20 px-4">
      <div className="section-content relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 inline-block">
          <h1 className="text-6xl md:text-7xl font-black text-[#FFFFFF] uppercase tracking-tighter">
            Establish <span className="text-black">Link</span>
          </h1>
          <div className="h-4 bg-gradient-to-r from-[#2563EB] via-black to-[#DC2626] w-full mt-2" />
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT INFO */}
          <div className="space-y-6">

            {[
              { label: "Location", val: "Kathmandu, Nepal", icon: <MapPin /> },
              { label: "Comms", val: "+977 976-7929476", icon: <Phone /> },
              { label: "Interface", val: "psamarpaudel@gmail.com", icon: <Mail /> }
            ].map((node, i) => (
              <div key={i} className="bg-white/95 border-4 border-black p-6 shadow-[8px_8px_0px_0px_black]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black text-white border-2 border-black">
                    {node.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase">
                    {node.label}
                  </h3>
                </div>
                <p className="font-black text-sm uppercase text-gray-600 break-all">
                  {node.val}
                </p>
              </div>
            ))}

            {/* TERMINAL */}
            <div className="bg-black text-white p-4 border-2 border-white hidden md:block">
              <div className="text-red-500 text-xs font-black uppercase mb-2 flex items-center gap-2">
                <Terminal size={14} />
                system log
              </div>
              <p className="text-[10px] font-mono leading-tight">
                EMAILJS NODE ACTIVE<br />
                READY FOR TRANSMISSION<br />
                RESPONSE TIME: &lt; 24H
              </p>
            </div>

          </div>

          {/* FORM */}
          <div className="md:col-span-2 bg-white/95 border-4 border-black p-10 shadow-[16px_16px_0px_0px_black]">

            <h2 className="text-3xl font-black uppercase mb-8">
              Initial Message Packet
            </h2>

            <form onSubmit={handleSend} className="space-y-6">

              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border-4 border-black font-bold"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border-4 border-black font-bold"
              />

              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border-4 border-black font-bold"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border-4 border-black font-bold resize-none"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-black text-white font-black py-5 uppercase flex items-center justify-center gap-3 hover:bg-red-600 transition border-4 border-black disabled:opacity-50"
              >
                {isSending ? "Sending..." : (
                  <>
                    Execute Send <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* STATUS */}
              {status === "success" && (
                <div className="bg-red-600 text-white p-4 border-4 border-black flex items-center gap-3">
                  <CheckCircle /> Message delivered successfully
                </div>
              )}

              {status === "error" && (
                <div className="bg-black text-white p-4 border-4 border-red-600 flex items-center gap-3">
                  <XCircle /> Transmission failed. Check input or config.
                </div>
              )}

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}