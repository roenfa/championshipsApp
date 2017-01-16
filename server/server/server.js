import express from 'express';

let app = express();

app.get('/', (req, res) => {
	res.send('Hello WOrld');
});

app.listen(3000, () => {
	console.log('Examples app listening on port');
})