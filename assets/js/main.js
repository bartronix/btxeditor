(function() {
	var BtxEditor = {
        clipboard: undefined,
        buttons: [["bold", "B"], ["italic", "I"], ["underline", "U"], ["link", ""], ["unlink", ""], ["h1", "h1"], ["h2", "h2"], ["h3", "h3"], ["h4", "h4"],
        ["justifyLeft", "", "justify-left"], ["justifyCenter", "", "justify-center"], ["justifyRight", "", "justify-right"], ["insertHTML", "HTML", "insert-html"],
        ["undo", ""], ["redo", ""], ["insertOrderedList", "", "insert-unordered-list"], ["insertUnorderedList", "", "insert-ordered-list"], ["cut", ""], ["copy", ""], ["paste", ""]],
        
        plugins: ["uploadimage"],

        init: function() {
            var self = this;
            self.syncInput();
            
            //default buttons
            for(var i = 0; i < this.buttons.length; i++) {
                this.createButton(this.buttons[i]);
            }

            //plugins
            var body = document.getElementsByTagName("body")[0];
            for(var i = 0; i < this.plugins.length; i++) {
                //add plugin css
                var link = document.createElement("link"); 
                link.rel = "stylesheet";
                link.type = "text/css"; 
                link.href = "http://localhost/assets/plugins/btxeditor/plugins/" + this.plugins[i] + "/assets/css/main.css";              
                document.getElementsByTagName('HEAD')[0].appendChild(link);

                //add plugin script
                var script = document.createElement("script");
                script.src = "http://localhost/assets/plugins/btxeditor/plugins/" + this.plugins[i] + "/assets/js/main.js";
                script.type = "text/javascript";                       
                body.appendChild(script);                
            }

            //sync with textarea to post data
            var editor = document.getElementById("editor");
            editor.onchange = function() {
                self.syncInput();
            }

            editor.onkeypress = function() {
                self.syncInput();
            }

            editor.onpaste = function() {
                self.syncInput();
            }

            editor.oninput = function() {
                self.syncInput();
            }
        },

        syncInput: function() {
            var editor = document.getElementById("editor");
            var content = document.getElementById("wysywig-content");
            content.value = editor.innerHTML.trim();
        },

        createButton: function(value) {
            var self = this;
            //button
            var btn = document.createElement("button");
            btn.type = "button";
            btn.value = value[0];
            btn.classList.add("btn-toolbar");
            btn.onclick = function() {
                self.performCommand(value[0]);
            }
            //span
            var span = document.createElement("span");
            var className = value[2] ? value[2] : value[0];
            span.classList.add("icon-" + className);
            span.innerText = value[1];
            btn.appendChild(span);
            document.getElementById("toolbar-base").appendChild(btn);
        },

		codeOff: function () {
			document.getElementById("editor").innerHTML = document.getElementById("code-editor").value;
            document.getElementById("editor").style.display = "block";
            document.getElementById("toolbar").style.display = "block";
            document.getElementById("code-container").style.display = "none";
		},

		performCommand: function(command) {
			switch(command) {
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                    document.execCommand('formatBlock', false, command);
                    break;
                case "insertHTML":
                    btnClose = document.getElementById("btn-code-editor-close");
                    var self = this;
                    btnClose.onclick = function() {
                        self.codeOff();
                        self.syncInput();
                    }
                    document.getElementById("editor").style.display = "none";
                    document.getElementById("code-container").style.display = "block";
                    document.getElementById("code-editor").value = document.getElementById("editor").innerHTML.trim();
                    document.getElementById("toolbar").style.display = "none";
                    break;
                case "link":
                    url = prompt('Enter the link here: ', 'https:\/\/');
                    document.execCommand("createlink", false, url);
                    break;
                case "cut":
                case "copy":            
                    clipboard = window.getSelection().toString();
                    document.execCommand(command, false, null);
                    break;
                case "paste":                    
                    var range = window.getSelection().getRangeAt(0);
                    var node = document.createTextNode(clipboard);
                    range.insertNode(node);
                    break;
                default:
                    document.execCommand(command, false, null);
                    break;
            }
		}
	}

	BtxEditor.init();

})();
