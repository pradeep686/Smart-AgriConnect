import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      tabIndex={-1} // Ensures modal can be focusable when opened
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close Modal" // Accessibility improvement
        >
          ✖
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
