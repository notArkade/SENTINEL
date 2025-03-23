import { useState } from "react";
import Rings from "../components/Rings";
import { Element } from "react-scroll";

export default function NIDSApp() {
  const [formData, setFormData] = useState({
    protocol_type: "udp",
    service: "dns",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    count: 100,
    serror_rate: 1.0,
    same_srv_rate: 1.0,
    dst_host_srv_count: 255,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/threat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.intrusion_detected);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error connecting to backend");
    }
    setLoading(false);
  };

  return (
    <Element name="analyse">
    <div className="relative w-screen h-screen bg-black overflow-hidden flex justify-center items-center">
     <Rings position1="top-[-70px] left-[-100px]" position2="bottom-[-70px] right-[-100px]"/>
     <div className="absolute inset-0 bg-gradient-to-b from-black via-black/5 to-transparent"/>
     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent"/>
      {/* Form Box - Frosted Glass Effect */}
      <div className="relative p-10 z-10 w-[90rem] min-h-[90vh] overflow-y-auto rounded-xl shadow-xl bg-gray-900/50 border border-gray-700 backdrop-blur-xl">
        {/* Gradient Title */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-6 uppercase tracking-[0.4em]">
          Analyse Network
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Container - 3 Columns for Better Spacing */}
          <div className="grid grid-cols-3 gap-6">
            {/* Protocol Type */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-400 mb-2">
                Protocol Type
              </label>
              <select
                name="protocol_type"
                value={formData.protocol_type}
                onChange={handleChange}
                className="border border-gray-600 p-3 rounded bg-gray-800 text-gray-200 focus:ring-2 appearance-none focus:ring-purple-400"
              >
                <option value="tcp">TCP</option>
                <option value="udp">UDP</option>
                <option value="icmp">ICMP</option>
              </select>
            </div>

            {/* Service */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-400 mb-2">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="border border-gray-600 p-3 rounded bg-gray-800 text-gray-200 focus:ring-2 appearance-none focus:ring-purple-400"
              >
                <option value="http">HTTP</option>
                <option value="dns">DNS</option>
                <option value="ftp">FTP</option>
                <option value="ssh">SSH</option>
              </select>
            </div>

            {/* Flag */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-400 mb-2">Flag</label>
              <select
                name="flag"
                value={formData.flag}
                onChange={handleChange}
                className="border border-gray-600 p-3 rounded bg-gray-800 text-gray-200 focus:ring-2 appearance-none focus:ring-purple-400"
              >
                <option value="SF">SF</option>
                <option value="S0">S0</option>
                <option value="REJ">REJ</option>
              </select>
            </div>

            {/* Dynamic Numeric Inputs */}
            {Object.keys(formData).map(
              (key) =>
                !["protocol_type", "service", "flag"].includes(key) && (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-400 mb-2">
                      {key}
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="border border-gray-600 p-3 rounded bg-gray-800 text-gray-200 focus:ring-2 focus:ring-purple-400"
                      required
                    />
                  </div>
                )
            )}
          </div>

          {/* Submit Button - Neon Effect */}
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all hover:shadow-purple-500/50 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Intrusion"}
          </button>
        </form>

        {/* Result Box - Animated */}
        {result && (
          <div
            className={`mt-6 p-3 text-white text-center rounded text-lg font-semibold animate-pulse ${
              result === "normal" ? "bg-green-600 shadow-lg" : "bg-red-600 shadow-lg"
            }`}
          >
            {result === "normal" ? "✅ No Threat Detected" : "🚨 Anomaly Detected!"}
          </div>
        )}
      </div>
    </div>
    </Element>
  );
}
