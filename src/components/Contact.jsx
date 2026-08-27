import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Terminal, CornerDownLeft } from "lucide-react";

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

  // Interactive CLI Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'sys', text: 'Swastik Paudel Interactive CLI v2.0.26' },
    { type: 'sys', text: 'Type "help" to list available commands.' }
  ]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'user', text: `swastik@portfolio:~$ ${cmd}` }];

    if (cmd === 'help') {
      newHistory.push({
        type: 'sys',
        text: 'Available commands: help | skills | king | contact | clear'
      });
    } else if (cmd === 'skills') {
      newHistory.push({
        type: 'sys',
        text: 'Stack: Next.js 16, TypeScript, React 19, Prisma, Supabase, PostgreSQL, Redis, Rust, Bevy'
      });
    } else if (cmd === 'king') {
      newHistory.push({
        type: 'sys',
        text: '👑 "LIVE LIKE A KING" — Build resilient systems, own your code, deliver high-execution platforms.'
      });
    } else if (cmd === 'contact') {
      newHistory.push({
        type: 'sys',
        text: 'Email: psamarpaudel@gmail.com | Comms: +977 976-7929476 | Location: Kathmandu, Nepal'
      });
    } else if (cmd === 'clear') {
      setTerminalHistory([{ type: 'sys', text: 'Terminal output cleared.' }]);
      setTerminalInput('');
      return;
    } else {
      newHistory.push({
        type: 'sys',
        text: `Command not recognized: "${cmd}". Type "help" for options.`
      });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

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
    <section id="contact" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-content max-w-7xl mx-auto px-4 sm:px-6 lg:pl-72 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">

        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Establish <span className="text-blue-400">Connection</span>
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-24 mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left Info Column */}
          <div className="space-y-4">
            {[
              { label: "Location", val: "Kathmandu, Nepal", icon: <MapPin className="w-5 h-5 text-blue-400" /> },
              { label: "Phone / WhatsApp", val: "+977 976-7929476", icon: <Phone className="w-5 h-5 text-blue-400" /> },
              { label: "Email Address", val: "psamarpaudel@gmail.com", icon: <Mail className="w-5 h-5 text-blue-400" /> }
            ].map((node, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800/90 p-5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-4">
                <div className="p-3 bg-blue-950/60 border border-blue-800/50 rounded-xl shrink-0">
                  {node.icon}
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    {node.label}
                  </h3>
                  <p className="font-medium text-sm text-white truncate">
                    {node.val}
                  </p>
                </div>
              </div>
            ))}

            {/* INTERACTIVE CLI TERMINAL WIDGET */}
            <div className="bg-slate-950/90 text-slate-300 p-4 border border-slate-800 rounded-2xl space-y-3 font-mono shadow-2xl">
              <div className="text-blue-400 text-xs font-semibold uppercase flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>Interactive Terminal</span>
                </span>
                <span className="text-[10px] text-slate-500">v2.0</span>
              </div>

              {/* History output */}
              <div className="text-xs space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={item.type === 'user' ? 'text-blue-300 font-bold' : 'text-slate-400 whitespace-pre-wrap'}>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Command input prompt */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                <span className="text-blue-400 text-xs font-bold">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type help..."
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                />
                <button type="submit" className="text-slate-500 hover:text-blue-400 p-0.5">
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-slate-900/80 border border-slate-800/90 p-6 sm:p-10 rounded-2xl shadow-xl backdrop-blur-md">

            <h3 className="text-2xl font-bold text-white mb-6">
              Send Message
            </h3>

            <form onSubmit={handleSend} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-medium text-sm"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-medium text-sm"
                />
              </div>

              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-medium text-sm"
              />

              <textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-medium text-sm resize-none"
              />

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
              >
                {isSending ? "Sending..." : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Message delivered successfully! I will get back to you shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="bg-rose-950/60 border border-rose-800/80 text-rose-300 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span>Transmission failed. Please check all fields or try again later.</span>
                </div>
              )}

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}