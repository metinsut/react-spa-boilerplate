import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [react(), visualizer(), viteCommonjs()],
  resolve: {
    alias: {
      types: path.resolve(__dirname, './src/types'),
      components: path.resolve(__dirname, './src/components'),
      assets: path.resolve(__dirname, './src/assets'),
      helpers: path.resolve(__dirname, './src/helpers'),
      hooks: path.resolve(__dirname, './src/hooks'),
      locales: path.resolve(__dirname, './src/locales'),
      mocks: path.resolve(__dirname, './src/mocks'),
      pages: path.resolve(__dirname, './src/pages'),
      routes: path.resolve(__dirname, './src/routes'),
      utils: path.resolve(__dirname, './src/utils'),
      store: path.resolve(__dirname, './src/store')
    }
  },
  server: {
    port: 3000
  },
  define: {
    global: {
      require
    }
  }
});
