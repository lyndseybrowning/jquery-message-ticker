(function( $ ) {
  $.fn.ticker = function( options ) {

    //default settings
    var settings = {
      newsTitle : 'Recent News',
      maxChars : 200,
      pause: 3000, //milliseconds. Any less than 2000 renders items unreadable, thus default will be used.
      randomise: false, //options: true or false
      maxItems :  5 //used in conjuction with randomise
    };

    //define options
    var options = $.extend(settings, options);
    //counter keeps track of the list items we're displaying
    var counter = 0;
    //variable to stop randomisation repeating
    var tempVar = -1;
    var masterElement = this;

    //first check that the element passed is a valid DOM element
    if ( this.length === 0) {
        alert('DOM Element not found. Please ensure you are referencing the correct element, either by ID(#element) or Class(.element)');
        return false;
    }

    //DOM element exists, create variables
    var lbMaster = this.selector;
    var listEl = $(lbMaster).find('li');
    var lbEltype = this[0].nodeName;

    //ensure that a valid list element has been passed
    if(lbEltype != 'UL' && lbEltype != 'OL') {
        alert('The selected element <'+lbEltype.toLowerCase()+'> cannot be used for this plugin. Please use elements of type <ul> or <ol> only!');
        return false;
    }

    //if list count is 0, don't continue!
    if(listEl.length === 0) {
          alert('You haven\'t added any news items to your list!');
          return false;
     };

    //element is valid, begin newsticker
      return this.each(function(index) {
        //create the html that contains the newsticker
        generateHTML(this);

        //define list items
        var createTicker = function() {
            //number of list elements
            var listCount = listEl.length;
            //set counter back to beginning when it reaches the lists end
            if(counter === (listCount+1)) {
                counter=1 //go straight back to the first list element
            };
            //hide all list elements
            listEl.hide();

            //begin newsticker
            if(options.randomise) {  //display list items randomly

                //call getRand() to generate a random number between 1 and listCount
                var randomNumber = getRand(listCount);
                //to avoid the same news item repeating
                while (randomNumber == tempVar){
                    randomNumber = getRand(listCount);
                };
                tempVar = randomNumber;

                //fade news item in
                $('li:nth-child('+ randomNumber +')').fadeIn('fast');

            } else {
                //show first element on page initialisation
                if(counter===0) {
                    $('li:nth-child(1)').show();
                    counter++;
                };
                //show item
                $('li:nth-child('+ counter +')').fadeIn('fast');
                ++counter;
            }
        }
        createTicker();
        setInterval(createTicker, getPause());
     });

    function generateHTML(element) {
          //create a wrapper
          var divWrap = $('<div/>').addClass('ticker-wrap');
          //create a title
          var divTitle = $('<span class="ticker-title">'+ options.newsTitle +'</span>');

          //add wrapper to DOM
          $( element ).before( divWrap );
          //append wrap around master element
          divWrap.append( $(element) ).append( $(element).next() );
          //append the newsticker title to the master element
          $( element ).before( divTitle );
     }

     function getRand(numElements) {
        var rn = 1 + Math.floor(Math.random() * numElements);
        return rn;
     }

     //if pause is set to 0 or <2000, revert back to default
     function getPause() {
        if(!options.pause==0 && options.pause >= 2000) {
            p = options.pause;
        } else {
            p = 3000;
        }
         return p;
     }
  };
})( jQuery );
