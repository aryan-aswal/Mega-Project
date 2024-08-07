import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [
      react(),
      !isProduction && {
        ...rollupNodePolyfills(),
        apply: 'build'
      }
    ].filter(Boolean),
    resolve: {
      alias: {
        util: 'rollup-plugin-polyfill-node/polyfills/util',
        sys: 'util',
        events: 'rollup-plugin-polyfill-node/polyfills/events',
        stream: 'rollup-plugin-polyfill-node/polyfills/stream',
        path: 'rollup-plugin-polyfill-node/polyfills/path',
        querystring: 'rollup-plugin-polyfill-node/polyfills/qs',
        punycode: 'rollup-plugin-polyfill-node/polyfills/punycode',
        url: 'rollup-plugin-polyfill-node/polyfills/url',
        string_decoder: 'rollup-plugin-polyfill-node/polyfills/string-decoder',
        http: 'rollup-plugin-polyfill-node/polyfills/http',
        https: 'rollup-plugin-polyfill-node/polyfills/http',
        os: 'rollup-plugin-polyfill-node/polyfills/os',
        assert: 'rollup-plugin-polyfill-node/polyfills/assert',
        constants: 'rollup-plugin-polyfill-node/polyfills/constants',
        _stream_duplex: 'rollup-plugin-polyfill-node/polyfills/readable-stream/duplex',
        _stream_passthrough: 'rollup-plugin-polyfill-node/polyfills/readable-stream/passthrough',
        _stream_readable: 'rollup-plugin-polyfill-node/polyfills/readable-stream/readable',
        _stream_writable: 'rollup-plugin-polyfill-node/polyfills/readable-stream/writable',
        _stream_transform: 'rollup-plugin-polyfill-node/polyfills/readable-stream/transform',
        timers: 'rollup-plugin-polyfill-node/polyfills/timers',
        console: 'rollup-plugin-polyfill-node/polyfills/console',
        vm: 'rollup-plugin-polyfill-node/polyfills/vm',
        zlib: 'rollup-plugin-polyfill-node/polyfills/zlib',
        tty: 'rollup-plugin-polyfill-node/polyfills/tty',
        domain: 'rollup-plugin-polyfill-node/polyfills/domain',
      }
    },
    define:{
      global: "globalThis",
    },
  };
});
