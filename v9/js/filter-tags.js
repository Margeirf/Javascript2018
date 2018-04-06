(function() {

  var $imgs = $('#gallery img');                  // Store all images
  var $buttons = $('#buttons');                   // Store buttons element
  var tagged = {};                                // Create tagged object
  var $search = $('#filter-search');      // Get the input element
  var cache = [];  

 var p1 = new Image();
    p1.src = 'img/p1.jpg';
    p1.tags = 'Animators, Illustrators'
    p1.alt = 'Rabbit';
var p2 = new Image();
    p2.src = 'img/p2.jpg';
    p2.tags = 'Photographers, Filmmakers';
    p2.alt = 'Sea';
var p3 = new Image();
    p3.src = 'img/p3.jpg';
    p3.tags = 'Photographers, Filmmakers';
    p3.alt = 'Deer';
var p4 = new Image();
    p4.src = 'img/p4.jpg';
    p4.tags = 'Designers';
    p4.alt = 'New York Street Map';
var p5 = new Image();
    p5.src = 'img/p5.jpg';
    p5.tags = 'Photographers, Filmmakers';
    p5.alt = 'Trumpet Player';
var p6 = new Image();
    p6.src = 'img/p6.jpg',
    p6.tags = 'Designers, Illustrators';
    p6.alt = 'Typographic Study';
var p7 = new Image();
    p7.src = 'img/p7.jpg';
    p7.tags = 'Photographers';
    p7.alt = 'Bicycle Japan';
var p8 = new Image();
    p8.src = 'img/p8.jpg';
    p8.tags = 'Designers';
    p8.alt = 'Aqua Logo';
var p9 = new Image();
    p9.src = 'img/p9.jpg';
    p9.tags = 'Animators, Illustrators';
    p9.alt = 'Ghost';
document.body.append(p1);
    document.body.append(p2);
    document.body.append(p3);
    document.body.append(p4);
    document.body.append(p5);
    document.body.append(p6);
    document.body.append(p7);
    document.body.append(p8);
    document.body.append(p9);
  function searchImg(){
      images.each(function() {                 // For each image
        cache.push({                          // Add an object to the cache array
          element: this,                      // This image
          text: this.alt.trim().toLowerCase() // Its alt text (lowercase trimmed)
        });
      });

      function filter() {                     // Declare filter() function
        var query = this.value.trim().toLowerCase();  // Get the query
        cache.forEach(function(img) {         // For each entry in cache pass image 
          var index = 0;                      // Set index to 0

          if (query) {                        // If there is some query text
            index = img.text.indexOf(query);  // Find if query text is in there
          }

          img.element.style.display = index === -1 ? 'none' : '';  // Show / hide
        });
      }

      if ('oninput' in $search[0]) {          // If browser supports input event
        $search.on('input', filter);          // Use input event to call filter()
      } else {                                // Otherwise
        $search.on('keyup', filter);          // Use keyup event to call filter()
      }      
  }
    
  function filterImg(){
      $imgs.each(function() {                         // Loop through images and
    var img = this;                               // Store img in variable
    var tags = $(this).data('tags');              // Get this element's tags

    if (tags) {                                   // If the element had tags
      tags.split(',').forEach(function(tagName) { // Split at comma and
        if (tagged[tagName] == null) {            // If object doesn't have tag
          tagged[tagName] = [];                   // Add empty array to object
        }
        tagged[tagName].push(img);                // Add the image to the array
      });
    }
  });

  $('<button/>', {                                 // Create empty button
    text: 'Show All',                              // Add text 'show all'
    class: 'active',                               // Make it active
    click: function() {                            // Add onclick handler to
      $(this)                                      // Get the clicked on button
        .addClass('active')                        // Add the class of active
        .siblings()                                // Get its siblings
        .removeClass('active');                    // Remove active from siblings
      $imgs.show();                                // Show all images
    }
  }).appendTo($buttons);                           // Add to buttons

  $.each(tagged, function(tagName) {               // For each tag name
    $('<button/>', {                               // Create empty button
      text: tagName + ' (' + tagged[tagName].length + ')', // Add tag name
      click: function() {                          // Add click handler
        $(this)                                    // The button clicked on
          .addClass('active')                      // Make clicked item active
          .siblings()                              // Get its siblings
          .removeClass('active');                  // Remove active from siblings
        $imgs                                      // With all of the images
          .hide()                                  // Hide them
          .filter(tagged[tagName])                 // Find ones with this tag
          .show();                                 // Show just those images
      }
    }).appendTo($buttons);                         // Add to the buttons
  });
  }
    
    searchImg();
    filterImg();

}());