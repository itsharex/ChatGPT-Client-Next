import { fileURLToPath, URL } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  return {
    // base: mode === 'development' ? '/' : '/ChatGPT-Client-Next',
    plugins: [
      vue(),
      vueJsx(),
      qrcode(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      WindiCSS(),
      AutoImport({
        vueTemplate: true,
        imports: ['vue', 'vue-router'],
        dirs: ['src/config', 'src/hooks', 'src/utils'],
        dts: 'typings/auto-imports.d.ts',
        // dts: false,
        resolvers: [ArcoResolver()],
        eslintrc: {
          enabled: true,
          filepath: '.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        dirs: ['./src/components'],
        dts: 'typings/components.d.ts',
        resolvers: [ArcoResolver({ importStyle: 'less' })]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'scrollbar-track-size': '6px',
            'scrollbar-thumb-bar-size': '6px',
            'arcoblue-1': ' #E8FFF5',
            'arcoblue-2': '#B1EDD6',
            'arcoblue-3': '#80DABB',
            'arcoblue-4': '#54C8A3',
            'arcoblue-5': '#2FB58F',
            'arcoblue-6': '#10A37F',
            'arcoblue-7': '#0A8D71',
            'arcoblue-8': '#067863',
            'arcoblue-9': '#026254',
            'arcoblue-10': '#004D44'
            // 'arcoblue-1': ' #E8FFFC',
            // 'arcoblue-2': '#AFF0EB',
            // 'arcoblue-3': '#7BE1DC',
            // 'arcoblue-4': '#4DD3D0',
            // 'arcoblue-5': '#24C1C4',
            // 'arcoblue-6': '#00ADB5',
            // 'arcoblue-7': '#008E9B',
            // 'arcoblue-8': '#007281',
            // 'arcoblue-9': '#005767',
            // 'arcoblue-10': '#003E4D'
          }
        }
      }
    },
    server: {
      port: Number(env.VITE_PORT),
      host: true,
      open: true,
      proxy: {
        // 接口地址代理
        '/api': {
          target: 'http://103.179.243.163:8080', // 接口的域名
          secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
