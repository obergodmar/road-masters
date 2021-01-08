const gulp = require("gulp")
const uglify = require("gulp-uglify")
const browserSync = require("browser-sync").create()
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const concatCss = require("gulp-concat-css")

const source = require("vinyl-source-stream")
const buffer = require("vinyl-buffer")
const browserify = require("browserify")
const babel = require("babelify")

const paths = {
  styles: {
    src: "src/scss/*.scss",
    dest: "public/css/",
  },
  base: {
    src: "public/.",
  },
  html: {
    src: "public/*.html",
  },
  js: {
    watch: "src/js/*.js",
    src: ["src/js/index.js"],
    dist: "public/js",
  },
}

const style = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(concatCss("style.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())

const script = () => {
  const bundler = browserify(
    {
      entries: paths.js.src,
    },
    {
      debug: true,
    }
  ).transform(babel)

  return bundler
    .bundle()
    .on("error", err => {
      // eslint-disable-next-line
      console.error(err)
      this.emit("end")
    })
    .pipe(source("bundle.min.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dist))
}

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: paths.base.src,
    },
  })
  gulp.watch(paths.styles.src, style)
  gulp.watch(paths.html.src).on("change", browserSync.reload)
  gulp.watch(paths.js.watch, script).on("change", browserSync.reload)
})

gulp.task("build", async () => {
  script()
  style()
})
