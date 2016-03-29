import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

const paths = {
    js: ['./src/**/*.js'],
    config:['./src/configuration/*.json'],
    dest: './app'
};

gulp.task('default', (cb)=> {
    run('server', 'build', 'watch', cb);
});

// gulp.task('build', (cb)=>{
//    run('clean', 'flow', 'babel', 'restart', cb); 
// });

gulp.task('build', (cb)=> {
    run('clean', 'copy', 'babel' ,'restart', cb);
});

gulp.task('copy', (cb)=> {
    run('copy-package', 'copy-configuration', cb);
});

gulp.task('copy-configuration', ()=>{
    return gulp.src(paths.config)
        .pipe(gulp.dest(paths.dest + '/configuration/'));
});

gulp.task('copy-package', ()=>{
    return gulp.src(['./*.json'])
        .pipe(gulp.dest(paths.dest));
});

gulp.task('clean', cb=> {
    rimraf(paths.dest, cb);
})

// gulp.task('flow', shell.task([
//     'flow'
// ]),{ignoreErrors: true});

gulp.task('babel', shell.task([
    'babel src --out-dir app'
]));

let express;

gulp.task('server', ()=> {
    //express = server.new('./app/index.js');
    express = server('./app/index.js', {env: {NODE_ENV: 'dev'}});
});

gulp.task('restart', ()=> {
    express.start.bind(express)();
});

gulp.task('watch', ()=> {
    return watch(paths.js, () => {
        gulp.start('build');
    });
});
