import gulp from 'gulp';
import clean from 'gulp-clean';

let BUILD_FOLDER = 'build';

gulp.task('clean', () => {
	return gulp.src(BUILD_FOLDER, {read: false}).pipe(clean());
});


gulp.task('develop', ['build:server-test'], () => {
	gulp.start('watch:server');
});