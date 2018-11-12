const gulp = require('gulp')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const gutil = require('gulp-util')
const babelify = require('babelify')
const browserSync = require('browser-sync').create()
const childProcess = require('child_process')
const plumber = require('gulp-plumber')


gulp.task('jekyll', () => {
  const jekyll = childProcess.spawn('bundle', ['exec', 'jekyll', 'serve', '--incremental'], {
    stdio: 'inherit'
  })
})

gulp.task('css', function () {
  gulp.src('_sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({ browsers: ['last 4 versions', '> 1%', 'not ie <= 9'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/public/css'))
    .pipe(browserSync.stream())
    .pipe(gulp.dest('public/css'))
});

gulp.task('js', function () {
  browserify({
      entries: `_js/index.js`,
      extensions: ['.js'],
      debug: true
  })
  .transform('babelify', {
      presets: ['env']
  })
  .bundle()
    .on('error', browserSync.notify)
  .pipe(source('src.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
    .on('error', gutil.log)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(`_site/public/js`))
  .pipe(browserSync.stream())
  .pipe(gulp.dest('public/js'))
})

let reloadTimeout
gulp.task('serve', ['css', 'js', 'jekyll'], () => {
  browserSync.init({
    serveStatic: ['_site/public'],
    proxy: 'localhost:4000',
    port: 9000,
    open: false,
    notify: false
  }, () => { console.log(gutil.colors.blue('browsersync up'))})

  gulp.watch([
		'_site/**/*.html',
		'_site/public/img/**/*',
		'_site/public/js/**/*'
	]).on('change', function(e) {
    clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
      browserSync.reload({ once: true })
    }, 50)
	})

	gulp.watch('_sass/**/*', ['css'])
	gulp.watch('_js/**/*', ['js'])
})

gulp.task('default', ['serve'])
gulp.task('build', ['css', 'js'])