//Time
var date = new Date();
date.setTime(date.getTime() + (30 * 60 * 60 * 1000));

/**
 * This function will execute when opening any page that includes the js.js file
 * It will load a certain header.html page into the header tag depending on the user
 * if he is looged in then the headerLoggedIn.html will be loaded, otherwise the header.html
 */
$(document).ready(function() {
    if(loggedIn()){
        $("#header").load("content/headerLoggedIn.html");
    }else {
        $("#header").load("content/header.html");
    }

});

/**
 * This function will execute when opening any page that includes the js.js file
 * when its called, the footer.html page will be loaded on all of the pages in
 * the footer tag
 */
$(document).ready(function() {
    $("#footer").load("content/footer.html");
});

/**
 * This function will allow the user to register an account using ajax
 * @constructor
 */
function Register() {
    $(document).ready(function(){
        if(!loggedIn()) {
            var form = $('#RegistrationFrom');

            //Hijack form submit
            form.submit(function (event) {
                //Prevent default form action(prevent refresh)
                event.preventDefault();
                //Set variables
                var mData = {};
                mData.name = $('#firstname').val();
                mData.lastname = $('#lastname').val();
                mData.preposition = $('#preposition').val();
                mData.username = $('#username').val();
                mData.password = $('#password').val();

                if ($('#password').val() != $('#password_re').val()) {
                    $('#error_log').html('<div class="alert alert-warning">Passwords dont match...</div>');
                } else if (mData.name != '' && mData.lastname != '' && mData.username != '' && mData.password != '') {
                    $(function () {
                        $.ajax({
                            url: 'http://localhost:3000/api/users',
                            method: 'POST',
                            data: mData,
                            dataType: 'application/json',
                            error: function (error) {
                                console.log(error);
                            },
                        });
                    });
                    $('#error_log').html('<div class="alert alert-success">New user registered!</div>');
                } else {
                    $('#error_log').html('<div class="alert alert-danger">All of the required fields must be filled</div>');
                }

            });
        }else {
            window.location.replace("http://localhost:63342/web3v1/webtech3v2/website/index.html?_ijt=3uc15oirajil2harmm8jcov43c");
		}
    });
}

/**
 * This function will allow the user to login to the system
 * When a user logs in, 2 cookies will be made, one with the username
 * and the other with the logged in user's token. This token will be used
 * when using the other functions.
 */
function logIn(){
    $(document).ready(function() {
        //If there is no user logged in
		if(!loggedIn()){
			var form = $('#LoginForm');
			var token = "";
			var values = "";
			form.submit(function(e){
				e.preventDefault();
				//Set variables
				var mData = {};
				mData.username = $('#username').val();
				mData.password = $('#password').val();
				//Check if titel and omschrijving value is set
				if(mData.username != '' && mData.password != ''){
					$(function(){
						$.ajax({
							url: 'http://localhost:3000/auth',
							method: 'POST',
							data: mData,
							dataType: 'application/json',
							error: function(res){
								console.log(res.responseText);
								if(res.status == 403){
									$('#error_log').html('<div class="alert alert-warning">Wrong username/password combination</div>');
								}else{
									$('#error_log').html('<div class="alert alert-success">Login successful!</div>');
									token = res.responseText.substr(10,res.responseText.length-2);
									token = token.substr(0,token.length-2);

									$.cookie("userName", mData.username, {
										expires: 365,
										path: '/'
									});

                                    $.cookie("userToken", token, {
                                        expires: 365,
                                        path: '/'
                                    });
                                    window.location.replace("http://localhost:63342/web3v1/webtech3v2/website/index.html?_ijt=3uc15oirajil2harmm8jcov43c");
								}
							}
						});

					});

				}else{
					$('#error_log').html = '<div class="alert alert-danger">Username or password is/are empty</div>';
				}
			});
		}else{
			window.location.replace("http://localhost:63342/web3v1/webtech3v2/website/index.html?_ijt=3uc15oirajil2harmm8jcov43c");
		}
    });
}


/**
 * This function will load all of the movies from the database, if imdb is set, then the function
 * will get the movie that is the same as the imdb id.
 * @param imdb The movie id in the database
 */
