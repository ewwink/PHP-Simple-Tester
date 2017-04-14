<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>PHP Simple Tester</title>
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="Shortcut Icon" href="http://www.dokitv.com/favicon.ico" type="image/x-icon">
</head>

<body>
  <div id="wrap">
    <h1><a href="">PHP Simple Tester V2</a></h1>

    <div id="input" class="left">
      <p><strong>Input:</strong> &lt;?php
      <input type="text" id="codeName"><input id="saveCode" type="button" value="Save">
      <select id="codeSelect"></select><input type="button" value="Load" id="loadCode"><input type="button" value="Delete" id="deleteCode">
      </p>

      <div id="lineNum" class="left">
         <ol id="listNum" start="2"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ol>
      </div>
      <textarea id="input_code" class="left" spellcheck="false" wrap="off">$arr = array("hello", "world!");
print_r($arr);&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;&#13;&#10;</textarea>

      <p class="ctr clear">
        <input type="button" value="compile (Ctrl + Enter)" id="compile">
      <input type="button" value="Clear Input Code" id="clearTxt">
      <span id="newline">
        <input type="checkbox" id="disable_ob"> Disable ob_start |
        <input type="checkbox" id="horizontal"> Horizontal layout |
       <input type="checkbox" id="wrap_text_input"> Wrap Text
      </span>

      </p>
    </div>

    <div id="output" class="left">
      <p><strong>Output:</strong></p>
      <textarea id="output_code" spellcheck="false" wrap="off"></textarea>
      <p class="ctr clear"><input type="checkbox" id="wrap_text"> Wrap Text</p>
      <p class="copy">Copyright &copy; 2016 <a href="http://www.cekpr.com">cekPR.com</a></p>
    </div>
  </div><script src="js/jquery.min.js">
</script> <script src="js/script.js">
</script>
</body>
</html>
