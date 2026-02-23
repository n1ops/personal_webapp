import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function TextReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
}) {
  const characters = text.split('');

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: delay }}
        style={{ display: 'inline-block' }}
      >
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={letterVariants}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
