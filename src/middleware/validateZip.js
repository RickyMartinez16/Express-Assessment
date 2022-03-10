// function validateZip(req, res, next) {
//     const zip = req.params.zip;
//   if (zip.length === 5 && typeof zip === "number") {
//     next()
//   } else {
//     next(`Zip (${zip}) is invalid!`);
//   }
// }

// module.exports = validateZip;


function validateZip(req, res, next) {
    const zip = req.params.zip;
    if (zip.length === 5 && zip.match(/^[0-9]+$/) != null) {
      next()
    } else {
      next(`Zip (${zip}) is invalid!`)
    }
  }
  
  module.exports = validateZip;