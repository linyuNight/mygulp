var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var spritesmith=require('gulp.spritesmith');

var Asset = {
	css:'scss/**/*.scss',
	all:'client/**/*.*',
	sprite:'client/image/*.png'
}

gulp.task('sass',function(){
	gulp.src(Asset.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('client/css'))
		.pipe(connect.reload());
})

gulp.task('autoSprite', function () {
  gulp.src(Asset.sprite).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 20 
  })).pipe(gulp.dest('client/image'));
});

gulp.task('toreload',function(){
	gulp.src(Asset.all)
		.pipe(connect.reload());
})

gulp.task('watch',function(){
	gulp.watch(Asset.css,['sass']);
	gulp.watch(Asset.sprite,['autoSprite']);
	gulp.watch(Asset.all,['toreload']);
})

gulp.task('connect',function(){
	connect.server({
		root: 'client',
		livereload:true
	});
})

gulp.task('default',['sass','watch','connect','autoSprite'],function() {
  	
});