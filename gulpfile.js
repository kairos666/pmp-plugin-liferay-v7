let gulp        = require('gulp'),
    babel       = require('gulp-babel'),
    rename      = require('gulp-rename'),
    merge       = require('merge2'),
    ts          = require('gulp-typescript'),
    tsProject   = ts.createProject('./ts/tsconfig.json');

gulp.task('ts-compiling', function () {
    let tsResult = tsProject.src()
        .pipe(tsProject());

    return merge([
        tsResult.js.pipe(gulp.dest('js/')),
        tsResult.dts.pipe(gulp.dest('js/'))
    ]);
});

gulp.task('jsx-compiling', function(){
  return gulp.src('jsx/**/*.jsx')
    .pipe(babel({ presets: ['es2015', 'react'] }))
    .pipe(rename({extension: 'js'}))
    .pipe(gulp.dest('js/'))
});

gulp.task('watch-compiling', function(){
    //update typescript
    gulp.watch('ts/**/*.ts', ['ts-compiling']);

    //update jsx
    gulp.watch('jsx/**/*.jsx', ['jsx-compiling'])
});