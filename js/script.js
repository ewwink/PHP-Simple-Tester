$("#compile").on("click", function() {
  $("#compile").prop("disabled", true);
  var compile = btoa($("#input_code").val());
  $.ajax({
    url: "ajax.php",
    type: "POST",
    data: {
      "compile": compile
    },
    success: function(d) {
      $("#output_code").val(d);
      $("#compile").prop("disabled", false);
      var text = document.getElementById('output_code');
      text.style.height = '200px';
      if(text.scrollHeight > 205){
        text.style.height = 'auto';
        text.style.height = 25+text.scrollHeight+'px';
      }
    },
    error: function(e, d) {
      $("#output_code").val(e.status + ": " + d);
      $("#compile").prop("disabled", false);
    },
    500: function(e, d) {
      $("#output_code").val(e.status + ": " + d);
      $("#compile").prop("disabled", false);
    }
  });
});

$("#input_code").on("keydown", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 9) {
    var val = this.value,
      start = this.selectionStart,
      end = this.selectionEnd;
    this.value = val.substring(0, start) + '  ' + val.substring(end);
    this.selectionStart = this.selectionEnd = start + 2;
    return false;
  }
});

$("#input_code").on("keyup change", function() {
  var list ="";
  var text = $('#input_code').val(),
    matches = text.match(/\n/g), breaks = matches ? matches.length : 2;
  if (breaks > 2) {
    list = "";
    for (var i = 0; i < breaks + 1; i++) {
      list += '<li></li>';
    }
    document.getElementById("listNum").innerHTML=list;
  }
  $('#input_code').attr('rows', breaks + 1);
});

$("#input_code").on("keydown", function(e) {
  var keyCode = e.keyCode || e.which;
  var autoChar = "";
  if (keyCode.toString().match(/57|219|222/)) {
    if (e.shiftKey && keyCode == 57) {
      autoChar = ')';
    } else if (e.shiftKey && keyCode == 219) {
      autoChar = "}";
    } else if (e.shiftKey && keyCode == 222) {
      autoChar = '"';
    } else if (keyCode == 219) {
      autoChar = "]";
    } else if (keyCode == 222) {
      autoChar = "'";
    }
    var sel0 = this.selectionStart;
    var txt = this.value;
    this.value = txt.substring(0, sel0) + autoChar + txt.substring(sel0);
    this.setSelectionRange(sel0, sel0);
  }
});


$('body').keydown(function (e) {
  if (e.ctrlKey && e.keyCode == 13) {
    e.preventDefault();
    $("#compile").click();
  }
});

$('#clearTxt').on("click", function (e) {
  $('#input_code').val("");
});

function resizeTxt() {
  if($("#wrap").width() <= 600){
    $("#input").width($("#wrap").width());
    $("#output").width($("#wrap").width());
  }
  else{
    $("#input").width("49%");
    $("#output").width("49%");
  }
}
$(document).on("ready", function() {
  resizeTxt()
});
$(window).resize(function() {
  resizeTxt()
});
