/**
 * unit test settings for BusterJS.
 */
var config = module.exports;

// ブラウザ共通設定
var browserCommon = {
    rootPath: "../",
    environment: "browser",
    libs: [
      "vendor/mt.js/mt.js"
    ],
    tests: [
      "test/browser-test.js"
    ]
};

// ブラウザでコンパイル前のテスト
config["plain"] = mixin(
  mixin({}, browserCommon),
  {
    libs: [
      "closure-primitives/base.js",
      "deps.js",
      "define/typedarray/hybrid.js",
      "src/rawdeflate.js",
      "src/zip.js",
      "src/*.js"
    ]
  }
);
config["plain"].tests = [
  "test/browser-plain-test.js"
];

// ブラウザで独立ビルド版のテスト
config["respectively build"] = mixin(
  mixin({}, browserCommon),
  {
    libs: [
      "bin/inflate.min.js",
      "bin/deflate.min.js",
      "bin/gunzip.min.js",
      "bin/gzip.min.js",
      "bin/unzip.min.js",
      "bin/zip.min.js"
    ]
  }
);

// ブラウザで Zlib まとめてビルド版のテスト
config["zlib"] = mixin(
  mixin({}, browserCommon),
  {
    libs: [
      "bin/zip.min.js",
      "bin/unzip.min.js",
      "bin/zlib_and_gzip.min.js"
    ]
  }
);

// node
config["node"] = {
  rootPath: "../",
  environment: "node",
  tests: [
    "test/node-test.js"
  ]
};

// config mixin
function mixin(dst, src) {
  var i;

  for (i in src) {
    if (dst[i] instanceof Array && src[i] instanceof Array) {
      dst[i] = dst[i].concat(src[i]);
    } else if (typeof dst[i] === 'object' && typeof src[i] === 'object') {
      mixin(dst[i], src[i]);
    } else {
      dst[i] = src[i];
    }
  }

  return dst;
}
