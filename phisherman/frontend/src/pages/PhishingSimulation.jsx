import React, { useState } from "react";
import { sendPhishingEmail } from "../services/api";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

function PhishingSimulation() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("securityteam@sec565.rocks");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSendPhish = async () => {
    if (!from || !subject || !body) {
      setMessage("❌ Please provide From address, Subject, and Body.");
      return;
    }

    try {
      await sendPhishingEmail(from, subject, body);
      setMessage(`✅ Phishing email sent successfully! Redirecting...`);
      setTimeout(() => {
        navigate("/phishing-execution", { state: { emailBody: body } });
      }, 1500);
    } catch (err) {
      console.error("Error sending phishing email:", err);
      setMessage("❌ Failed to send phishing email.");
    }
  };

  return (
    <div className="min-h-screen">
      <Menu />
      
      {/* Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 2xl:px-32 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header with semi-transparent background */}
          <div className="text-center mb-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">🎣 Phishing Simulation</h1>
            <p className="text-slate-600">Send a phishing email via MailHog for testing purposes.</p>
          </div>

          {/* Main Form Card with semi-transparent background */}
          <div className="bg-white bg-opacity-95 p-8 rounded-lg shadow-lg border border-slate-200 backdrop-blur-sm">
            
            {/* Info Banner */}
            <div className="mb-6 p-4 bg-amber-50 bg-opacity-90 border-l-4 border-amber-400 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    <strong>Educational Purpose Only:</strong> This tool is for security training and authorized testing only.
                  </p>
                </div>
              </div>
            </div>

            {/* Hardcoded "To" field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-slate-700">To:</label>
              <input
                type="email"
                value="victim@sec565.rocks"
                readOnly
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-100 bg-opacity-80 text-slate-500 cursor-not-allowed"
              />
              <p className="text-xs text-slate-500 mt-1">Target victim email (hardcoded for simulation)</p>
            </div>

            {/* User-specified "From" field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-slate-700">From:</label>
              <input
                type="email"
                placeholder="securityteam@sec565.rocks"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 transition-colors bg-white bg-opacity-90"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">The sender email address</p>
            </div>

            {/* User-specified "Subject" field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-slate-700">Subject:</label>
              <input
                type="text"
                placeholder="Important: Security Alert"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 transition-colors bg-white bg-opacity-90"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">Email subject line</p>
            </div>

            {/* User-specified "Body" field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-slate-700">Email Body:</label>
              <textarea
                placeholder="Write your phishing email here..."
                className="w-full p-3 border border-slate-300 rounded-lg h-40 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 transition-colors resize-none bg-white bg-opacity-90"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                💡 <strong>Tip:</strong> Include your EvilGinx phishing URL in the email body for the simulation to work properly.
              </p>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendPhish}
              className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg text-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              🚀 Send Phishing Email
            </button>

            {/* Message Display */}
            {message && (
              <div className={`text-center text-lg mt-6 p-4 rounded-lg border backdrop-blur-sm ${
                message.includes('✅') 
                  ? 'bg-emerald-50 bg-opacity-90 text-emerald-800 border-emerald-200' 
                  : 'bg-red-50 bg-opacity-90 text-red-800 border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Info Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* How it works */}
              <div className="bg-blue-50 bg-opacity-90 p-4 rounded-lg border-l-4 border-blue-400 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-blue-900 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  How this works:
                </h3>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>• Email sent to hardcoded victim user</li>
                  <li>• System simulates victim clicking the link</li>
                  <li>• Automated credential entry and MFA bypass</li>
                  <li>• Session token captured by EvilGinx</li>
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-emerald-50 bg-opacity-90 p-4 rounded-lg border-l-4 border-emerald-400 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-emerald-900 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Requirements:
                </h3>
                <ul className="text-sm space-y-1 text-emerald-800">
                  <li>• EvilGinx phishlet must be configured</li>
                  <li>• Include phishing URL in email body</li>
                  <li>• MailHog running for email delivery</li>
                  <li>• Valid victim credentials in database</li>
                </ul>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.open('http://mailhog.local:8025', '_blank')}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                📧 View MailHog
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                📊 Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PhishingSimulation;