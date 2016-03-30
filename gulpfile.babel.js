import gulp from 'gulp';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import gulpbabel from 'gulp-babel';

const paths = {
    src: ['./src/**/*.js'],
    dest: './dist'
};

gulp.task('default', (cb)=> {
    run('server', 'build', 'watch', cb);
});

gulp.task('build', (cb)=> {
    run('build:clean', 'build:babel' ,'restart', cb);
});


gulp.task('build:clean', cb=> {
    rimraf(paths.dest, cb);
})

gulp.task('build:babel', () => {
    return gulp.src(paths.src)
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
    return gulp.watch(paths.src,['build']);
});



/*

gulp.task('build:copy', (cb)=> {
    run('build:copy-package', 'build:copy-configuration', cb);
});

gulp.task('build:copy-configuration', ()=>{
    return gulp.src(paths.config)
        .pipe(gulp.dest(paths.dest + '/configuration/'));
});

gulp.task('build:copy-package', ()=>{
    return gulp.src(['./!*.json'])
        .pipe(gulp.dest(paths.dest));
});*/
