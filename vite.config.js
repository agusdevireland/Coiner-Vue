import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '' },
        { src: 'public/assets/icons', dest: 'assets' }
      ]
    })
  ],
  css: {
    postcss: './postcss.config.js' 
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'src/popup.html',  
        content: 'src/content.js'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});







