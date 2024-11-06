import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/assets/icons/*', // The correct path to icons in the `public` folder
          dest: 'assets/icons', // Where they should go in the build output
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist', // Build output directory
    rollupOptions: {
      input: {
        popup: 'public/PopUp.html',
      },
      output: {
        dir: 'dist', // Output directory for the build files
        entryFileNames: '[name].js', // Keep original file names
      },
    },
  },
});




