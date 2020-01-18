

module.exports = {
  layout: function(config) {
    return `
      <shell-router config='${config}'></shell-router>
      <script src="resources/router.js"></script>
      <script src="resources/router-element.js"></script>
    `
  }
}