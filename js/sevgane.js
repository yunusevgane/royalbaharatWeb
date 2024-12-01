function webyapar(y1) {
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    yapim = z[i];

    //artt�rma
    webyapar.artt = function (durum, idart, artism, artartislem) {
      if (durum > 0) {
        document.getElementById(idart).value =
          Number(document.getElementById(idart).value) + 1;
        if (artartislem) {
          var artartism = artartislem.replace(",", ".");
          var res = document.getElementById(artism).innerHTML.replace(",", ".");
          document.getElementById(artism).innerHTML =
            Number(res) + Number(artartism) + artislem;
        }
      } else {
        if (document.getElementById(idart).value > 1) {
          document.getElementById(idart).value =
            Number(document.getElementById(idart).value) - 1;

          if (artartislem) {
            var artartism = artartislem.replace(",", ".");
            document.getElementById(artism).innerHTML =
              Number(document.getElementById(artism).innerHTML) -
              Number(artartism);
          }
        }
      }
    };
    art = yapim.getAttribute("art");
    artislem = yapim.getAttribute("artislem");
    if (art) {
      artart = art;
      artism = artislem;
      if (artislem) {
        artis = document.getElementById(artislem).innerHTML;
      } else {
        artis = "";
      }

      artva = document.getElementById(art).value;

      artv = artva + 1;
      document.getElementById("p").onclick = function () {
        webyapar.artt(artv, artart, artism, artis);
      };
      artvan = artva - 1;
      document.getElementById("n").onclick = function () {
        webyapar.artt(artvan, artart, artism, artis);
      };
    }
    //artt�rma s

    //arama motoru

    webyapar.getElements = function (id) {
      if (typeof id == "object") {
        return [id];
      } else {
        return document.querySelectorAll(id);
      }
    };
    webyapar.filterHTML = function (id, sel) {
      var sel = ".item";
      var id = "#ilan";
      b = webyapar.getElements(sel);
      for (ii = 0; ii < b.length; ii++) {
        b[ii].style.display = "";
        hit = 0;
        sonuc = 1;
        var x = document.getElementById("ara");
        durumm = 1;
        for (i = 0; i < x.length; i++) {
          txt = x.elements[i].value;
          txtname = x.elements[i].name;
          if (
            b[ii].innerHTML
              .toUpperCase()
              .indexOf(x.elements[i].value.toUpperCase()) > -1 &&
            durumm == 1
          ) {
            b[ii].style.display = "";
          } else {
            b[ii].style.display = "none";
            durumm = 0;
          }
        }
      }
    };

    //arama motoru
    http = yapim.getAttribute("http");
    if (http && y1 > "") {
      http = y1;
      aksiyon = yapim.getAttribute("aksiyon");
      if (aksiyon) {
        aksiyon = yapim.getAttribute("aksiyon");
      } else {
        aksiyon = "ajax-aksiyon";
      }
      var el = document.getElementById(aksiyon);
      el.style.animation = "none";
      el.offsetHeight;
      el.style.animation = null;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById(aksiyon).innerHTML = this.responseText;

          var xs = document.getElementsByClassName("sepet_sayi");
          var i;
          for (i = 0; i < xs.length; i++) {
            xs[i].innerHTML = this.responseText;
          }

          document.getElementById(aksiyon).className = aksiyon;
        }
      };
      var cevab = "";
      var form_sayi = document.getElementById(http).length;
      for (i = 0; i < form_sayi; i++) {
        name = document.getElementById(http).elements[i].name;
        value = document.getElementById(http).elements[i].value;
        if (i > -1) {
          cevab += "&" + name + "=" + value;
        }
      }
      cevabim = cevab;
      xhttp.open("GET", "/api/?islem=sepet_ekle_manuel&g=3" + cevabim, true);
      xhttp.send();
      return;
    }

    bg = yapim.getAttribute("bg");
    if (bg) {
      yapim.value = yapim.style.background = "url(" + bg + ")";
    }
    if_index = yapim.getAttribute("if");
    if_else = yapim.getAttribute("else");
    if (if_index == "0") {
      yapim.prototype = yapim.style.display = "none";
      document.getElementById(if_else).style.display = "";
    }

    if (if_index > "0") {
      yapim.prototype = yapim.style.display = "";
      document.getElementById(if_else).style.display = "none";
    }

    forlist = yapim.getAttribute("for");
    if (forlist) {
      webyapar.getElementsByAttribute = function (x, att) {
        var arr = [],
          arrCount = -1,
          i,
          l,
          y = x.getElementsByTagName("*"),
          z = att.toUpperCase();
        l = y.length;
        for (i = -1; i < l; i += 1) {
          if (i == -1) {
            y[i] = x;
          }
          if (y[i].getAttribute(z) !== null) {
            arrCount += 1;
            arr[arrCount] = y[i];
          }
        }
        return arr;
      };

      (webyapar.dataObject = {}),
        (webyapar.displayObject = function (forlist, data) {
          htmlObj = document.getElementById(forlist);
          htmlTemplate = init_template(forlist, htmlObj);
          forlist = htmlTemplate.cloneNode(true);
          arr = webyapar.getElementsByAttribute(forlist, "for");
          l = arr.length;
          for (j = l - 1; j >= 0; j -= 1) {
            cc = arr[j].getAttribute("for").split(" ");
            repeat = cc[0];
            arr[j].removeAttribute("for");
            repeatObj = data[repeat];
            i = 0;

            for (x in repeatObj) {
              i += 1;
              rowClone = arr[j];
              rowClone = matrix_replace_curly(
                rowClone,
                "element",
                repeatObj[x],
              );
              i === repeatObj.length
                ? arr[j].parentNode.replaceChild(rowClone, arr[j])
                : arr[j].parentNode.insertBefore(rowClone, arr[j]);

              //if (i == 30) { break; }
            }
          }
          forlist = matrix_replace_curly(forlist, "element");
          htmlObj.parentNode.replaceChild(forlist, htmlObj);
          function init_template(forlist, obj) {
            var template;
            template = obj.cloneNode(true);
            webyapar.dataObject[forlist] = template;
            return template;
          }
          function matrix_replace_curly(elmnt, typ, x) {
            var value,
              rowClone,
              pos1,
              pos2,
              originalHTML,
              lookFor,
              lookForARR = [],
              i,
              cc,
              r;
            rowClone = elmnt.cloneNode(true);
            pos1 = 0;
            while (pos1 > -1) {
              originalHTML =
                typ == "attribute" ? rowClone.value : rowClone.innerHTML;
              pos1 = originalHTML.indexOf("[", pos1);
              if (pos1 === -1) {
                break;
              }
              pos2 = originalHTML.indexOf("]", pos1 + 1);
              lookFor = originalHTML.substring(pos1 + 1, pos2);
              value = undefined;

              lookFor = lookFor.replace(/^\s+|\s+$/gm, "");

              arama = "";
              if (arama) {
                if (x && x[lookFor] == "225805") {
                  value = x[lookFor] + "[" + lookFor + "]";
                } else {
                  value = undefined;
                }
              } else {
                if (x) {
                  value = x[lookFor];
                } else {
                  value = undefined;
                } // degisiklik alan�
              }

              r = "[" + lookFor + "]";

              matrix_replace_html(rowClone, r, value);

              pos1 = pos1 + 1;
            }
            return rowClone;
          }

          function matrix_replace_html(a, r, result) {
            a.innerHTML = a.innerHTML.replace(r, result);
          }
        });
      webyapar.displayObject(forlist, listeme);
    }
    pn = yapim.getAttribute("pn");
    if (pn) {
      document.getElementById("p").onclick = function () {
        webyapar("1");
      };
      document.getElementById("n").onclick = function () {
        webyapar("-1");
      };
      if (y1) {
        art = y1;
      } else {
        art = 0;
      }
      durum = Number(yapim.value) + Number(art);
      if (Number(durum) > 0) {
        art = art;
      } else {
        art = 0;
      }
      yapim.value = Number(yapim.value) + Number(art);
    }

    bilgi = yapim.getAttribute("bilgi");
    value = yapim.getAttribute("uye-value");
    if (bilgi) {
      bilgim = bilgi;
      sonuc = listeme[bilgim];

      if (bilgim == "img") {
        yapim.src = this.innerHTML =
          "/uye/" + listeme["id"] + "/" + listeme["img"];
      } else {
        yapim.innerHTML = this.innerHTML = sonuc;
      }
    }

    if (value) {
      sonuc = listeme[value];
      yapim.value = this.innerHTML = sonuc;
    }
  }

  return;
}
webyapar();
