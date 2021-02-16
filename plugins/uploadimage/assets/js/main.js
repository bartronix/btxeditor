document.getElementById("toolbar-plugins").innerHTML = '<input type="file" id="image-upload" accept="image/jpg, image/jpeg, image/png" /><input type="button" id="image-upload-button" /><div id="image-upload-progress" style="background-color: yellow;"><span id="image-upload-percentage"></span> % uploaded</div><div id="image-upload-error"></div>';

document.querySelector('#image-upload-button').addEventListener('click', function() {
	document.querySelector('#image-upload').click();
});

document.querySelector('#image-upload').addEventListener('change', function() {
	var data = new FormData(), request;

    data.append('file', document.querySelector("#image-upload").files[0]);

    var request = new XMLHttpRequest();
    request.addEventListener("load", function(e) {
    	document.querySelector("#image-upload-progress").style.display = "none";
		console.log(request);
		if(request.response) {
			if(request.response.error == 0) {				
				var range = window.getSelection().getRangeAt(0);
            	var node = range.createContextualFragment('<img src="' + request.response.image + '">');
				range.insertNode(node);
			}

			if(request.response.error == 1) {
				document.querySelector("#image-upload-error").innerText = request.response.message;
				document.querySelector("#image-upload-error").style.display = "block";
			}
		} else {
			document.querySelector("#image-upload-error").innerText = "Upload error";
			document.querySelector("#image-upload-error").style.display = "block";
		}
    });
    request.upload.addEventListener('progress', function(e) {
    	var percentComplete = (e.loaded / e.total) * 100;
    	
    	document.querySelector("#image-upload-percentage").innerText = percentComplete;
    	document.querySelector("#image-upload-progress").style.display = "block";
    });
    request.responseType = "json";
    request.open("post", "http://localhost/assets/plugins/btxeditor/plugins/uploadimage/upload.php"); 
    request.send(data); 
});