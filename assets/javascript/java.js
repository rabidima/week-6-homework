$(document).ready(function(){
	console.log("ready");

	var heroesNames = ["superman","batman","spiderman","thor","wonder woman","captain america","hulk"];
	var newName = newHeroId.value;

	createButtons();

function createButtons(){
	for (i = 0; i < heroesNames.length; i++){
		var buttData = heroesNames[i];
		var showbuttDiv = $('<div>');
		var butt = $('<button type="button" class="btn btn-default arrayButtons" >' + heroesNames[i] + '</button>');
		butt.attr('data', buttData);
		showbuttDiv.append(butt);
		$("#buttonsDiv").append(showbuttDiv);		
				// console.log('data', heroesNames[i] );
	}

$('.arrayButtons').on('click', function(){
	var hero = $(this).attr('data');
	

	console.log('this:' , this);
	// console.log('array', heroesNames);
	console.log('hero name:',hero);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10";


	$("#showDiv").empty();
	
	$.ajax({
			url: queryURL, method: 'GET'
		})		
		.done(function(response){
			var responseResults = response.data;

			if (responseResults.length < 1){
				$("#showDiv").text("Not enough Data to show");
					//if
				}else{
					
			for (var i = 0; i < responseResults.length; i ++) {

				var pictureDiv = $('<div class="col-md-3 imageDiv">');
				var p = $('<p>').text("Rating: " + responseResults[i].rating);
			
				var datastill = responseResults[i].images.fixed_height_small_still.url;

				var dataanimate = responseResults[i].images.fixed_height_small.url;
			
				var heroImage = $('<img src=' + datastill + ' data-still=' + datastill + ' data-animate=' + dataanimate +  ' data-state="still" class="heroClass">');

				
				// heroImage.attr('src', datastill);

				
				
				pictureDiv.append(p,heroImage);

				$("#showDiv").prepend(pictureDiv);


			//for
			}
				console.log("this from createButtons", this);

			$('.heroClass').on('click',function(){
					
					var state = $(this).attr('data-state'); 
					console.log("from click",this);
					console.log(state);
					


			if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            //------


				});
		}
			});

});
//---------
}
$(document).keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var newName = newHeroId.value;
    console.log(newName);

    if (keycode == '13' && newName!=0){
        heroesNames.push(newName);
		$("#buttonsDiv").empty();
		createButtons();
		return false;
    }
})


	$("#addButton").on('click', function(){
		var newName = newHeroId.value;
		heroesNames.push(newName);
		$("#buttonsDiv").empty();
		createButtons();
		return false;
		
	});





})
	

