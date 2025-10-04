import { App } from './app.js';

class Main {
    public run() {
        const app = new App();
        app.start();
    }
}

const cmsApplication = new Main();
cmsApplication.run();
