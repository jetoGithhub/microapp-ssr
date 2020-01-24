

module.exports = {
  layout: function(config) {
    return `
      <shell-router config='${config}'>
        <div outlet="full-width" ></div>
        <app-layout outlet="dashboard-width" ></app-layout>
      </shell-router>
      <script src="resources/router.js"></script>
      <script src="resources/router-element.js"></script>
      <script src="resources/layout-element.js"></script>
    `
  }
}