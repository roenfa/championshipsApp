import config from './config/config';
import http from 'http';
import App from './app';
let httpServer;
let app = new App(config);

app.loadModules()
.then(() => {
	httpServer = http.createServer(app.getAppServer());
	httpServer.listen(app.getAppServer().get('port'), () => {
		console.log('WebServer listen on the port', app.getAppServer().get('port'));
	});
})
.catch((err) => {
	console.log('Error');
	console.error(err.message);
    console.error(err.stack);
    console.error('cannot up server. ');
});

