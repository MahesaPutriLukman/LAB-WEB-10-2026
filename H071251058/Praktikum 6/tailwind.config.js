// Dibaca oleh src/index.css lewat @config (Tailwind v4 + plugin Vite)
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Espresso: teks dan header
        kopi: {
          900: '#2A1D17',
          700: '#4A3428',
          500: '#7A6052',
          300: '#BFAE9E',
        },
        // Kertas menu: latar
        krem: {
          50: '#FBF7F0',
          100: '#F4EDE1',
          200: '#E9DECD',
        },
        // Langit senja: aksen dan tombol utama
        senja: {
          700: '#8E3824',
          600: '#A9432E',
          500: '#C8553D',
          300: '#E39A6B',
          100: '#F6DDD3',
        },
        // Daun kopi: tanda berhasil
        daun: {
          700: '#3E5739',
          600: '#4F6B4A',
          50: '#E8EEE3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
