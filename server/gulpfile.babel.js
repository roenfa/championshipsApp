import fs from 'fs';
import gulp from 'gulp';



fs.readdirSync('./gulp_tasks').filter(function(file){
	return (/\.(js)$/i).test(file);
}).map(function(file) {
	require('./gulp_tasks/'+ file);
});

gulp.task('default', ['clean'], function(){
	gulp.start('develop');
});