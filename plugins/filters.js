import Vue from "vue";
var Moment = require("moment");
var Numeral = require("numeral");

Moment.locale("es");

Vue.filter("NumeroEntero", value => {
  return Numeral(value).format("0,0");
});
Vue.filter("NumeroDecimal", value => {
  return Numeral(value).format("0.0");
});
Vue.filter("Capitalize", value => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("NoShowZero", value => {
  if (!value) return "";
  value = Numeral(value).format("0,0");
  return value == 0 ? "" : value;
});

Vue.filter("FechaLarga", value => {
  if (value == null) {
    return "";
  }
  let anio = Moment(value).format("YYYY");
  return anio == "1900" ? "" : Moment(value).format("DD-MMM-YYYY");
});

Vue.filter("FechaCorta", value => {
  if (value == null) {
    return "";
  }
  let anio = Moment(value).format("YYYY");
  return anio == "1900" ? "" : Moment(value).format("DD-MM-YY");
});


 

        
