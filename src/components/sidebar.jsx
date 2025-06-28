import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "./chatbot";
import ModalTabs from "./modalTabs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [explanationReply, setExplanationReply] = useState(null);

  const generatePDF = async () => {
    const chatBox = document.getElementById("chatbox");

    if (!chatBox) {
      alert("❌ Chat container not found.");
      return;
    }

    const canvas = await html2canvas(chatBox);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("insuralens_chat.pdf");
  };

  // Listen for extraction result
  useEffect(() => {
    const listener = (event) => {
      if (
        event.source !== window ||
        !event.data ||
        event.data.source !== "insuralens-content"
      ) {
        return;
      }

      if (event.data.type === "EXTRACTION_COMPLETE") {
        console.log("✅ Extracted plans:", event.data.data);
      }

      if (event.data.type === "EXPLAIN_COMPLETE") {
        const response = event.data.data?.reply || "✅ Explained.";
        setExplanationReply(response); // 🔄 pass to ChatBot
      }

      if (event.data.type === "EXPLAIN_ERROR") {
        alert("❌ Explain failed: " + event.data.error);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  // Send message to content script
  const handleExtract = async () => {
    try {
      window.postMessage(
        {
          source: "insuralens-ui",
          type: "EXTRACT_INSURANCE_DETAILS_REQUEST",
        },
        "*"
      );
    } catch (err) {
      console.error("Error in handleExtract:", err);
    }
  };

  const handleExplain = () => {
    window.postMessage(
      {
        source: "insuralens-ui",
        type: "EXPLAIN_INSURANCE_DETAILS",
      },
      "*"
    );
  };

  return (
    <motion.div
      className={`w-full h-full`}
      animate={{
        width: isOpen ? "350px" : "500px",
        height: isOpen ? "100vh" : "300px",
        borderTopLeftRadius: isOpen ? "1rem" : "0.75rem",
        borderBottomLeftRadius: isOpen ? "1rem" : "0.75rem",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Floating IL button */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 bg-blue-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer z-[100000] 
             hover:bg-blue-300 hover:text-blue-900 transition-colors duration-300 ease-in-out"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(true)}
        >
          <span className="text-xl font-bold">IL</span>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 right-0 h-screen w-[350px] bg-[#0e1b2d] text-white shadow-2xl z-[100000] rounded-l-2xl flex flex-col p-4"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">InsuraLens</h2>
              <button
                className="text-sm bg-white text-blue-900 px-3 py-1 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>

            <ChatBot externalMessage={explanationReply} />

            <div className="grid grid-cols-1 gap-3 text-sm mt-[20px]">
              <div className="flex flex-row justify-around">
                <button
                  className="flex items-center gap-2 w-fit px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-md hover:bg-white/20 hover:scale-105 transition shadow-md"
                  onClick={handleExtract}
                >
                  Extract Insurance Details
                </button>

                <button
                  className="flex items-center gap-2 w-fit px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-md hover:bg-white/20 hover:scale-105 transition shadow-md"
                  onClick={handleExplain}
                >
                  🌐 Explain
                </button>
              </div>

              <button
                className="flex items-center gap-2 w-fit px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-md hover:bg-white/20 hover:scale-105 transition shadow-md"
                onClick={generatePDF}
              >
                Generate PDF
              </button>

              <button
                className="flex items-center gap-2 w-fit px-4 py-2 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-md hover:bg-white/20 hover:scale-105 transition shadow-md"
                onClick={() => setShowModal(true)}
              >
                <div style={{ color: "beige" }}>⚙️</div> Settings
              </button>
            </div>

            <AnimatePresence>
              {showModal && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100001]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white rounded-xl p-6 text-black w-[400px] max-w-[90vw]"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                  >
                    <ModalTabs onClose={() => setShowModal(false)} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
