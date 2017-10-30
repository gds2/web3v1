//Time
var date = new Date();
date.setTime(date.getTime() + (30 * 60 * 60 * 1000));

//inlcude the header on every page
$(document).ready(function() {
    if(loggedIn()){
        $("#header").load("content/headerLoggedIn.html");
    }else {
        $("#header").load("content/header.html");
    }

});

//inlcude the footer on every page
$(document).ready(function() {
    $("#footer").load("content/footer.html");
});

//Registration form
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

//Login form
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
            url: 'http://localhost:3000/api/movies',
            success: function(data){
                //console.log('success',data);
                delete data[0];
                var descriptionCounter = 0;
                var words = 0;
                var keyVar;
                var moviesContainerContent = "";
                for(keyVar in data) {
                    //Get the movie description length
                    descriptionCounter = data[keyVar].description.length;
                    if(descriptionCounter > 150){
                        words = descriptionCounter/100*30;
                    }else{
                        words = descriptionCounter/100*60;
                    }
                    if (data.hasOwnProperty(keyVar)) {
                        moviesContainerContent +=
                            '<div class="col-md-3 single-movie" style="background-image: url('+data[keyVar].img_url+');">'+
                            '<a class="single-movie-link" href="" onclick="getMovies('+data[keyVar].imdb+');" title="Go to movie">'+
                            '<div class="single-movie-cover">'+
                            '<h4 class="single-movie-title">'+data[keyVar].title+'</h4>'+
                            '<hr class="white-hr">'+
                            '<div class="single-movie-content">'+
                            '<p><strong>Run time:</strong> '+data[keyVar].length+'</p>'+
                            '<p><strong>Director:</strong> '+data[keyVar].director+'</p>'+
                            '<div id="singleMovieDescription"><strong>Description:</strong> '+data[keyVar].description.substring(0,words)+'...</div>'+
                            '</div>'+
                            '</div>'+
                            '</a>'+
                            '</div>';
                    }
                }
                $('#moviesContainer').html(moviesContainerContent);
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
}