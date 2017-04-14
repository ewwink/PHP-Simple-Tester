$("#compile").on("click", function()
{
  $("#compile").prop("disabled", true);
  var compile = btoa(encodeURIComponent($("#input_code").val()));
  var disable_ob = $("#disable_ob").prop("checked");
  var datas = disable_ob ?
  {
    "compile": compile,
    "disable_ob": "true"
  } :
  {
    "compile": compile
  };
  $.ajax(
  {
    url: "ajax.php",
    type: "POST",
    data: datas,
    success: function(d)
    {
      $("#output_code").val(d);
      $("#compile").prop("disabled", false);
      var text = document.getElementById('output_code');
      text.style.height = '200px';
      if (text.scrollHeight > 205)
      {
        text.style.height = 'auto';
        text.style.height = 25 + text.scrollHeight + 'px';
      }
    },
    error: function(e, d)
    {
      $("#output_code").val(e.status + ": " + d);
      $("#compile").prop("disabled", false);
    },
    500: function(e, d)
    {
      $("#output_code").val(e.status + ": " + d);
      $("#compile").prop("disabled", false);
    }
  });
});

$("#input_code").on("keydown", function(e)
{
  var keyCode = e.keyCode || e.which;
  if (keyCode === 9)
  {
    var val = this.value,
      start = this.selectionStart,
      end = this.selectionEnd;
    this.value = val.substring(0, start) + '  ' + val.substring(end);
    this.selectionStart = this.selectionEnd = start + 2;
    return false;
  }
});

$("#input_code").on("keyup change", function()
{
  var list = "";
  var text = $('#input_code').val(),
    matches = text.match(/\n/g),
    breaks = matches ? matches.length : 2;
  if (breaks > 2)
  {
    list = "";
    for (var i = 0; i < breaks + 1; i++)
    {
      list += '<li></li>';
    }
    document.getElementById("listNum").innerHTML = list;
  }
  $('#input_code').attr('rows', breaks + 1);
});

$("#input_code").on("keydown", function(e)
{
  var keyCode = e.keyCode || e.which;
  var autoChar = "";
  if (keyCode.toString().match(/57|219|222/))
  {
    if (e.shiftKey && keyCode == 57)
    {
      autoChar = ')';
    }
    else if (e.shiftKey && keyCode == 219)
    {
      autoChar = "}";
    }
    else if (e.shiftKey && keyCode == 222)
    {
      autoChar = '"';
    }
    else if (keyCode == 219)
    {
      autoChar = "]";
    }
    else if (keyCode == 222)
    {
      autoChar = "'";
    }
    var sel0 = this.selectionStart;
    var txt = this.value;
    this.value = txt.substring(0, sel0) + autoChar + txt.substring(sel0);
    this.setSelectionRange(sel0, sel0);
  }
});


$('body').keydown(function(e)
{
  if (e.ctrlKey && e.keyCode == 13)
  {
    e.preventDefault();
    $("#compile").click();
  }
});

$('#clearTxt').on("click", function(e)
{
  $('#input_code').val("");
});

function resizeTxt()
{
  if ($("#wrap").width() <= 600)
  {
    $("#input").width($("#wrap").width());
    $("#output").width($("#wrap").width());
  }
  else
  {
    $("#input").width("49%");
    $("#output").width("49%");
  }
}

var array_code = [];
$(document).on("ready", function()
{
  resizeTxt();

  $("#horizontal").click();
  if (!localStorage["JS_TESTER"])
    localStorage["JS_TESTER"] = "{}";
  array_code = JSON.parse(localStorage["JS_TESTER"]);
  if (array_code)
  {
    var codeSelect = document.getElementById('codeSelect');
    for (index in array_code)
    {
      codeSelect.options[codeSelect.options.length] = new Option(index, index);
    }
  }

});
$(window).resize(function()
{
  //resizeTxt()
});
$('#wrap_text').on("click", function()
{
  $("#wrap_text").prop("checked") ? $("#output_code").prop("wrap", "soft") : $("#output_code").prop("wrap", "off");
});
$('#wrap_text_input').on("click", function()
{
  $("#wrap_text_input").prop("checked") ? $("#input_code").prop("wrap", "soft") : $("#input_code").prop("wrap", "off");
});
$('#horizontal').on("click", function()
{
  if ($("#horizontal").prop("checked"))
  {
    $("#input").css(
    {
      "width": "99%"
    });
    $("#input_code").css(
    {
      "width": "92%",
      "min-height": "200px"
    });
    $("#output").css(
    {
      "width": "100%",
      "margin": "5px 5px 5px 10px"
    });
    $("#newline").css(
    {
      "display": "inline"
    });
  }
  else
  {
    $("#input").css("width", "49%");
    $("#input_code").css(
    {
      "width": "88%",
      "min-height": "300px"
    });
    $("#output").css("width", "49%");
    $("#newline").css(
    {
      "display": "block"
    });
  }
});
$('#saveCode').on("click", function()
{
  var codeName = $("#codeName").val().trim();
  var code = btoa(encodeURIComponent($("#input_code").val().trim()));
  array_code = JSON.parse(localStorage["JS_TESTER"]);
  if (codeName.length <= 0)
  {
    alert("Code Name empty!");
    return;
  }
  //console.log(array_code);
  if (array_code[codeName] !== undefined)
  {
    if (confirm('Code name Exist, overwrite?'))
    {
      array_code[codeName] = code;
      localStorage["JS_TESTER"] = JSON.stringify(array_code);
    }
    else
    {
      return;
    }
  }
  else
  {
    array_code[codeName] = code;
    localStorage["JS_TESTER"] = JSON.stringify(array_code);
    $("#codeSelect").append('<option value="' + codeName + '">' + codeName + '</option>');
    $('#codeSelect option[value='+codeName+']').attr('selected','selected');
    console.log("code Saved");
  }
});
$('#loadCode').on("click", function()
{
  var icode = array_code[$('#codeSelect option:selected').val()];
  icode = decodeURIComponent(atob(icode));
  $("#input_code").val(icode);
});
$('#deleteCode').on("click", function()
{
  indexCode = $('#codeSelect option:selected').val();
  delete array_code[indexCode];
  localStorage["JS_TESTER"] = JSON.stringify(array_code);
  $("#codeSelect option[value='" + indexCode + "']").remove();
  console.log("code Deleted");
});