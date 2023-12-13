const e = (e, t, n = globalThis) => {
  const r = Symbol.for(e),
    s = r in n;
  return [s ? n[r] : Object.defineProperty(n, r, { value: t })[r], s];
};
Promise.withResolvers ||
  (Promise.withResolvers = function () {
    var e,
      t,
      n = new this(function (n, r) {
        (e = n), (t = r);
      });
    return { resolve: e, reject: t, promise: n };
  });
const t = (e) => e.arrayBuffer(),
  n = (e) => e.json(),
  r = (e) => e.text(),
  s = (e, t = document) => t.querySelector(e),
  o = (e, t = document) => [...t.querySelectorAll(e)],
  a = (e, t = document) => {
    const n = new XPathEvaluator()
        .createExpression(e)
        .evaluate(t, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE),
      r = [];
    for (let e = 0, { snapshotLength: t } = n; e < t; e++)
      r.push(n.snapshotItem(e));
    return r;
  },
  i = "object" == typeof self ? self : globalThis,
  l = (e) =>
    ((e, t) => {
      const n = (t, n) => (e.set(n, t), t),
        r = (s) => {
          if (e.has(s)) return e.get(s);
          const [o, a] = t[s];
          switch (o) {
            case 0:
            case -1:
              return n(a, s);
            case 1: {
              const e = n([], s);
              for (const t of a) e.push(r(t));
              return e;
            }
            case 2: {
              const e = n({}, s);
              for (const [t, n] of a) e[r(t)] = r(n);
              return e;
            }
            case 3:
              return n(new Date(a), s);
            case 4: {
              const { source: e, flags: t } = a;
              return n(new RegExp(e, t), s);
            }
            case 5: {
              const e = n(new Map(), s);
              for (const [t, n] of a) e.set(r(t), r(n));
              return e;
            }
            case 6: {
              const e = n(new Set(), s);
              for (const t of a) e.add(r(t));
              return e;
            }
            case 7: {
              const { name: e, message: t } = a;
              return n(new i[e](t), s);
            }
            case 8:
              return n(BigInt(a), s);
            case "BigInt":
              return n(Object(BigInt(a)), s);
          }
          return n(new i[o](a), s);
        };
      return r;
    })(
      new Map(),
      e
    )(0),
  c = "",
  { toString: u } = {},
  { keys: f } = Object,
  p = (e) => {
    const t = typeof e;
    if ("object" !== t || !e) return [0, t];
    const n = u.call(e).slice(8, -1);
    switch (n) {
      case "Array":
        return [1, c];
      case "Object":
        return [2, c];
      case "Date":
        return [3, c];
      case "RegExp":
        return [4, c];
      case "Map":
        return [5, c];
      case "Set":
        return [6, c];
    }
    return n.includes("Array") ? [1, n] : n.includes("Error") ? [7, n] : [2, n];
  },
  d = ([e, t]) => 0 === e && ("function" === t || "symbol" === t),
  m = (e, { json: t, lossy: n } = {}) => {
    const r = [];
    return (
      ((e, t, n, r) => {
        const s = (e, t) => {
            const s = r.push(e) - 1;
            return n.set(t, s), s;
          },
          o = (r) => {
            if (n.has(r)) return n.get(r);
            let [a, i] = p(r);
            switch (a) {
              case 0: {
                let t = r;
                switch (i) {
                  case "bigint":
                    (a = 8), (t = r.toString());
                    break;
                  case "function":
                  case "symbol":
                    if (e) throw new TypeError("unable to serialize " + i);
                    t = null;
                    break;
                  case "undefined":
                    return s([-1], r);
                }
                return s([a, t], r);
              }
              case 1: {
                if (i) return s([i, [...r]], r);
                const e = [],
                  t = s([a, e], r);
                for (const t of r) e.push(o(t));
                return t;
              }
              case 2: {
                if (i)
                  switch (i) {
                    case "BigInt":
                      return s([i, r.toString()], r);
                    case "Boolean":
                    case "Number":
                    case "String":
                      return s([i, r.valueOf()], r);
                  }
                if (t && "toJSON" in r) return o(r.toJSON());
                const n = [],
                  l = s([a, n], r);
                for (const t of f(r))
                  (!e && d(p(r[t]))) || n.push([o(t), o(r[t])]);
                return l;
              }
              case 3:
                return s([a, r.toISOString()], r);
              case 4: {
                const { source: e, flags: t } = r;
                return s([a, { source: e, flags: t }], r);
              }
              case 5: {
                const t = [],
                  n = s([a, t], r);
                for (const [n, s] of r)
                  (e || (!d(p(n)) && !d(p(s)))) && t.push([o(n), o(s)]);
                return n;
              }
              case 6: {
                const t = [],
                  n = s([a, t], r);
                for (const n of r) (!e && d(p(n))) || t.push(o(n));
                return n;
              }
            }
            const { message: l } = r;
            return s([a, { name: i, message: l }], r);
          };
        return o;
      })(
        !(t || n),
        !!t,
        new Map(),
        r
      )(e),
      r
    );
  },
  { parse: h, stringify: y } = JSON,
  g = { json: !0, lossy: !0 };
var w = Object.freeze({
  __proto__: null,
  parse: (e) => l(h(e)),
  stringify: (e) => y(m(e, g)),
});
const _ = "2b7f37dd-0f3c-4afb-a444-c83aed8deab7",
  b = "M" + _,
  v = "T" + _,
  E = "object",
  $ = "function",
  k = "number",
  j = "string",
  A = "undefined",
  S = "symbol";
var P = (e) => ({
  value: new Promise((t) => {
    let n = new Worker(
      "data:application/javascript,onmessage%3D(%7Bdata%3Ab%7D)%3D%3E(Atomics.wait(b%2C0)%2CpostMessage(0))"
    );
    (n.onmessage = t), n.postMessage(e);
  }),
});

/*! (c) Andrea Giammarchi - ISC */ const {
    Int32Array: x,
    Map: M,
    SharedArrayBuffer: R,
    Uint16Array: T,
  } = globalThis,
  { BYTES_PER_ELEMENT: N } = x,
  { BYTES_PER_ELEMENT: O } = T,
  { isArray: W } = Array,
  { notify: I, wait: C, waitAsync: B } = Atomics,
  L = new WeakSet(),
  F = new WeakMap(),
  D = { value: { then: (e) => e() } };
let J = 0;
const H = (
  e,
  {
    parse: t = JSON.parse,
    stringify: n = JSON.stringify,
    transform: r,
    interrupt: s,
  } = JSON
) => {
  if (!F.has(e)) {
    const o = (t, ...n) => e.postMessage({ [_]: n }, { transfer: t }),
      a = typeof s === $ ? s : s?.handler,
      i = s?.delay || 42,
      l = new TextDecoder("utf-16"),
      c = (e, t) =>
        e
          ? (B || P)(t, 0)
          : (a
              ? ((e, t, n) => {
                  for (; "timed-out" === C(e, 0, 0, t); ) n();
                })(t, i, a)
              : C(t, 0),
            D);
    let u = !1;
    F.set(
      e,
      new Proxy(new M(), {
        has: (e, t) => "string" == typeof t && !t.startsWith("_"),
        get: (n, s) =>
          "then" === s
            ? null
            : (...n) => {
                const a = J++;
                let i = new x(new R(2 * N)),
                  f = [];
                L.has(n.at(-1) || f) && L.delete((f = n.pop())),
                  o(f, a, i, s, r ? n.map(r) : n);
                const p = e !== globalThis;
                let d = 0;
                return (
                  u &&
                    p &&
                    (d = setTimeout(
                      console.warn,
                      1e3,
                      `đŸ’€đŸ”’ - Possible deadlock if proxy.${s}(...args) is awaited`
                    )),
                  c(p, i).value.then(() => {
                    clearTimeout(d);
                    const e = i[1];
                    if (!e) return;
                    const n = O * e;
                    return (
                      (i = new x(new R(n + (n % N)))),
                      o([], a, i),
                      c(p, i).value.then(() =>
                        t(l.decode(new T(i.buffer).slice(0, e)))
                      )
                    );
                  })
                );
              },
        set(t, s, o) {
          const a = typeof o;
          if (a !== $) throw new Error(`Unable to assign ${s} as ${a}`);
          if (!t.size) {
            const s = new M();
            e.addEventListener("message", async (e) => {
              const o = e.data?.[_];
              if (W(o)) {
                e.stopImmediatePropagation();
                const [a, i, ...l] = o;
                let c;
                if (l.length) {
                  const [e, o] = l;
                  if (t.has(e)) {
                    u = !0;
                    try {
                      const l = await t.get(e)(...o);
                      if (void 0 !== l) {
                        const e = n(r ? r(l) : l);
                        s.set(a, e), (i[1] = e.length);
                      }
                    } catch (e) {
                      c = e;
                    } finally {
                      u = !1;
                    }
                  } else c = new Error(`Unsupported action: ${e}`);
                  i[0] = 1;
                } else {
                  const e = s.get(a);
                  s.delete(a);
                  for (let t = new T(i.buffer), n = 0; n < e.length; n++)
                    t[n] = e.charCodeAt(n);
                }
                if ((I(i, 0), c)) throw c;
              }
            });
          }
          return !!t.set(s, o);
        },
      })
    );
  }
  return F.get(e);
};
H.transfer = (...e) => (L.add(e), e);
const U = new FinalizationRegistry(([e, t, n]) => {
    n && console.debug(`Held value ${String(t)} not relevant anymore`), e(t);
  }),
  q = Object.create(null),
  Z = (e, t, { debug: n, return: r, token: s = e } = q) => {
    const o = r || new Proxy(e, q),
      a = [o, [t, e, !!n]];
    return !1 !== s && a.push(s), U.register(...a), o;
  },
  {
    defineProperty: Y,
    getOwnPropertyDescriptor: X,
    getPrototypeOf: z,
    isExtensible: V,
    ownKeys: K,
    preventExtensions: G,
    set: Q,
    setPrototypeOf: ee,
  } = Reflect,
  { assign: te, create: ne } = Object,
  re = z(Int8Array),
  se = "isArray",
  oe = (e, t) => {
    const { get: n, set: r, value: s } = e;
    return n && (e.get = t(n)), r && (e.set = t(r)), s && (e.value = t(s)), e;
  },
  ae = (e, t) => [e, t],
  ie = (e) => (t) => {
    const n = typeof t;
    switch (n) {
      case E:
        if (null == t) return ae("null", t);
        if (t === globalThis) return ae(E, null);
      case $:
        return e(n, t);
      case "boolean":
      case k:
      case j:
      case A:
      case "bigint":
        return ae(n, t);
      case S:
        if (le.has(t)) return ae(n, le.get(t));
    }
    throw new Error(`Unable to handle this ${n} type`);
  },
  le = new Map(
    K(Symbol)
      .filter((e) => typeof Symbol[e] === S)
      .map((e) => [Symbol[e], e])
  ),
  ce = (e) => {
    for (const [t, n] of le) if (n === e) return t;
  },
  ue = (e) => e;
function fe() {
  return this;
}
const pe = "apply",
  de = "construct",
  me = "defineProperty",
  he = "deleteProperty",
  ye = "get",
  ge = "getOwnPropertyDescriptor",
  we = "getPrototypeOf",
  _e = "has",
  be = "isExtensible",
  ve = "ownKeys",
  Ee = "preventExtensions",
  $e = "set",
  ke = "setPrototypeOf",
  je = "delete";
