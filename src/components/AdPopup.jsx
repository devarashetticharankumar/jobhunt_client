import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import InArticleAd from './InArticleAd';

const AdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('ad_popup_shown');
      if (!shown) {
        setIsVisible(true);
        sessionStorage.setItem('ad_popup_shown', 'true');
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-[32px] p-8 max-w-lg w-full relative shadow-2xl border border-gray-100"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-50 transition-colors border border-gray-100 z-10"
          >
            <IoClose className="text-gray-500 text-xl" />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#091e42] leading-tight">Recommended For You</h3>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-50">
            <InArticleAd />
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full py-4 bg-[#091e42] text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg"
            >
              Continue to Site
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdPopup;
