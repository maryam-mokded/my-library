function qt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let s = 0; s < r.length; s++)
    n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const P = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Yt = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], ft = () => {
}, Gt = /^on[^a-z]/, Qt = (e) => Gt.test(e), C = Object.assign, Xt = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Zt = Object.prototype.hasOwnProperty, m = (e, t) => Zt.call(e, t), h = Array.isArray, G = (e) => be(e) === "[object Map]", kt = (e) => be(e) === "[object Set]", E = (e) => typeof e == "function", D = (e) => typeof e == "string", Ne = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", en = (e) => (S(e) || E(e)) && E(e.then) && E(e.catch), tn = Object.prototype.toString, be = (e) => tn.call(e), pt = (e) => be(e).slice(8, -1), nn = (e) => be(e) === "[object Object]", Fe = (e) => D(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, sn = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), X = (e, t) => !Object.is(e, t), on = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
};
let Ye;
const Ve = () => Ye || (Ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ae(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], s = D(r) ? un(r) : Ae(r);
      if (s)
        for (const o in s)
          t[o] = s[o];
    }
    return t;
  } else if (D(e) || S(e))
    return e;
}
const cn = /;(?![^(]*\))/g, ln = /:([^]+)/, an = /\/\*[^]*?\*\//g;
function un(e) {
  const t = {};
  return e.replace(an, "").split(cn).forEach((n) => {
    if (n) {
      const r = n.split(ln);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function je(e) {
  let t = "";
  if (D(e))
    t = e;
  else if (h(e))
    for (let n = 0; n < e.length; n++) {
      const r = je(e[n]);
      r && (t += r + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Ge(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let dt;
function fn(e, t = dt) {
  t && t.active && t.effects.push(e);
}
function pn() {
  return dt;
}
const Re = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ht = (e) => (e.w & H) > 0, _t = (e) => (e.n & H) > 0, dn = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, hn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      ht(s) && !_t(s) ? s.delete(e) : t[n++] = s, s.w &= ~H, s.n &= ~H;
    }
    t.length = n;
  }
}, ye = /* @__PURE__ */ new WeakMap();
let ee = 0, H = 1;
const Ie = 30;
let b;
const K = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), De = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class _n {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, fn(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = b, n = U;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = b, b = this, U = !0, H = 1 << ++ee, ee <= Ie ? dn(this) : Qe(this), this.fn();
    } finally {
      ee <= Ie && hn(this), H = 1 << --ee, b = this.parent, U = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    b === this ? this.deferStop = !0 : this.active && (Qe(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Qe(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let U = !0;
const gt = [];
function mt() {
  gt.push(U), U = !1;
}
function Et() {
  const e = gt.pop();
  U = e === void 0 ? !0 : e;
}
function x(e, t, n) {
  if (U && b) {
    let r = ye.get(e);
    r || ye.set(e, r = /* @__PURE__ */ new Map());
    let s = r.get(n);
    s || r.set(n, s = Re());
    const o = process.env.NODE_ENV !== "production" ? { effect: b, target: e, type: t, key: n } : void 0;
    gn(s, o);
  }
}
function gn(e, t) {
  let n = !1;
  ee <= Ie ? _t(e) || (e.n |= H, n = !ht(e)) : n = !e.has(b), n && (e.add(b), b.deps.push(e), process.env.NODE_ENV !== "production" && b.onTrack && b.onTrack(
    C(
      {
        effect: b
      },
      t
    )
  ));
}
function j(e, t, n, r, s, o) {
  const i = ye.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && h(e)) {
    const u = Number(r);
    i.forEach((d, l) => {
      (l === "length" || !Ne(l) && l >= u) && c.push(d);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        h(e) ? Fe(n) && c.push(i.get("length")) : (c.push(i.get(K)), G(e) && c.push(i.get(De)));
        break;
      case "delete":
        h(e) || (c.push(i.get(K)), G(e) && c.push(i.get(De)));
        break;
      case "set":
        G(e) && c.push(i.get(K));
        break;
    }
  const a = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: s, oldTarget: o } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? ie(c[0], a) : ie(c[0]));
  else {
    const u = [];
    for (const d of c)
      d && u.push(...d);
    process.env.NODE_ENV !== "production" ? ie(Re(u), a) : ie(Re(u));
  }
}
function ie(e, t) {
  const n = h(e) ? e : [...e];
  for (const r of n)
    r.computed && Xe(r, t);
  for (const r of n)
    r.computed || Xe(r, t);
}
function Xe(e, t) {
  (e !== b || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(C({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const mn = /* @__PURE__ */ qt("__proto__,__v_isRef,__isVue"), wt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ne)
), Ze = /* @__PURE__ */ En();
function En() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = p(this);
      for (let o = 0, i = this.length; o < i; o++)
        x(r, "get", o + "");
      const s = r[t](...n);
      return s === -1 || s === !1 ? r[t](...n.map(p)) : s;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      mt();
      const r = p(this)[t].apply(this, n);
      return Et(), r;
    };
  }), e;
}
function wn(e) {
  const t = p(this);
  return x(t, "has", e), t.hasOwnProperty(e);
}
class Nt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n;
  }
  get(t, n, r) {
    const s = this._isReadonly, o = this._shallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw" && r === (s ? o ? vt : xt : o ? Tn : St).get(t))
      return t;
    const i = h(t);
    if (!s) {
      if (i && m(Ze, n))
        return Reflect.get(Ze, n, r);
      if (n === "hasOwnProperty")
        return wn;
    }
    const c = Reflect.get(t, n, r);
    return (Ne(n) ? wt.has(n) : mn(n)) || (s || x(t, "get", n), o) ? c : O(c) ? i && Fe(n) ? c : c.value : S(c) ? s ? Rt(c) : Vt(c) : c;
  }
}
class Nn extends Nt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (L(o) && O(o) && !O(r))
      return !1;
    if (!this._shallow && (!Ce(r) && !L(r) && (o = p(o), r = p(r)), !h(t) && O(o) && !O(r)))
      return o.value = r, !0;
    const i = h(t) && Fe(n) ? Number(n) < t.length : m(t, n), c = Reflect.set(t, n, r, s);
    return t === p(s) && (i ? X(r, o) && j(t, "set", n, r, o) : j(t, "add", n, r)), c;
  }
  deleteProperty(t, n) {
    const r = m(t, n), s = t[n], o = Reflect.deleteProperty(t, n);
    return o && r && j(t, "delete", n, void 0, s), o;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!Ne(n) || !wt.has(n)) && x(t, "has", n), r;
  }
  ownKeys(t) {
    return x(
      t,
      "iterate",
      h(t) ? "length" : K
    ), Reflect.ownKeys(t);
  }
}
class bt extends Nt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && Ge(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && Ge(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const bn = /* @__PURE__ */ new Nn(), On = /* @__PURE__ */ new bt(), Sn = /* @__PURE__ */ new bt(!0), He = (e) => e, Oe = (e) => Reflect.getPrototypeOf(e);
function ce(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = p(e), o = p(t);
  n || (X(t, o) && x(s, "get", t), x(s, "get", o));
  const { has: i } = Oe(s), c = r ? He : n ? We : Ue;
  if (i.call(s, t))
    return c(e.get(t));
  if (i.call(s, o))
    return c(e.get(o));
  e !== s && e.get(t);
}
function le(e, t = !1) {
  const n = this.__v_raw, r = p(n), s = p(e);
  return t || (X(e, s) && x(r, "has", e), x(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function ae(e, t = !1) {
  return e = e.__v_raw, !t && x(p(e), "iterate", K), Reflect.get(e, "size", e);
}
function ke(e) {
  e = p(e);
  const t = p(this);
  return Oe(t).has.call(t, e) || (t.add(e), j(t, "add", e, e)), this;
}
function et(e, t) {
  t = p(t);
  const n = p(this), { has: r, get: s } = Oe(n);
  let o = r.call(n, e);
  o ? process.env.NODE_ENV !== "production" && Ot(n, r, e) : (e = p(e), o = r.call(n, e));
  const i = s.call(n, e);
  return n.set(e, t), o ? X(t, i) && j(n, "set", e, t, i) : j(n, "add", e, t), this;
}
function tt(e) {
  const t = p(this), { has: n, get: r } = Oe(t);
  let s = n.call(t, e);
  s ? process.env.NODE_ENV !== "production" && Ot(t, n, e) : (e = p(e), s = n.call(t, e));
  const o = r ? r.call(t, e) : void 0, i = t.delete(e);
  return s && j(t, "delete", e, void 0, o), i;
}
function nt() {
  const e = p(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? G(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && j(e, "clear", void 0, void 0, n), r;
}
function ue(e, t) {
  return function(r, s) {
    const o = this, i = o.__v_raw, c = p(i), a = t ? He : e ? We : Ue;
    return !e && x(c, "iterate", K), i.forEach((u, d) => r.call(s, a(u), a(d), o));
  };
}
function fe(e, t, n) {
  return function(...r) {
    const s = this.__v_raw, o = p(s), i = G(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, u = s[e](...r), d = n ? He : t ? We : Ue;
    return !t && x(
      o,
      "iterate",
      a ? De : K
    ), {
      // iterator protocol
      next() {
        const { value: l, done: f } = u.next();
        return f ? { value: l, done: f } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function $(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${sn(e)} operation ${n}failed: target is readonly.`,
        p(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
function xn() {
  const e = {
    get(o) {
      return ce(this, o);
    },
    get size() {
      return ae(this);
    },
    has: le,
    add: ke,
    set: et,
    delete: tt,
    clear: nt,
    forEach: ue(!1, !1)
  }, t = {
    get(o) {
      return ce(this, o, !1, !0);
    },
    get size() {
      return ae(this);
    },
    has: le,
    add: ke,
    set: et,
    delete: tt,
    clear: nt,
    forEach: ue(!1, !0)
  }, n = {
    get(o) {
      return ce(this, o, !0);
    },
    get size() {
      return ae(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: $("add"),
    set: $("set"),
    delete: $("delete"),
    clear: $("clear"),
    forEach: ue(!0, !1)
  }, r = {
    get(o) {
      return ce(this, o, !0, !0);
    },
    get size() {
      return ae(this, !0);
    },
    has(o) {
      return le.call(this, o, !0);
    },
    add: $("add"),
    set: $("set"),
    delete: $("delete"),
    clear: $("clear"),
    forEach: ue(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = fe(
      o,
      !1,
      !1
    ), n[o] = fe(
      o,
      !0,
      !1
    ), t[o] = fe(
      o,
      !1,
      !0
    ), r[o] = fe(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    r
  ];
}
const [
  vn,
  Vn,
  Rn,
  yn
] = /* @__PURE__ */ xn();
function ze(e, t) {
  const n = t ? e ? yn : Rn : e ? Vn : vn;
  return (r, s, o) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(
    m(n, s) && s in r ? n : r,
    s,
    o
  );
}
const In = {
  get: /* @__PURE__ */ ze(!1, !1)
}, Dn = {
  get: /* @__PURE__ */ ze(!0, !1)
}, Cn = {
  get: /* @__PURE__ */ ze(!0, !0)
};
function Ot(e, t, n) {
  const r = p(n);
  if (r !== n && t.call(e, r)) {
    const s = pt(e);
    console.warn(
      `Reactive ${s} contains both the raw and reactive versions of the same object${s === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const St = /* @__PURE__ */ new WeakMap(), Tn = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap();
function Pn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function $n(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Pn(pt(e));
}
function Vt(e) {
  return L(e) ? e : Ke(
    e,
    !1,
    bn,
    In,
    St
  );
}
function Rt(e) {
  return Ke(
    e,
    !0,
    On,
    Dn,
    xt
  );
}
function pe(e) {
  return Ke(
    e,
    !0,
    Sn,
    Cn,
    vt
  );
}
function Ke(e, t, n, r, s) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = s.get(e);
  if (o)
    return o;
  const i = $n(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? r : n
  );
  return s.set(e, c), c;
}
function W(e) {
  return L(e) ? W(e.__v_raw) : !!(e && e.__v_isReactive);
}
function L(e) {
  return !!(e && e.__v_isReadonly);
}
function Ce(e) {
  return !!(e && e.__v_isShallow);
}
function Te(e) {
  return W(e) || L(e);
}
function p(e) {
  const t = e && e.__v_raw;
  return t ? p(t) : e;
}
function Mn(e) {
  return on(e, "__v_skip", !0), e;
}
const Ue = (e) => S(e) ? Vt(e) : e, We = (e) => S(e) ? Rt(e) : e;
function O(e) {
  return !!(e && e.__v_isRef === !0);
}
function Fn(e) {
  return O(e) ? e.value : e;
}
const An = {
  get: (e, t, n) => Fn(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return O(s) && !O(n) ? (s.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function jn(e) {
  return W(e) ? e : new Proxy(e, An);
}
const B = [];
function Hn(e) {
  B.push(e);
}
function zn() {
  B.pop();
}
function N(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  mt();
  const n = B.length ? B[B.length - 1].component : null, r = n && n.appContext.config.warnHandler, s = Kn();
  if (r)
    J(
      r,
      n,
      11,
      [
        e + t.join(""),
        n && n.proxy,
        s.map(
          ({ vnode: o }) => `at <${Wt(n, o.type)}>`
        ).join(`
`),
        s
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    s.length && o.push(`
`, ...Un(s)), console.warn(...o);
  }
  Et();
}
function Kn() {
  let e = B[B.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function Un(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Wn(n));
  }), t;
}
function Wn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, s = ` at <${Wt(
    e.component,
    e.type,
    r
  )}`, o = ">" + n;
  return e.props ? [s, ...Bn(e.props), o] : [s + o];
}
function Bn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...yt(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function yt(e, t, n) {
  return D(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = yt(e, p(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : E(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = p(t), n ? t : [`${e}=`, t]);
}
const It = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function J(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    Dt(o, t, n);
  }
  return s;
}
function Pe(e, t, n, r) {
  if (E(e)) {
    const o = J(e, t, n, r);
    return o && en(o) && o.catch((i) => {
      Dt(i, t, n);
    }), o;
  }
  const s = [];
  for (let o = 0; o < e.length; o++)
    s.push(Pe(e[o], t, n, r));
  return s;
}
function Dt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? It[n] : n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      J(
        a,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  Jn(e, n, s, r);
}
function Jn(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const s = It[t];
    if (n && Hn(n), N(`Unhandled error${s ? ` during execution of ${s}` : ""}`), n && zn(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let ge = !1, $e = !1;
const y = [];
let F = 0;
const Q = [];
let T = null, M = 0;
const Ct = /* @__PURE__ */ Promise.resolve();
let Be = null;
const Ln = 100;
function qn(e) {
  const t = Be || Ct;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Yn(e) {
  let t = F + 1, n = y.length;
  for (; t < n; ) {
    const r = t + n >>> 1, s = y[r], o = se(s);
    o < e || o === e && s.pre ? t = r + 1 : n = r;
  }
  return t;
}
function Je(e) {
  (!y.length || !y.includes(
    e,
    ge && e.allowRecurse ? F + 1 : F
  )) && (e.id == null ? y.push(e) : y.splice(Yn(e.id), 0, e), Tt());
}
function Tt() {
  !ge && !$e && ($e = !0, Be = Ct.then($t));
}
function Pt(e) {
  h(e) ? Q.push(...e) : (!T || !T.includes(
    e,
    e.allowRecurse ? M + 1 : M
  )) && Q.push(e), Tt();
}
function Gn(e) {
  if (Q.length) {
    const t = [...new Set(Q)];
    if (Q.length = 0, T) {
      T.push(...t);
      return;
    }
    for (T = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), T.sort((n, r) => se(n) - se(r)), M = 0; M < T.length; M++)
      process.env.NODE_ENV !== "production" && Mt(e, T[M]) || T[M]();
    T = null, M = 0;
  }
}
const se = (e) => e.id == null ? 1 / 0 : e.id, Qn = (e, t) => {
  const n = se(e) - se(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function $t(e) {
  $e = !1, ge = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), y.sort(Qn);
  const t = process.env.NODE_ENV !== "production" ? (n) => Mt(e, n) : ft;
  try {
    for (F = 0; F < y.length; F++) {
      const n = y[F];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        J(n, null, 14);
      }
    }
  } finally {
    F = 0, y.length = 0, Gn(e), ge = !1, Be = null, (y.length || Q.length) && $t(e);
  }
}
function Mt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Ln) {
      const r = t.ownerInstance, s = r && Ut(r.type);
      return N(
        `Maximum recursive updates exceeded${s ? ` in component <${s}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      ), !0;
    } else
      e.set(t, n + 1);
  }
}
const k = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Ve().__VUE_HMR_RUNTIME__ = {
  createRecord: Se(Xn),
  rerender: Se(Zn),
  reload: Se(kn)
});
const me = /* @__PURE__ */ new Map();
function Xn(e, t) {
  return me.has(e) ? !1 : (me.set(e, {
    initialDef: ne(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ne(e) {
  return Bt(e) ? e.__vccOpts : e;
}
function Zn(e, t) {
  const n = me.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, ne(r.type).render = t), r.renderCache = [], r.update();
  }));
}
function kn(e, t) {
  const n = me.get(e);
  if (!n)
    return;
  t = ne(t), rt(n.initialDef, t);
  const r = [...n.instances];
  for (const s of r) {
    const o = ne(s.type);
    k.has(o) || (o !== n.initialDef && rt(o, t), k.add(o)), s.appContext.propsCache.delete(s.type), s.appContext.emitsCache.delete(s.type), s.appContext.optionsCache.delete(s.type), s.ceReload ? (k.add(o), s.ceReload(t.styles), k.delete(o)) : s.parent ? Je(s.parent.update) : s.appContext.reload ? s.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    );
  }
  Pt(() => {
    for (const s of r)
      k.delete(
        ne(s.type)
      );
  });
}
function rt(e, t) {
  C(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Se(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let A = null, er = null;
const tr = Symbol.for("v-ndc"), nr = (e) => e.__isSuspense;
function rr(e, t) {
  t && t.pendingBranch ? h(e) ? t.effects.push(...e) : t.effects.push(e) : Pt(e);
}
const de = {};
function sr(e, t, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = P) {
  var c;
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && N(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && N(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const a = (g) => {
    N(
      "Invalid watch source: ",
      g,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, u = pn() === ((c = Z) == null ? void 0 : c.scope) ? Z : null;
  let d, l = !1, f = !1;
  if (O(e) ? (d = () => e.value, l = Ce(e)) : W(e) ? (d = () => e, r = !0) : h(e) ? (f = !0, l = e.some((g) => W(g) || Ce(g)), d = () => e.map((g) => {
    if (O(g))
      return g.value;
    if (W(g))
      return Y(g);
    if (E(g))
      return J(g, u, 2);
    process.env.NODE_ENV !== "production" && a(g);
  })) : E(e) ? t ? d = () => J(e, u, 2) : d = () => {
    if (!(u && u.isUnmounted))
      return _ && _(), Pe(
        e,
        u,
        3,
        [v]
      );
  } : (d = ft, process.env.NODE_ENV !== "production" && a(e)), t && r) {
    const g = d;
    d = () => Y(g());
  }
  let _, v = (g) => {
    _ = R.onStop = () => {
      J(g, u, 4);
    };
  }, V = f ? new Array(e.length).fill(de) : de;
  const z = () => {
    if (R.active)
      if (t) {
        const g = R.run();
        (r || l || (f ? g.some((Jt, Lt) => X(Jt, V[Lt])) : X(g, V))) && (_ && _(), Pe(t, u, 3, [
          g,
          // pass undefined as the old value when it's changed for the first time
          V === de ? void 0 : f && V[0] === de ? [] : V,
          v
        ]), V = g);
      } else
        R.run();
  };
  z.allowRecurse = !!t;
  let oe;
  s === "sync" ? oe = z : s === "post" ? oe = () => lt(z, u && u.suspense) : (z.pre = !0, u && (z.id = u.uid), oe = () => Je(z));
  const R = new _n(d, oe);
  return process.env.NODE_ENV !== "production" && (R.onTrack = o, R.onTrigger = i), t ? n ? z() : V = R.run() : s === "post" ? lt(
    R.run.bind(R),
    u && u.suspense
  ) : R.run(), () => {
    R.stop(), u && u.scope && Xt(u.scope.effects, R);
  };
}
function or(e, t, n) {
  const r = this.proxy, s = D(e) ? e.includes(".") ? ir(r, e) : () => r[e] : e.bind(r, r);
  let o;
  E(t) ? o = t : (o = t.handler, n = t);
  const i = Z;
  ut(this);
  const c = sr(s, o.bind(r), n);
  return i ? ut(i) : Vr(), c;
}
function ir(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++)
      r = r[n[s]];
    return r;
  };
}
function Y(e, t) {
  if (!S(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), O(e))
    Y(e.value, t);
  else if (h(e))
    for (let n = 0; n < e.length; n++)
      Y(e[n], t);
  else if (kt(e) || G(e))
    e.forEach((n) => {
      Y(n, t);
    });
  else if (nn(e))
    for (const n in e)
      Y(e[n], t);
  return e;
}
const Me = (e) => e ? Rr(e) ? yr(e) || e.proxy : Me(e.parent) : null, re = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? pe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? pe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? pe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? pe(e.refs) : e.refs,
    $parent: (e) => Me(e.parent),
    $root: (e) => Me(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ar(e),
    $forceUpdate: (e) => e.f || (e.f = () => Je(e.update)),
    $nextTick: (e) => e.n || (e.n = qn.bind(e.proxy)),
    $watch: (e) => or.bind(e)
  })
), cr = (e) => e === "_" || e === "$", xe = (e, t) => e !== P && !e.__isScriptSetup && m(e, t), lr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const _ = i[t];
      if (_ !== void 0)
        switch (_) {
          case 1:
            return r[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (xe(r, t))
          return i[t] = 1, r[t];
        if (s !== P && m(s, t))
          return i[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && m(u, t)
        )
          return i[t] = 3, o[t];
        if (n !== P && m(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = re[t];
    let l, f;
    if (d)
      return t === "$attrs" ? (x(e, "get", t), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && x(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== P && m(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = a.config.globalProperties, m(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && A && (!D(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (s !== P && cr(t[0]) && m(s, t) ? N(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === A && N(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: o } = e;
    return xe(s, t) ? (s[t] = n, !0) : process.env.NODE_ENV !== "production" && s.__isScriptSetup && m(s, t) ? (N(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== P && m(r, t) ? (r[t] = n, !0) : m(e.props, t) ? (process.env.NODE_ENV !== "production" && N(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && N(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== P && m(e, i) || xe(t, i) || (c = o[0]) && m(c, i) || m(r, i) || m(re, i) || m(s.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : m(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (lr.ownKeys = (e) => (N(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function st(e) {
  return h(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ar(e) {
  const t = e.type, { mixins: n, extends: r } = t, {
    mixins: s,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !s.length && !n && !r ? a = t : (a = {}, s.length && s.forEach(
    (u) => Ee(a, u, i, !0)
  ), Ee(a, t, i)), S(t) && o.set(t, a), a;
}
function Ee(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && Ee(e, o, n, !0), s && s.forEach(
    (i) => Ee(e, i, n, !0)
  );
  for (const i in t)
    if (r && i === "expose")
      process.env.NODE_ENV !== "production" && N(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = ur[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ur = {
  data: ot,
  props: ct,
  emits: ct,
  // objects
  methods: te,
  computed: te,
  // lifecycle
  beforeCreate: w,
  created: w,
  beforeMount: w,
  mounted: w,
  beforeUpdate: w,
  updated: w,
  beforeDestroy: w,
  beforeUnmount: w,
  destroyed: w,
  unmounted: w,
  activated: w,
  deactivated: w,
  errorCaptured: w,
  serverPrefetch: w,
  // assets
  components: te,
  directives: te,
  // watch
  watch: pr,
  // provide / inject
  provide: ot,
  inject: fr
};
function ot(e, t) {
  return t ? e ? function() {
    return C(
      E(e) ? e.call(this, this) : e,
      E(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function fr(e, t) {
  return te(it(e), it(t));
}
function it(e) {
  if (h(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function w(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function te(e, t) {
  return e ? C(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ct(e, t) {
  return e ? h(e) && h(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : C(
    /* @__PURE__ */ Object.create(null),
    st(e),
    st(t ?? {})
  ) : t;
}
function pr(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = C(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = w(e[r], t[r]);
  return n;
}
const lt = rr, dr = (e) => e.__isTeleport, Ft = Symbol.for("v-fgt"), hr = Symbol.for("v-txt"), _r = Symbol.for("v-cmt"), he = [];
let I = null;
function gr(e = !1) {
  he.push(I = e ? null : []);
}
function mr() {
  he.pop(), I = he[he.length - 1] || null;
}
function Er(e) {
  return e.dynamicChildren = I || Yt, mr(), I && I.push(e), e;
}
function wr(e, t, n, r, s, o) {
  return Er(
    Ht(
      e,
      t,
      n,
      r,
      s,
      o,
      !0
      /* isBlock */
    )
  );
}
function Nr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const br = (...e) => zt(
  ...e
), At = "__vInternal", jt = ({ key: e }) => e ?? null, _e = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? D(e) || O(e) || E(e) ? { i: A, r: e, k: t, f: !!n } : e : null);
function Ht(e, t = null, n = null, r = 0, s = null, o = e === Ft ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jt(t),
    ref: t && _e(t),
    scopeId: er,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: A
  };
  return c ? (Le(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= D(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && N("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  I && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && I.push(a), a;
}
const Or = process.env.NODE_ENV !== "production" ? br : zt;
function zt(e, t = null, n = null, r = 0, s = null, o = !1) {
  if ((!e || e === tr) && (process.env.NODE_ENV !== "production" && !e && N(`Invalid vnode type when creating vnode: ${e}.`), e = _r), Nr(e)) {
    const c = we(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Le(c, n), !o && I && (c.shapeFlag & 6 ? I[I.indexOf(e)] = c : I.push(c)), c.patchFlag |= -2, c;
  }
  if (Bt(e) && (e = e.__vccOpts), t) {
    t = Sr(t);
    let { class: c, style: a } = t;
    c && !D(c) && (t.class = je(c)), S(a) && (Te(a) && !h(a) && (a = C({}, a)), t.style = Ae(a));
  }
  const i = D(e) ? 1 : nr(e) ? 128 : dr(e) ? 64 : S(e) ? 4 : E(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Te(e) && (e = p(e), N(
    "Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), Ht(
    e,
    t,
    n,
    r,
    s,
    i,
    o,
    !0
  );
}
function Sr(e) {
  return e ? Te(e) || At in e ? C({}, e) : e : null;
}
function we(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e, c = t ? vr(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && jt(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && s ? h(s) ? s.concat(_e(t)) : [s, _e(t)] : _e(t)
    ) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && h(i) ? i.map(Kt) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ft ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && we(e.ssContent),
    ssFallback: e.ssFallback && we(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Kt(e) {
  const t = we(e);
  return h(e.children) && (t.children = e.children.map(Kt)), t;
}
function xr(e = " ", t = 0) {
  return Or(hr, null, e, t);
}
function Le(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (h(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Le(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(At in t) ? t._ctx = A : s === 3 && A && (A.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    E(t) ? (t = { default: t, _ctx: A }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [xr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function vr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = je([t.class, r.class]));
      else if (s === "style")
        t.style = Ae([t.style, r.style]);
      else if (Qt(s)) {
        const o = t[s], i = r[s];
        i && o !== i && !(h(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
      } else
        s !== "" && (t[s] = r[s]);
  }
  return t;
}
let Z = null, qe, q, at = "__VUE_INSTANCE_SETTERS__";
(q = Ve()[at]) || (q = Ve()[at] = []), q.push((e) => Z = e), qe = (e) => {
  q.length > 1 ? q.forEach((t) => t(e)) : q[0](e);
};
const ut = (e) => {
  qe(e), e.scope.on();
}, Vr = () => {
  Z && Z.scope.off(), qe(null);
};
function Rr(e) {
  return e.vnode.shapeFlag & 4;
}
function yr(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(jn(Mn(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in re)
          return re[n](e);
      },
      has(t, n) {
        return n in t || n in re;
      }
    }));
}
const Ir = /(?:^|[-_])(\w)/g, Dr = (e) => e.replace(Ir, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Ut(e, t = !0) {
  return E(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Wt(e, t, n = !1) {
  let r = Ut(t);
  if (!r && t.__file) {
    const s = t.__file.match(/([^/\\]+)\.\w+$/);
    s && (r = s[1]);
  }
  if (!r && e && e.parent) {
    const s = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    r = s(
      e.components || e.parent.type.components
    ) || s(e.appContext.components);
  }
  return r ? Dr(r) : n ? "App" : "Anonymous";
}
function Bt(e) {
  return E(e) && "__vccOpts" in e;
}
function ve(e) {
  return !!(e && e.__v_isShallow);
}
function Cr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, s = {
    header(l) {
      return S(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        c(l.value),
        ">"
      ] : W(l) ? [
        "div",
        {},
        ["span", e, ve(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${L(l) ? " (readonly)" : ""}`
      ] : L(l) ? [
        "div",
        {},
        ["span", e, ve(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const f = [];
    l.type.props && l.props && f.push(i("props", p(l.props))), l.setupState !== P && f.push(i("setup", l.setupState)), l.data !== P && f.push(i("data", p(l.data)));
    const _ = a(l, "computed");
    _ && f.push(i("computed", _));
    const v = a(l, "inject");
    return v && f.push(i("injected", v)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), f;
  }
  function i(l, f) {
    return f = C({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((_) => [
          "div",
          {},
          ["span", r, _ + ": "],
          c(f[_], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, f = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", r, l] : S(l) ? ["object", { object: f ? p(l) : l }] : ["span", n, String(l)];
  }
  function a(l, f) {
    const _ = l.type;
    if (E(_))
      return;
    const v = {};
    for (const V in l.ctx)
      u(_, V, f) && (v[V] = l.ctx[V]);
    return v;
  }
  function u(l, f, _) {
    const v = l[_];
    if (h(v) && v.includes(f) || S(v) && f in v || l.extends && u(l.extends, f, _) || l.mixins && l.mixins.some((V) => u(V, f, _)))
      return !0;
  }
  function d(l) {
    return ve(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(s) : window.devtoolsFormatters = [s];
}
function Tr() {
  Cr();
}
process.env.NODE_ENV !== "production" && Tr();
const Pr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, s] of t)
    n[r] = s;
  return n;
}, $r = {};
function Mr(e, t) {
  return gr(), wr("h1", null, "Hello library");
}
const Ar = /* @__PURE__ */ Pr($r, [["render", Mr], ["__scopeId", "data-v-9ed68dbb"]]);
export {
  Ar as HomeLibrary
};