var Ae = ((e, t) => {
    const n = t && new WeakMap();
    if (t) {
      const { addEventListener: e } = EventTarget.prototype;
      Y(EventTarget.prototype, "addEventListener", {
        value(t, r, ...s) {
          return (
            s.at(0)?.invoke &&
              (n.has(this) || n.set(this, new Map()),
              n.get(this).set(t, [].concat(s[0].invoke)),
              delete s[0].invoke),
            e.call(this, t, r, ...s)
          );
        },
      });
    }
    const r =
      t &&
      ((e) => {
        const { currentTarget: t, target: r, type: s } = e;
        for (const o of n.get(t || r)?.get(s) || []) e[o]();
      });
    return function (n, s, o, ...a) {
      let i = 0,
        l = this?.transform || ue;
      const c = new Map(),
        u = new Map(),
        { [o]: f } = n,
        p = a.length ? te(ne(globalThis), ...a) : globalThis,
        d = ie((e, t) => {
          if (!c.has(t)) {
            let n;
            for (; u.has((n = i++)); );
            c.set(t, n), u.set(n, e === E ? l(t) : t);
          }
          return ae(e, c.get(t));
        }),
        m = (e) => {
          f(je, ae(j, e));
        },
        h = ([e, n]) => {
          switch (e) {
            case E:
              if (null == n) return p;
              if (typeof n === k) return u.get(n);
              if (!(n instanceof re)) for (const e in n) n[e] = h(n[e]);
              return n;
            case $:
              if (typeof n === j) {
                if (!u.has(n)) {
                  const e = function (...e) {
                    return (
                      t && e.at(0) instanceof Event && r(...e),
                      f(pe, ae($, n), d(this), e.map(d))
                    );
                  };
                  return (
                    u.set(n, new WeakRef(e)), Z(n, m, { return: e, token: !1 })
                  );
                }
                return u.get(n).deref();
              }
              return u.get(n);
            case S:
              return ce(n);
          }
          return n;
        },
        y = {
          [pe]: (e, t, n) => d(e.apply(t, n)),
          [de]: (e, t) => d(new e(...t)),
          [me]: (e, t, n) => d(Y(e, t, n)),
          [he]: (e, t) => d(delete e[t]),
          [we]: (e) => d(z(e)),
          [ye]: (e, t) => d(e[t]),
          [ge]: (e, t) => {
            const n = X(e, t);
            return n ? ae(E, oe(n, d)) : ae(A, n);
          },
          [_e]: (e, t) => d(t in e),
          [be]: (e) => d(V(e)),
          [ve]: (e) => ae(E, K(e).map(d)),
          [Ee]: (e) => d(G(e)),
          [$e]: (e, t, n) => d(Q(e, t, n)),
          [ke]: (e, t) => d(ee(e, t)),
          [je](e) {
            c.delete(u.get(e)), u.delete(e);
          },
        };
      return (
        (n[s] = (e, t, ...n) => {
          switch (e) {
            case pe:
              (n[0] = h(n[0])), (n[1] = n[1].map(h));
              break;
            case de:
              n[0] = n[0].map(h);
              break;
            case me: {
              const [e, t] = n;
              n[0] = h(e);
              const { get: r, set: s, value: o } = t;
              r && (t.get = h(r)), s && (t.set = h(s)), o && (t.value = h(o));
              break;
            }
            default:
              n = n.map(h);
          }
          return y[e](h(t), ...n);
        }),
        { proxy: n, [e.toLowerCase()]: p, [`is${e}Proxy`]: () => !1 }
      );
    };
  })("Window", !0),
  Se = ((e) => {
    let t = 0;
    const n = new Map(),
      r = new Map(),
      s = Symbol(),
      o = (e) => (typeof e === $ ? e() : e),
      a = (e) => typeof e === E && !!e && s in e,
      i = Array[se];
    return function (l, c, u) {
      const f = this?.transform || ue,
        { [c]: p } = l,
        d = new Map(),
        m = (e) => {
          d.delete(e), p(je, h(e));
        },
        h = ie((e, a) => {
          if (s in a) return o(a[s]);
          if (e === $) {
            if (((a = f(a)), !r.has(a))) {
              let e;
              for (; r.has((e = String(t++))); );
              n.set(a, e), r.set(e, a);
            }
            return ae(e, n.get(a));
          }
          if (!(a instanceof re)) {
            e === E && (a = f(a));
            for (const e in a) a[e] = h(a[e]);
          }
          return ae(e, a);
        }),
        y = (e) => {
          const [t, n] = e;
          if (!d.has(n)) {
            const r = t === $ ? fe.bind(e) : e,
              s = new Proxy(r, _);
            return d.set(n, new WeakRef(s)), Z(n, m, { return: s, token: !1 });
          }
          return d.get(n).deref();
        },
        g = (e) => {
          const [t, n] = e;
          switch (t) {
            case E:
              return null === n ? globalThis : typeof n === k ? y(e) : n;
            case $:
              return typeof n === j ? r.get(n) : y(e);
            case S:
              return ce(n);
          }
          return n;
        },
        w = (e, t, ...n) => g(p(e, o(t), ...n)),
        _ = {
          [pe]: (e, t, n) => w(pe, e, h(t), n.map(h)),
          [de]: (e, t) => w(de, e, t.map(h)),
          [me]: (e, t, n) => {
            const { get: r, set: s, value: o } = n;
            return (
              typeof r === $ && (n.get = h(r)),
              typeof s === $ && (n.set = h(s)),
              typeof o === $ && (n.value = h(o)),
              w(me, e, h(t), n)
            );
          },
          [he]: (e, t) => w(he, e, h(t)),
          [we]: (e) => w(we, e),
          [ye]: (e, t) => (t === s ? e : w(ye, e, h(t))),
          [ge]: (e, t) => {
            const n = w(ge, e, h(t));
            return n && oe(n, g);
          },
          [_e]: (e, t) => t === s || w(_e, e, h(t)),
          [be]: (e) => w(be, e),
          [ve]: (e) => w(ve, e).map(g),
          [Ee]: (e) => w(Ee, e),
          [$e]: (e, t, n) => w($e, e, h(t), h(n)),
          [ke]: (e, t) => w(ke, e, h(t)),
        };
      l[u] = (e, t, s, o) => {
        switch (e) {
          case pe:
            return g(t).apply(g(s), o.map(g));
          case je: {
            const e = g(t);
            n.delete(r.get(e)), r.delete(e);
          }
        }
      };
      const b = new Proxy([E, null], _),
        v = b.Array[se];
      return (
        Y(Array, se, { value: (e) => (a(e) ? v(e) : i(e)) }),
        { [e.toLowerCase()]: b, [`is${e}Proxy`]: a, proxy: l }
      );
    };
  })("Window"),
  Pe = typeof Worker === $ ? Worker : class {};
const xe = new WeakMap(),
  Me = (e, ...t) => {
    const n = H(e, ...t);
    if (!xe.has(n)) {
      const r = e instanceof Pe ? Ae : Se;
      xe.set(n, r.call(t.at(0), n, b, v));
    }
    return xe.get(n);
  };
Me.transfer = H.transfer;
const Re = {
    object(...e) {
      return this.string(
        (function (e) {
          for (var t = e[0], n = 1, r = arguments.length; n < r; n++)
            t += arguments[n] + e[n];
          return t;
        })(...e)
      );
    },
    string(e) {
      for (const t of e.split(/[\r\n]+/))
        if (t.trim().length) {
          /^(\s+)/.test(t) &&
            (e = e.replace(new RegExp("^" + RegExp.$1, "gm"), ""));
          break;
        }
      return e;
    },
  },
  { replace: Te } = "",
  Ne = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,
  Oe = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
  },
  We = (e) => Oe[e],
  Ie = (e, ...t) => Re[typeof e](e, ...t),
  Ce = (e) => Te.call(e, Ne, We),
  { isArray: Be } = Array,
  {
    assign: Le,
    create: Fe,
    defineProperties: De,
    defineProperty: Je,
    entries: He,
  } = Object,
  { all: Ue, resolve: qe } = new Proxy(Promise, {
    get: (e, t) => e[t].bind(e),
  }),
  Ze = (e, t = location.href) => new URL(e, t.replace(/^blob:/, "")).href;
