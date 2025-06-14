import { CMS } from 'decap-cms-app/dist/esm';


CMS.init({
  config: {
   
    backend: {
      name: 'git-gateway',
      branch: 'main'
    }
  }
});

