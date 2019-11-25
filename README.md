Installation
git clone https://github.com/lamarquenet/agileEngine.git

cd agileEngine

npm install

Usage
node app.js origin_html_file_path sample_html_file_path elementIdToFind 

note: the element Id to find is optional, in case that no id is passed i use the default id "make-everything-ok-button"

Example
node app.js ./public/sample-0-origing.html ./public/sample-1-evil-gemini.html make-everything-ok-button

Output:
Matching Level: 5
Path to similar Element: body  --> #wrapper --> #wrapper --> #wrapper --> #page-wrapper --> div.row --> div.col-lg-8 --> div.panel.panel-default --> div.panel-body --> a.btn.btn-success

Author
Nicolas Zuain