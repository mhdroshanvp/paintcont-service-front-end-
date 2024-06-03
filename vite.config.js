import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',  // Bind to all network interfaces
//     port: 4444,  // Specify the port you want to use
//   },
// });
