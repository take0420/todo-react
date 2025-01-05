module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#64748B',
        danger: '#DC2626',
      },
      borderRadius: {
        custom: '12px',
      },
    },
  },
  plugins: [],
};
