

$(document).ready(function() {
    // Define the folder path where the HTML files are located
    var folderPath = '2023/';
  
    // Array to store the collected information
    var collectedInfo = [];

    function getArticle(info, file, date){
        return '<section> <a href='+file+'>' + info + '</a > <p>'+ date +'</p> </section>'
    }
  
    // Function to retrieve the information from each HTML file
    function getInfoFromHTMLFile(file) {
      $.get(file, function(data) {
        // Extract the desired information from the HTML file
        var info = $(data).find('h2').text();
        var date = $(data).find('#date').text();
        $('#main').append(getArticle(info, file, date));
        // Add the information to the collectedInfo array
        collectedInfo.push(info);
      });
    }

    let files = [
      "2023/7_15.html",
      "2023/7_14.html",
      "2023/7_13.html"
    ]
  
    // // Function to process each HTML file in the folder
    // function processHTMLFiles() {
    //   $.ajax({
    //     url: folderPath,
    //     success: function(data) {
    //       // Find all the HTML files in the folder
    //       $(data).find('a[href$=".html"]').each(function() {
    //         var file = $(this).attr('href');
    //         // Call the function to retrieve information from each HTML file
    //         getInfoFromHTMLFile(file);
    //       });
    //     },
    //     complete: function() {
    //       // Display the collected information
    //     //   collectedInfo.forEach(function(info) {
    //     //     $('#main').append('<p>' + info + '</p>');
    //     //   });
    //     }
    //   });
    // }

    function processNew(){
        files.forEach(function(file) {
            // Call the function to retrieve information from each HTML file
            getInfoFromHTMLFile(file);
          })
    }

    processNew();
  });