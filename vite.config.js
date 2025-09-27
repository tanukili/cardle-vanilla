import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import liveReload from 'vite-plugin-live-reload'; // 監聽 .ejs 變動，提供熱更新
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { glob } from 'glob'; // 多頁的書出口

// 自訂 plugin 移除輸出檔案的 'pages'
const moveOutputPlugin = () => {
  return {
    name: 'move-output',
    enforce: 'post',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith('pages/')) {
          const newFileName = fileName.slice('pages/'.length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
};

// vite 專案設定
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  const base = isDev ? '/' : '/cardle-vanilla/';

  return {
    base: process.env.NODE_ENV === 'production' ? '/cardle-vanilla/' : '/', // 對應靜態網站部屬時的子資料夾
    plugins: [
      // 指定熱更新的監聽檔案
      liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './components/**/*.ejs', './page/**/*.html']),
      // 讓 .html 支援 <%= ... %> EJS 模板語法
      ViteEjsPlugin({
        HERF_BASE: isDev ? '/pages/' : base, // dev 用 /pages/，build 用 /cardle-vanilla/
      }),
      moveOutputPlugin(),
    ],
    // 指定啟動 dev server 時打開的檔案
    server: {
      open: 'pages/index.html',
    },
    build: {
      rollupOptions: {
        // 轉換成 Rollup 的入口清單
        input: Object.fromEntries(
          // 找到所有 pages 的 HTML
          glob
            .sync('pages/**/*.html')
            .map((file) => [
              path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
      },
      // 輸出到 dist 資料夾
      outDir: 'dist',
    },
  };
});
