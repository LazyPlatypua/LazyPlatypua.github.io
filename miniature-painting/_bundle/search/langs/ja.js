"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/lunr-languages/lunr.stemmer.support.js
var require_lunr_stemmer_support = __commonJS({
  "node_modules/lunr-languages/lunr.stemmer.support.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        lunr.stemmerSupport = {
          Among: function(s, substring_i, result, method) {
            this.toCharArray = function(s2) {
              var sLength = s2.length, charArr = new Array(sLength);
              for (var i = 0; i < sLength; i++)
                charArr[i] = s2.charCodeAt(i);
              return charArr;
            };
            if (!s && s != "" || !substring_i && substring_i != 0 || !result)
              throw "Bad Among initialisation: s:" + s + ", substring_i: " + substring_i + ", result: " + result;
            this.s_size = s.length;
            this.s = this.toCharArray(s);
            this.substring_i = substring_i;
            this.result = result;
            this.method = method;
          },
          SnowballProgram: function() {
            var current;
            return {
              bra: 0,
              ket: 0,
              limit: 0,
              cursor: 0,
              limit_backward: 0,
              setCurrent: function(word) {
                current = word;
                this.cursor = 0;
                this.limit = word.length;
                this.limit_backward = 0;
                this.bra = this.cursor;
                this.ket = this.limit;
              },
              getCurrent: function() {
                var result = current;
                current = null;
                return result;
              },
              in_grouping: function(s, min, max) {
                if (this.cursor < this.limit) {
                  var ch = current.charCodeAt(this.cursor);
                  if (ch <= max && ch >= min) {
                    ch -= min;
                    if (s[ch >> 3] & 1 << (ch & 7)) {
                      this.cursor++;
                      return true;
                    }
                  }
                }
                return false;
              },
              in_grouping_b: function(s, min, max) {
                if (this.cursor > this.limit_backward) {
                  var ch = current.charCodeAt(this.cursor - 1);
                  if (ch <= max && ch >= min) {
                    ch -= min;
                    if (s[ch >> 3] & 1 << (ch & 7)) {
                      this.cursor--;
                      return true;
                    }
                  }
                }
                return false;
              },
              out_grouping: function(s, min, max) {
                if (this.cursor < this.limit) {
                  var ch = current.charCodeAt(this.cursor);
                  if (ch > max || ch < min) {
                    this.cursor++;
                    return true;
                  }
                  ch -= min;
                  if (!(s[ch >> 3] & 1 << (ch & 7))) {
                    this.cursor++;
                    return true;
                  }
                }
                return false;
              },
              out_grouping_b: function(s, min, max) {
                if (this.cursor > this.limit_backward) {
                  var ch = current.charCodeAt(this.cursor - 1);
                  if (ch > max || ch < min) {
                    this.cursor--;
                    return true;
                  }
                  ch -= min;
                  if (!(s[ch >> 3] & 1 << (ch & 7))) {
                    this.cursor--;
                    return true;
                  }
                }
                return false;
              },
              eq_s: function(s_size, s) {
                if (this.limit - this.cursor < s_size)
                  return false;
                for (var i = 0; i < s_size; i++)
                  if (current.charCodeAt(this.cursor + i) != s.charCodeAt(i))
                    return false;
                this.cursor += s_size;
                return true;
              },
              eq_s_b: function(s_size, s) {
                if (this.cursor - this.limit_backward < s_size)
                  return false;
                for (var i = 0; i < s_size; i++)
                  if (current.charCodeAt(this.cursor - s_size + i) != s.charCodeAt(i))
                    return false;
                this.cursor -= s_size;
                return true;
              },
              find_among: function(v, v_size) {
                var i = 0, j = v_size, c = this.cursor, l = this.limit, common_i = 0, common_j = 0, first_key_inspected = false;
                while (true) {
                  var k = i + (j - i >> 1), diff = 0, common = common_i < common_j ? common_i : common_j, w = v[k];
                  for (var i2 = common; i2 < w.s_size; i2++) {
                    if (c + common == l) {
                      diff = -1;
                      break;
                    }
                    diff = current.charCodeAt(c + common) - w.s[i2];
                    if (diff)
                      break;
                    common++;
                  }
                  if (diff < 0) {
                    j = k;
                    common_j = common;
                  } else {
                    i = k;
                    common_i = common;
                  }
                  if (j - i <= 1) {
                    if (i > 0 || j == i || first_key_inspected)
                      break;
                    first_key_inspected = true;
                  }
                }
                while (true) {
                  var w = v[i];
                  if (common_i >= w.s_size) {
                    this.cursor = c + w.s_size;
                    if (!w.method)
                      return w.result;
                    var res = w.method();
                    this.cursor = c + w.s_size;
                    if (res)
                      return w.result;
                  }
                  i = w.substring_i;
                  if (i < 0)
                    return 0;
                }
              },
              find_among_b: function(v, v_size) {
                var i = 0, j = v_size, c = this.cursor, lb = this.limit_backward, common_i = 0, common_j = 0, first_key_inspected = false;
                while (true) {
                  var k = i + (j - i >> 1), diff = 0, common = common_i < common_j ? common_i : common_j, w = v[k];
                  for (var i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
                    if (c - common == lb) {
                      diff = -1;
                      break;
                    }
                    diff = current.charCodeAt(c - 1 - common) - w.s[i2];
                    if (diff)
                      break;
                    common++;
                  }
                  if (diff < 0) {
                    j = k;
                    common_j = common;
                  } else {
                    i = k;
                    common_i = common;
                  }
                  if (j - i <= 1) {
                    if (i > 0 || j == i || first_key_inspected)
                      break;
                    first_key_inspected = true;
                  }
                }
                while (true) {
                  var w = v[i];
                  if (common_i >= w.s_size) {
                    this.cursor = c - w.s_size;
                    if (!w.method)
                      return w.result;
                    var res = w.method();
                    this.cursor = c - w.s_size;
                    if (res)
                      return w.result;
                  }
                  i = w.substring_i;
                  if (i < 0)
                    return 0;
                }
              },
              replace_s: function(c_bra, c_ket, s) {
                var adjustment = s.length - (c_ket - c_bra), left = current.substring(0, c_bra), right = current.substring(c_ket);
                current = left + s + right;
                this.limit += adjustment;
                if (this.cursor >= c_ket)
                  this.cursor += adjustment;
                else if (this.cursor > c_bra)
                  this.cursor = c_bra;
                return adjustment;
              },
              slice_check: function() {
                if (this.bra < 0 || this.bra > this.ket || this.ket > this.limit || this.limit > current.length)
                  throw "faulty slice operation";
              },
              slice_from: function(s) {
                this.slice_check();
                this.replace_s(this.bra, this.ket, s);
              },
              slice_del: function() {
                this.slice_from("");
              },
              insert: function(c_bra, c_ket, s) {
                var adjustment = this.replace_s(c_bra, c_ket, s);
                if (c_bra <= this.bra)
                  this.bra += adjustment;
                if (c_bra <= this.ket)
                  this.ket += adjustment;
              },
              slice_to: function() {
                this.slice_check();
                return current.substring(this.bra, this.ket);
              },
              eq_v_b: function(s) {
                return this.eq_s_b(s.length, s);
              }
            };
          }
        };
        lunr.trimmerSupport = {
          generateTrimmer: function(wordCharacters) {
            var startRegex = new RegExp("^[^" + wordCharacters + "]+");
            var endRegex = new RegExp("[^" + wordCharacters + "]+$");
            return function(token) {
              if (typeof token.update === "function") {
                return token.update(function(s) {
                  return s.replace(startRegex, "").replace(endRegex, "");
                });
              } else {
                return token.replace(startRegex, "").replace(endRegex, "");
              }
            };
          }
        };
      };
    });
  }
});

