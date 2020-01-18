const express = require('express');
const render = require('./render');
const configMicroapp = require('./fetch/config-microapp');

const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/resources', express.static('./src/client'));

app.get('/', (req, res) => {
  const config = configMicroapp.load();
  const router = render.layout(JSON.stringify(config));
  res.render('layout', { router });
});

app.listen(3003);
console.log(`🔴  team red running. product page is available here:
>> http://127.0.0.1:3003/`);
