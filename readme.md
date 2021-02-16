Installation

- include main.min.css file found in assets/css  folder
- include main.min.js javascript file found in assets/js

Default buttons:
bold, italic, underline, create link, remove link, headers, align left, align center, align right, insert html, undo, redo, ordered list, unordered list, cut, copy, paste.

Buttons are defined in the buttons config.
- you can remove unwanted options by removing the entire []-entry
- button construction: [command, text on button, optional button class]

buttons: [["bold", "B"], ["italic", "I"], ["underline", "U"], ["link", ""], ["unlink", ""], ["h1", "h1"], ["h2", "h2"], ["h3", "h3"], ["h4", "h4"],["justifyLeft", "", "justify-left"], ["justifyCenter", "", "justify-center"], ["justifyRight", "", "justify-right"], ["insertHTML", "HTML", "insert-html"],["undo", ""], ["redo", ""], ["insertOrderedList", "", "insert-unordered-list"], ["insertUnorderedList", "", "insert-ordered-list"], ["cut", ""], ["copy", ""], ["paste", ""]],

Adding a plugin
- Add plugin to the plugin-folder
- Create an "assets" folder to add css and/or JavaScript.
- Add php-files to the root of your pluginfolder
- Add css to assets/css/main.css and add JavaScript to assets/css/main.js in your plugin-folder
- Add the plugin to the editor in the main.js-file: plugins: ["uploadimage", "yourplugin"]