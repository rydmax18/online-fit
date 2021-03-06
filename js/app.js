/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, o) {
        var n, i;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              o = (this.document || this.ownerDocument).querySelectorAll(t),
              n = this;
            do {
              for (e = o.length; 0 <= --e && o.item(e) !== n; );
            } while (e < 0 && (n = n.parentElement));
            return n;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var o = document.createEvent("CustomEvent");
              return o.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), o;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], o = 0;
              o < e.length && !window.requestAnimationFrame;
              ++o
            )
              (window.requestAnimationFrame =
                window[e[o] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[o] + "CancelAnimationFrame"] ||
                  window[e[o] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, o) {
                var n = new Date().getTime(),
                  i = Math.max(0, 16 - (n - t)),
                  s = window.setTimeout(function () {
                    e(n + i);
                  }, i);
                return (t = n + i), s;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (i =
            void 0 !== o.g
              ? o.g
              : "undefined" != typeof window
              ? window
              : this),
          (n = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                o = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var o in e) {
                        if (!e.hasOwnProperty(o)) return;
                        t[o] = e[o];
                      }
                    }),
                    t
                  );
                },
                n = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      o = String(t),
                      n = o.length,
                      i = -1,
                      s = "",
                      a = o.charCodeAt(0);
                    ++i < n;

                  ) {
                    if (0 === (e = o.charCodeAt(i)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    s +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === i && 48 <= e && e <= 57) ||
                      (1 === i && 48 <= e && e <= 57 && 45 === a)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? o.charAt(i)
                        : "\\" + o.charAt(i);
                  }
                  return "#" + s;
                },
                i = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                s = function (e) {
                  return e
                    ? ((o = e),
                      parseInt(t.getComputedStyle(o).height, 10) + e.offsetTop)
                    : 0;
                  var o;
                },
                a = function (e, o, n) {
                  0 === e && document.body.focus(),
                    n ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, o));
                },
                r = function (e, o, n, i) {
                  if (o.emitEvents && "function" == typeof t.CustomEvent) {
                    var s = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: n, toggle: i },
                    });
                    document.dispatchEvent(s);
                  }
                };
              return function (c, l) {
                var u,
                  h,
                  d,
                  p,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(p),
                        (p = null),
                        t || r("scrollCancel", u);
                    },
                    animateScroll: function (n, c, l) {
                      m.cancelScroll();
                      var h = o(u || e, l || {}),
                        f =
                          "[object Number]" ===
                          Object.prototype.toString.call(n),
                        g = f || !n.tagName ? null : n;
                      if (f || g) {
                        var y = t.pageYOffset;
                        h.header &&
                          !d &&
                          (d = document.querySelector(h.header));
                        var w,
                          b,
                          v,
                          A,
                          S,
                          O,
                          E,
                          L,
                          C = s(d),
                          _ = f
                            ? n
                            : (function (e, o, n, s) {
                                var a = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (a += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (a = Math.max(a - o - n, 0)),
                                  s && (a = Math.min(a, i() - t.innerHeight)),
                                  a
                                );
                              })(
                                g,
                                C,
                                parseInt(
                                  "function" == typeof h.offset
                                    ? h.offset(n, c)
                                    : h.offset,
                                  10
                                ),
                                h.clip
                              ),
                          q = _ - y,
                          k = i(),
                          x = 0,
                          $ =
                            ((w = q),
                            (v = (b = h).speedAsDuration
                              ? b.speed
                              : Math.abs((w / 1e3) * b.speed)),
                            b.durationMax && v > b.durationMax
                              ? b.durationMax
                              : b.durationMin && v < b.durationMin
                              ? b.durationMin
                              : parseInt(v, 10)),
                          I = function (e) {
                            var o, i, s;
                            A || (A = e),
                              (x += e - A),
                              (O =
                                y +
                                q *
                                  ((i = S =
                                    1 < (S = 0 === $ ? 0 : x / $) ? 1 : S),
                                  "easeInQuad" === (o = h).easing &&
                                    (s = i * i),
                                  "easeOutQuad" === o.easing &&
                                    (s = i * (2 - i)),
                                  "easeInOutQuad" === o.easing &&
                                    (s =
                                      i < 0.5
                                        ? 2 * i * i
                                        : (4 - 2 * i) * i - 1),
                                  "easeInCubic" === o.easing && (s = i * i * i),
                                  "easeOutCubic" === o.easing &&
                                    (s = --i * i * i + 1),
                                  "easeInOutCubic" === o.easing &&
                                    (s =
                                      i < 0.5
                                        ? 4 * i * i * i
                                        : (i - 1) * (2 * i - 2) * (2 * i - 2) +
                                          1),
                                  "easeInQuart" === o.easing &&
                                    (s = i * i * i * i),
                                  "easeOutQuart" === o.easing &&
                                    (s = 1 - --i * i * i * i),
                                  "easeInOutQuart" === o.easing &&
                                    (s =
                                      i < 0.5
                                        ? 8 * i * i * i * i
                                        : 1 - 8 * --i * i * i * i),
                                  "easeInQuint" === o.easing &&
                                    (s = i * i * i * i * i),
                                  "easeOutQuint" === o.easing &&
                                    (s = 1 + --i * i * i * i * i),
                                  "easeInOutQuint" === o.easing &&
                                    (s =
                                      i < 0.5
                                        ? 16 * i * i * i * i * i
                                        : 1 + 16 * --i * i * i * i * i),
                                  o.customEasing && (s = o.customEasing(i)),
                                  s || i)),
                              t.scrollTo(0, Math.floor(O)),
                              (function (e, o) {
                                var i = t.pageYOffset;
                                if (
                                  e == o ||
                                  i == o ||
                                  (y < o && t.innerHeight + i) >= k
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    a(n, o, f),
                                    r("scrollStop", h, n, c),
                                    !(p = A = null)
                                  );
                              })(O, _) ||
                                ((p = t.requestAnimationFrame(I)), (A = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (E = n),
                          (L = h),
                          f ||
                            (history.pushState &&
                              L.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(L),
                                  anchor: E.id,
                                },
                                document.title,
                                E === document.documentElement
                                  ? "#top"
                                  : "#" + E.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? a(n, Math.floor(_), !1)
                            : (r("scrollStart", h, n, c),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(I));
                      }
                    },
                  },
                  f = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (h = e.target.closest(c)) &&
                      "a" === h.tagName.toLowerCase() &&
                      !e.target.closest(u.ignore) &&
                      h.hostname === t.location.hostname &&
                      h.pathname === t.location.pathname &&
                      /#/.test(h.href)
                    ) {
                      var o, i;
                      try {
                        o = n(decodeURIComponent(h.hash));
                      } catch (e) {
                        o = n(h.hash);
                      }
                      if ("#" === o) {
                        if (!u.topOnEmptyHash) return;
                        i = document.documentElement;
                      } else i = document.querySelector(o);
                      (i = i || "#top" !== o ? i : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var o = t.location.hash;
                            (o = o || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: o || t.pageYOffset,
                                },
                                document.title,
                                o || t.location.href
                              );
                          }
                        })(u),
                        m.animateScroll(i, h));
                    }
                  },
                  g = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(u)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          n(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    u &&
                      (document.removeEventListener("click", f, !1),
                      t.removeEventListener("popstate", g, !1),
                      m.cancelScroll(),
                      (p = d = h = u = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (u = o(e, l || {})),
                      (d = u.header ? document.querySelector(u.header) : null),
                      document.addEventListener("click", f, !1),
                      u.updateURL &&
                        u.popstate &&
                        t.addEventListener("popstate", g, !1);
                  })(),
                  m
                );
              };
            })(i);
          }.apply(e, [])),
          void 0 === n || (t.exports = n);
      },
    },
    e = {};
  function o(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var s = (e[n] = { exports: {} });
    return t[n].call(s.exports, s, s.exports, o), s.exports;
  }
  (o.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      const t = {};
      let e = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
          );
        },
      };
      function n() {
        if (location.hash) return location.hash.replace("#", "");
      }
      let i = !0,
        s = (t = 500) => {
          document.documentElement.classList.contains("lock") ? a(t) : r(t);
        },
        a = (t = 500) => {
          let e = document.querySelector("body");
          if (i) {
            let o = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < o.length; t++) {
                o[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (i = !1),
              setTimeout(function () {
                i = !0;
              }, t);
          }
        },
        r = (t = 500) => {
          let e = document.querySelector("body");
          if (i) {
            let o = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < o.length; t++) {
              o[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (i = !1),
              setTimeout(function () {
                i = !0;
              }, t);
          }
        };
      function c(t) {
        setTimeout(() => {
          window.FLS && console.log(t);
        }, 0);
      }
      function l(t) {
        return t.filter(function (t, e, o) {
          return o.indexOf(t) === e;
        });
      }
      t.popup = new (class {
        constructor(t) {
          let e = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          (this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...e,
              ...t,
              classes: { ...e.classes, ...t?.classes },
              hashSettings: { ...e.hashSettings, ...t?.hashSettings },
              on: { ...e.on, ...t?.on },
            }),
            this.options.init && this.initPopups();
        }
        initPopups() {
          this.popupLogging("??????????????????"), this.eventsPopup();
        }
        eventsPopup() {
          document.addEventListener(
            "click",
            function (t) {
              const e = t.target.closest(
                `[${this.options.attributeOpenButton}]`
              );
              if (e)
                return (
                  t.preventDefault(),
                  (this._dataValue = e.getAttribute(
                    this.options.attributeOpenButton
                  )
                    ? e.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = e),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `???? ????, ???? ???????????????? ?????????????? ?? ${e.classList}`
                      )
                );
              return t.target.closest(
                `[${this.options.attributeCloseButton}]`
              ) ||
                (!t.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (t.preventDefault(), void this.close())
                : void 0;
            }.bind(this)
          ),
            document.addEventListener(
              "keydown",
              function (t) {
                if (
                  this.options.closeEsc &&
                  27 == t.which &&
                  "Escape" === t.code &&
                  this.isOpen
                )
                  return t.preventDefault(), void this.close();
                this.options.focusCatch &&
                  9 == t.which &&
                  this.isOpen &&
                  this._focusCatch(t);
              }.bind(this)
            ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this)
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this)
              ));
        }
        open(t) {
          if (
            (t &&
              "string" == typeof t &&
              "" !== t.trim() &&
              ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              )
            ) {
              const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                  this.options.youtubeAttribute
                )}?rel=0&showinfo=0&autoplay=1`,
                e = document.createElement("iframe");
              e.setAttribute("allowfullscreen", "");
              const o = this.options.setAutoplayYoutube ? "autoplay;" : "";
              e.setAttribute("allow", `${o}; encrypted-media`),
                e.setAttribute("src", t),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(e);
            }
            this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : s(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } })
              ),
              this.popupLogging("???????????? ??????????");
          } else
            this.popupLogging(
              "???? ????, ???????????? ???????????? ??????. ?????????????????? ???????????????????????? ??????????. "
            );
        }
        close(t) {
          t &&
            "string" == typeof t &&
            "" !== t.trim() &&
            (this.previousOpen.selector = t),
            this.isOpen &&
              i &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive
                ),
                s(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("???????????? ??????????"));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let t = document.querySelector(
            `.${window.location.hash.replace("#", "")}`
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
            ? `${window.location.hash}`
            : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${t}"]`
          ) &&
            t &&
            this.open(t);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(t) {
          const e = this.targetOpen.element.querySelectorAll(this._focusEl),
            o = Array.prototype.slice.call(e),
            n = o.indexOf(document.activeElement);
          t.shiftKey &&
            0 === n &&
            (o[o.length - 1].focus(), t.preventDefault()),
            t.shiftKey ||
              n !== o.length - 1 ||
              (o[0].focus(), t.preventDefault());
        }
        _focusTrap() {
          const t = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : t[0].focus();
        }
        popupLogging(t) {
          this.options.logging && c(`[??????????????]: ${t}`);
        }
      })({});
      var u = o(2);
      let h = (t, e = !1, o = 500, n = 0) => {
        const i = document.querySelector(t);
        if (i) {
          let s = "",
            r = 0;
          e &&
            ((s = "header.header"),
            (r = document.querySelector(s).offsetHeight));
          let l = {
            speedAsDuration: !0,
            speed: o,
            header: s,
            offset: n,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (a(), document.documentElement.classList.remove("menu-open")),
            void 0 !== u)
          )
            new u().animateScroll(i, "", l);
          else {
            let t = i.getBoundingClientRect().top + scrollY;
            (t = r ? t - r : t),
              (t = n ? t - n : t),
              window.scrollTo({ top: t, behavior: "smooth" });
          }
          c(`[gotoBlock]: ????????...???????? ?? ${t}`);
        } else c(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
      };
      t.watcher = new (class {
        constructor(t) {
          (this.config = Object.assign({ logging: !0 }, t)),
            this.observer,
            !document.documentElement.classList.contains("watcher") &&
              this.scrollWatcherRun();
        }
        scrollWatcherUpdate() {
          this.scrollWatcherRun();
        }
        scrollWatcherRun() {
          document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(
              document.querySelectorAll("[data-watch]")
            );
        }
        scrollWatcherConstructor(t) {
          if (t.length) {
            this.scrollWatcherLogging(
              `??????????????????, ?????????? ???? ?????????????????? (${t.length})...`
            ),
              l(
                Array.from(t).map(function (t) {
                  return `${
                    t.dataset.watchRoot ? t.dataset.watchRoot : null
                  }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
                })
              ).forEach((e) => {
                let o = e.split("|"),
                  n = { root: o[0], margin: o[1], threshold: o[2] },
                  i = Array.from(t).filter(function (t) {
                    let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                      o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                      i = t.dataset.watchThreshold
                        ? t.dataset.watchThreshold
                        : 0;
                    if (
                      String(e) === n.root &&
                      String(o) === n.margin &&
                      String(i) === n.threshold
                    )
                      return t;
                  }),
                  s = this.getScrollWatcherConfig(n);
                this.scrollWatcherInit(i, s);
              });
          } else
            this.scrollWatcherLogging(
              "????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz"
            );
        }
        getScrollWatcherConfig(t) {
          let e = {};
          if (
            (document.querySelector(t.root)
              ? (e.root = document.querySelector(t.root))
              : "null" !== t.root &&
                this.scrollWatcherLogging(
                  `??????... ?????????????????????????? ?????????????? ${t.root} ?????? ???? ????????????????`
                ),
            (e.rootMargin = t.margin),
            !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
          ) {
            if ("prx" === t.threshold) {
              t.threshold = [];
              for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
            } else t.threshold = t.threshold.split(",");
            return (e.threshold = t.threshold), e;
          }
          this.scrollWatcherLogging(
            "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
          );
        }
        scrollWatcherCreate(t) {
          this.observer = new IntersectionObserver((t, e) => {
            t.forEach((t) => {
              this.scrollWatcherCallback(t, e);
            });
          }, t);
        }
        scrollWatcherInit(t, e) {
          this.scrollWatcherCreate(e),
            t.forEach((t) => this.observer.observe(t));
        }
        scrollWatcherIntersecting(t, e) {
          t.isIntersecting
            ? (!e.classList.contains("_watcher-view") &&
                e.classList.add("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???????? ${e.classList}, ?????????????? ?????????? _watcher-view`
              ))
            : (e.classList.contains("_watcher-view") &&
                e.classList.remove("_watcher-view"),
              this.scrollWatcherLogging(
                `?? ???? ???????? ${e.classList}, ?????????? ?????????? _watcher-view`
              ));
        }
        scrollWatcherOff(t, e) {
          e.unobserve(t),
            this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${t.classList}`);
        }
        scrollWatcherLogging(t) {
          this.config.logging && c(`[??????????????????????]: ${t}`);
        }
        scrollWatcherCallback(t, e) {
          const o = t.target;
          this.scrollWatcherIntersecting(t, o),
            o.hasAttribute("data-watch-once") &&
              t.isIntersecting &&
              this.scrollWatcherOff(o, e),
            document.dispatchEvent(
              new CustomEvent("watcherCallback", { detail: { entry: t } })
            );
        }
      })({});
      let d = !1;
      function p(t) {
        this.type = t;
      }
      setTimeout(() => {
        if (d) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0),
        (p.prototype.init = function () {
          const t = this;
          (this.??bjects = []),
            (this.daClassname = "_dynamic_adapt_"),
            (this.nodes = document.querySelectorAll("[data-da]"));
          for (let t = 0; t < this.nodes.length; t++) {
            const e = this.nodes[t],
              o = e.dataset.da.trim().split(","),
              n = {};
            (n.element = e),
              (n.parent = e.parentNode),
              (n.destination = document.querySelector(o[0].trim())),
              (n.breakpoint = o[1] ? o[1].trim() : "767"),
              (n.place = o[2] ? o[2].trim() : "last"),
              (n.index = this.indexInParent(n.parent, n.element)),
              this.??bjects.push(n);
          }
          this.arraySort(this.??bjects),
            (this.mediaQueries = Array.prototype.map.call(
              this.??bjects,
              function (t) {
                return (
                  "(" +
                  this.type +
                  "-width: " +
                  t.breakpoint +
                  "px)," +
                  t.breakpoint
                );
              },
              this
            )),
            (this.mediaQueries = Array.prototype.filter.call(
              this.mediaQueries,
              function (t, e, o) {
                return Array.prototype.indexOf.call(o, t) === e;
              }
            ));
          for (let e = 0; e < this.mediaQueries.length; e++) {
            const o = this.mediaQueries[e],
              n = String.prototype.split.call(o, ","),
              i = window.matchMedia(n[0]),
              s = n[1],
              a = Array.prototype.filter.call(this.??bjects, function (t) {
                return t.breakpoint === s;
              });
            i.addListener(function () {
              t.mediaHandler(i, a);
            }),
              this.mediaHandler(i, a);
          }
        }),
        (p.prototype.mediaHandler = function (t, e) {
          if (t.matches)
            for (let t = 0; t < e.length; t++) {
              const o = e[t];
              (o.index = this.indexInParent(o.parent, o.element)),
                this.moveTo(o.place, o.element, o.destination);
            }
          else
            for (let t = e.length - 1; t >= 0; t--) {
              const o = e[t];
              o.element.classList.contains(this.daClassname) &&
                this.moveBack(o.parent, o.element, o.index);
            }
        }),
        (p.prototype.moveTo = function (t, e, o) {
          e.classList.add(this.daClassname),
            "last" === t || t >= o.children.length
              ? o.insertAdjacentElement("beforeend", e)
              : "first" !== t
              ? o.children[t].insertAdjacentElement("beforebegin", e)
              : o.insertAdjacentElement("afterbegin", e);
        }),
        (p.prototype.moveBack = function (t, e, o) {
          e.classList.remove(this.daClassname),
            void 0 !== t.children[o]
              ? t.children[o].insertAdjacentElement("beforebegin", e)
              : t.insertAdjacentElement("beforeend", e);
        }),
        (p.prototype.indexInParent = function (t, e) {
          const o = Array.prototype.slice.call(t.children);
          return Array.prototype.indexOf.call(o, e);
        }),
        (p.prototype.arraySort = function (t) {
          "min" === this.type
            ? Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? -1
                    : "last" === t.place || "first" === e.place
                    ? 1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              })
            : Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? 1
                    : "last" === t.place || "first" === e.place
                    ? -1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              });
        });
      new p("max").init();
      document.querySelectorAll(".grid-schedule__item").forEach((t) => {
        t.addEventListener("click", function (e) {
          window.innerWidth < 768 &&
            (t.classList.toggle("_visible"),
            t
              .querySelector(".grid-schedule__text")
              .classList.toggle("_visible"));
        });
      }),
        (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        (function () {
          let t = document.querySelector(".icon-menu");
          t &&
            t.addEventListener("click", function (t) {
              i &&
                (s(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            e.any()
          ) {
            function t() {
              let t = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${t}px`);
            }
            window.addEventListener("resize", t), t();
          }
        })(),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const o = e.closest("[data-goto]"),
                  n = o.dataset.goto ? o.dataset.goto : "",
                  i = !!o.hasAttribute("data-goto-header"),
                  s = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : 500,
                  a = o.dataset.gotoTop ? parseInt(o.dataset.gotoTop) : 0;
                h(n, i, s, a), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                o = e.target;
              if ("navigator" === o.dataset.watch) {
                document.querySelector("[data-goto]._navigator-active");
                let t;
                if (o.id && document.querySelector(`[data-goto="#${o.id}"]`))
                  t = document.querySelector(`[data-goto="#${o.id}"]`);
                else if (o.classList.length)
                  for (let e = 0; e < o.classList.length; e++) {
                    const n = o.classList[e];
                    if (document.querySelector(`[data-goto=".${n}"]`)) {
                      t = document.querySelector(`[data-goto=".${n}"]`);
                      break;
                    }
                  }
                e.isIntersecting
                  ? t && t.classList.add("_navigator-active")
                  : t && t.classList.remove("_navigator-active");
              }
            }
          }
          if (
            (document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t),
            n())
          ) {
            let t;
            document.querySelector(`#${n()}`)
              ? (t = `#${n()}`)
              : document.querySelector(`.${n()}`) && (t = `.${n()}`),
              t && h(t, !0, 500, 20);
          }
        })();
    })();
})();
