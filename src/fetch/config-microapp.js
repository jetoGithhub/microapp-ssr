class ConfigMicroApp {

  load() {
    return  [
      {
        tag: 'microflow-vanilla',
        path: '/vanillajs',
        resources: 'resources/micro-flow-vanilla.js',
        layout: 'full-width',
      },
      {
        tag: 'micro-app-demo',
        path: '/admin-user/list',
        resources: 'resources/micro-app.vendor.js',
        layout: 'dashboard-width',
      }
    ]
  }
}
module.exports = new ConfigMicroApp();
