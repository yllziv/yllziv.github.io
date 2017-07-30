var gulp = require('gulp'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  gutil = require('gulp-util'),
  shell = require("gulp-shell"),
  htmlmin = require('gulp-htmlmin'),
  clean = require('gulp-clean'),
  webserver = require('gulp-webserver'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  Server = require('karma').Server,
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js');

gulp.task('html', function() {
  return gulp.src('src/app/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 4 versions'], cascade: false }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: '样式完成' }));
});

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);
gulp.task('scripts', function(callback) {
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack:scripts", err);
    }
    gutil.log("[webpack:scripts]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({
      message: '图片完成'
    }));
});



gulp.task('copyfont', function() {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('videos', function() {
  return gulp.src('src/videos/*')
    .pipe(gulp.dest('dist/videos'));
});

gulp.task('static', function() {
  return gulp.src('src/static/**')
    .pipe(gulp.dest('dist/static'));
});


gulp.task('favicon', function() {
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist'));
});

gulp.task('webserver', ['scripts', 'images', 'static', 'videos', 'favicon', 'copyfont', 'styles', 'html'], function() {
  gulp.src('')
    .pipe(webserver({
      port: 8888,
      directoryListing: true,
      open: 'http://localhost:8888/dist/app/home.html'
    }));
});

gulp.task('doc', shell.task(['./node_modules/.bin/jsdoc src/scripts -r -d doc']));

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('clean', function() {
  return gulp.src(['dist/*'], { read: false })
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('webserver');
});

gulp.task('watch', function() {
  gulp.start('default');
  gulp.watch('src/app/**/*.jade', ['html']);
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**', ['images']);
  gulp.watch('src/static/**', ['static']);
});
