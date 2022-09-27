/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['11px', '20px'],
      sm: ['13px', '20px'],
      base: ['13px', '20px'],
      "xl": ['16px', '20px'],
      "2xl": ['24px', '30px'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1040px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    container: {
      center: true,
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        'lg': '1040px'
      }
    },
    extend: {
      colors: {
        'bg': '#F5F5F5',
        'mred': '#67000A',
        'tred': '#FF3131',
        'lgreen': '#F0FCF4',
        'tgreen': '#30B656',
        'grey': '#EEF3F5',
        'tgrey': '#848E94',
        'tblack': '#262F35',
        'blue2': '#4695DD',
        'black': '#1D1D1D'
      },
      fontFamily: {
        body: ['Roboto']
      },
    },
  },
  plugins: [],
}