// node_modules/lunr-languages/lunr.multi.js
var require_lunr_multi = __commonJS({
  "node_modules/lunr-languages/lunr.multi.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        lunr.multiLanguage = function() {
          var languages = Array.prototype.slice.call(arguments);
          var nameSuffix = languages.join("-");
          var wordCharacters = "";
          var pipeline = [];
          var searchPipeline = [];
          for (var i = 0; i < languages.length; ++i) {
            if (languages[i] == "en") {
              wordCharacters += "\\w";
              pipeline.unshift(lunr.stopWordFilter);
              pipeline.push(lunr.stemmer);
              searchPipeline.push(lunr.stemmer);
            } else {
              wordCharacters += lunr[languages[i]].wordCharacters;
              if (lunr[languages[i]].stopWordFilter) {
                pipeline.unshift(lunr[languages[i]].stopWordFilter);
              }
              if (lunr[languages[i]].stemmer) {
                pipeline.push(lunr[languages[i]].stemmer);
                searchPipeline.push(lunr[languages[i]].stemmer);
              }
            }
          }
          ;
          var multiTrimmer = lunr.trimmerSupport.generateTrimmer(wordCharacters);
          lunr.Pipeline.registerFunction(multiTrimmer, "lunr-multi-trimmer-" + nameSuffix);
          pipeline.unshift(multiTrimmer);
          return function() {
            this.pipeline.reset();
            this.pipeline.add.apply(this.pipeline, pipeline);
            if (this.searchPipeline) {
              this.searchPipeline.reset();
              this.searchPipeline.add.apply(this.searchPipeline, searchPipeline);
            }
          };
        };
      };
    });
  }
});

// node_modules/lunr-languages/lunr.ja.js
var require_lunr_ja = __commonJS({
  "node_modules/lunr-languages/lunr.ja.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        if ("undefined" === typeof lunr) {
          throw new Error("Lunr is not present. Please include / require Lunr before this script.");
        }
        if ("undefined" === typeof lunr.stemmerSupport) {
          throw new Error("Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.");
        }
        var isLunr2 = lunr.version[0] == "2";
        lunr.ja = function() {
          this.pipeline.reset();
          this.pipeline.add(
            lunr.ja.trimmer,
            lunr.ja.stopWordFilter,
            lunr.ja.stemmer
          );
          if (isLunr2) {
            this.tokenizer = lunr.ja.tokenizer;
          } else {
            if (lunr.tokenizer) {
              lunr.tokenizer = lunr.ja.tokenizer;
            }
            if (this.tokenizerFn) {
              this.tokenizerFn = lunr.ja.tokenizer;
            }
          }
        };
        var segmenter = new lunr.TinySegmenter();
        lunr.ja.tokenizer = function(obj) {
          var i;
          var str;
          var len;
          var segs;
          var tokens;
          var char;
          var sliceLength;
          var sliceStart;
          var sliceEnd;
          var segStart;
          if (!arguments.length || obj == null || obj == void 0)
            return [];
          if (Array.isArray(obj)) {
            return obj.map(
              function(t) {
                return isLunr2 ? new lunr.Token(t.toLowerCase()) : t.toLowerCase();
              }
            );
          }
          str = obj.toString().toLowerCase().replace(/^\s+/, "");
          for (i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
              str = str.substring(0, i + 1);
              break;
            }
          }
          tokens = [];
          len = str.length;
          for (sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
            char = str.charAt(sliceEnd);
            sliceLength = sliceEnd - sliceStart;
            if (char.match(/\s/) || sliceEnd == len) {
              if (sliceLength > 0) {
                segs = segmenter.segment(str.slice(sliceStart, sliceEnd)).filter(
                  function(token) {
                    return !!token;
                  }
                );
                segStart = sliceStart;
                for (i = 0; i < segs.length; i++) {
                  if (isLunr2) {
                    tokens.push(
                      new lunr.Token(
                        segs[i],
                        {
                          position: [segStart, segs[i].length],
                          index: tokens.length
                        }
                      )
                    );
                  } else {
                    tokens.push(segs[i]);
                  }
                  segStart += segs[i].length;
                }
              }
              sliceStart = sliceEnd + 1;
            }
          }
          return tokens;
        };
        lunr.ja.stemmer = /* @__PURE__ */ function() {
          return function(word) {
            return word;
          };
        }();
        lunr.Pipeline.registerFunction(lunr.ja.stemmer, "stemmer-ja");
        lunr.ja.wordCharacters = "\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343\u4E07\u5104\u5146\u4E00-\u9FA0\u3005\u3006\u30F5\u30F6\u3041-\u3093\u30A1-\u30F4\u30FC\uFF71-\uFF9D\uFF9Ea-zA-Z\uFF41-\uFF5A\uFF21-\uFF3A0-9\uFF10-\uFF19";
        lunr.ja.trimmer = lunr.trimmerSupport.generateTrimmer(lunr.ja.wordCharacters);
        lunr.Pipeline.registerFunction(lunr.ja.trimmer, "trimmer-ja");
        lunr.ja.stopWordFilter = lunr.generateStopWordFilter(
          "\u3053\u308C \u305D\u308C \u3042\u308C \u3053\u306E \u305D\u306E \u3042\u306E \u3053\u3053 \u305D\u3053 \u3042\u305D\u3053 \u3053\u3061\u3089 \u3069\u3053 \u3060\u308C \u306A\u306B \u306A\u3093 \u4F55 \u79C1 \u8CB4\u65B9 \u8CB4\u65B9\u65B9 \u6211\u3005 \u79C1\u9054 \u3042\u306E\u4EBA \u3042\u306E\u304B\u305F \u5F7C\u5973 \u5F7C \u3067\u3059 \u3042\u308A\u307E\u3059 \u304A\u308A\u307E\u3059 \u3044\u307E\u3059 \u306F \u304C \u306E \u306B \u3092 \u3067 \u3048 \u304B\u3089 \u307E\u3067 \u3088\u308A \u3082 \u3069\u306E \u3068 \u3057 \u305D\u308C\u3067 \u3057\u304B\u3057".split(" ")
        );
        lunr.Pipeline.registerFunction(lunr.ja.stopWordFilter, "stopWordFilter-ja");
        lunr.jp = lunr.ja;
        lunr.Pipeline.registerFunction(lunr.jp.stemmer, "stemmer-jp");
        lunr.Pipeline.registerFunction(lunr.jp.trimmer, "trimmer-jp");
        lunr.Pipeline.registerFunction(lunr.jp.stopWordFilter, "stopWordFilter-jp");
      };
    });
  }
});

