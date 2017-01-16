import babel from 'gulp-babel';
import gulp from 'gulp'; 
import print from 'gulp-print';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import changed from 'gulp-changed';
import nodemon from 'gulp-nodemon';
 const SOURCE = './server/.**/*',
 SOURCE_JS = './server/**/*.js',
 SOURCE_IGNORE_JS = '!./server/**/*.js',
 TARGET_SERVER = './build/server';

 //watch files server
 let files_web = ['./server/**/*.html',
 	'./server/**/*.json',
 	'./server/**/*.css',
 	SOURCE_IGNORE_JS
 ];

let compile = (source, target) => {
	return gulp.src(source)
		.pipe(babel())
		.pipe(gulp.dest(target));
};

gulp.task('copy:server', () => {
	return gulp.src([SOURCE, SOURCE_IGNORE_JS])
		.pipe(gulp.dest(TARGET_SERVER));
})			

 gulp.task('compile:server', () => {
 	return compile(SOURCE_JS, TARGET_SERVER);
 });


gulp.task('watch:server-assets', () => {
	return watch(files_web)
		.pipe(print())
		.pipe(gulp.dest(TARGET_SERVER));
});

//Watch server js files
gulp.task('watch:server-resource', ()=> {
	gulp.watch(SOURCE_JS, ['sync:server-resource']);
});


gulp.task('sync:server-resource', () => {
	let babelWatch = babel().on('error', (error) => {
		gutil.log(gutil.colors.red('[Compilation Error]'));
		gutil.log(gutil.colors.red(error.message));
		console.log(err.stack);
		babel.emit('end');
	});
	return gulp.src(SOURCE_JS)
		.pipe(changed(TARGET_SERVER))
		.pipe(print())
		.pipe(babelWatch)
		.pipe(gulp.dest(TARGET_SERVER));
});
//----------------------------------------------------------

gulp.task('watch:server', [
	'watch:server-assets',
	'watch:server-resource',
	'nodemon'
]);

gulp.task('nodemon', () => {
	return nodemon({
		exec: 'cd build/server && node server.js',
		ext: 'js',
		watch: [TARGET_SERVER]
	}).on('restart', ()=> {
		console.info('Server Restarted!');
	});
});

gulp.task('build:server-test', [
	'copy:server',
	'compile:server'
]);