function loadMovies(){
    //If the imdb id is specified
    $(function(){
        $.ajax({
            type: 'GET',
            beforeSend : function(xhr) {
                xhr.setRequestHeader('Authorization', $.cookie('userToken'));
            },
            async : false,
            url: 'http://localhost:3000/api/ratings/average',
            success: function(data){
                //console.log('success',data);
                var descriptionCounter = 0;
                var words = 0;
                var keyVar;
                var moviesContainerContent = "";
                var averageRating = 0;
                var singleMovie;

                for(keyVar in data) {

                    //Get a single movie/average rating collection
                    averageRating = data[keyVar].average_rating

                    //Loop throw the movie array to get the movie's variables
                    for (singleMovie in data[keyVar].movie){

                        if(data[keyVar].movie.hasOwnProperty(singleMovie)){

                            var imdb = data[keyVar].movie[singleMovie].imdb;
                            var title = data[keyVar].movie[singleMovie].title;
                            var image = data[keyVar].movie[singleMovie].img_url;
                            var length = data[keyVar].movie[singleMovie].length;
                            var director = data[keyVar].movie[singleMovie].director;
                            var description = data[keyVar].movie[singleMovie].description;
                            var divId = "ratingBar"+imdb;
                            //Get the movie description length
                            descriptionCounter = description.length;
                            if(descriptionCounter > 150){
                                words = descriptionCounter/100*30;
                            }else{
                                words = descriptionCounter/100*60;
                            }

                            var functionId= "'"+imdb+"'";
                            moviesContainerContent +=
                                '<div class="col-lg-2 col-md-2 single-movie" style="background-image: url('+image+');">'+
                                '<div class="single-movie-link" onclick="getMovie('+functionId+');" title="Go to movie">'+
                                '<div class="single-movie-cover">'+
                                '<h4 class="single-movie-title">'+title+'</h4>'+
                                '<hr class="white-hr">'+
                                '<div class="single-movie-content">'+
                                '<p><strong>Run time:</strong> '+length+'</p>'+
                                '<p><strong>Director:</strong> '+director+'</p>'+
                                '<div id="singleMovieDescription">' +
                                '<strong>Description:</strong> '+description.substring(0,words)+'...</div>'+
                                '<p><strong>Average rating: </strong>'+averageRating+'</p>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                        }
                    }
                }
                $('#moviesContainer').html(moviesContainerContent);
            }
        });
    });
}


/**
 * This function will get the data of 1 movie using the movie's imdb id
 */

function getMovie(imdb) {
    var moviesContainerContent = '';
    //If the imdb id is specified
    $(function(event){

        $.ajax({
            type: 'GET',
            beforeSend : function(xhr) {
                xhr.setRequestHeader('Authorization', $.cookie('userToken'));
            },
            async : false,
            url: 'http://localhost:3000/api/ratings/'+imdb,
            success: function(data){

                //Get the rating
                var averageRating = data[0].rating;
                var userIdRated = data[0].userid;

                //Get the movie from the database
                $.ajax({
                    type: 'GET',
                    beforeSend : function(xhr) {
                        xhr.setRequestHeader('Authorization', $.cookie('userToken'));
                    },
                    async : false,
                    url: 'http://localhost:3000/api/movies/'+imdb,
                    success: function(data){

                        moviesContainerContent += '' +
                            '<div class="col-md-4">' +
                            '<img src="'+data[0].img_url+'" class="img-responsive">' +
                            '</div>' +
                            '<div class="col-md-4">' +
                            '<h1>'+data[0].title+' ('+data[0].datum+')</h1>' +
                            '<h3>'+data[0].director+'</h3><hr/>' +
                            '<p><strong>Length:</strong> '+data[0].length+'</p>' +
                            '<p><h3>Story</h3><hr/>'+data[0].description+'</p>' +
                            '<h3>Ratings</h3><hr/>' +
                            '<h5>Average rating</h5> '+averageRating;


                            if(userIdRated !== $.cookie("userId")){
                                moviesContainerContent += '' +
                                    '<h5>Rate this movie</h5>';
                            }

                            moviesContainerContent +='</div>' +
                            '<div class="col-md-4"></div> ';

                    }
                });

                $('#moviesContainer').html(moviesContainerContent);
            }
        });
    });


    $('#moviesContainer').html(moviesContainerContent);

}

/**
 * This function will get all of the users that are registered,
 * only a logged in user can see all of the users
 */



function getUsers(){
    $(function(){
        $.ajax({
            type: 'GET',
            beforeSend : function(xhr) {
                xhr.setRequestHeader('Authorization', $.cookie('userToken'));
            },
            url: 'http://localhost:3000/api/users',
            success: function(data){
                var keyVar;
                var usersContainerContent =
                    '<table class="table">' +
                    '<tr>' +
                    '<th>Firstname</th>' +
                    '<th>Lastname</th>'+
                    '<th>Preposition</th>'+
                    '<th>Username</th>'+
                    '</tr>';
                for(keyVar in data) {
                    if (data.hasOwnProperty(keyVar)) {
                        var preposition = "";
                        if(data[keyVar].preposition == undefined){
                            preposition = "None";
                        }else {
                            preposition = data[keyVar].preposition;
                        }
                        usersContainerContent +=
                            '<tr>' +
                            '<td>'+data[keyVar].name+'</td>' +
                            '<td>'+data[keyVar].lastname+'</td>'+
                            '<td>'+preposition+'</td>'+
                            '<td>'+data[keyVar].username+'</td>'+
                            '</tr>'
                    }
                }
                usersContainerContent += '</table>';
                $('#usersContainer').html(usersContainerContent);
            }
        });
    });
    event.preventDefault();
}

/**
 * This function will check if a user is logged in.
 * @returns {boolean} True if a user is logged in and false if not
 */

function loggedIn(){
    if($.cookie('userName') !== undefined && $.cookie('userToken') !== undefined){
        return true;
    }else return false;
}

/**
 * This function will remove all of the cookies, this way the logged in
 * user will be logged out.
 */
function logOut() {
    $.removeCookie('userName',{ path: '/' });
    $.removeCookie('userToken',{ path: '/' });
    $.removeCookie('userId',{ path: '/' });
}



