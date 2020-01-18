class ConfigMicroApp {

  load() {
    return  [
      {
        tag: 'microflow-vanilla',
        path: '/vanillajs',
        resources: 'resources/micro-flow-vanilla.js',
        default: false,
      },
      {
        tag: 'micro-app-demo',
        path: '/admin-user/list',
        resources: 'resources/micro-app.vendor.js',
        default: true,
      }
    ]
  }
}
module.exports = new ConfigMicroApp();
