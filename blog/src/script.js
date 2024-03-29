$(document).ready(function () {

  function getArticle(info, file, date) {
    return '<section> <a href=' + file + '>' + info + '</a > <p>' + date + '</p> </section>'
  }

  function getInfoFromHTMLFile(file, i) {
    $.get(file, function (data) {
      var info = $(data).find('h2').text();
      var date = $(data).find('#date').text();
      $('#main-' + i).append(getArticle(info, file, date));
    });
  }

  let files = [
    "2023/8_06.html",
    "2023/8_05.html",
    "2023/7_23.html",
    "2023/7_18.html",
    "2023/7_15.html",
    "2023/7_14.html",
    "2023/7_13.html"
  ]

  function processNew() {
    for (let i = 0; i < files.length; i++) {
      $('#main').append("<div id='main-" + i + "'></div>");
      getInfoFromHTMLFile(files[i], i);
    }
  }

  processNew();

  //   // If you use GitRows as a module:
  // const Gitrows = require('gitrows');

  // // Init the GitRows client, you can provide options at this point, later or just run on the defaults
  
});