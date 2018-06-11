b.prng = function (h) {
  this._pools = [new b.hash.sha256];
  this._poolEntropy = [0];
  this._reseedCount = 0;
  this._robins = {};
  this._eventId = 0;
  this._collectorIds = {};
  this._collectorIdNext = 0;
  this._strength = 0;
  this._poolStrength = 0;
  this._nextReseed = 0;
  this._key = [0, 0, 0, 0, 0, 0, 0, 0];
  this._counter = [0, 0, 0, 0];
  this._cipher = undefined;
  this._defaultParanoia = h;
  this._collectorsStarted = false;
  this._callbacks = {
      progress: {},
      seeded: {}
  };
  this._callbackI = 0;
  this._NOT_READY = 0;
  this._READY = 1;
  this._REQUIRES_RESEED = 2;
  this._MAX_WORDS_PER_BURST = 65536;
  this._PARANOIA_LEVELS = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
  this._MILLISECONDS_PER_RESEED = 30000;
  this._BITS_PER_RESEED = 80
};

b.codec.base64 = {
  _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  fromBits: function (n, q, j) {
      var k = "",
          l, p = 0,
          o = b.codec.base64._chars,
          m = 0,
          h = b.bitArray.bitLength(n);
      if (j) {
          o = o.substr(0, 62) + "-_"
      }
      for (l = 0; k.length * 6 < h;) {
          k += o.charAt((m ^ n[l] >>> p) >>> 26);
          if (p < 6) {
              m = n[l] << 6 - p;
              p += 26;
              l++
          } else {
              m <<= 6;
              p -= 6
          }
      }
      while (k.length & 3 && !q) {
          k += "="
      }
      return k
  },
  randomWords: function (h, n) {
    var j = [],
        l, k = this.isReady(n),
        m;
    if (k === this._NOT_READY) {
        throw new b.exception.notReady("generator isn't seeded")
    } else {
        if (k & this._REQUIRES_RESEED) {
            this._reseedFromPools(!(k & this._READY))
        }
    }
    for (l = 0; l < h; l += 4) {
        if ((l + 1) % this._MAX_WORDS_PER_BURST === 0) {
            this._gate()
        }
        m = this._gen4words();
        j.push(m[0], m[1], m[2], m[3])
    }
    this._gate();
    return j.slice(0, h)
  },
  toBits: function (o, m) {
      o = o.replace(/\s|=/g, "");
      var k = [],
          l, n = 0,
          p = b.codec.base64._chars,
          j = 0,
          h;
      if (m) {
          p = p.substr(0, 62) + "-_"
      }
      for (l = 0; l < o.length; l++) {
          h = p.indexOf(o.charAt(l));
          if (h < 0) {
              throw new b.exception.invalid("this isn't base64!")
          }
          if (n > 26) {
              n -= 26;
              k.push(j ^ h >>> n);
              j = h << 32 - n
          } else {
              n += 6;
              j ^= h << 32 - n
          }
      }
      if (n & 56) {
          k.push(b.bitArray.partial(n & 56, j, 1))
      }
      return k
  }
};
b.random = new b.prng(6);