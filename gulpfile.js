/**
* 1.Less 编译压缩合并
* 2.Js合并压缩混淆
* 3。img 复制
* 4.html压缩
**/
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
var htmlmin=require('gulp-htmlmin');
var browserSync=require('browser-sync');



//1.Less 编译压缩合并
gulp.task('style',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));
})
//2.Js合并压缩混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('index.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({stream:true}));
})

gulp.task('serve',function(){
	browserSync({server:{baseDir:['dist']}}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['img']);
	gulp.watch('src/*.html',['html']);
});
// 3。img 复制,压缩

gulp.task('img',function(){
	gulp.src('src/images/*')
	//.pipe(imagemin())
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
})
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({removeComments:true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
})

//css js 版本

/* 没搞懂
var runSequence=require('run-sequence'),
	rev=require('gulp-rev'),
	revCollector=require('gulp-rev-collector');

gulp.task('revcss',function(){
	gulp.src('src/styles/*')
	.pipe(rev())
	.pipe(rev.manifest())
	.pipe(gulp.dest('dist/styles'))
})
gulp.task('revjs',function(){
	gulp.src('src/scripts/*')
	.pipe(rev())
	.pipe(rev.manifest())
	.pipe(gulp.dest('dist/scripts'))
})
gulp.task('revhtml',function(){
	gulp.src(['src/*.html'])
	.pipe(revCollector())
	.pipe(rev.manifest())
	.pipe(gulp.dest('dist'))
})

gulp.task('dev',function(done){
	condition=false;
	runSequence(['revcss'],['revjs'],['revhtml'],done);
})
gulp.task('version',['dev']);
*/