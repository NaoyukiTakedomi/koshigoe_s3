var $ = require('jquery');

$(function () {
    function generateSlug(len) {
      // 生成する文字列に含める文字セット
      var c = "abcdefghijklmnopqrstuvwxyz0123456789";

      var cl = c.length;
      var r = "";
      for (var i = 0; i < len; i++) {
        r += c[Math.floor(Math.random() * cl)];
      }

      return r;
    }

  function setSessionId() {
    var unique_key = window.sessionStorage.getItem('unique_key');
    if (unique_key == "") {
      window.sessionStorage.setItem('unique_key', generateSlug(8));
    }
  }

  function converter(M) {
    var str = "", str_as = "";
    for (var i = 0; i < M.length; i++) {
      str_as = M.charCodeAt(i);
      str += String.fromCharCode(str_as + 1);
    }
    return str;
  }

  function mail_to(k_1, k_2) {
    eval(String.fromCharCode(108, 111, 99, 97, 116, 105, 111, 110, 46, 104, 114, 101, 102, 32,
        61, 32, 39, 109, 97, 105, 108, 116, 111, 58)
      + escape(k_1) +
      converter(String.fromCharCode(105, 116, 109, 94, 109, 96, 106, 96, 108, 96, 113, 116, 63, 108, 96, 102, 110, 97, 96, 120, 45, 105, 111,
        62, 114, 116, 97, 105, 100, 98, 115, 60))
      + escape(k_2) + "'");
  }

  $("#contact").append('<a href=JavaScript:mail_to("","")><img src="./img/icon/mail.png"><\/a>');

  setSessionId();
});
