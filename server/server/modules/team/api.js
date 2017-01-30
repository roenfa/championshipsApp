

export default class Api {

	static registerModule(apiMain) {
		apiMain.route('/team')
		.get((req, res) => {
			res.send('team');
		});


	} 

}