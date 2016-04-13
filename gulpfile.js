var gulp = require('gulp');
var rimraf = require('rimraf');
var run = require('run-sequence');
var  watch = require('gulp-watch');
var server = require('gulp-live-server');
var path = require('path');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var env = require('gulp-env');
var mocha= require('gulp-mocha') ;
//import gulpbabel from 'gulp-babel';

var paths = {
  src: ['./src'],
  dist: './dist'
};

/*
 jsNPMDependencies, sometimes order matters here! so becareful!
 */
var jsNPMDependencies = [
  'angular2/bundles/angular2-polyfills.js',
  'systemjs/dist/system.src.js',
  'rxjs/bundles/Rx.js',
  'angular2/bundles/angular2.dev.js',
  'angular2/bundles/router.dev.js'
];

gulp.task('default', (cb)=> {
  run('server', 'build:dev', 'watch', cb);
});

gulp.task('build:dev', (cb)=> {
  run('build:clean', 'build:ts', 'build:index', 'build:assest', 'build:app', 'restart', cb);
});

gulp.task('build:release', (cb)=> {
  run('build:clean', 'build:ts', 'build:index', 'build:assest', 'build:app', cb);
});

gulp.task('test', ()=> {
  const envs = env.set({
    NODE_ENV: 'test'
  });
  return gulp.src(paths.src + '/test/*.js', {read: false})
    .pipe(envs)
    .pipe(gulpbabel())
    .pipe(mocha());
})

gulp.task('build:index', function () {
  var mappedPaths = jsNPMDependencies.map(file => {
    return path.resolve('node_modules', file)
  });

  //Let's copy our head dependencies into a dist/libs
  var copyJsNPMDependencies = gulp.src(mappedPaths, {base: 'node_modules'})
    .pipe(gulp.dest('dist/libs'));

  //Let's copy our index into dist
  var copyIndex = gulp.src(['src/client/index.html'])
    .pipe(gulp.dest('dist'));

  var copyIndex = gulp.src(['src/client/**/*.html', '!src/client/index.html'])
    .pipe(gulp.dest('dist/app'));

  return [copyJsNPMDependencies, copyIndex];
});

gulp.task('build:assest', function () {
  var copyAssest = gulp.src(['src/client/assets/**/*.*'])
    .pipe(gulp.dest('dist/app/assests'));

  return [copyAssest];
});

gulp.task('build:app', function () {
  var tsProject = ts.createProject('./tsconfig.json');
  var tsResult = gulp.src('src/client/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/app'));
});

gulp.task('build:clean', cb=> {
  rimraf(paths.dist, cb);
});

gulp.task('build:babel', () => {
  return gulp.src([paths.src + '/**/*.js', '!./test/**'])
    .pipe(gulpbabel())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build:ts', ()=> {
  var tsProject = ts.createProject('tsconfig.node.json');
  var tsResult = gulp.src(paths.src + '/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist));
});

var express;

gulp.task('server', ()=> {
  express = server(paths.dist + '/server/server.js', {env: {NODE_ENV: 'dev'}});
});

gulp.task('restart', ()=> {
  express.start.bind(express)();
});

gulp.task('watch', ()=> {
  return gulp.watch(paths.src + '/**/*.*', ['build:dev']);
});