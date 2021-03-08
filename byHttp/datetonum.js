var dates_as_int = ["2021-03-08 16:38", "2021-03-08 16:38"];

var dates = dates_as_int.map(function (dateStr) {
  console.log(new Date(dateStr).getTime());
  return new Date(dateStr).getTime();
});
