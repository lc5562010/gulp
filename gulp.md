#### 定义
Gulp 是一个基于流的自动化构建工具。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面5个方法就可以胜任几乎所有构建场景：
- 通过 gulp.task 注册一个任务；
- 通过 gulp.run 执行任务；
- 通过 gulp.watch 监听文件变化；
- 通过 gulp.src 读取文件；
- 通过 gulp.dest 写文件。

---
#### 特点
Gulp 的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下：
```
// 引入 Gulp
var gulp = require('gulp'); 
// 引入插件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 编译 SCSS 任务
gulp.task('sass', function() {
  // 读取文件通过管道喂给插件
  gulp.src('./scss/*.scss')
    // SCSS 插件把 scss 文件编译成 CSS 文件
    .pipe(sass())
    // 输出文件
    .pipe(gulp.dest('./css'));
});

// 合并压缩 JS
gulp.task('scripts', function() {
  gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// 监听文件变化
gulp.task('watch', function(){
  // 当 scss 文件被编辑时执行 SCSS 任务
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts']);    
});
```

---
#### 优缺点
Gulp 的优点是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。其缺点是和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用。

---
#### 流的概念
gulp是基于node的，但是它并没有直接使用node中fs模块里的文件系统和流，而是包装了一层[vinyl](https://www.cnblogs.com/wyaocn/p/5804342.html)。 vinyl是一个用来描述文件的简单的数据格式，通过vinyl-fs可以把node原生的文件系统封装成vinyl。 这个封装使得整个流的过程更加简单。

---
#### 管道
与原生的fs相同，vinyl使用管道也是用pipe方法。 pipe接受一个函数为参数，将当前流的内容传给这个函数让其加工，vinyl把流的内容封装得更加简明好用， 而且，对于调用一次pipe方法，其传入的函数会对这个流的所有文件作用，换句话说，==传入pipe方法的函数实际上是针对一个文件的， 而流中所有的文件都会被这个函数加工一下==。这么看，vinyl的流有些并行的感觉，但本质上说javascript是单线程的， 加工的过程还是一个接着一个进行的，所以说成让文件一个接一个地流过某个管道更确切。==不过处理流的代码是异步的==。

---
参考链接
- [gulp的流与执行顺序](https://www.cnblogs.com/wyaocn/p/5804342.html)
- [Gulp 基础与原理](https://segmentfault.com/a/1190000008513154)