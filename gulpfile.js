'use strict';
/*1.less编译 压缩 合并*/
/*2.js合并 压缩混淆*/
/*3.img复制*/
/*4.html压缩*/

//在gulpfile中先载入gulp包，因为包里有API
var  gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat  = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin  = require('gulp-htmlmin');
var browserSync = require('browser-sync');
gulp.task('style',function(){
  //执行style任务时自动执行
  gulp.src(['src/style/*.less','!src/style/_*.less'])
  .pipe(less())
  .pipe(cssnano())/*less没必要合并，可用@import导包*/
  .pipe(gulp.dest('dist/style'))
  .pipe(browserSync.reload({stream:true}))
});


gulp.task('script',function(){
  gulp.src('src/script/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/script'))
  .pipe(browserSync.reload({stream:true}))
});

gulp.task('image',function(){
  gulp.src('src/images/*.*')
  .pipe(gulp.dest('dist/images'))
  .pipe(browserSync.reload({stream:true}))
});


gulp.task('html',function(){
  gulp.src('src/*.html')
  .pipe(htmlmin({
    collapseWhitespace:true,
    removeComments:true
  }))
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.reload({stream:true}))
});

gulp.task('serve',function(){
  browserSync({
    server:{
      baseDir:['dist']
    },
  },function(err,bs){
    console.log(bs.options.getIn(["urls","local"]))
  });
  gulp.watch('src/style/*.less',gulp.series('style'));
  gulp.watch('src/script/*.js',gulp.series('script'));
  gulp.watch('src/images/*.*',gulp.series('image'));
  gulp.watch('src/*.html',gulp.series('html'));
});
