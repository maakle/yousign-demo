export var Yousign = (function () {
  "use strict";
  var e;
  !(function (e) {
    (e.STARTED = "started"),
      (e.SUCCESS = "success"),
      (e.ERROR = "error"),
      (e.PING = "ping"),
      (e.DECLINED = "declined");
  })(e || (e = {}));
  class t extends Error {
    constructor() {
      super(),
        (this.name = "InvalidSignatureLink"),
        (this.message = "The signature link is invalid.");
    }
  }
  class s extends Error {
    constructor(e) {
      super(),
        (this.name = "IframeContainerNotFound"),
        (this.message = `The iFrame container with the id "${e}" is not found.`);
    }
  }
  class n extends Error {
    constructor(e) {
      super(),
        (this.name = "InvalidCallbackFunction"),
        (this.message = `Callback on ${e} event is not a function.`);
    }
  }
  return class {
    constructor({ signatureLink: e, iframeContainerId: n, isSandbox: i }) {
      let a;
      (this.childOrigin = /^https:\/\/yousign.app$/),
        (this.eventCallbacks = {});
      try {
        a = new URL(e);
      } catch (e) {
        throw new t();
      }
      const r = document.getElementById(n);
      if (!r) throw new s(n);
      i && a.searchParams.append("disable_domain_validation", "true"),
        (this.urlParams = new Proxy(a.searchParams, {
          get: (e, t) => e.get(t),
        })),
        (this.iframe = document.getElementById("yousign-iframe")),
        this.iframe ||
          ((this.iframe = document.createElement("iframe")),
          (this.iframe.id = "yousign-iframe"),
          r.appendChild(this.iframe)),
        (this.iframe.src = a.href),
        (this.messageHandler = this.receiveMessage.bind(this)),
        window.addEventListener("message", this.messageHandler, !1);
    }
    receiveMessage(e) {
      const { origin: t, data: s } = e;
      t.match(this.childOrigin) &&
        "yousign" === s.type &&
        this.eventCallbacks[s.event] &&
        "function" == typeof this.eventCallbacks[s.event] &&
        this.eventCallbacks[s.event](s),
        "__ubble" === s.type &&
          s.payload.redirectUrl &&
          (this.iframe.src = `${s.payload.redirectUrl}&k=${this.urlParams.k}`);
    }
    onStarted(t) {
      if ("function" != typeof t) throw new n(e.STARTED);
      this.eventCallbacks.started = t;
    }
    onSuccess(t) {
      if ("function" != typeof t) throw new n(e.SUCCESS);
      this.eventCallbacks.success = t;
    }
    onError(t) {
      if ("function" != typeof t) throw new n(e.ERROR);
      this.eventCallbacks.error = t;
    }
    onPing(t) {
      if ("function" != typeof t) throw new n(e.PING);
      this.eventCallbacks.ping = t;
    }
    onDeclined(t) {
      if ("function" != typeof t) throw new n(e.DECLINED);
      this.eventCallbacks.declined = t;
    }
    removeMessageListener() {
      window.removeEventListener("message", this.messageHandler);
    }
  };
})();
