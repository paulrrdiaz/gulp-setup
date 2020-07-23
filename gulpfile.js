const { src, dest, series, parallel, watch } = require("gulp");
const bro = require("gulp-bro");
const babelify = require("babelify");
const del = require("del");

function clean() {
  return del(["./dist/"]);
}

function scripts() {
  return src("./src/*.js")
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ["@babel/env", "@babel/react"],
          }),
        ],
      })
    )
    .pipe(dest("./dist/"));
}

function watchFiles() {
  watch("./src/*.js", series(scripts));
}

const js = series(scripts);
const build = series(clean, parallel(js));
const watcher = parallel(watchFiles);

exports.watch = watcher;
exports.default = build;
