import gulp from 'gulp';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import gulpbabel from 'gulp-babel';
import path from  'path';
import ts from 'gulp-typescript';
import sourcemaps from  'gulp-sourcemaps';

const paths = {
  src: ['./src'],
  dest: './dist'
};

/*
 jsNPMDependencies, sometimes order matters here! so becareful!
 */
const jsNPMDependencies = [
  'angular2/bundles/angular2-polyfills.js',
  'systemjs/dist/system.src.js',
  'rxjs/bundles/Rx.js',
  'angular2/bundles/angular2.dev.js',
  'angular2/bundles/router.dev.js'
];

gulp.task('default', (cb)=> {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', (cb)=> {
  run('build:clean', 'build:babel', 'build:index', 'build:app', 'restart', cb);
});

gulp.task('build:index', function () {
  var mappedPaths = jsNPMDependencies.map(file => {
    return path.resolve('node_modules', file)
  });

  //Let's copy our head dependencies into a dist/libs
  var copyJsNPMDependencies = gulp.src(mappedPaths, {base: 'node_modules'})
    .pipe(gulp.dest('dist/libs'));

  //Let's copy our index into dist
  var copyIndex = gulp.src('src/client/index.html')
    .pipe(gulp.dest('dist'));
  return [copyJsNPMDependencies, copyIndex];
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
  rimraf(paths.dest, cb);
});

gulp.task('build:babel', () => {
    return gulp.src(paths.src + '/**/*.js')
        .pipe(gulpbabel())
        .pipe(gulp.dest(paths.dest));
});

let express;

gulp.task('server', ()=> {
    express = server(paths.dest + '/server/server.js', {env: {NODE_ENV: 'dev'}});
});

gulp.task('restart', ()=> {
    express.start.bind(express)();
});

gulp.task('watch', ()=> {
    return gulp.watch(paths.src + '/**/*.*', ['build']);
});

