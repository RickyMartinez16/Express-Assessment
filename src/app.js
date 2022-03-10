const express = require("express");
const validateZip = require("./middleware/validateZip");
const getZoos = require('./utils/getZoos');
const app = express();


app.get('/zoos/all', (req, res, next) => {
    const zoos = getZoos();
    const access = req.query.admin
    const arr = zoos.map((zoo) => zoo).join('; ');  
  
    res.send(access === 'true' ? `All zoos: ${arr}` : 'You do not have access to that route.')
  })

  app.get(
    '/zoos/:zip',
    validateZip,
    (req, res, next) => {
        const zip = req.params.zip;
        const zoos = getZoos(zip);
        
        if (zoos.length === 0) {
        res.send(`${zip} has no zoos.`)
        }

        if (zoos) {
            const arr = zoos.map((zoo) => {
              return zoo;
            }).join('; ');
            res.send(`${zip} zoos: ${arr}`)
          } else {
            res.send(`${zip} has no zoos.`)
          }
    }
)

  app.get(
    '/check/:zip', 
    validateZip, 
    (req, res, next) => {
    const zip = req.params.zip
    if (getZoos(zip)) {
      res.send(`${zip} exists in our records.`)
    } else {
      res.send(`${zip} does not exist in our records.`)
    }
})

// error handlers

app.use((req, res, next) => {
    res.send(`That route could not be found!`);
  });
  
  app.use((err, req, res, next) => {
    console.error(err);
    res.send(err);
  });

module.exports = app;