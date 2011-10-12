var log = function(){
	return {
		add: function(m){
			if ( window.console && console.log ) {
				console.log(m);
				$("#status").prepend('<p style="display: none;">'+m+'</p>');
				$("#status p:first-child").fadeIn();
				$("#status p:gt(5)").remove();
			}
		}
	}
}();

var wasOnline = true
	,	isOnline = true;

var getXDomainImage = function(src, key){
	$.ajax({
		url: src,
		beforeSend: function( xhr ) {
			xhr.overrideMimeType( 'text/plain; charset=x-user-defined' );
		},
		success: function( d ) {
			var imageData = 'data:'
				, data = {}
				,	decodedResp = '';

			imageData += 'image/jpeg';
			imageData += ';base64,';

			//decode image data
			for(var i = 0, L = d.length; i < L; ++i) {
					decodedResp += String.fromCharCode(d.charCodeAt(i) & 255);
			}

			imageData += btoa(decodedResp);

			//save imageData to localStorage
			data = JSON.parse( localStorage.getItem(key) );
			console.log(data);
			data.cover.base64 = imageData;
			localStorage.setItem(key, JSON.stringify(data));
			console.log(data);
			//$("#img").attr('src', imageData);
		}
	});
};

/*
var base64Image = function(img){
	var imageType = img.src.match(/\.([a-z]{3})$/)[1] == 'jpg' ? 'jpeg' : 'png';
	var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.drawImage(img, 0, 0);
	ctx.fillStyle    = '#000';
	ctx.font         = '11px sans-serif';
	ctx.textBaseline = 'top';
	ctx.fillText('(cached localStorage)', 5, 80);

	return canvas.toDataURL("image/"+imageType);
};
*/

var checkOnline = function(){
  // navigator.onLine only works correctly in Chrome
  // when network is dropped
  $.ajaxSetup ({
    cache: false
  });

  var jxhr = $.get('ping.php', function(){
		log.add("Succeeded");
    isOnline = true;
  }).error(function(){
		log.add("Failed");
    isOnline = false;
  }).complete(function(){
		log.add("Completed");
    if ( wasOnline !== isOnline ) {
      if ( isOnline ) {
				//fire online event
        log.add("back online!");
				doOnline();
      } else {
				//fire offline event
        log.add("woops, offline");
				doOffline();
      }
      wasOnline = isOnline;
    }
  });
};


var doOffline = function(){
	log.add("doing offline event");
	$("#state").text("Offline");
	$("body").addClass("offline");
	$("#stuff li").each(function(i,x){
		var key = $(x).data('id'),
				img = $(x).find("img").get(0),
				title = $(x).find('.title'),
				data = JSON.parse( localStorage.getItem(key) );

		img.src = data.cover.base64;
		title.text(data.title);
	});
};


var doOnline = function(){
	log.add("doing online event");
	$("#state").text("Online");
	$("body").removeClass("offline");

	$("#stuff li").each(function(i,x){
		var data,
				key = $(x).data('id'),
				title = $(x).find(".title"),
				img = $(x).find("img").get(0);

		if ( !!localStorage ) {
			data = JSON.parse( localStorage.getItem(key) );
			img.src = data.cover.path;
			title.text($(x).data('title'));
		}
	});
};

window.onload = function(){
	var intvNetwork = setInterval(checkOnline, 5000);

	$("#stuff li").each(function(i,x){
		var title = $(x).data('title'),
				key = $(x).data('id'),
				img = $(x).find('img').get(0);

		//data to store in localStorage
		var data = {
			title: title + ' (cached)',
			id: key,
			cover: {
				base64: '',
				path: img.src
			}
		};

		if ( !!localStorage ) {
			localStorage.setItem(key, JSON.stringify(data));
			getXDomainImage(img.src, key);
		}
	});

	setTimeout(checkOnline, 10);
};