let Ye = 0;
const Xe = (e, t) => ({ id: e.id || (e.id = `${t}-w${Ye++}`), tag: e.tagName }),
  ze = (e, t, n, r = !1, s = CustomEvent) => {
    e.dispatchEvent(new s(`${t}:${n}`, { bubbles: !0, detail: { worker: r } }));
  },
  Ve = (e, t, n, r) => ({
    type: t,
    config: n,
    interpreter: r,
    io: Ge.get(r),
    run: (t, ...n) => e.run(r, t, ...n),
    runAsync: (t, ...n) => e.runAsync(r, t, ...n),
    runEvent: (...t) => e.runEvent(r, ...t),
  }),
  Ke = (e, t) => (n, r) => {
    const s = e[t].bind(e);
    e[t] = (e, t, ...o) => s(e, `${r ? n : t}\n${r ? t : n}`, ...o);
  },
  Ge = new WeakMap(),
  Qe = (e) => {
    const t = e || console,
      n = {
        stderr: (t.stderr || console.error).bind(t),
        stdout: (t.stdout || console.log).bind(t),
      };
    return {
      stderr: (...e) => n.stderr(...e),
      stdout: (...e) => n.stdout(...e),
      async get(e) {
        const t = await e;
        return Ge.set(t, n), t;
      },
    };
  },
  et = ({ FS: e, PATH: t, PATH_FS: n }, r, s) => {
    const o = n.resolve(r);
    return (
      e.mkdirTree(t.dirname(o)),
      e.writeFile(o, new Uint8Array(s), { canOwn: !0 })
    );
  },
  tt = (e) => {
    const t = e.split("/");
    return t.pop(), t.join("/");
  },
  nt = (e, t) => {
    const n = [];
    for (const r of t.split("/"))
      "." !== r && (n.push(r), r && e.mkdir(n.join("/")));
  },
  rt = (e, t) => {
    const n = [];
    for (const e of t.split("/"))
      switch (e) {
        case "":
        case ".":
          break;
        case "..":
          n.pop();
          break;
        default:
          n.push(e);
      }
    return [e.cwd()].concat(n).join("/").replace(/^\/+/, "/");
  },
  st = (e) => {
    const t = e
      .map((e) => e.trim().replace(/(^[/]*|[/]*$)/g, ""))
      .filter((e) => "" !== e && "." !== e)
      .join("/");
    return e[0].startsWith("/") ? `/${t}` : t;
  },
  ot = (e, t) => fetch(Ze(t, at.get(e))),
  at = new WeakMap(),
  it = (e, n, r) =>
    Ue(
      ((e) => {
        for (const { files: t, to_file: n, from: r = "" } of e) {
          if (void 0 !== t && void 0 !== n)
            throw new Error(
              "Cannot use 'to_file' and 'files' parameters together!"
            );
          if (void 0 === t && void 0 === n && r.endsWith("/"))
            throw new Error(
              `Couldn't determine the filename from the path ${r}, please supply 'to_file' parameter.`
            );
        }
        return e.flatMap(
          ({ from: e = "", to_folder: t = ".", to_file: n, files: r }) => {
            if (Be(r))
              return r.map((n) => ({ url: st([e, n]), path: st([t, n]) }));
            const s = n || e.slice(1 + e.lastIndexOf("/"));
            return [{ url: e, path: st([t, s]) }];
          }
        );
      })(r).map(({ url: s, path: o }) =>
        ot(r, s)
          .then(t)
          .then((t) => e.writeFile(n, o, t))
      )
    ),
  lt = (e, t) => (t.endsWith("/") ? `${t}${e.split("/").pop()}` : t),
  ct = (e, t) =>
    e.replace(/\{.+?\}/g, (e) => {
      if (!t.has(e)) throw new SyntaxError(`Invalid template: ${e}`);
      return t.get(e);
    }),
  ut = (e, n, r) =>
    Ue(
      ((e) => {
        const t = new Map(),
          n = new Set(),
          r = [];
        for (const [s, o] of Object.entries(e))
          if (/^\{.+\}$/.test(s)) {
            if (t.has(s)) throw new SyntaxError(`Duplicated template: ${s}`);
            t.set(s, ct(o, t));
          } else {
            const e = ct(s, t),
              a = lt(e, ct(o || "./", t));
            if (n.has(a)) throw new SyntaxError(`Duplicated destination: ${a}`);
            n.add(a), r.push({ url: e, path: a });
          }
        return r;
      })(r).map(({ url: s, path: o }) =>
        ot(r, s)
          .then(t)
          .then((t) => e.writeFile(n, o, t))
      )
    ),
  ft = (e, t, n) => {
    e.registerJsModule(t, n);
  },
  pt = (e, t, ...n) => {
    try {
      return e.runPython(Ie(t), ...n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  },
  dt = async (e, t, ...n) => {
    try {
      return await e.runPythonAsync(Ie(t), ...n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  },
  mt = async (e, t, n) => {
    const [r, ...s] = t.split(".");
    let o,
      a = e.globals.get(r);
    for (const e of s) [o, a] = [a, a[e]];
    try {
      await a.call(o, n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  };
var ht = {
  type: "micropython",
  module: (e = "1.20.0-297") =>
    `https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,
  async engine({ loadMicroPython: e }, t, n) {
    const { stderr: r, stdout: s, get: o } = Qe();
    n = n.replace(/\.m?js$/, ".wasm");
    const a = await o(e({ stderr: r, stdout: s, url: n }));
    return (
      t.files && (await ut(this, a, t.files)),
      t.fetch && (await it(this, a, t.fetch)),
      a
    );
  },
  registerJSModule: ft,
  run: pt,
  runAsync: dt,
  runEvent: mt,
  transform: (e, t) => t,
  writeFile: ({ FS: e, _module: { PATH: t, PATH_FS: n } }, r, s) =>
    et({ FS: e, PATH: t, PATH_FS: n }, r, s),
};
const yt = { dict_converter: Object.fromEntries };
var gt = {
  type: "pyodide",
  module: (e = "0.24.1") =>
    `https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`,
  async engine({ loadPyodide: e }, t, n) {
    const { stderr: r, stdout: s, get: o } = Qe(),
      a = n.slice(0, n.lastIndexOf("/")),
      i = await o(e({ stderr: r, stdout: s, indexURL: a }));
    if (
      (t.files && (await ut(this, i, t.files)),
      t.fetch && (await it(this, i, t.fetch)),
      t.packages)
    ) {
      await i.loadPackage("micropip");
      const e = await i.pyimport("micropip");
      await e.install(t.packages, { keep_going: !0 }), e.destroy();
    }
    return i;
  },
  registerJSModule: ft,
  run: pt,
  runAsync: dt,
  runEvent: mt,
  transform: (e, t) => (t instanceof e.ffi.PyProxy ? t.toJs(yt) : t),
  writeFile: ({ FS: e, PATH: t, _module: { PATH_FS: n } }, r, s) =>
    et({ FS: e, PATH: t, PATH_FS: n }, r, s),
};
const wt = "ruby-wasm-wasi",
  _t = wt.replace(/\W+/g, "_");
var bt = {
  type: wt,
  experimental: !0,
  module: (e = "2.1.0") =>
    `https://cdn.jsdelivr.net/npm/ruby-3_2-wasm-wasi@${e}/dist/browser.esm.js`,
  async engine({ DefaultRubyVM: e }, t, n) {
    const r = await fetch(`${n.slice(0, n.lastIndexOf("/"))}/ruby.wasm`),
      s = await WebAssembly.compile(await r.arrayBuffer()),
      { vm: o } = await e(s);
    return (
      t.files && (await ut(this, o, t.files)),
      t.fetch && (await it(this, o, t.fetch)),
      o
    );
  },
  registerJSModule(e, t, n) {
    const r = `__module_${_t}_${t}`;
    (globalThis[r] = n),
      this.run(e, `require "js";$${t}=JS.global[:${r}]`),
      delete globalThis[r];
  },
  run: (e, t, ...n) => e.eval(Ie(t), ...n),
  runAsync: (e, t, ...n) => e.evalAsync(Ie(t), ...n),
  async runEvent(e, t, n) {
    if (/^xworker\.(on\w+)$/.test(t)) {
      const { $1: t } = RegExp,
        r = `__module_${_t}_event`;
      (globalThis[r] = n),
        this.run(e, `require "js";$xworker.call("${t}",JS.global[:${r}])`),
        delete globalThis[r];
    } else {
      const r = this.run(e, `method(:${t})`);
      await r.call(t, e.wrap(n));
    }
  },
  transform: (e, t) => t,
  writeFile: () => {
    throw new Error(`writeFile is not supported in ${wt}`);
  },
};
var vt = {
  type: "wasmoon",
  module: (e = "1.15.1") => `https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,
  async engine({ LuaFactory: e, LuaLibraries: t }, n) {
    const { stderr: r, stdout: s, get: o } = Qe(),
      a = await o(new e().createEngine());
    return (
      a.global.getTable(t.Base, (e) => {
        a.global.setField(e, "print", s), a.global.setField(e, "printErr", r);
      }),
      n.files && (await ut(this, a, n.files)),
      n.fetch && (await it(this, a, n.fetch)),
      a
    );
  },
  registerJSModule: (e, t, n) => {
    e.global.set(t, n);
  },
  run: (e, t, ...n) => {
    try {
      return e.doStringSync(Ie(t), ...n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  },
  runAsync: async (e, t, ...n) => {
    try {
      return await e.doString(Ie(t), ...n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  },
  runEvent: async (e, t, n) => {
    const [r, ...s] = t.split(".");
    let o,
      a = e.global.get(r);
    for (const e of s) [o, a] = [a, a[e]];
    try {
      await a.call(o, n);
    } catch (t) {
      Ge.get(e).stderr(t);
    }
  },
  transform: (e, t) => t,
  writeFile: (
    {
      cmodule: {
        module: { FS: e },
      },
    },
    t,
    n
  ) =>
    ((e, t, n) => (
      nt(e, tt(t)),
      (t = rt(e, t)),
      e.writeFile(t, new Uint8Array(n), { canOwn: !0 })
    ))(e, t, n),
};
const Et = new Map(),
  $t = new Map(),
  kt = [],
  jt = [],
  At = new Proxy(new Map(), {
    get(e, t) {
      if (!e.has(t)) {
        const [n, ...r] = t.split("@"),
          s = Et.get(n),
          o = /^(?:\.?\.?\/|https?:\/\/)/i.test(r)
            ? r.join("@")
            : s.module(...r);
        e.set(t, { url: o, module: import(o), engine: s.engine.bind(s) });
      }
      const { url: n, module: r, engine: s } = e.get(t);
      return (e, o) =>
        r.then((r) => {
          $t.set(t, e);
          for (const t of ["files", "fetch"]) {
            const n = e?.[t];
            n && at.set(n, o);
          }
          return s(r, e, n);
        });
    },
  }),
  St = (e) => {
    for (const t of [].concat(e.type))
      Et.set(t, e), kt.push(`script[type="${t}"]`), jt.push(`${t}-`);
  };
for (const e of [ht, gt, bt, vt]) St(e);
const Pt = async (e) =>
    (await import("https://cdn.jsdelivr.net/npm/basic-toml@0.3.1/es.js")).parse(
      e
    ),
  xt = (e) => {
    let t = typeof e;
    return (
      "string" === t && /\.(json|toml|txt)$/.test(e)
        ? (t = RegExp.$1)
        : (e = "./config.txt"),
      [Ze(e), t]
    );
  },
  Mt = (e, t, s = {}) => {
    if (t) {
      const [e, o] = xt(t);
      if ("json" === o) s = fetch(e).then(n);
      else if ("toml" === o) s = fetch(e).then(r).then(Pt);
      else if ("string" === o)
        try {
          s = JSON.parse(t);
        } catch (e) {
          s = Pt(t);
        }
      else "object" === o && t && (s = t);
      t = e;
    }
    return qe(s).then((n) => At[e](n, t));
  },
  Rt = (e, t = "") => `${e}@${t}`.replace(/@$/, ""),
  Tt = "BeforeRun",
  Nt = "AfterRun",
  Ot = [`code${Tt}`, `code${Tt}Async`, `code${Nt}`, `code${Nt}Async`],
  Wt = [
    "onWorker",
    "onReady",
    `on${Tt}`,
    `on${Tt}Async`,
    `on${Nt}`,
    `on${Nt}Async`,
  ];
function It(e, t) {
  const { run: n, runAsync: r } = Et.get(this.type);
  return { ...e, run: n.bind(this, t), runAsync: r.bind(this, t) };
}
const Ct = (e, t, n, r, s, o) => {
  if (s || o) {
    const a = It.bind(e, t),
      i = r ? "runAsync" : "run",
      l = e[i];
    e[i] = r
      ? async function (e, t, ...r) {
          s && (await s.call(this, a(e), n));
          const i = await l.call(this, e, t, ...r);
          return o && (await o.call(this, a(e), n)), i;
        }
      : function (e, t, ...r) {
          s && s.call(this, a(e), n);
          const i = l.call(this, e, t, ...r);
          return o && o.call(this, a(e), n), i;
        };
  }
};
let Bt = class {
  constructor(e, t = {}) {
    const { main: n, worker: r } = t;
    (this.interpreter = e), (this.onWorker = n?.onWorker);
    for (const e of Wt.slice(1)) this[e] = r?.[e];
    for (const e of Ot) this[e] = r?.[e];
  }
  toJSON() {
    const e = {};
    for (const t of Wt.slice(1)) this[t] && (e[t] = String(this[t]));
    for (const t of Ot) this[t] && (e[t] = Ie(this[t]()));
    return e;
  }
};
var Lt = (...e) =>
  function (t, n) {
    const s = new Worker(
        URL.createObjectURL(
          new Blob(
            [
              'const e="object"==typeof self?self:globalThis,t=t=>((t,r)=>{const n=(e,r)=>(t.set(r,e),e),s=o=>{if(t.has(o))return t.get(o);const[a,i]=r[o];switch(a){case 0:case-1:return n(i,o);case 1:{const e=n([],o);for(const t of i)e.push(s(t));return e}case 2:{const e=n({},o);for(const[t,r]of i)e[s(t)]=s(r);return e}case 3:return n(new Date(i),o);case 4:{const{source:e,flags:t}=i;return n(new RegExp(e,t),o)}case 5:{const e=n(new Map,o);for(const[t,r]of i)e.set(s(t),s(r));return e}case 6:{const e=n(new Set,o);for(const t of i)e.add(s(t));return e}case 7:{const{name:t,message:r}=i;return n(new e[t](r),o)}case 8:return n(BigInt(i),o);case"BigInt":return n(Object(BigInt(i)),o)}return n(new e[a](i),o)};return s})(new Map,t)(0),r="",{toString:n}={},{keys:s}=Object,o=e=>{const t=typeof e;if("object"!==t||!e)return[0,t];const s=n.call(e).slice(8,-1);switch(s){case"Array":return[1,r];case"Object":return[2,r];case"Date":return[3,r];case"RegExp":return[4,r];case"Map":return[5,r];case"Set":return[6,r]}return s.includes("Array")?[1,s]:s.includes("Error")?[7,s]:[2,s]},a=([e,t])=>0===e&&("function"===t||"symbol"===t),i=(e,{json:t,lossy:r}={})=>{const n=[];return((e,t,r,n)=>{const i=(e,t)=>{const s=n.push(e)-1;return r.set(t,s),s},c=n=>{if(r.has(n))return r.get(n);let[l,u]=o(n);switch(l){case 0:{let t=n;switch(u){case"bigint":l=8,t=n.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+u);t=null;break;case"undefined":return i([-1],n)}return i([l,t],n)}case 1:{if(u)return i([u,[...n]],n);const e=[],t=i([l,e],n);for(const t of n)e.push(c(t));return t}case 2:{if(u)switch(u){case"BigInt":return i([u,n.toString()],n);case"Boolean":case"Number":case"String":return i([u,n.valueOf()],n)}if(t&&"toJSON"in n)return c(n.toJSON());const r=[],f=i([l,r],n);for(const t of s(n))!e&&a(o(n[t]))||r.push([c(t),c(n[t])]);return f}case 3:return i([l,n.toISOString()],n);case 4:{const{source:e,flags:t}=n;return i([l,{source:e,flags:t}],n)}case 5:{const t=[],r=i([l,t],n);for(const[r,s]of n)(e||!a(o(r))&&!a(o(s)))&&t.push([c(r),c(s)]);return r}case 6:{const t=[],r=i([l,t],n);for(const r of n)!e&&a(o(r))||t.push(c(r));return r}}const{message:f}=n;return i([l,{name:u,message:f}],n)};return c})(!(t||r),!!t,new Map,n)(e),n},{parse:c,stringify:l}=JSON,u={json:!0,lossy:!0};var f=Object.freeze({__proto__:null,parse:e=>t(c(e)),stringify:e=>l(i(e,u))});const p="2b7f37dd-0f3c-4afb-a444-c83aed8deab7",d="M"+p,y="T"+p,h="object",g="function",w="number",m="string",b="undefined",v="symbol";var $=e=>({value:new Promise((t=>{let r=new Worker("data:application/javascript,onmessage%3D(%7Bdata%3Ab%7D)%3D%3E(Atomics.wait(b%2C0)%2CpostMessage(0))");r.onmessage=t,r.postMessage(e)}))})\n/*! (c) Andrea Giammarchi - ISC */;const{Int32Array:S,Map:E,SharedArrayBuffer:A,Uint16Array:P}=globalThis,{BYTES_PER_ELEMENT:k}=S,{BYTES_PER_ELEMENT:x}=P,{isArray:M}=Array,{notify:j,wait:T,waitAsync:_}=Atomics,O=new WeakSet,W=new WeakMap,F={value:{then:e=>e()}};let R=0;const B=(e,{parse:t=JSON.parse,stringify:r=JSON.stringify,transform:n,interrupt:s}=JSON)=>{if(!W.has(e)){const o=(t,...r)=>e.postMessage({[p]:r},{transfer:t}),a=typeof s===g?s:s?.handler,i=s?.delay||42,c=new TextDecoder("utf-16"),l=(e,t)=>e?(_||$)(t,0):(a?((e,t,r)=>{for(;"timed-out"===T(e,0,0,t);)r()})(t,i,a):T(t,0),F);let u=!1;W.set(e,new Proxy(new E,{has:(e,t)=>"string"==typeof t&&!t.startsWith("_"),get:(r,s)=>"then"===s?null:(...r)=>{const a=R++;let i=new S(new A(2*k)),f=[];O.has(r.at(-1)||f)&&O.delete(f=r.pop()),o(f,a,i,s,n?r.map(n):r);const p=e!==globalThis;let d=0;return u&&p&&(d=setTimeout(console.warn,1e3,`đŸ’€đŸ”’ - Possible deadlock if proxy.${s}(...args) is awaited`)),l(p,i).value.then((()=>{clearTimeout(d);const e=i[1];if(!e)return;const r=x*e;return i=new S(new A(r+r%k)),o([],a,i),l(p,i).value.then((()=>t(c.decode(new P(i.buffer).slice(0,e)))))}))},set(t,s,o){const a=typeof o;if(a!==g)throw new Error(`Unable to assign ${s} as ${a}`);if(!t.size){const s=new E;e.addEventListener("message",(async e=>{const o=e.data?.[p];if(M(o)){e.stopImmediatePropagation();const[a,i,...c]=o;let l;if(c.length){const[e,o]=c;if(t.has(e)){u=!0;try{const c=await t.get(e)(...o);if(void 0!==c){const e=r(n?n(c):c);s.set(a,e),i[1]=e.length}}catch(e){l=e}finally{u=!1}}else l=new Error(`Unsupported action: ${e}`);i[0]=1}else{const e=s.get(a);s.delete(a);for(let t=new P(i.buffer),r=0;r<e.length;r++)t[r]=e.charCodeAt(r)}if(j(i,0),l)throw l}}))}return!!t.set(s,o)}}))}return W.get(e)};B.transfer=(...e)=>(O.add(e),e);const J=new FinalizationRegistry((([e,t,r])=>{r&&console.debug(`Held value ${String(t)} not relevant anymore`),e(t)})),I=Object.create(null),L=(e,t,{debug:r,return:n,token:s=e}=I)=>{const o=n||new Proxy(e,I),a=[o,[t,e,!!r]];return!1!==s&&a.push(s),J.register(...a),o},{defineProperty:D,getOwnPropertyDescriptor:C,getPrototypeOf:H,isExtensible:N,ownKeys:U,preventExtensions:z,set:q,setPrototypeOf:K}=Reflect,{assign:Y,create:G}=Object,V=H(Int8Array),Q="isArray",X=(e,t)=>{const{get:r,set:n,value:s}=e;return r&&(e.get=t(r)),n&&(e.set=t(n)),s&&(e.value=t(s)),e},Z=(e,t)=>[e,t],ee=e=>t=>{const r=typeof t;switch(r){case h:if(null==t)return Z("null",t);if(t===globalThis)return Z(h,null);case g:return e(r,t);case"boolean":case w:case m:case b:case"bigint":return Z(r,t);case v:if(te.has(t))return Z(r,te.get(t))}throw new Error(`Unable to handle this ${r} type`)},te=new Map(U(Symbol).filter((e=>typeof Symbol[e]===v)).map((e=>[Symbol[e],e]))),re=e=>{for(const[t,r]of te)if(r===e)return t},ne=e=>e;function se(){return this}const oe="apply",ae="construct",ie="defineProperty",ce="deleteProperty",le="get",ue="getOwnPropertyDescriptor",fe="getPrototypeOf",pe="has",de="isExtensible",ye="ownKeys",he="preventExtensions",ge="set",we="setPrototypeOf",me="delete";var be=((e,t)=>{const r=t&&new WeakMap;if(t){const{addEventListener:e}=EventTarget.prototype;D(EventTarget.prototype,"addEventListener",{value(t,n,...s){return s.at(0)?.invoke&&(r.has(this)||r.set(this,new Map),r.get(this).set(t,[].concat(s[0].invoke)),delete s[0].invoke),e.call(this,t,n,...s)}})}const n=t&&(e=>{const{currentTarget:t,target:n,type:s}=e;for(const o of r.get(t||n)?.get(s)||[])e[o]()});return function(r,s,o,...a){let i=0,c=this?.transform||ne;const l=new Map,u=new Map,{[o]:f}=r,p=a.length?Y(G(globalThis),...a):globalThis,d=ee(((e,t)=>{if(!l.has(t)){let r;for(;u.has(r=i++););l.set(t,r),u.set(r,e===h?c(t):t)}return Z(e,l.get(t))})),y=e=>{f(me,Z(m,e))},$=([e,r])=>{switch(e){case h:if(null==r)return p;if(typeof r===w)return u.get(r);if(!(r instanceof V))for(const e in r)r[e]=$(r[e]);return r;case g:if(typeof r===m){if(!u.has(r)){const e=function(...e){return t&&e.at(0)instanceof Event&&n(...e),f(oe,Z(g,r),d(this),e.map(d))};return u.set(r,new WeakRef(e)),L(r,y,{return:e,token:!1})}return u.get(r).deref()}return u.get(r);case v:return re(r)}return r},S={[oe]:(e,t,r)=>d(e.apply(t,r)),[ae]:(e,t)=>d(new e(...t)),[ie]:(e,t,r)=>d(D(e,t,r)),[ce]:(e,t)=>d(delete e[t]),[fe]:e=>d(H(e)),[le]:(e,t)=>d(e[t]),[ue]:(e,t)=>{const r=C(e,t);return r?Z(h,X(r,d)):Z(b,r)},[pe]:(e,t)=>d(t in e),[de]:e=>d(N(e)),[ye]:e=>Z(h,U(e).map(d)),[he]:e=>d(z(e)),[ge]:(e,t,r)=>d(q(e,t,r)),[we]:(e,t)=>d(K(e,t)),[me](e){l.delete(u.get(e)),u.delete(e)}};return r[s]=(e,t,...r)=>{switch(e){case oe:r[0]=$(r[0]),r[1]=r[1].map($);break;case ae:r[0]=r[0].map($);break;case ie:{const[e,t]=r;r[0]=$(e);const{get:n,set:s,value:o}=t;n&&(t.get=$(n)),s&&(t.set=$(s)),o&&(t.value=$(o));break}default:r=r.map($)}return S[e]($(t),...r)},{proxy:r,[e.toLowerCase()]:p,[`is${e}Proxy`]:()=>!1}}})("Window",!0),ve=(e=>{let t=0;const r=new Map,n=new Map,s=Symbol(),o=e=>typeof e===g?e():e,a=e=>typeof e===h&&!!e&&s in e,i=Array[Q];return function(c,l,u){const f=this?.transform||ne,{[l]:p}=c,d=new Map,y=e=>{d.delete(e),p(me,b(e))},b=ee(((e,a)=>{if(s in a)return o(a[s]);if(e===g){if(a=f(a),!n.has(a)){let e;for(;n.has(e=String(t++)););r.set(a,e),n.set(e,a)}return Z(e,r.get(a))}if(!(a instanceof V)){e===h&&(a=f(a));for(const e in a)a[e]=b(a[e])}return Z(e,a)})),$=e=>{const[t,r]=e;if(!d.has(r)){const n=t===g?se.bind(e):e,s=new Proxy(n,A);return d.set(r,new WeakRef(s)),L(r,y,{return:s,token:!1})}return d.get(r).deref()},S=e=>{const[t,r]=e;switch(t){case h:return null===r?globalThis:typeof r===w?$(e):r;case g:return typeof r===m?n.get(r):$(e);case v:return re(r)}return r},E=(e,t,...r)=>S(p(e,o(t),...r)),A={[oe]:(e,t,r)=>E(oe,e,b(t),r.map(b)),[ae]:(e,t)=>E(ae,e,t.map(b)),[ie]:(e,t,r)=>{const{get:n,set:s,value:o}=r;return typeof n===g&&(r.get=b(n)),typeof s===g&&(r.set=b(s)),typeof o===g&&(r.value=b(o)),E(ie,e,b(t),r)},[ce]:(e,t)=>E(ce,e,b(t)),[fe]:e=>E(fe,e),[le]:(e,t)=>t===s?e:E(le,e,b(t)),[ue]:(e,t)=>{const r=E(ue,e,b(t));return r&&X(r,S)},[pe]:(e,t)=>t===s||E(pe,e,b(t)),[de]:e=>E(de,e),[ye]:e=>E(ye,e).map(S),[he]:e=>E(he,e),[ge]:(e,t,r)=>E(ge,e,b(t),b(r)),[we]:(e,t)=>E(we,e,b(t))};c[u]=(e,t,s,o)=>{switch(e){case oe:return S(t).apply(S(s),o.map(S));case me:{const e=S(t);r.delete(n.get(e)),n.delete(e)}}};const P=new Proxy([h,null],A),k=P.Array[Q];return D(Array,Q,{value:e=>a(e)?k(e):i(e)}),{[e.toLowerCase()]:P,[`is${e}Proxy`]:a,proxy:c}}})("Window"),$e=typeof Worker===g?Worker:class{};const Se=new WeakMap,Ee=(e,...t)=>{const r=B(e,...t);if(!Se.has(r)){const n=e instanceof $e?be:ve;Se.set(r,n.call(t.at(0),r,d,y))}return Se.get(r)};Ee.transfer=B.transfer;const Ae={object(...e){return this.string(function(e){for(var t=e[0],r=1,n=arguments.length;r<n;r++)t+=arguments[r]+e[r];return t}(...e))},string(e){for(const t of e.split(/[\\r\\n]+/))if(t.trim().length){/^(\\s+)/.test(t)&&(e=e.replace(new RegExp("^"+RegExp.$1,"gm"),""));break}return e}};Promise.withResolvers||(Promise.withResolvers=function(){var e,t,r=new this((function(r,n){e=r,t=n}));return{resolve:e,reject:t,promise:r}});const Pe=e=>e.arrayBuffer(),ke=e=>e.json(),xe=e=>e.text(),Me=new WeakMap,je=e=>{const t=e||console,r={stderr:(t.stderr||console.error).bind(t),stdout:(t.stdout||console.log).bind(t)};return{stderr:(...e)=>r.stderr(...e),stdout:(...e)=>r.stdout(...e),async get(e){const t=await e;return Me.set(t,r),t}}},Te=({FS:e,PATH:t,PATH_FS:r},n,s)=>{const o=r.resolve(n);return e.mkdirTree(t.dirname(o)),e.writeFile(o,new Uint8Array(s),{canOwn:!0})},_e=e=>{const t=e.split("/");return t.pop(),t.join("/")},Oe=(e,t)=>{const r=[];for(const n of t.split("/"))"."!==n&&(r.push(n),n&&e.mkdir(r.join("/")))},We=(e,t)=>{const r=[];for(const e of t.split("/"))switch(e){case"":case".":break;case"..":r.pop();break;default:r.push(e)}return[e.cwd()].concat(r).join("/").replace(/^\\/+/,"/")},Fe=e=>{const t=e.map((e=>e.trim().replace(/(^[/]*|[/]*$)/g,""))).filter((e=>""!==e&&"."!==e)).join("/");return e[0].startsWith("/")?`/${t}`:t},Re=(e,t)=>fetch(Ve(t,Be.get(e))),Be=new WeakMap,Je=(e,t,r)=>Ye((e=>{for(const{files:t,to_file:r,from:n=""}of e){if(void 0!==t&&void 0!==r)throw new Error("Cannot use \'to_file\' and \'files\' parameters together!");if(void 0===t&&void 0===r&&n.endsWith("/"))throw new Error(`Couldn\'t determine the filename from the path ${n}, please supply \'to_file\' parameter.`)}return e.flatMap((({from:e="",to_folder:t=".",to_file:r,files:n})=>{if(He(n))return n.map((r=>({url:Fe([e,r]),path:Fe([t,r])})));const s=r||e.slice(1+e.lastIndexOf("/"));return[{url:e,path:Fe([t,s])}]}))})(r).map((({url:n,path:s})=>Re(r,n).then(Pe).then((r=>e.writeFile(t,s,r)))))),Ie=(e,t)=>t.endsWith("/")?`${t}${e.split("/").pop()}`:t,Le=(e,t)=>e.replace(/\\{.+?\\}/g,(e=>{if(!t.has(e))throw new SyntaxError(`Invalid template: ${e}`);return t.get(e)})),De=(e,t,r)=>Ye((e=>{const t=new Map,r=new Set,n=[];for(const[s,o]of Object.entries(e))if(/^\\{.+\\}$/.test(s)){if(t.has(s))throw new SyntaxError(`Duplicated template: ${s}`);t.set(s,Le(o,t))}else{const e=Le(s,t),a=Ie(e,Le(o||"./",t));if(r.has(a))throw new SyntaxError(`Duplicated destination: ${a}`);r.add(a),n.push({url:e,path:a})}return n})(r).map((({url:n,path:s})=>Re(r,n).then(Pe).then((r=>e.writeFile(t,s,r)))))),Ce=(e,...t)=>Ae[typeof e](e,...t),{isArray:He}=Array,{assign:Ne,create:Ue,defineProperties:ze,defineProperty:qe,entries:Ke}=Object,{all:Ye,resolve:Ge}=new Proxy(Promise,{get:(e,t)=>e[t].bind(e)}),Ve=(e,t=location.href)=>new URL(e,t.replace(/^blob:/,"")).href,Qe=(e,t,r,n=!1,s=CustomEvent)=>{e.dispatchEvent(new s(`${t}:${r}`,{bubbles:!0,detail:{worker:n}}))},Xe=e=>Function(`\'use strict\';return (${e})`)(),Ze=(e,t,r)=>{e.registerJsModule(t,r)},et=(e,t,...r)=>{try{return e.runPython(Ce(t),...r)}catch(t){Me.get(e).stderr(t)}},tt=async(e,t,...r)=>{try{return await e.runPythonAsync(Ce(t),...r)}catch(t){Me.get(e).stderr(t)}},rt=async(e,t,r)=>{const[n,...s]=t.split(".");let o,a=e.globals.get(n);for(const e of s)[o,a]=[a,a[e]];try{await a.call(o,r)}catch(t){Me.get(e).stderr(t)}};var nt={type:"micropython",module:(e="1.20.0-297")=>`https://cdn.jsdelivr.net/npm/@micropython/micropython-webassembly-pyscript@${e}/micropython.mjs`,async engine({loadMicroPython:e},t,r){const{stderr:n,stdout:s,get:o}=je();r=r.replace(/\\.m?js$/,".wasm");const a=await o(e({stderr:n,stdout:s,url:r}));return t.files&&await De(this,a,t.files),t.fetch&&await Je(this,a,t.fetch),a},registerJSModule:Ze,run:et,runAsync:tt,runEvent:rt,transform:(e,t)=>t,writeFile:({FS:e,_module:{PATH:t,PATH_FS:r}},n,s)=>Te({FS:e,PATH:t,PATH_FS:r},n,s)};const st={dict_converter:Object.fromEntries};var ot={type:"pyodide",module:(e="0.24.1")=>`https://cdn.jsdelivr.net/pyodide/v${e}/full/pyodide.mjs`,async engine({loadPyodide:e},t,r){const{stderr:n,stdout:s,get:o}=je(),a=r.slice(0,r.lastIndexOf("/")),i=await o(e({stderr:n,stdout:s,indexURL:a}));if(t.files&&await De(this,i,t.files),t.fetch&&await Je(this,i,t.fetch),t.packages){await i.loadPackage("micropip");const e=await i.pyimport("micropip");await e.install(t.packages,{keep_going:!0}),e.destroy()}return i},registerJSModule:Ze,run:et,runAsync:tt,runEvent:rt,transform:(e,t)=>t instanceof e.ffi.PyProxy?t.toJs(st):t,writeFile:({FS:e,PATH:t,_module:{PATH_FS:r}},n,s)=>Te({FS:e,PATH:t,PATH_FS:r},n,s)};const at="ruby-wasm-wasi",it=at.replace(/\\W+/g,"_");var ct={type:at,experimental:!0,module:(e="2.1.0")=>`https://cdn.jsdelivr.net/npm/ruby-3_2-wasm-wasi@${e}/dist/browser.esm.js`,async engine({DefaultRubyVM:e},t,r){const n=await fetch(`${r.slice(0,r.lastIndexOf("/"))}/ruby.wasm`),s=await WebAssembly.compile(await n.arrayBuffer()),{vm:o}=await e(s);return t.files&&await De(this,o,t.files),t.fetch&&await Je(this,o,t.fetch),o},registerJSModule(e,t,r){const n=`__module_${it}_${t}`;globalThis[n]=r,this.run(e,`require "js";$${t}=JS.global[:${n}]`),delete globalThis[n]},run:(e,t,...r)=>e.eval(Ce(t),...r),runAsync:(e,t,...r)=>e.evalAsync(Ce(t),...r),async runEvent(e,t,r){if(/^xworker\\.(on\\w+)$/.test(t)){const{$1:t}=RegExp,n=`__module_${it}_event`;globalThis[n]=r,this.run(e,`require "js";$xworker.call("${t}",JS.global[:${n}])`),delete globalThis[n]}else{const n=this.run(e,`method(:${t})`);await n.call(t,e.wrap(r))}},transform:(e,t)=>t,writeFile:()=>{throw new Error(`writeFile is not supported in ${at}`)}};var lt={type:"wasmoon",module:(e="1.15.1")=>`https://cdn.jsdelivr.net/npm/wasmoon@${e}/+esm`,async engine({LuaFactory:e,LuaLibraries:t},r){const{stderr:n,stdout:s,get:o}=je(),a=await o((new e).createEngine());return a.global.getTable(t.Base,(e=>{a.global.setField(e,"print",s),a.global.setField(e,"printErr",n)})),r.files&&await De(this,a,r.files),r.fetch&&await Je(this,a,r.fetch),a},registerJSModule:(e,t,r)=>{e.global.set(t,r)},run:(e,t,...r)=>{try{return e.doStringSync(Ce(t),...r)}catch(t){Me.get(e).stderr(t)}},runAsync:async(e,t,...r)=>{try{return await e.doString(Ce(t),...r)}catch(t){Me.get(e).stderr(t)}},runEvent:async(e,t,r)=>{const[n,...s]=t.split(".");let o,a=e.global.get(n);for(const e of s)[o,a]=[a,a[e]];try{await a.call(o,r)}catch(t){Me.get(e).stderr(t)}},transform:(e,t)=>t,writeFile:({cmodule:{module:{FS:e}}},t,r)=>((e,t,r)=>(Oe(e,_e(t)),t=We(e,t),e.writeFile(t,new Uint8Array(r),{canOwn:!0})))(e,t,r)};const ut=new Map,ft=new Map,pt=new Proxy(new Map,{get(e,t){if(!e.has(t)){const[r,...n]=t.split("@"),s=ut.get(r),o=/^(?:\\.?\\.?\\/|https?:\\/\\/)/i.test(n)?n.join("@"):s.module(...n);e.set(t,{url:o,module:import(o),engine:s.engine.bind(s)})}const{url:r,module:n,engine:s}=e.get(t);return(e,o)=>n.then((n=>{ft.set(t,e);for(const t of["files","fetch"]){const r=e?.[t];r&&Be.set(r,o)}return s(n,e,r)}))}}),dt=e=>{for(const t of[].concat(e.type))ut.set(t,e)};for(const e of[nt,ot,ct,lt])dt(e);const yt=async e=>(await import("https://cdn.jsdelivr.net/npm/basic-toml@0.3.1/es.js")).parse(e),ht=(e,t,r={})=>{if(t){const[e,n]=(e=>{let t=typeof e;return"string"===t&&/\\.(json|toml|txt)$/.test(e)?t=RegExp.$1:e="./config.txt",[Ve(e),t]})(t);if("json"===n)r=fetch(e).then(ke);else if("toml"===n)r=fetch(e).then(xe).then(yt);else if("string"===n)try{r=JSON.parse(t)}catch(e){r=yt(t)}else"object"===n&&t&&(r=t);t=e}return Ge(r).then((r=>pt[e](r,t)))},gt="BeforeRun",wt="AfterRun",mt=[`code${gt}`,`code${gt}Async`,`code${wt}`,`code${wt}Async`],bt=["onWorker","onReady",`on${gt}`,`on${gt}Async`,`on${wt}`,`on${wt}Async`];function vt(e,t){const{run:r,runAsync:n}=ut.get(this.type);return{...e,run:r.bind(this,t),runAsync:n.bind(this,t)}}const $t=(e,t,r,n,s,o)=>{if(s||o){const a=vt.bind(e,t),i=n?"runAsync":"run",c=e[i];e[i]=n?async function(e,t,...n){s&&await s.call(this,a(e),r);const i=await c.call(this,e,t,...n);return o&&await o.call(this,a(e),r),i}:function(e,t,...n){s&&s.call(this,a(e),r);const i=c.call(this,e,t,...n);return o&&o.call(this,a(e),r),i}}};try{new SharedArrayBuffer(4)}catch(e){throw new Error(["Unable to use SharedArrayBuffer due insecure environment.","Please read requirements in MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements"].join("\\n"))}let St,Et,At;const Pt=(e,t)=>{addEventListener(e,t||(async t=>{try{await St,Et(`xworker.on${e}`,t)}catch(e){postMessage(e)}}),!!t&&{once:!0})},{parse:kt,stringify:xt}=f,{proxy:Mt,window:jt,isWindowProxy:Tt}=Ee(self,{parse:kt,stringify:xt,transform:e=>At?At(e):e}),_t={sync:Mt,window:jt,isWindowProxy:Tt,onmessage:console.info,onerror:console.error,onmessageerror:console.warn,postMessage:postMessage.bind(self)};Pt("message",(({data:{options:e,config:t,code:r,hooks:n}})=>{St=(async()=>{try{const{id:s,tag:o,type:a,custom:i,version:c,config:l,async:u}=e,f=await ht(((e,t="")=>`${e}@${t}`.replace(/@$/,""))(a,c),t,l),p=Ue(ut.get(a)),d=((e,t,r,n)=>({type:t,config:r,interpreter:n,io:Me.get(n),run:(t,...r)=>e.run(n,t,...r),runAsync:(t,...r)=>e.runAsync(n,t,...r),runEvent:(...t)=>e.runEvent(n,...t)}))(p,i||a,l,f);let y="run";if(u&&(y+="Async"),n){const e=((e,t)=>(r,n)=>{const s=e[t].bind(e);e[t]=(e,t,...o)=>s(e,`${n?r:t}\\n${n?t:r}`,...o)})(p,y);let t,r,s="",o="";for(const e of mt){const t=n[e];if(t){const r=e.endsWith("Async");(r&&u||!r&&!u)&&(e.startsWith("codeBefore")?s=t:o=t)}}o&&e(o,!1),s&&e(s,!0);for(const e of bt.slice(2)){const s=n[e];if(s){const n=e.endsWith("Async");if(n&&u||!n&&!u){const n=Xe(s);e.startsWith("onBefore")?t=n:r=n}}}$t(p,d,_t,u,t,r)}const{CustomEvent:h,document:g}=jt,w=s&&g.getElementById(s)||null,m=e=>Qe(w,i||a,e,!0,h);let b="";return p.registerJSModule(f,"polyscript",{xworker:_t,get target(){return!b&&w&&("SCRIPT"===o?w.after(Ne(g.createElement(`script-${i||a}`),{id:b=`${s}-target`})):(b=s,w.replaceChildren(),w.style.display="block")),b}}),Et=p.runEvent.bind(p,f),At=p.transform.bind(p,f),w&&m("ready"),n?.onReady&&Xe(n?.onReady).call(p,vt.call(p,d,f),_t),await p[y](f,r),w&&m("done"),f}catch(e){postMessage(e)}})(),Pt("error"),Pt("message"),Pt("messageerror")}));\n',
            ],
            { type: "application/javascript" }
          )
        ),
        { type: "module" }
      ),
      { postMessage: o } = s,
      a = this instanceof Bt;
    if (e.length) {
      const [t, r] = e;
      (n = Le({}, n || { type: t, version: r })).type || (n.type = t);
    }
    const [i] = xt(n.config),
      l = fetch(t)
        .then(r)
        .then((e) => {
          const t = a ? this.toJSON() : void 0;
          o.call(s, { options: n, config: i, code: e, hooks: t });
        });
    return (
      De(s, {
        postMessage: { value: (e, ...t) => l.then(() => o.call(s, e, ...t)) },
        sync: { value: Me(s, w).proxy },
        onerror: { writable: !0, configurable: !0, value: console.error },
      }),
      s.addEventListener("message", (e) => {
        const { data: t } = e;
        t instanceof Error &&
          (e.stopImmediatePropagation(),
          s.onerror(Fe(e, { type: { value: "error" }, error: { value: t } })));
      }),
      a && this.onWorker?.(this.interpreter, s),
      s
    );
  };
const Ft = "Invalid content";
var Dt = (e) => {
  const { src: t, worker: n } = e.attributes;
  if (n) {
    let { value: r } = n;
    if (r) throw new SyntaxError("Invalid worker attribute");
    if (((r = t?.value), !r)) {
      if (t) throw new SyntaxError("Invalid worker attribute");
      if (e.childElementCount) {
        const { innerHTML: t, localName: n, type: s } = e,
          o = s || n.replace(/-script$/, "");
        (r = Ce(t)),
          console.warn(
            `Deprecated: use <script type="${o}"> for an always safe content parsing:\n`,
            r
          );
      } else r = e.textContent;
      return URL.createObjectURL(new Blob([Ie(r)], { type: "text/plain" }));
    }
    return r;
  }
  if (
    t &&
    e.textContent
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*(?:\/\/|#).*/gm, "")
      .trim()
  )
    throw new SyntaxError(Ft);
};
const Jt = (e, t) => {
    const n = ((e) => {
      let t = e;
      for (; t.parentNode; ) t = t.parentNode;
      return t;
    })(e);
    return n.getElementById(t) || s(t, n);
  },
  Ht = new WeakMap(),
  Ut = {
    get() {
      let e = Ht.get(this);
      return (
        e ||
          ((e = document.createElement(`${this.type}-script`)),
          Ht.set(this, e),
          zt(this)),
        e
      );
    },
    set(e) {
      "string" == typeof e
        ? Ht.set(this, Jt(this, e))
        : (Ht.set(this, e), zt(this));
    },
  },
  qt = new WeakMap(),
  Zt = new Map(),
  Yt = (e, t) => {
    const n = e?.value;
    return n ? t + n : "";
  },
  Xt = (e, t, n, r, s, o = e) => {
    if (!Zt.has(t)) {
      const a = { interpreter: Mt(n, s), queue: qe(), XWorker: Lt(e, r) };
      Zt.set(t, a), Zt.has(e) || Zt.set(e, a), Zt.has(o) || Zt.set(o, a);
    }
    return Zt.get(t);
  },
  zt = async (e) => {
    if (qt.has(e)) {
      const { target: t } = e;
      t && (e.closest("head") ? document.body.append(t) : e.after(t));
    } else {
      const {
          attributes: { async: t, config: n, env: s, target: o, version: a },
          src: i,
          type: l,
        } = e,
        c = a?.value,
        u = Rt(l, c);
      let f = Yt(n, "|");
      const p = Yt(s, "") || `${u}${f}`;
      f = f.slice(1);
      const d = Dt(e);
      if (d) {
        const n = new (Lt(l, c))(d, { ...Xe(e, l), async: !!t, config: f });
        return void qt.set(Je(e, "xworker", { value: n }), { xworker: n });
      }
      const m = Yt(o, ""),
        h = Xt(l, p, u, c, f);
      qt.set(Je(e, "target", Ut), h), m && Ht.set(e, Jt(e, m));
      const y = i ? fetch(i).then(r) : e.textContent;
      h.queue = h.queue.then(() =>
        (async (e, t, n, r) => {
          const { type: s } = e,
            o = Et.get(s);
          o.experimental &&
            console.warn(`The ${s} interpreter is experimental`);
          const [a, i] = await Ue([qt.get(e).interpreter, t]);
          try {
            Je(document, "currentScript", { configurable: !0, get: () => e }),
              o.registerJSModule(a, "polyscript", { XWorker: n }),
              ze(e, s, "ready");
            const t = o[r ? "runAsync" : "run"](a, i),
              l = ze.bind(null, e, s, "done");
            return r ? t.then(l) : l(), t;
          } finally {
            delete document.currentScript;
          }
        })(e, y, h.XWorker, !!t)
      );
    }
  },
  Vt = new Proxy(Fe(null), {
    get: (e, t) => new Promise(queueMicrotask).then(() => Kt(t)),
  }),
  Kt = async (e) => {
    if (Zt.has(e)) {
      const { interpreter: t, queue: n } = Zt.get(e);
      return (await Ue([t, n]))[0];
    }
    const t = Zt.size
      ? `Available interpreters are: ${[...Zt.keys()]
          .map((e) => `"${e}"`)
          .join(", ")}.`
      : "There are no interpreters in this page.";
    throw new Error(`The interpreter "${e}" was not found. ${t}`);
  },
  Gt = async (e) => {
    const { type: t, currentTarget: n } = e;
    if (jt.length)
      for (let { name: r, value: s, ownerElement: o } of a(
        `./@*[${jt.map((e) => `name()="${e}${t}"`).join(" or ")}]`,
        n
      )) {
        r = r.slice(0, -(t.length + 1));
        const n = await Kt(o.getAttribute(`${r}-env`) || r);
        Et.get(r).runEvent(n, s, e);
      }
  },
  Qt = (e) => {
    if (jt.length)
      for (let { name: t, ownerElement: n } of a(
        `.//@*[${jt.map((e) => `starts-with(name(),"${e}")`).join(" or ")}]`,
        e
      )) {
        const e = t.lastIndexOf("-"),
          r = t.slice(e + 1);
        "env" !== r &&
          (n.addEventListener(r, Gt),
          "disabled" in n &&
            !n.disabled &&
            ((n.disabled = !0),
            Vt[t.slice(0, e)].then(() => {
              n.disabled = !1;
            })));
      }
  },
  en = Lt(),
  tn = [],
  nn = new Map(),
  rn = new Map(),
  sn = (e) => {
    for (const t of tn)
      if (e.matches(t)) {
        const n = nn.get(t),
          r = on.get(n),
          { resolve: s } = rn.get(n),
          { options: o, known: a } = r;
        if (!a.has(e)) {
          a.add(e);
          const {
            interpreter: t,
            config: i,
            version: l,
            env: c,
            onerror: u,
            hooks: f,
          } = o;
          let p;
          try {
            const r = Dt(e);
            if (r) {
              const o = en.call(new Bt(null, f), r, {
                ...Xe(e, n),
                version: l,
                type: t,
                custom: n,
                config: e.getAttribute("config") || i || {},
                async: e.hasAttribute("async"),
              });
              return (
                Je(e, "xworker", { value: o }), void s({ type: n, xworker: o })
              );
            }
          } catch (e) {
            p = e;
          }
          const d = Rt(t, l),
            m = c || `${d}${i ? `|${i}` : ""}`,
            { interpreter: h, XWorker: y } = Xt(n, m, d, l, i, t);
          h.then((o) => {
            const a = Fe(Et.get(t)),
              i = new Bt(o, f),
              l = function (...e) {
                return y.apply(i, e);
              },
              c = { ...Ve(a, n, structuredClone($t.get(d)), o), XWorker: l };
            a.registerJSModule(o, "polyscript", { XWorker: l });
            for (const t of ["Run", "RunAsync"]) {
              const n = Ke(a, `r${t.slice(1)}`);
              let r,
                s,
                o = "",
                i = "";
              for (const e of Ot) {
                const n = f?.main?.[e];
                n &&
                  e.endsWith(t) &&
                  (e.startsWith("codeBefore") ? (o = Ie(n())) : (i = Ie(n())));
              }
              i && n(i, !1), o && n(o, !0);
              for (let e = 2; e < Wt.length; e++) {
                const n = Wt[e],
                  o = f?.main?.[n];
                o &&
                  n.endsWith(t) &&
                  (n.startsWith("onBefore") ? (r = o) : (s = o));
              }
              Ct(a, c, e, t.endsWith("Async"), r, s);
            }
            r.queue = r.queue.then(
              () => (s(c), p && u?.(p, e), f?.main?.onReady?.(c, e))
            );
          });
        }
      }
  },
  on = new Map();
let an = 0;
const ln = (e) => (
    rn.has(e) || rn.set(e, Promise.withResolvers()), rn.get(e).promise
  ),
  [{ define: cn, whenDefined: un, env: fn, Hook: pn, XWorker: dn }, mn] = e(
    "polyscript",
    {
      define: (e, t) => {
        let n = null == e;
        if (n) e = "_ps" + an++;
        else if (Et.has(e) || on.has(e))
          throw new Error(`<script type="${e}"> already registered`);
        if (!Et.has(t?.interpreter)) throw new Error("Unspecified interpreter");
        Et.set(e, Et.get(t.interpreter));
        const r = [`script[type="${e}"]`];
        if ((ln(e), n)) {
          const { hooks: n } = t,
            r = n?.main?.onReady;
          (t = {
            ...t,
            hooks: {
              ...n,
              main: {
                ...n?.main,
                onReady(t, n) {
                  tn.splice(tn.indexOf(e), 1),
                    Et.delete(e),
                    on.delete(e),
                    rn.delete(e),
                    n.remove(),
                    r?.(t);
                },
              },
            },
          }),
            document.head.append(
              Le(document.createElement("script"), { type: e })
            );
        } else r.push(`${e}-script`), jt.push(`${e}-`);
        for (const t of r) nn.set(t, e);
        tn.push(...r),
          on.set(e, {
            options: Le({ env: e }, t),
            known: new WeakSet(),
            queue: Promise.resolve(),
          }),
          n || Qt(document),
          o(r.join(",")).forEach(sn);
      },
      whenDefined: ln,
      env: Vt,
      Hook: Bt,
      XWorker: en,
    }
  );
if (!mn) {
  const e = new MutationObserver((e) => {
      const n = kt.join(",");
      for (const { type: r, target: s, attributeName: o, addedNodes: a } of e)
        if ("attributes" !== r)
          for (const e of a)
            1 === e.nodeType &&
              (Qt(e), n && e.matches(n) ? zt(e) : t(n, e, !0));
        else {
          const e = o.lastIndexOf("-") + 1;
          if (e) {
            const t = o.slice(0, e);
            for (const n of jt)
              if (t === n) {
                const t = o.slice(e);
                if ("env" !== t) {
                  const e = s.hasAttribute(o) ? "add" : "remove";
                  s[`${e}EventListener`](t, Gt);
                }
                break;
              }
          }
        }
    }),
    t = (e, t, n) => {
      e && o(e, t).forEach(zt),
        (e = tn.join(",")) && (n && sn(t), o(e, t).forEach(sn));
    },
    n = (t) => (
      e.observe(t, { childList: !0, subtree: !0, attributes: !0 }), t
    ),
    { attachShadow: r } = Element.prototype;
  Le(Element.prototype, {
    attachShadow(e) {
      return n(r.call(this, e));
    },
  }),
    queueMicrotask(() => {
      Qt(n(document)), t(kt.join(","), document, !1);
    });
}
var hn = new Map([
  ["py", "pyodide"],
  ["mpy", "micropython"],
]);
const yn = [];
for (const [e] of hn) {
  const t = [`script[type="${e}"]`, `${e}-script`];
  for (const n of document.querySelectorAll(t.join(","))) {
    const { promise: t, resolve: r } = Promise.withResolvers();
    yn.push(t), n.addEventListener(`${e}:done`, r, { once: !0 });
  }
}
Promise.all(yn).then(() => {
  dispatchEvent(new Event("py:all-done"));
});
var gn = {
  error: () => import("./error-96hMSEw8.js"),
  "py-terminal": () => import("./py-terminal-XWbSa71s.js"),
};
const wn = "PY0409",
  _n = "PY1000",
  bn = "PY0001",
  vn = "PY0401",
  En = "PY0403",
  $n = "PY0404",
  kn = "PY0500",
  jn = "PY0503";
class An extends Error {
  constructor(e, t = "", n = "text") {
    super(`(${e}): ${t}`),
      (this.errorCode = e),
      (this.messageType = n),
      (this.name = "UserError");
  }
}
class Sn extends An {
  constructor(e, t) {
    super(e, t), (this.name = "FetchError");
  }
}
async function Pn(e, t) {
  let n;
  try {
    n = await fetch(e, t);
  } catch (t) {
    const n = t;
    let r;
    throw (
      ((r = e.startsWith("http")
        ? `Fetching from URL ${e} failed with error '${n.message}'. Are your filename and path correct?`
        : 'Polyscript: Access to local files\n        (using [[fetch]] configurations in &lt;py-config&gt;)\n        is not available when directly opening a HTML file;\n        you must use a webserver to serve the additional files.\n        See <a style="text-decoration: underline;" href="https://github.com/pyscript/pyscript/issues/257#issuecomment-1119595062">this reference</a>\n        on starting a simple webserver with Python.\n            '),
      new Sn(bn, r))
    );
  }
  if (!n.ok) {
    const t = `Fetching from URL ${e} failed with error ${n.status} (${n.statusText}). Are your filename and path correct?`;
    switch (n.status) {
      case 404:
        throw new Sn($n, t);
      case 401:
        throw new Sn(vn, t);
      case 403:
        throw new Sn(En, t);
      case 500:
        throw new Sn(kn, t);
      case 503:
        throw new Sn(jn, t);
      default:
        throw new Sn(bn, t);
    }
  }
  return n;
}
const xn = async (e, t) => {
    let n = e?.trim(),
      s = "",
      o = !1,
      a = /^{/.test(n) && /}$/.test(n);
    if (!a && /\.(\w+)(?:\?\S*)?$/.test(n)) {
      const e = RegExp.$1;
      "json" === e && "toml" !== t
        ? (a = !0)
        : "toml" === e && "json" !== t
        ? (o = !0)
        : ((e, t = "") => {
            let n = `(${_n}): Invalid URL: ${e}`;
            throw (t && (n += `\nexpected ${t} content`), new Error(n));
          })(n, t),
        (s = n),
        (n = (await Pn(s).then(r)).trim());
    }
    return { json: a, toml: o || (!a && !!n), text: n, url: s };
  },
  Mn = (e, t, { message: n }) => {
    let r = `(${_n}): Invalid ${e}`;
    return t && (r += ` @ ${t}`), new SyntaxError(`${r}\n${n}`);
  },
  Rn = new Map();
for (const [e] of hn) {
  let t,
    n,
    r,
    o,
    a,
    i = s(`${e}-config`);
  if (
    (i
      ? ((o = i.getAttribute("src") || i.textContent),
        (a = i.getAttribute("type")))
      : ((i = s(
          [
            `script[type="${e}"][config]:not([worker])`,
            `${e}-script[config]:not([worker])`,
          ].join(",")
        )),
        i && (o = i.getAttribute("config"))),
    o)
  )
    try {
      const { json: e, toml: t, text: s, url: i } = await xn(o, a);
      if (((o = s), e || "json" === a))
        try {
          n = JSON.parse(s);
        } catch (e) {
          r = Mn("JSON", i, e);
        }
      else if (t || "toml" === a)
        try {
          const { parse: e } = await import("./toml--Dzglv4T.js");
          n = e(s);
        } catch (e) {
          r = Mn("TOML", i, e);
        }
    } catch (e) {
      r = e;
    }
  const l = [];
  for (const [e, t] of Object.entries(gn))
    r
      ? "error" === e && t().then(({ notify: e }) => e(r.message))
      : n?.plugins?.includes(`!${e}`) ||
        l.push(t().then(({ default: e }) => e));
  (t = Promise.all(l)), Rn.set(e, { config: n, plugins: t, error: r });
}
var Tn = { sleep: (e) => new Promise((t) => setTimeout(t, 1e3 * e)) };
const Nn = (e) => {
    Je(document, "currentScript", { configurable: !0, get: () => e });
  },
  On = () => {
    delete document.currentScript;
  };
var Wn = async (e, t, n, r) => {
  const s = r.endsWith("Async");
  (r.startsWith("onBefore") ? Nn : On)(n);
  for (const o of e(r)) s ? await o(t, n) : o(t, n);
};
const In = () => !0,
  Cn = (e) => {
    throw new TypeError(e);
  },
  Bn = (e, t) => {
    const n = [];
    if (e)
      for (const t of e.split(/\s*\|\s*/))
        "object" === t
          ? n.push((e) => null !== e && typeof e === t)
          : "null" === t
          ? n.push((e) => null === e)
          : n.push((e) => typeof e === t);
    if (t) for (const e of [].concat(t)) n.push((t) => t instanceof e);
    switch (n.length) {
      case 0:
        return In;
      case 1:
        return n[0];
      default:
        return (e) => n.some((t) => t(e));
    }
  },
  Ln =
    (e, t, n, r = Cn) =>
    (s) => {
      const o = [`Invalid ${typeof s} ${n}: expected `];
      e && (o.push(e), t && o.push(" or ")),
        t &&
          (o.push("an instanceof "),
          o.push(
            []
              .concat(t)
              .map(({ name: e }) => e)
              .join(" | ")
          )),
        r(o.join(""), s);
    },
  Fn = ((e) => (t) => {
    const [n, r] = ((e, t = "value") => {
      const n = e?.typeof,
        r = e?.instanceof;
      return [Bn(n, r), Ln(n, r, t, e?.onerror)];
    })(t);
    return class extends e {
      add(e) {
        return n(e) ? super.add(e) : r(e);
      }
    };
  })(Set);
function Dn(e = this) {
  return String(e).replace(/^(async\s*)?(\bfunction\b)?(.*?)\(/, (e, t, n, r) =>
    r && !n ? `${t || ""}function ${r}(` : e
  );
}
const { entries: Jn } = Object,
  Hn = [
    "import os as _os",
    "from pathlib import Path as _Path",
    "_path = None",
  ],
  Un = (e, t) => {
    for (const [n, r] of Jn(t))
      if ((Hn.push(`_path = _Path("${e}/${n}")`), "string" == typeof r)) {
        const e = JSON.stringify(r);
        Hn.push(`_path.write_text(${e})`);
      } else
        Hn.push(`if not _os.path.exists("${e}/${n}"):`),
          Hn.push("    _path.mkdir(parents=True, exist_ok=True)"),
          Un(`${e}/${n}`, r);
  };
Un(".", {
  pyscript: {
    "__init__.py":
      '# Some notes about the naming conventions and the relationship between various\n# similar-but-different names.\n#\n# import pyscript\n#     this package contains the main user-facing API offered by pyscript. All\n#     the names which are supposed be used by end users should be made\n#     available in pyscript/__init__.py (i.e., this file)\n#\n# import _pyscript\n#     this is an internal module implemented in JS. It is used internally by\n#     the pyscript package, end users should not use it directly. For its\n#     implementation, grep for `interpreter.registerJsModule("_pyscript",\n#     ...)` in core.js\n#\n# import js\n#     this is the JS globalThis, as exported by pyodide and/or micropython\'s\n#     FFIs. As such, it contains different things in the main thread or in a\n#     worker.\n#\n# import pyscript.magic_js\n#     this submodule abstracts away some of the differences between the main\n#     thread and the worker. In particular, it defines `window` and `document`\n#     in such a way that these names work in both cases: in the main thread,\n#     they are the "real" objects, in the worker they are proxies which work\n#     thanks to coincident.\n#\n# from pyscript import window, document\n#     these are just the window and document objects as defined by\n#     pyscript.magic_js. This is the blessed way to access them from pyscript,\n#     as it works transparently in both the main thread and worker cases.\n\nfrom pyscript.display import HTML, display\nfrom pyscript.magic_js import (\n    RUNNING_IN_WORKER,\n    PyWorker,\n    current_target,\n    document,\n    sync,\n    window,\n)\n\ntry:\n    from pyscript.event_handling import when\nexcept:\n    from pyscript.util import NotSupported\n\n    when = NotSupported(\n        "pyscript.when", "pyscript.when currently not available with this interpreter"\n    )\n',
    "display.py":
      'import base64\nimport html\nimport io\nimport re\n\nfrom pyscript.magic_js import current_target, document, window\n\n_MIME_METHODS = {\n    "__repr__": "text/plain",\n    "_repr_html_": "text/html",\n    "_repr_markdown_": "text/markdown",\n    "_repr_svg_": "image/svg+xml",\n    "_repr_pdf_": "application/pdf",\n    "_repr_jpeg_": "image/jpeg",\n    "_repr_png_": "image/png",\n    "_repr_latex": "text/latex",\n    "_repr_json_": "application/json",\n    "_repr_javascript_": "application/javascript",\n    "savefig": "image/png",\n}\n\n\ndef _render_image(mime, value, meta):\n    # If the image value is using bytes we should convert it to base64\n    # otherwise it will return raw bytes and the browser will not be able to\n    # render it.\n    if isinstance(value, bytes):\n        value = base64.b64encode(value).decode("utf-8")\n\n    # This is the pattern of base64 strings\n    base64_pattern = re.compile(\n        r"^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$"\n    )\n    # If value doesn\'t match the base64 pattern we should encode it to base64\n    if len(value) > 0 and not base64_pattern.match(value):\n        value = base64.b64encode(value.encode("utf-8")).decode("utf-8")\n\n    data = f"data:{mime};charset=utf-8;base64,{value}"\n    attrs = " ".join([\'{k}="{v}"\' for k, v in meta.items()])\n    return f\'<img src="{data}" {attrs}></img>\'\n\n\ndef _identity(value, meta):\n    return value\n\n\n_MIME_RENDERERS = {\n    "text/plain": html.escape,\n    "text/html": _identity,\n    "image/png": lambda value, meta: _render_image("image/png", value, meta),\n    "image/jpeg": lambda value, meta: _render_image("image/jpeg", value, meta),\n    "image/svg+xml": _identity,\n    "application/json": _identity,\n    "application/javascript": lambda value, meta: f"<script>{value}<\\\\/script>",\n}\n\n\nclass HTML:\n    """\n    Wrap a string so that display() can render it as plain HTML\n    """\n\n    def __init__(self, html):\n        self._html = html\n\n    def _repr_html_(self):\n        return self._html\n\n\ndef _eval_formatter(obj, print_method):\n    """\n    Evaluates a formatter method.\n    """\n    if print_method == "__repr__":\n        return repr(obj)\n    elif hasattr(obj, print_method):\n        if print_method == "savefig":\n            buf = io.BytesIO()\n            obj.savefig(buf, format="png")\n            buf.seek(0)\n            return base64.b64encode(buf.read()).decode("utf-8")\n        return getattr(obj, print_method)()\n    elif print_method == "_repr_mimebundle_":\n        return {}, {}\n    return None\n\n\ndef _format_mime(obj):\n    """\n    Formats object using _repr_x_ methods.\n    """\n    if isinstance(obj, str):\n        return html.escape(obj), "text/plain"\n\n    mimebundle = _eval_formatter(obj, "_repr_mimebundle_")\n    if isinstance(mimebundle, tuple):\n        format_dict, _ = mimebundle\n    else:\n        format_dict = mimebundle\n\n    output, not_available = None, []\n    for method, mime_type in reversed(_MIME_METHODS.items()):\n        if mime_type in format_dict:\n            output = format_dict[mime_type]\n        else:\n            output = _eval_formatter(obj, method)\n\n        if output is None:\n            continue\n        elif mime_type not in _MIME_RENDERERS:\n            not_available.append(mime_type)\n            continue\n        break\n    if output is None:\n        if not_available:\n            window.console.warn(\n                f"Rendered object requested unavailable MIME renderers: {not_available}"\n            )\n        output = repr(output)\n        mime_type = "text/plain"\n    elif isinstance(output, tuple):\n        output, meta = output\n    else:\n        meta = {}\n    return _MIME_RENDERERS[mime_type](output, meta), mime_type\n\n\ndef _write(element, value, append=False):\n    html, mime_type = _format_mime(value)\n    if html == "\\\\n":\n        return\n\n    if append:\n        out_element = document.createElement("div")\n        element.append(out_element)\n    else:\n        out_element = element.lastElementChild\n        if out_element is None:\n            out_element = element\n\n    if mime_type in ("application/javascript", "text/html"):\n        script_element = document.createRange().createContextualFragment(html)\n        out_element.append(script_element)\n    else:\n        out_element.innerHTML = html\n\n\ndef display(*values, target=None, append=True):\n    if target is None:\n        target = current_target()\n    elif not isinstance(target, str):\n        raise TypeError(f"target must be str or None, not {target.__class__.__name__}")\n    elif target == "":\n        raise ValueError("Cannot have an empty target")\n    elif target.startswith("#"):\n        # note: here target is str and not None!\n        # align with @when behavior\n        target = target[1:]\n\n    element = document.getElementById(target)\n\n    # If target cannot be found on the page, a ValueError is raised\n    if element is None:\n        raise ValueError(\n            f"Invalid selector with id={target}. Cannot be found in the page."\n        )\n\n    # if element is a <script type="py">, it has a \'target\' attribute which\n    # points to the visual element holding the displayed values. In that case,\n    # use that.\n    if element.tagName == "SCRIPT" and hasattr(element, "target"):\n        element = element.target\n\n    for v in values:\n        if not append:\n            element.replaceChildren()\n        _write(element, v, append=append)\n',
    "event_handling.py":
      'import inspect\n\nfrom pyodide.ffi.wrappers import add_event_listener\nfrom pyscript.magic_js import document\n\n\ndef when(event_type=None, selector=None):\n    """\n    Decorates a function and passes py-* events to the decorated function\n    The events might or not be an argument of the decorated function\n    """\n\n    def decorator(func):\n        if isinstance(selector, str):\n            elements = document.querySelectorAll(selector)\n        else:\n            # TODO: This is a hack that will be removed when pyscript becomes a package\n            #       and we can better manage the imports without circular dependencies\n            from pyweb import pydom\n\n            if isinstance(selector, pydom.Element):\n                elements = [selector._js]\n            elif isinstance(selector, pydom.ElementCollection):\n                elements = [el._js for el in selector]\n            else:\n                raise ValueError(\n                    f"Invalid selector: {selector}. Selector must"\n                    " be a string, a pydom.Element or a pydom.ElementCollection."\n                )\n\n        sig = inspect.signature(func)\n        # Function doesn\'t receive events\n        if not sig.parameters:\n\n            def wrapper(*args, **kwargs):\n                func()\n\n            for el in elements:\n                add_event_listener(el, event_type, wrapper)\n        else:\n            for el in elements:\n                add_event_listener(el, event_type, func)\n        return func\n\n    return decorator\n',
    "magic_js.py":
      'import js as globalThis\nfrom pyscript.util import NotSupported\n\nRUNNING_IN_WORKER = not hasattr(globalThis, "document")\n\nif RUNNING_IN_WORKER:\n    import polyscript\n\n    PyWorker = NotSupported(\n        "pyscript.PyWorker",\n        "pyscript.PyWorker works only when running in the main thread",\n    )\n    window = polyscript.xworker.window\n    document = window.document\n    sync = polyscript.xworker.sync\n\n    # in workers the display does not have a default ID\n    # but there is a sync utility from xworker\n    def current_target():\n        return polyscript.target\n\nelse:\n    import _pyscript\n    from _pyscript import PyWorker\n\n    window = globalThis\n    document = globalThis.document\n    sync = NotSupported(\n        "pyscript.sync", "pyscript.sync works only when running in a worker"\n    )\n\n    # in MAIN the current element target exist, just use it\n    def current_target():\n        return _pyscript.target\n',
    "util.py":
      'class NotSupported:\n    """\n    Small helper that raises exceptions if you try to get/set any attribute on\n    it.\n    """\n\n    def __init__(self, name, error):\n        object.__setattr__(self, "name", name)\n        object.__setattr__(self, "error", error)\n\n    def __repr__(self):\n        return f"<NotSupported {self.name} [{self.error}]>"\n\n    def __getattr__(self, attr):\n        raise AttributeError(self.error)\n\n    def __setattr__(self, attr, value):\n        raise AttributeError(self.error)\n\n    def __call__(self, *args):\n        raise TypeError(self.error)\n',
  },
  pyweb: {
    "pydom.py":
      'import sys\nimport warnings\nfrom functools import cached_property\nfrom typing import Any\n\nfrom pyodide.ffi import JsProxy\nfrom pyscript import display, document, window\n\n# from pyscript import when as _when\n\nalert = window.alert\n\n\nclass BaseElement:\n    def __init__(self, js_element):\n        self._js = js_element\n        self._parent = None\n        self.style = StyleProxy(self)\n\n    def __eq__(self, obj):\n        """Check if the element is the same as the other element by comparing\n        the underlying JS element"""\n        return isinstance(obj, BaseElement) and obj._js == self._js\n\n    @property\n    def parent(self):\n        if self._parent:\n            return self._parent\n\n        if self._js.parentElement:\n            self._parent = self.__class__(self._js.parentElement)\n\n        return self._parent\n\n    @property\n    def __class(self):\n        return self.__class__ if self.__class__ != PyDom else Element\n\n    def create(self, type_, is_child=True, classes=None, html=None, label=None):\n        js_el = document.createElement(type_)\n        element = self.__class(js_el)\n\n        if classes:\n            for class_ in classes:\n                element.add_class(class_)\n\n        if html is not None:\n            element.html = html\n\n        if label is not None:\n            element.label = label\n\n        if is_child:\n            self.append(element)\n\n        return element\n\n    def find(self, selector):\n        """Return an ElementCollection representing all the child elements that\n        match the specified selector.\n\n        Args:\n            selector (str): A string containing a selector expression\n\n        Returns:\n            ElementCollection: A collection of elements matching the selector\n        """\n        elements = self._js.querySelectorAll(selector)\n        if not elements:\n            return None\n        return ElementCollection([Element(el) for el in elements])\n\n\nclass Element(BaseElement):\n    @property\n    def children(self):\n        return [self.__class__(el) for el in self._js.children]\n\n    def append(self, child):\n        # TODO: this is Pyodide specific for now!!!!!!\n        # if we get passed a JSProxy Element directly we just map it to the\n        # higher level Python element\n        if isinstance(child, JsProxy):\n            return self.append(Element(child))\n\n        elif isinstance(child, Element):\n            self._js.appendChild(child._js)\n\n            return child\n\n        elif isinstance(child, ElementCollection):\n            for el in child:\n                self.append(el)\n\n    # -------- Pythonic Interface to Element -------- #\n    @property\n    def html(self):\n        return self._js.innerHTML\n\n    @html.setter\n    def html(self, value):\n        self._js.innerHTML = value\n\n    @property\n    def content(self):\n        # TODO: This breaks with with standard template elements. Define how to best\n        #       handle this specifica use case. Just not support for now?\n        if self._js.tagName == "TEMPLATE":\n            warnings.warn(\n                "Content attribute not supported for template elements.", stacklevel=2\n            )\n            return None\n        return self._js.innerHTML\n\n    @content.setter\n    def content(self, value):\n        # TODO: (same comment as above)\n        if self._js.tagName == "TEMPLATE":\n            warnings.warn(\n                "Content attribute not supported for template elements.", stacklevel=2\n            )\n            return\n\n        display(value, target=self.id)\n\n    @property\n    def id(self):\n        return self._js.id\n\n    @id.setter\n    def id(self, value):\n        self._js.id = value\n\n    @property\n    def value(self):\n        return self._js.value\n\n    @value.setter\n    def value(self, value):\n        # in order to avoid confusion to the user, we don\'t allow setting the\n        # value of elements that don\'t have a value attribute\n        if not hasattr(self._js, "value"):\n            raise AttributeError(\n                f"Element {self._js.tagName} has no value attribute. If you want to "\n                "force a value attribute, set it directly using the `_js.value = <value>` "\n                "javascript API attribute instead."\n            )\n        self._js.value = value\n\n    def clone(self, new_id=None):\n        clone = Element(self._js.cloneNode(True))\n        clone.id = new_id\n\n        return clone\n\n    def remove_class(self, classname):\n        classList = self._js.classList\n        if isinstance(classname, list):\n            classList.remove(*classname)\n        else:\n            classList.remove(classname)\n        return self\n\n    def add_class(self, classname):\n        classList = self._js.classList\n        if isinstance(classname, list):\n            classList.add(*classname)\n        else:\n            self._js.classList.add(classname)\n        return self\n\n    @property\n    def classes(self):\n        classes = self._js.classList.values()\n        return [x for x in classes]\n\n    def show_me(self):\n        self._js.scrollIntoView()\n\n    def when(self, event, handler):\n        document.when(event, selector=self)(handler)\n\n\nclass StyleProxy(dict):\n    def __init__(self, element: Element) -> None:\n        self._element = element\n\n    @cached_property\n    def _style(self):\n        return self._element._js.style\n\n    def __getitem__(self, key):\n        return self._style.getPropertyValue(key)\n\n    def __setitem__(self, key, value):\n        self._style.setProperty(key, value)\n\n    def remove(self, key):\n        self._style.removeProperty(key)\n\n    def set(self, **kws):\n        for k, v in kws.items():\n            self._element._js.style.setProperty(k, v)\n\n    # CSS Properties\n    # Reference: https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts#L3799C1-L5005C2\n    # Following prperties automatically generated from the above reference using\n    # tools/codegen_css_proxy.py\n    @property\n    def visible(self):\n        return self._element._js.style.visibility\n\n    @visible.setter\n    def visible(self, value):\n        self._element._js.style.visibility = value\n\n\nclass StyleCollection:\n    def __init__(self, collection: "ElementCollection") -> None:\n        self._collection = collection\n\n    def __get__(self, obj, objtype=None):\n        return obj._get_attribute("style")\n\n    def __getitem__(self, key):\n        return self._collection._get_attribute("style")[key]\n\n    def __setitem__(self, key, value):\n        for element in self._collection._elements:\n            element.style[key] = value\n\n    def remove(self, key):\n        for element in self._collection._elements:\n            element.style.remove(key)\n\n\nclass ElementCollection:\n    def __init__(self, elements: [Element]) -> None:\n        self._elements = elements\n        self.style = StyleCollection(self)\n\n    def __getitem__(self, key):\n        # If it\'s an integer we use it to access the elements in the collection\n        if isinstance(key, int):\n            return self._elements[key]\n        # If it\'s a slice we use it to support slice operations over the elements\n        # in the collection\n        elif isinstance(key, slice):\n            return ElementCollection(self._elements[key])\n\n        # If it\'s anything else (basically a string) we use it as a selector\n        # TODO: Write tests!\n        elements = self._element.querySelectorAll(key)\n        return ElementCollection([Element(el) for el in elements])\n\n    def __len__(self):\n        return len(self._elements)\n\n    def __eq__(self, obj):\n        """Check if the element is the same as the other element by comparing\n        the underlying JS element"""\n        return isinstance(obj, ElementCollection) and obj._elements == self._elements\n\n    def _get_attribute(self, attr, index=None):\n        if index is None:\n            return [getattr(el, attr) for el in self._elements]\n\n        # As JQuery, when getting an attr, only return it for the first element\n        return getattr(self._elements[index], attr)\n\n    def _set_attribute(self, attr, value):\n        for el in self._elements:\n            setattr(el, attr, value)\n\n    @property\n    def html(self):\n        return self._get_attribute("html")\n\n    @html.setter\n    def html(self, value):\n        self._set_attribute("html", value)\n\n    @property\n    def value(self):\n        return self._get_attribute("value")\n\n    @value.setter\n    def value(self, value):\n        self._set_attribute("value", value)\n\n    @property\n    def children(self):\n        return self._elements\n\n    def __iter__(self):\n        yield from self._elements\n\n    def __repr__(self):\n        return f"{self.__class__.__name__} (length: {len(self._elements)}) {self._elements}"\n\n\nclass DomScope:\n    def __getattr__(self, __name: str) -> Any:\n        element = document[f"#{__name}"]\n        if element:\n            return element[0]\n\n\nclass PyDom(BaseElement):\n    # Add objects we want to expose to the DOM namespace since this class instance is being\n    # remapped as "the module" itself\n    BaseElement = BaseElement\n    Element = Element\n    ElementCollection = ElementCollection\n\n    def __init__(self):\n        super().__init__(document)\n        self.ids = DomScope()\n        self.body = Element(document.body)\n        self.head = Element(document.head)\n\n    def create(self, type_, parent=None, classes=None, html=None):\n        return super().create(type_, is_child=False)\n\n    def __getitem__(self, key):\n        if isinstance(key, int):\n            indices = range(*key.indices(len(self.list)))\n            return [self.list[i] for i in indices]\n\n        elements = self._js.querySelectorAll(key)\n        if not elements:\n            return None\n        return ElementCollection([Element(el) for el in elements])\n\n\ndom = PyDom()\n\nsys.modules[__name__] = dom\n',
  },
}),
  Hn.push("del _Path"),
  Hn.push("del _path"),
  Hn.push("del _os"),
  Hn.push("\n");
var qn = Hn.join("\n");
const Zn = (e) => Qn.main[e],
  Yn = (e) => Qn.worker[e],
  Xn = (e, t, n, r) => {
    e[n] = () => {
      const e = r ? [r] : [];
      return e.push(...t(n)), e.map(Ie).join("\n");
    };
  },
  zn = (e) => {
    const t = {};
    return (
      Xn(t, e, "codeBeforeRun", qn),
      Xn(t, e, "codeBeforeRunAsync", qn),
      Xn(t, e, "codeAfterRun"),
      Xn(t, e, "codeAfterRunAsync"),
      t
    );
  },
  Vn = (e, t) => {
    const n = [...Yn(t)];
    if (n.length) {
      const r = Dn(
          e[`_${t}`] ||
            (t.endsWith("Async")
              ? async (e, t, ...n) => {
                  for (const r of n) await r(e, t);
                }
              : (e, t, ...n) => {
                  for (const r of n) r(e, t);
                })
        ),
        s = n.map(Dn).join(", ");
      return Function(`return(w,x)=>(${r})(w,x,...[${s}])`)();
    }
  },
  Kn = Fn({ typeof: "function" }),
  Gn = Fn({ typeof: "string" }),
  Qn = {
    main: {
      onWorker: new Kn(),
      onReady: new Kn(),
      onBeforeRun: new Kn(),
      onBeforeRunAsync: new Kn(),
      onAfterRun: new Kn(),
      onAfterRunAsync: new Kn(),
      codeBeforeRun: new Gn(),
      codeBeforeRunAsync: new Gn(),
      codeAfterRun: new Gn(),
      codeAfterRunAsync: new Gn(),
    },
    worker: {
      onReady: new Kn(),
      onBeforeRun: new Kn(),
      onBeforeRunAsync: new Kn(),
      onAfterRun: new Kn(),
      onAfterRunAsync: new Kn(),
      codeBeforeRun: new Gn(),
      codeBeforeRunAsync: new Gn(),
      codeAfterRun: new Gn(),
      codeAfterRunAsync: new Gn(),
    },
  };

/*! (c) PyScript Development Team */

let er;
const tr = ({ tagName: e }) => "SCRIPT" === e;
let nr = !0;
const rr = ({ XWorker: e, interpreter: t, io: n }) => {
    t.registerJsModule("_pyscript", {
      PyWorker: function (...t) {
        const r = e(...t);
        return (r.onerror = ({ error: e }) => n.stderr(e)), r;
      },
      get target() {
        return tr(er) ? er.target.id : er.id;
      },
    });
  },
  [{ PyWorker: sr, hooks: or, config: ar, whenDefined: ir }, lr] = e(
    "@pyscript/core",
    {
      PyWorker: function (e, t) {
        const n = cr.get("py"),
          r = dn.call(new pn(null, n), e, { type: "pyodide", ...t });
        return Le(r.sync, Tn), r;
      },
      hooks: Qn,
      config: {},
      whenDefined: un,
    }
  ),
  cr = new Map();
for (const [e, t] of hn) {
  if (lr) break;
  const n = (t, n, r) => {
      n ? r.then(() => ze(t, e, "done")) : ze(t, e, "done");
    },
    { config: s, plugins: o, error: a } = Rn.get(e);
  let i = 0;
  const l = (t = e) => `${t}-${i++}`,
    c = async (t, n, s) => {
      if (t.hasAttribute("src"))
        try {
          return await Pn(t.getAttribute("src")).then(r);
        } catch (e) {
          n.stderr(e);
        }
      if (s) return Ie(t.textContent);
      const o = Ie(Ce(t.innerHTML));
      return (
        console.warn(
          `Deprecated: use <script type="${e}"> for an always safe content parsing:\n`,
          o
        ),
        o
      );
    };
  a ||
    o.then(() => {
      const r = new Map(),
        o = {
          main: {
            ...zn(Zn),
            async onReady(t, s) {
              nr && ((nr = !1), rr(t));
              for (const e of Zn("onReady")) await e(t, s);
              if (r.has(s)) {
                let { message: e } = r.get(s);
                r.delete(s);
                const n = e === Ft;
                return (
                  (e = `(${wn}) ${e} for `),
                  (e += s.cloneNode(n).outerHTML),
                  void t.io.stderr(e)
                );
              }
              if (tr(s)) {
                const {
                    attributes: { async: r, target: o },
                  } = s,
                  a = !!o?.value,
                  i = a ? Jt(s, o.value) : document.createElement("script-py");
                if (!a) {
                  const { head: e, body: t } = document;
                  e.contains(s) ? t.append(i) : s.after(i);
                }
                i.id || (i.id = l()),
                  Je(s, "target", { value: i }),
                  ze(s, e, "ready"),
                  n(s, r, t["run" + (r ? "Async" : "")](await c(s, t.io, !0)));
              } else s._wrap.resolve(t);
              console.debug("[pyscript/main] PyScript Ready");
            },
            onWorker(e, t) {
              Le(t.sync, Tn);
              for (const n of Zn("onWorker")) n(e, t);
            },
            onBeforeRun(e, t) {
              (er = t), Wn(Zn, e, t, "onBeforeRun");
            },
            onBeforeRunAsync: (e, t) => (
              (er = t), Wn(Zn, e, t, "onBeforeRunAsync")
            ),
            onAfterRun(e, t) {
              Wn(Zn, e, t, "onAfterRun");
            },
            onAfterRunAsync: (e, t) => Wn(Zn, e, t, "onAfterRunAsync"),
          },
          worker: {
            ...zn(Yn),
            get onReady() {
              return Vn(this, "onReady");
            },
            get onBeforeRun() {
              return Vn(this, "onBeforeRun");
            },
            get onBeforeRunAsync() {
              return Vn(this, "onBeforeRunAsync");
            },
            get onAfterRun() {
              return Vn(this, "onAfterRun");
            },
            get onAfterRunAsync() {
              return Vn(this, "onAfterRunAsync");
            },
          },
        };
      cr.set(e, o),
        cn(e, {
          config: s,
          interpreter: t,
          hooks: o,
          env: `${e}-script`,
          version: s?.interpreter,
          onerror(e, t) {
            r.set(t, e);
          },
        }),
        customElements.define(
          `${e}-script`,
          class extends HTMLElement {
            constructor() {
              Le(super(), {
                _wrap: Promise.withResolvers(),
                srcCode: "",
                executed: !1,
              });
            }
            get id() {
              return super.id || (super.id = l());
            }
            set id(e) {
              super.id = e;
            }
            async connectedCallback() {
              if (!this.executed) {
                this.executed = !0;
                const t = this.hasAttribute("async"),
                  { io: r, run: s, runAsync: o } = await this._wrap.promise;
                (this.srcCode = await c(this, r, !this.childElementCount)),
                  this.replaceChildren(),
                  (this.style.display = "block"),
                  ze(this, e, "ready"),
                  n(this, t, (t ? o : s)(this.srcCode));
              }
            }
          }
        );
    }),
    (ar[e] = structuredClone(s));
}
export {
  sr as PyWorker,
  hn as TYPES,
  ar as config,
  or as hooks,
  ir as whenDefined,
};

//# sourceMappingURL=core.js.map
