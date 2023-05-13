import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:8889
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment'
  },
  // use babel to transpile jsx files
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  rollupInputOptions: {
    plugins: [
      require('@rollup/plugin-babel').default({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
  },
})
