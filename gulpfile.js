var gulp = require('gulp'),
    debug = require('gulp-debug'),
    uglify = require('gulp-uglify'),  //js压缩
    cleanCSS = require('gulp-clean-css'),  //css压缩
    rev = require('gulp-rev'); //文件MD5 json文件


const distPath = './dist';  //最终输出路径
const buildPath = './src'  //初始要处理的文件路径


//demo(pipe里面的函数执行是异步的)
gulp.task('demo', function (file) {
    strem = gulp.src(buildPath + '/js/*.js')
        .pipe(debug({ title: 'js压缩:' }))
        .pipe(uglify())
        .pipe(debug({ title: 'js加哈希:' }))
        .pipe(rev())
        .pipe(gulp.dest(distPath + '/js'))
    console.log('完成');
    return strem;
});


gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});