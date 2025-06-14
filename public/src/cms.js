import { CMS } from 'decap-cms-app/dist/esm';

// Initialize with custom settings
CMS.init({
  config: {
    // Your config.yml settings can go here too
    backend: {
      name: 'git-gateway',
      branch: 'main'
    }
  }
});

// Register custom widgets or previews if needed