// node_modules/lunr-languages/tinyseg.js
var require_tinyseg = __commonJS({
  "node_modules/lunr-languages/tinyseg.js"(exports, module2) {
    "use strict";
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define(factory);
      } else if (typeof exports === "object") {
        module2.exports = factory();
      } else {
        factory()(root.lunr);
      }
    })(exports, function() {
      return function(lunr) {
        function TinySegmenter() {
          var patterns = {
            "[\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341\u767E\u5343\u4E07\u5104\u5146]": "M",
            "[\u4E00-\u9FA0\u3005\u3006\u30F5\u30F6]": "H",
            "[\u3041-\u3093]": "I",
            "[\u30A1-\u30F4\u30FC\uFF71-\uFF9D\uFF9E\uFF70]": "K",
            "[a-zA-Z\uFF41-\uFF5A\uFF21-\uFF3A]": "A",
            "[0-9\uFF10-\uFF19]": "N"
          };
          this.chartype_ = [];
          for (var i in patterns) {
            var regexp = new RegExp(i);
            this.chartype_.push([regexp, patterns[i]]);
          }
          this.BIAS__ = -332;
          this.BC1__ = { "HH": 6, "II": 2461, "KH": 406, "OH": -1378 };
          this.BC2__ = { "AA": -3267, "AI": 2744, "AN": -878, "HH": -4070, "HM": -1711, "HN": 4012, "HO": 3761, "IA": 1327, "IH": -1184, "II": -1332, "IK": 1721, "IO": 5492, "KI": 3831, "KK": -8741, "MH": -3132, "MK": 3334, "OO": -2920 };
          this.BC3__ = { "HH": 996, "HI": 626, "HK": -721, "HN": -1307, "HO": -836, "IH": -301, "KK": 2762, "MK": 1079, "MM": 4034, "OA": -1652, "OH": 266 };
          this.BP1__ = { "BB": 295, "OB": 304, "OO": -125, "UB": 352 };
          this.BP2__ = { "BO": 60, "OO": -1762 };
          this.BQ1__ = { "BHH": 1150, "BHM": 1521, "BII": -1158, "BIM": 886, "BMH": 1208, "BNH": 449, "BOH": -91, "BOO": -2597, "OHI": 451, "OIH": -296, "OKA": 1851, "OKH": -1020, "OKK": 904, "OOO": 2965 };
          this.BQ2__ = { "BHH": 118, "BHI": -1159, "BHM": 466, "BIH": -919, "BKK": -1720, "BKO": 864, "OHH": -1139, "OHM": -181, "OIH": 153, "UHI": -1146 };
          this.BQ3__ = { "BHH": -792, "BHI": 2664, "BII": -299, "BKI": 419, "BMH": 937, "BMM": 8335, "BNN": 998, "BOH": 775, "OHH": 2174, "OHM": 439, "OII": 280, "OKH": 1798, "OKI": -793, "OKO": -2242, "OMH": -2402, "OOO": 11699 };
          this.BQ4__ = { "BHH": -3895, "BIH": 3761, "BII": -4654, "BIK": 1348, "BKK": -1806, "BMI": -3385, "BOO": -12396, "OAH": 926, "OHH": 266, "OHK": -2036, "ONN": -973 };
          this.BW1__ = { ",\u3068": 660, ",\u540C": 727, "B1\u3042": 1404, "B1\u540C": 542, "\u3001\u3068": 660, "\u3001\u540C": 727, "\u300D\u3068": 1682, "\u3042\u3063": 1505, "\u3044\u3046": 1743, "\u3044\u3063": -2055, "\u3044\u308B": 672, "\u3046\u3057": -4817, "\u3046\u3093": 665, "\u304B\u3089": 3472, "\u304C\u3089": 600, "\u3053\u3046": -790, "\u3053\u3068": 2083, "\u3053\u3093": -1262, "\u3055\u3089": -4143, "\u3055\u3093": 4573, "\u3057\u305F": 2641, "\u3057\u3066": 1104, "\u3059\u3067": -3399, "\u305D\u3053": 1977, "\u305D\u308C": -871, "\u305F\u3061": 1122, "\u305F\u3081": 601, "\u3063\u305F": 3463, "\u3064\u3044": -802, "\u3066\u3044": 805, "\u3066\u304D": 1249, "\u3067\u304D": 1127, "\u3067\u3059": 3445, "\u3067\u306F": 844, "\u3068\u3044": -4915, "\u3068\u307F": 1922, "\u3069\u3053": 3887, "\u306A\u3044": 5713, "\u306A\u3063": 3015, "\u306A\u3069": 7379, "\u306A\u3093": -1113, "\u306B\u3057": 2468, "\u306B\u306F": 1498, "\u306B\u3082": 1671, "\u306B\u5BFE": -912, "\u306E\u4E00": -501, "\u306E\u4E2D": 741, "\u307E\u305B": 2448, "\u307E\u3067": 1711, "\u307E\u307E": 2600, "\u307E\u308B": -2155, "\u3084\u3080": -1947, "\u3088\u3063": -2565, "\u308C\u305F": 2369, "\u308C\u3067": -913, "\u3092\u3057": 1860, "\u3092\u898B": 731, "\u4EA1\u304F": -1886, "\u4EAC\u90FD": 2558, "\u53D6\u308A": -2784, "\u5927\u304D": -2604, "\u5927\u962A": 1497, "\u5E73\u65B9": -2314, "\u5F15\u304D": -1336, "\u65E5\u672C": -195, "\u672C\u5F53": -2423, "\u6BCE\u65E5": -2113, "\u76EE\u6307": -724, "\uFF22\uFF11\u3042": 1404, "\uFF22\uFF11\u540C": 542, "\uFF63\u3068": 1682 };
          this.BW2__ = { "..": -11822, "11": -669, "\u2015\u2015": -5730, "\u2212\u2212": -13175, "\u3044\u3046": -1609, "\u3046\u304B": 2490, "\u304B\u3057": -1350, "\u304B\u3082": -602, "\u304B\u3089": -7194, "\u304B\u308C": 4612, "\u304C\u3044": 853, "\u304C\u3089": -3198, "\u304D\u305F": 1941, "\u304F\u306A": -1597, "\u3053\u3068": -8392, "\u3053\u306E": -4193, "\u3055\u305B": 4533, "\u3055\u308C": 13168, "\u3055\u3093": -3977, "\u3057\u3044": -1819, "\u3057\u304B": -545, "\u3057\u305F": 5078, "\u3057\u3066": 972, "\u3057\u306A": 939, "\u305D\u306E": -3744, "\u305F\u3044": -1253, "\u305F\u305F": -662, "\u305F\u3060": -3857, "\u305F\u3061": -786, "\u305F\u3068": 1224, "\u305F\u306F": -939, "\u3063\u305F": 4589, "\u3063\u3066": 1647, "\u3063\u3068": -2094, "\u3066\u3044": 6144, "\u3066\u304D": 3640, "\u3066\u304F": 2551, "\u3066\u306F": -3110, "\u3066\u3082": -3065, "\u3067\u3044": 2666, "\u3067\u304D": -1528, "\u3067\u3057": -3828, "\u3067\u3059": -4761, "\u3067\u3082": -4203, "\u3068\u3044": 1890, "\u3068\u3053": -1746, "\u3068\u3068": -2279, "\u3068\u306E": 720, "\u3068\u307F": 5168, "\u3068\u3082": -3941, "\u306A\u3044": -2488, "\u306A\u304C": -1313, "\u306A\u3069": -6509, "\u306A\u306E": 2614, "\u306A\u3093": 3099, "\u306B\u304A": -1615, "\u306B\u3057": 2748, "\u306B\u306A": 2454, "\u306B\u3088": -7236, "\u306B\u5BFE": -14943, "\u306B\u5F93": -4688, "\u306B\u95A2": -11388, "\u306E\u304B": 2093, "\u306E\u3067": -7059, "\u306E\u306B": -6041, "\u306E\u306E": -6125, "\u306F\u3044": 1073, "\u306F\u304C": -1033, "\u306F\u305A": -2532, "\u3070\u308C": 1813, "\u307E\u3057": -1316, "\u307E\u3067": -6621, "\u307E\u308C": 5409, "\u3081\u3066": -3153, "\u3082\u3044": 2230, "\u3082\u306E": -10713, "\u3089\u304B": -944, "\u3089\u3057": -1611, "\u3089\u306B": -1897, "\u308A\u3057": 651, "\u308A\u307E": 1620, "\u308C\u305F": 4270, "\u308C\u3066": 849, "\u308C\u3070": 4114, "\u308D\u3046": 6067, "\u308F\u308C": 7901, "\u3092\u901A": -11877, "\u3093\u3060": 728, "\u3093\u306A": -4115, "\u4E00\u4EBA": 602, "\u4E00\u65B9": -1375, "\u4E00\u65E5": 970, "\u4E00\u90E8": -1051, "\u4E0A\u304C": -4479, "\u4F1A\u793E": -1116, "\u51FA\u3066": 2163, "\u5206\u306E": -7758, "\u540C\u515A": 970, "\u540C\u65E5": -913, "\u5927\u962A": -2471, "\u59D4\u54E1": -1250, "\u5C11\u306A": -1050, "\u5E74\u5EA6": -8669, "\u5E74\u9593": -1626, "\u5E9C\u770C": -2363, "\u624B\u6A29": -1982, "\u65B0\u805E": -4066, "\u65E5\u65B0": -722, "\u65E5\u672C": -7068, "\u65E5\u7C73": 3372, "\u66DC\u65E5": -601, "\u671D\u9BAE": -2355, "\u672C\u4EBA": -2697, "\u6771\u4EAC": -1543, "\u7136\u3068": -1384, "\u793E\u4F1A": -1276, "\u7ACB\u3066": -990, "\u7B2C\u306B": -1612, "\u7C73\u56FD": -4268, "\uFF11\uFF11": -669 };
          this.BW3__ = { "\u3042\u305F": -2194, "\u3042\u308A": 719, "\u3042\u308B": 3846, "\u3044.": -1185, "\u3044\u3002": -1185, "\u3044\u3044": 5308, "\u3044\u3048": 2079, "\u3044\u304F": 3029, "\u3044\u305F": 2056, "\u3044\u3063": 1883, "\u3044\u308B": 5600, "\u3044\u308F": 1527, "\u3046\u3061": 1117, "\u3046\u3068": 4798, "\u3048\u3068": 1454, "\u304B.": 2857, "\u304B\u3002": 2857, "\u304B\u3051": -743, "\u304B\u3063": -4098, "\u304B\u306B": -669, "\u304B\u3089": 6520, "\u304B\u308A": -2670, "\u304C,": 1816, "\u304C\u3001": 1816, "\u304C\u304D": -4855, "\u304C\u3051": -1127, "\u304C\u3063": -913, "\u304C\u3089": -4977, "\u304C\u308A": -2064, "\u304D\u305F": 1645, "\u3051\u3069": 1374, "\u3053\u3068": 7397, "\u3053\u306E": 1542, "\u3053\u308D": -2757, "\u3055\u3044": -714, "\u3055\u3092": 976, "\u3057,": 1557, "\u3057\u3001": 1557, "\u3057\u3044": -3714, "\u3057\u305F": 3562, "\u3057\u3066": 1449, "\u3057\u306A": 2608, "\u3057\u307E": 1200, "\u3059.": -1310, "\u3059\u3002": -1310, "\u3059\u308B": 6521, "\u305A,": 3426, "\u305A\u3001": 3426, "\u305A\u306B": 841, "\u305D\u3046": 428, "\u305F.": 8875, "\u305F\u3002": 8875, "\u305F\u3044": -594, "\u305F\u306E": 812, "\u305F\u308A": -1183, "\u305F\u308B": -853, "\u3060.": 4098, "\u3060\u3002": 4098, "\u3060\u3063": 1004, "\u3063\u305F": -4748, "\u3063\u3066": 300, "\u3066\u3044": 6240, "\u3066\u304A": 855, "\u3066\u3082": 302, "\u3067\u3059": 1437, "\u3067\u306B": -1482, "\u3067\u306F": 2295, "\u3068\u3046": -1387, "\u3068\u3057": 2266, "\u3068\u306E": 541, "\u3068\u3082": -3543, "\u3069\u3046": 4664, "\u306A\u3044": 1796, "\u306A\u304F": -903, "\u306A\u3069": 2135, "\u306B,": -1021, "\u306B\u3001": -1021, "\u306B\u3057": 1771, "\u306B\u306A": 1906, "\u306B\u306F": 2644, "\u306E,": -724, "\u306E\u3001": -724, "\u306E\u5B50": -1e3, "\u306F,": 1337, "\u306F\u3001": 1337, "\u3079\u304D": 2181, "\u307E\u3057": 1113, "\u307E\u3059": 6943, "\u307E\u3063": -1549, "\u307E\u3067": 6154, "\u307E\u308C": -793, "\u3089\u3057": 1479, "\u3089\u308C": 6820, "\u308B\u308B": 3818, "\u308C,": 854, "\u308C\u3001": 854, "\u308C\u305F": 1850, "\u308C\u3066": 1375, "\u308C\u3070": -3246, "\u308C\u308B": 1091, "\u308F\u308C": -605, "\u3093\u3060": 606, "\u3093\u3067": 798, "\u30AB\u6708": 990, "\u4F1A\u8B70": 860, "\u5165\u308A": 1232, "\u5927\u4F1A": 2217, "\u59CB\u3081": 1681, "\u5E02": 965, "\u65B0\u805E": -5055, "\u65E5,": 974, "\u65E5\u3001": 974, "\u793E\u4F1A": 2024, "\uFF76\u6708": 990 };
          this.TC1__ = { "AAA": 1093, "HHH": 1029, "HHM": 580, "HII": 998, "HOH": -390, "HOM": -331, "IHI": 1169, "IOH": -142, "IOI": -1015, "IOM": 467, "MMH": 187, "OOI": -1832 };
          this.TC2__ = { "HHO": 2088, "HII": -1023, "HMM": -1154, "IHI": -1965, "KKH": 703, "OII": -2649 };
          this.TC3__ = { "AAA": -294, "HHH": 346, "HHI": -341, "HII": -1088, "HIK": 731, "HOH": -1486, "IHH": 128, "IHI": -3041, "IHO": -1935, "IIH": -825, "IIM": -1035, "IOI": -542, "KHH": -1216, "KKA": 491, "KKH": -1217, "KOK": -1009, "MHH": -2694, "MHM": -457, "MHO": 123, "MMH": -471, "NNH": -1689, "NNO": 662, "OHO": -3393 };
          this.TC4__ = { "HHH": -203, "HHI": 1344, "HHK": 365, "HHM": -122, "HHN": 182, "HHO": 669, "HIH": 804, "HII": 679, "HOH": 446, "IHH": 695, "IHO": -2324, "IIH": 321, "III": 1497, "IIO": 656, "IOO": 54, "KAK": 4845, "KKA": 3386, "KKK": 3065, "MHH": -405, "MHI": 201, "MMH": -241, "MMM": 661, "MOM": 841 };
          this.TQ1__ = { "BHHH": -227, "BHHI": 316, "BHIH": -132, "BIHH": 60, "BIII": 1595, "BNHH": -744, "BOHH": 225, "BOOO": -908, "OAKK": 482, "OHHH": 281, "OHIH": 249, "OIHI": 200, "OIIH": -68 };
          this.TQ2__ = { "BIHH": -1401, "BIII": -1033, "BKAK": -543, "BOOO": -5591 };
          this.TQ3__ = { "BHHH": 478, "BHHM": -1073, "BHIH": 222, "BHII": -504, "BIIH": -116, "BIII": -105, "BMHI": -863, "BMHM": -464, "BOMH": 620, "OHHH": 346, "OHHI": 1729, "OHII": 997, "OHMH": 481, "OIHH": 623, "OIIH": 1344, "OKAK": 2792, "OKHH": 587, "OKKA": 679, "OOHH": 110, "OOII": -685 };
          this.TQ4__ = { "BHHH": -721, "BHHM": -3604, "BHII": -966, "BIIH": -607, "BIII": -2181, "OAAA": -2763, "OAKK": 180, "OHHH": -294, "OHHI": 2446, "OHHO": 480, "OHIH": -1573, "OIHH": 1935, "OIHI": -493, "OIIH": 626, "OIII": -4007, "OKAK": -8156 };
          this.TW1__ = { "\u306B\u3064\u3044": -4681, "\u6771\u4EAC\u90FD": 2026 };
          this.TW2__ = { "\u3042\u308B\u7A0B": -2049, "\u3044\u3063\u305F": -1256, "\u3053\u308D\u304C": -2434, "\u3057\u3087\u3046": 3873, "\u305D\u306E\u5F8C": -4430, "\u3060\u3063\u3066": -1049, "\u3066\u3044\u305F": 1833, "\u3068\u3057\u3066": -4657, "\u3068\u3082\u306B": -4517, "\u3082\u306E\u3067": 1882, "\u4E00\u6C17\u306B": -792, "\u521D\u3081\u3066": -1512, "\u540C\u6642\u306B": -8097, "\u5927\u304D\u306A": -1255, "\u5BFE\u3057\u3066": -2721, "\u793E\u4F1A\u515A": -3216 };
          this.TW3__ = { "\u3044\u305F\u3060": -1734, "\u3057\u3066\u3044": 1314, "\u3068\u3057\u3066": -4314, "\u306B\u3064\u3044": -5483, "\u306B\u3068\u3063": -5989, "\u306B\u5F53\u305F": -6247, "\u306E\u3067,": -727, "\u306E\u3067\u3001": -727, "\u306E\u3082\u306E": -600, "\u308C\u304B\u3089": -3752, "\u5341\u4E8C\u6708": -2287 };
          this.TW4__ = { "\u3044\u3046.": 8576, "\u3044\u3046\u3002": 8576, "\u304B\u3089\u306A": -2348, "\u3057\u3066\u3044": 2958, "\u305F\u304C,": 1516, "\u305F\u304C\u3001": 1516, "\u3066\u3044\u308B": 1538, "\u3068\u3044\u3046": 1349, "\u307E\u3057\u305F": 5543, "\u307E\u305B\u3093": 1097, "\u3088\u3046\u3068": -4258, "\u3088\u308B\u3068": 5865 };
          this.UC1__ = { "A": 484, "K": 93, "M": 645, "O": -505 };
          this.UC2__ = { "A": 819, "H": 1059, "I": 409, "M": 3987, "N": 5775, "O": 646 };
          this.UC3__ = { "A": -1370, "I": 2311 };
          this.UC4__ = { "A": -2643, "H": 1809, "I": -1032, "K": -3450, "M": 3565, "N": 3876, "O": 6646 };
          this.UC5__ = { "H": 313, "I": -1238, "K": -799, "M": 539, "O": -831 };
          this.UC6__ = { "H": -506, "I": -253, "K": 87, "M": 247, "O": -387 };
          this.UP1__ = { "O": -214 };
          this.UP2__ = { "B": 69, "O": 935 };
          this.UP3__ = { "B": 189 };
          this.UQ1__ = { "BH": 21, "BI": -12, "BK": -99, "BN": 142, "BO": -56, "OH": -95, "OI": 477, "OK": 410, "OO": -2422 };
          this.UQ2__ = { "BH": 216, "BI": 113, "OK": 1759 };
          this.UQ3__ = { "BA": -479, "BH": 42, "BI": 1913, "BK": -7198, "BM": 3160, "BN": 6427, "BO": 14761, "OI": -827, "ON": -3212 };
          this.UW1__ = { ",": 156, "\u3001": 156, "\u300C": -463, "\u3042": -941, "\u3046": -127, "\u304C": -553, "\u304D": 121, "\u3053": 505, "\u3067": -201, "\u3068": -547, "\u3069": -123, "\u306B": -789, "\u306E": -185, "\u306F": -847, "\u3082": -466, "\u3084": -470, "\u3088": 182, "\u3089": -292, "\u308A": 208, "\u308C": 169, "\u3092": -446, "\u3093": -137, "\u30FB": -135, "\u4E3B": -402, "\u4EAC": -268, "\u533A": -912, "\u5348": 871, "\u56FD": -460, "\u5927": 561, "\u59D4": 729, "\u5E02": -411, "\u65E5": -141, "\u7406": 361, "\u751F": -408, "\u770C": -386, "\u90FD": -718, "\uFF62": -463, "\uFF65": -135 };
          this.UW2__ = { ",": -829, "\u3001": -829, "\u3007": 892, "\u300C": -645, "\u300D": 3145, "\u3042": -538, "\u3044": 505, "\u3046": 134, "\u304A": -502, "\u304B": 1454, "\u304C": -856, "\u304F": -412, "\u3053": 1141, "\u3055": 878, "\u3056": 540, "\u3057": 1529, "\u3059": -675, "\u305B": 300, "\u305D": -1011, "\u305F": 188, "\u3060": 1837, "\u3064": -949, "\u3066": -291, "\u3067": -268, "\u3068": -981, "\u3069": 1273, "\u306A": 1063, "\u306B": -1764, "\u306E": 130, "\u306F": -409, "\u3072": -1273, "\u3079": 1261, "\u307E": 600, "\u3082": -1263, "\u3084": -402, "\u3088": 1639, "\u308A": -579, "\u308B": -694, "\u308C": 571, "\u3092": -2516, "\u3093": 2095, "\u30A2": -587, "\u30AB": 306, "\u30AD": 568, "\u30C3": 831, "\u4E09": -758, "\u4E0D": -2150, "\u4E16": -302, "\u4E2D": -968, "\u4E3B": -861, "\u4E8B": 492, "\u4EBA": -123, "\u4F1A": 978, "\u4FDD": 362, "\u5165": 548, "\u521D": -3025, "\u526F": -1566, "\u5317": -3414, "\u533A": -422, "\u5927": -1769, "\u5929": -865, "\u592A": -483, "\u5B50": -1519, "\u5B66": 760, "\u5B9F": 1023, "\u5C0F": -2009, "\u5E02": -813, "\u5E74": -1060, "\u5F37": 1067, "\u624B": -1519, "\u63FA": -1033, "\u653F": 1522, "\u6587": -1355, "\u65B0": -1682, "\u65E5": -1815, "\u660E": -1462, "\u6700": -630, "\u671D": -1843, "\u672C": -1650, "\u6771": -931, "\u679C": -665, "\u6B21": -2378, "\u6C11": -180, "\u6C17": -1740, "\u7406": 752, "\u767A": 529, "\u76EE": -1584, "\u76F8": -242, "\u770C": -1165, "\u7ACB": -763, "\u7B2C": 810, "\u7C73": 509, "\u81EA": -1353, "\u884C": 838, "\u897F": -744, "\u898B": -3874, "\u8ABF": 1010, "\u8B70": 1198, "\u8FBC": 3041, "\u958B": 1758, "\u9593": -1257, "\uFF62": -645, "\uFF63": 3145, "\uFF6F": 831, "\uFF71": -587, "\uFF76": 306, "\uFF77": 568 };
          this.UW3__ = { ",": 4889, "1": -800, "\u2212": -1723, "\u3001": 4889, "\u3005": -2311, "\u3007": 5827, "\u300D": 2670, "\u3013": -3573, "\u3042": -2696, "\u3044": 1006, "\u3046": 2342, "\u3048": 1983, "\u304A": -4864, "\u304B": -1163, "\u304C": 3271, "\u304F": 1004, "\u3051": 388, "\u3052": 401, "\u3053": -3552, "\u3054": -3116, "\u3055": -1058, "\u3057": -395, "\u3059": 584, "\u305B": 3685, "\u305D": -5228, "\u305F": 842, "\u3061": -521, "\u3063": -1444, "\u3064": -1081, "\u3066": 6167, "\u3067": 2318, "\u3068": 1691, "\u3069": -899, "\u306A": -2788, "\u306B": 2745, "\u306E": 4056, "\u306F": 4555, "\u3072": -2171, "\u3075": -1798, "\u3078": 1199, "\u307B": -5516, "\u307E": -4384, "\u307F": -120, "\u3081": 1205, "\u3082": 2323, "\u3084": -788, "\u3088": -202, "\u3089": 727, "\u308A": 649, "\u308B": 5905, "\u308C": 2773, "\u308F": -1207, "\u3092": 6620, "\u3093": -518, "\u30A2": 551, "\u30B0": 1319, "\u30B9": 874, "\u30C3": -1350, "\u30C8": 521, "\u30E0": 1109, "\u30EB": 1591, "\u30ED": 2201, "\u30F3": 278, "\u30FB": -3794, "\u4E00": -1619, "\u4E0B": -1759, "\u4E16": -2087, "\u4E21": 3815, "\u4E2D": 653, "\u4E3B": -758, "\u4E88": -1193, "\u4E8C": 974, "\u4EBA": 2742, "\u4ECA": 792, "\u4ED6": 1889, "\u4EE5": -1368, "\u4F4E": 811, "\u4F55": 4265, "\u4F5C": -361, "\u4FDD": -2439, "\u5143": 4858, "\u515A": 3593, "\u5168": 1574, "\u516C": -3030, "\u516D": 755, "\u5171": -1880, "\u5186": 5807, "\u518D": 3095, "\u5206": 457, "\u521D": 2475, "\u5225": 1129, "\u524D": 2286, "\u526F": 4437, "\u529B": 365, "\u52D5": -949, "\u52D9": -1872, "\u5316": 1327, "\u5317": -1038, "\u533A": 4646, "\u5343": -2309, "\u5348": -783, "\u5354": -1006, "\u53E3": 483, "\u53F3": 1233, "\u5404": 3588, "\u5408": -241, "\u540C": 3906, "\u548C": -837, "\u54E1": 4513, "\u56FD": 642, "\u578B": 1389, "\u5834": 1219, "\u5916": -241, "\u59BB": 2016, "\u5B66": -1356, "\u5B89": -423, "\u5B9F": -1008, "\u5BB6": 1078, "\u5C0F": -513, "\u5C11": -3102, "\u5DDE": 1155, "\u5E02": 3197, "\u5E73": -1804, "\u5E74": 2416, "\u5E83": -1030, "\u5E9C": 1605, "\u5EA6": 1452, "\u5EFA": -2352, "\u5F53": -3885, "\u5F97": 1905, "\u601D": -1291, "\u6027": 1822, "\u6238": -488, "\u6307": -3973, "\u653F": -2013, "\u6559": -1479, "\u6570": 3222, "\u6587": -1489, "\u65B0": 1764, "\u65E5": 2099, "\u65E7": 5792, "\u6628": -661, "\u6642": -1248, "\u66DC": -951, "\u6700": -937, "\u6708": 4125, "\u671F": 360, "\u674E": 3094, "\u6751": 364, "\u6771": -805, "\u6838": 5156, "\u68EE": 2438, "\u696D": 484, "\u6C0F": 2613, "\u6C11": -1694, "\u6C7A": -1073, "\u6CD5": 1868, "\u6D77": -495, "\u7121": 979, "\u7269": 461, "\u7279": -3850, "\u751F": -273, "\u7528": 914, "\u753A": 1215, "\u7684": 7313, "\u76F4": -1835, "\u7701": 792, "\u770C": 6293, "\u77E5": -1528, "\u79C1": 4231, "\u7A0E": 401, "\u7ACB": -960, "\u7B2C": 1201, "\u7C73": 7767, "\u7CFB": 3066, "\u7D04": 3663, "\u7D1A": 1384, "\u7D71": -4229, "\u7DCF": 1163, "\u7DDA": 1255, "\u8005": 6457, "\u80FD": 725, "\u81EA": -2869, "\u82F1": 785, "\u898B": 1044, "\u8ABF": -562, "\u8CA1": -733, "\u8CBB": 1777, "\u8ECA": 1835, "\u8ECD": 1375, "\u8FBC": -1504, "\u901A": -1136, "\u9078": -681, "\u90CE": 1026, "\u90E1": 4404, "\u90E8": 1200, "\u91D1": 2163, "\u9577": 421, "\u958B": -1432, "\u9593": 1302, "\u95A2": -1282, "\u96E8": 2009, "\u96FB": -1045, "\u975E": 2066, "\u99C5": 1620, "\uFF11": -800, "\uFF63": 2670, "\uFF65": -3794, "\uFF6F": -1350, "\uFF71": 551, "\uFF78\uFF9E": 1319, "\uFF7D": 874, "\uFF84": 521, "\uFF91": 1109, "\uFF99": 1591, "\uFF9B": 2201, "\uFF9D": 278 };
          this.UW4__ = { ",": 3930, ".": 3508, "\u2015": -4841, "\u3001": 3930, "\u3002": 3508, "\u3007": 4999, "\u300C": 1895, "\u300D": 3798, "\u3013": -5156, "\u3042": 4752, "\u3044": -3435, "\u3046": -640, "\u3048": -2514, "\u304A": 2405, "\u304B": 530, "\u304C": 6006, "\u304D": -4482, "\u304E": -3821, "\u304F": -3788, "\u3051": -4376, "\u3052": -4734, "\u3053": 2255, "\u3054": 1979, "\u3055": 2864, "\u3057": -843, "\u3058": -2506, "\u3059": -731, "\u305A": 1251, "\u305B": 181, "\u305D": 4091, "\u305F": 5034, "\u3060": 5408, "\u3061": -3654, "\u3063": -5882, "\u3064": -1659, "\u3066": 3994, "\u3067": 7410, "\u3068": 4547, "\u306A": 5433, "\u306B": 6499, "\u306C": 1853, "\u306D": 1413, "\u306E": 7396, "\u306F": 8578, "\u3070": 1940, "\u3072": 4249, "\u3073": -4134, "\u3075": 1345, "\u3078": 6665, "\u3079": -744, "\u307B": 1464, "\u307E": 1051, "\u307F": -2082, "\u3080": -882, "\u3081": -5046, "\u3082": 4169, "\u3083": -2666, "\u3084": 2795, "\u3087": -1544, "\u3088": 3351, "\u3089": -2922, "\u308A": -9726, "\u308B": -14896, "\u308C": -2613, "\u308D": -4570, "\u308F": -1783, "\u3092": 13150, "\u3093": -2352, "\u30AB": 2145, "\u30B3": 1789, "\u30BB": 1287, "\u30C3": -724, "\u30C8": -403, "\u30E1": -1635, "\u30E9": -881, "\u30EA": -541, "\u30EB": -856, "\u30F3": -3637, "\u30FB": -4371, "\u30FC": -11870, "\u4E00": -2069, "\u4E2D": 2210, "\u4E88": 782, "\u4E8B": -190, "\u4E95": -1768, "\u4EBA": 1036, "\u4EE5": 544, "\u4F1A": 950, "\u4F53": -1286, "\u4F5C": 530, "\u5074": 4292, "\u5148": 601, "\u515A": -2006, "\u5171": -1212, "\u5185": 584, "\u5186": 788, "\u521D": 1347, "\u524D": 1623, "\u526F": 3879, "\u529B": -302, "\u52D5": -740, "\u52D9": -2715, "\u5316": 776, "\u533A": 4517, "\u5354": 1013, "\u53C2": 1555, "\u5408": -1834, "\u548C": -681, "\u54E1": -910, "\u5668": -851, "\u56DE": 1500, "\u56FD": -619, "\u5712": -1200, "\u5730": 866, "\u5834": -1410, "\u5841": -2094, "\u58EB": -1413, "\u591A": 1067, "\u5927": 571, "\u5B50": -4802, "\u5B66": -1397, "\u5B9A": -1057, "\u5BFA": -809, "\u5C0F": 1910, "\u5C4B": -1328, "\u5C71": -1500, "\u5CF6": -2056, "\u5DDD": -2667, "\u5E02": 2771, "\u5E74": 374, "\u5E81": -4556, "\u5F8C": 456, "\u6027": 553, "\u611F": 916, "\u6240": -1566, "\u652F": 856, "\u6539": 787, "\u653F": 2182, "\u6559": 704, "\u6587": 522, "\u65B9": -856, "\u65E5": 1798, "\u6642": 1829, "\u6700": 845, "\u6708": -9066, "\u6728": -485, "\u6765": -442, "\u6821": -360, "\u696D": -1043, "\u6C0F": 5388, "\u6C11": -2716, "\u6C17": -910, "\u6CA2": -939, "\u6E08": -543, "\u7269": -735, "\u7387": 672, "\u7403": -1267, "\u751F": -1286, "\u7523": -1101, "\u7530": -2900, "\u753A": 1826, "\u7684": 2586, "\u76EE": 922, "\u7701": -3485, "\u770C": 2997, "\u7A7A": -867, "\u7ACB": -2112, "\u7B2C": 788, "\u7C73": 2937, "\u7CFB": 786, "\u7D04": 2171, "\u7D4C": 1146, "\u7D71": -1169, "\u7DCF": 940, "\u7DDA": -994, "\u7F72": 749, "\u8005": 2145, "\u80FD": -730, "\u822C": -852, "\u884C": -792, "\u898F": 792, "\u8B66": -1184, "\u8B70": -244, "\u8C37": -1e3, "\u8CDE": 730, "\u8ECA": -1481, "\u8ECD": 1158, "\u8F2A": -1433, "\u8FBC": -3370, "\u8FD1": 929, "\u9053": -1291, "\u9078": 2596, "\u90CE": -4866, "\u90FD": 1192, "\u91CE": -1100, "\u9280": -2213, "\u9577": 357, "\u9593": -2344, "\u9662": -2297, "\u969B": -2604, "\u96FB": -878, "\u9818": -1659, "\u984C": -792, "\u9928": -1984, "\u9996": 1749, "\u9AD8": 2120, "\uFF62": 1895, "\uFF63": 3798, "\uFF65": -4371, "\uFF6F": -724, "\uFF70": -11870, "\uFF76": 2145, "\uFF7A": 1789, "\uFF7E": 1287, "\uFF84": -403, "\uFF92": -1635, "\uFF97": -881, "\uFF98": -541, "\uFF99": -856, "\uFF9D": -3637 };
          this.UW5__ = { ",": 465, ".": -299, "1": -514, "E2": -32768, "]": -2762, "\u3001": 465, "\u3002": -299, "\u300C": 363, "\u3042": 1655, "\u3044": 331, "\u3046": -503, "\u3048": 1199, "\u304A": 527, "\u304B": 647, "\u304C": -421, "\u304D": 1624, "\u304E": 1971, "\u304F": 312, "\u3052": -983, "\u3055": -1537, "\u3057": -1371, "\u3059": -852, "\u3060": -1186, "\u3061": 1093, "\u3063": 52, "\u3064": 921, "\u3066": -18, "\u3067": -850, "\u3068": -127, "\u3069": 1682, "\u306A": -787, "\u306B": -1224, "\u306E": -635, "\u306F": -578, "\u3079": 1001, "\u307F": 502, "\u3081": 865, "\u3083": 3350, "\u3087": 854, "\u308A": -208, "\u308B": 429, "\u308C": 504, "\u308F": 419, "\u3092": -1264, "\u3093": 327, "\u30A4": 241, "\u30EB": 451, "\u30F3": -343, "\u4E2D": -871, "\u4EAC": 722, "\u4F1A": -1153, "\u515A": -654, "\u52D9": 3519, "\u533A": -901, "\u544A": 848, "\u54E1": 2104, "\u5927": -1296, "\u5B66": -548, "\u5B9A": 1785, "\u5D50": -1304, "\u5E02": -2991, "\u5E2D": 921, "\u5E74": 1763, "\u601D": 872, "\u6240": -814, "\u6319": 1618, "\u65B0": -1682, "\u65E5": 218, "\u6708": -4353, "\u67FB": 932, "\u683C": 1356, "\u6A5F": -1508, "\u6C0F": -1347, "\u7530": 240, "\u753A": -3912, "\u7684": -3149, "\u76F8": 1319, "\u7701": -1052, "\u770C": -4003, "\u7814": -997, "\u793E": -278, "\u7A7A": -813, "\u7D71": 1955, "\u8005": -2233, "\u8868": 663, "\u8A9E": -1073, "\u8B70": 1219, "\u9078": -1018, "\u90CE": -368, "\u9577": 786, "\u9593": 1191, "\u984C": 2368, "\u9928": -689, "\uFF11": -514, "\uFF25\uFF12": -32768, "\uFF62": 363, "\uFF72": 241, "\uFF99": 451, "\uFF9D": -343 };
          this.UW6__ = { ",": 227, ".": 808, "1": -270, "E1": 306, "\u3001": 227, "\u3002": 808, "\u3042": -307, "\u3046": 189, "\u304B": 241, "\u304C": -73, "\u304F": -121, "\u3053": -200, "\u3058": 1782, "\u3059": 383, "\u305F": -428, "\u3063": 573, "\u3066": -1014, "\u3067": 101, "\u3068": -105, "\u306A": -253, "\u306B": -149, "\u306E": -417, "\u306F": -236, "\u3082": -206, "\u308A": 187, "\u308B": -135, "\u3092": 195, "\u30EB": -673, "\u30F3": -496, "\u4E00": -277, "\u4E2D": 201, "\u4EF6": -800, "\u4F1A": 624, "\u524D": 302, "\u533A": 1792, "\u54E1": -1212, "\u59D4": 798, "\u5B66": -960, "\u5E02": 887, "\u5E83": -695, "\u5F8C": 535, "\u696D": -697, "\u76F8": 753, "\u793E": -507, "\u798F": 974, "\u7A7A": -822, "\u8005": 1811, "\u9023": 463, "\u90CE": 1082, "\uFF11": -270, "\uFF25\uFF11": 306, "\uFF99": -673, "\uFF9D": -496 };
          return this;
        }
        TinySegmenter.prototype.ctype_ = function(str) {
          for (var i in this.chartype_) {
            if (str.match(this.chartype_[i][0])) {
              return this.chartype_[i][1];
            }
          }
          return "O";
        };
        TinySegmenter.prototype.ts_ = function(v) {
          if (v) {
            return v;
          }
          return 0;
        };
        TinySegmenter.prototype.segment = function(input) {
          if (input == null || input == void 0 || input == "") {
            return [];
          }
          var result = [];
          var seg = ["B3", "B2", "B1"];
          var ctype = ["O", "O", "O"];
          var o = input.split("");
          for (i = 0; i < o.length; ++i) {
            seg.push(o[i]);
            ctype.push(this.ctype_(o[i]));
          }
          seg.push("E1");
          seg.push("E2");
          seg.push("E3");
          ctype.push("O");
          ctype.push("O");
          ctype.push("O");
          var word = seg[3];
          var p1 = "U";
          var p2 = "U";
          var p3 = "U";
          for (var i = 4; i < seg.length - 3; ++i) {
            var score = this.BIAS__;
            var w1 = seg[i - 3];
            var w2 = seg[i - 2];
            var w3 = seg[i - 1];
            var w4 = seg[i];
            var w5 = seg[i + 1];
            var w6 = seg[i + 2];
            var c1 = ctype[i - 3];
            var c2 = ctype[i - 2];
            var c3 = ctype[i - 1];
            var c4 = ctype[i];
            var c5 = ctype[i + 1];
            var c6 = ctype[i + 2];
            score += this.ts_(this.UP1__[p1]);
            score += this.ts_(this.UP2__[p2]);
            score += this.ts_(this.UP3__[p3]);
            score += this.ts_(this.BP1__[p1 + p2]);
            score += this.ts_(this.BP2__[p2 + p3]);
            score += this.ts_(this.UW1__[w1]);
            score += this.ts_(this.UW2__[w2]);
            score += this.ts_(this.UW3__[w3]);
            score += this.ts_(this.UW4__[w4]);
            score += this.ts_(this.UW5__[w5]);
            score += this.ts_(this.UW6__[w6]);
            score += this.ts_(this.BW1__[w2 + w3]);
            score += this.ts_(this.BW2__[w3 + w4]);
            score += this.ts_(this.BW3__[w4 + w5]);
            score += this.ts_(this.TW1__[w1 + w2 + w3]);
            score += this.ts_(this.TW2__[w2 + w3 + w4]);
            score += this.ts_(this.TW3__[w3 + w4 + w5]);
            score += this.ts_(this.TW4__[w4 + w5 + w6]);
            score += this.ts_(this.UC1__[c1]);
            score += this.ts_(this.UC2__[c2]);
            score += this.ts_(this.UC3__[c3]);
            score += this.ts_(this.UC4__[c4]);
            score += this.ts_(this.UC5__[c5]);
            score += this.ts_(this.UC6__[c6]);
            score += this.ts_(this.BC1__[c2 + c3]);
            score += this.ts_(this.BC2__[c3 + c4]);
            score += this.ts_(this.BC3__[c4 + c5]);
            score += this.ts_(this.TC1__[c1 + c2 + c3]);
            score += this.ts_(this.TC2__[c2 + c3 + c4]);
            score += this.ts_(this.TC3__[c3 + c4 + c5]);
            score += this.ts_(this.TC4__[c4 + c5 + c6]);
            score += this.ts_(this.UQ1__[p1 + c1]);
            score += this.ts_(this.UQ2__[p2 + c2]);
            score += this.ts_(this.UQ3__[p3 + c3]);
            score += this.ts_(this.BQ1__[p2 + c2 + c3]);
            score += this.ts_(this.BQ2__[p2 + c3 + c4]);
            score += this.ts_(this.BQ3__[p3 + c2 + c3]);
            score += this.ts_(this.BQ4__[p3 + c3 + c4]);
            score += this.ts_(this.TQ1__[p2 + c1 + c2 + c3]);
            score += this.ts_(this.TQ2__[p2 + c2 + c3 + c4]);
            score += this.ts_(this.TQ3__[p3 + c1 + c2 + c3]);
            score += this.ts_(this.TQ4__[p3 + c2 + c3 + c4]);
            var p = "O";
            if (score > 0) {
              result.push(word);
              word = "";
              p = "B";
            }
            p1 = p2;
            p2 = p3;
            p3 = p;
            word += seg[i];
          }
          result.push(word);
          return result;
        };
        lunr.TinySegmenter = TinySegmenter;
      };
    });
  }
});

