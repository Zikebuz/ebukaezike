// components/SectionHeader.jsx
'use client';
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      className="text-center my-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </motion.div>
  );
}
