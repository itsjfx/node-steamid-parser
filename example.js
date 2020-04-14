const Parser = require('./index.js');

const parser = new Parser(process.env.STEAM_API_KEY || 'YOUR_API_KEY', { // Options object are set by default to these values
	checkForAccountID: false,
	checkNumberForVanity: true
});

parser.get('76561197993496553')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('33230825', {checkForAccountID:true, checkNumberForVanity:false}) // overriding options per request
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('jfxmate', {apiKey: ""})
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('jfxmate')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('https://steamcommunity.com/id/jfxmate/')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('https://steamcommunity.com/id/jfxmate')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});

parser.get('https://steamcommunity.com/profiles/76561197993496553')
.then(res => {
	console.log('res', res);
})
.catch(err => {
	console.log('err', err);
});