const gulp = require('gulp');
const sass = require('gulp-sass');
const copy = require('gulp-copy');

gulp.task('sass', () => {
  gulp
    .src('./src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src'));
});

gulp.task('watch:sass', ['sass'], () => {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('copy:fonts', () => {
  gulp
    .src([
      './src/components/**/*.eot',
      './src/components/**/*.svg',
      './src/components/**/*.ttf',
      './src/components/**/*.woff',
      './src/components/**/*.woff2'
    ])
    .pipe(copy('./lib', { prefix: 2 }))
    .pipe(gulp.dest('./lib'));
});