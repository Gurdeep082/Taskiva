import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taskiva.app',
  appName: 'Taskiva',
  webDir: 'build',

  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#0f172a",
      showSpinner: false,
    },
  },
};

export default config;