// src/worker/langs/ja.ts
var import_lunr_stemmer = __toESM(require_lunr_stemmer_support());
var import_lunr = __toESM(require_lunr_multi());
var import_lunr2 = __toESM(require_lunr_ja());
var import_tinyseg = __toESM(require_tinyseg());
self.language = function(lunr) {
  (0, import_lunr_stemmer.default)(lunr);
  (0, import_lunr2.default)(lunr);
  (0, import_tinyseg.default)(lunr);
  (0, import_lunr.default)(lunr);
  lunr.multiLanguage("en", "ja");
  return lunr.ja;
};
/*! Bundled license information:

lunr-languages/lunr.stemmer.support.js:
  (*!
   * Snowball JavaScript Library v0.3
   * http://code.google.com/p/urim/
   * http://snowball.tartarus.org/
   *
   * Copyright 2010, Oleg Mazko
   * http://www.mozilla.org/MPL/
   *)

lunr-languages/lunr.ja.js:
  (*!
   * Lunr languages, `Japanese` language
   * https://github.com/MihaiValentin/lunr-languages
   *
   * Copyright 2014, Chad Liu
   * http://www.mozilla.org/MPL/
   *)
  (*!
   * based on
   * Snowball JavaScript Library v0.3
   * http://code.google.com/p/urim/
   * http://snowball.tartarus.org/
   *
   * Copyright 2010, Oleg Mazko
   * http://www.mozilla.org/MPL/
   *)
*/