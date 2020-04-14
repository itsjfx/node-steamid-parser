const request = require('request-promise-native');
const isNumber = require('is-number');
const SteamID = require('steamid');

class SteamIDParser {
	/**
	 * A SteamIDParser instance
	 * @constructor
	 * @param {string} apiKey - API key that will be used for any requests, can be overriden per request
	 * @param {Object} [options] - Contains optional settings for the parser
	 * @param {boolean} [options.checkForAccountID=false] - Sets whether the parser should check if the input given is an accountid if it's a number.
	 * 		checkNumberForVanity is recommended to be off if this setting is on. This setting would be useful for any Dota 2 api's as Dota 2 relies on accountids.
	 * @param {boolean} [options.checkNumberForVanity=true] - Sets whether the parser should check for a matching vanity if the input is a number.
	 * 		Recommended to turn off if you have checkForAccountID on.
	 */
	constructor(apiKey, options) {
		this.apiKey = apiKey;
		if (!options) options = {};
		this.options = options;
		this.options.checkForAccountID = this.options.checkForAccountID || false;
		if (this.options.checkNumberForVanity == null)
			this.options.checkNumberForVanity = true;
	}

	/**
	 * Gets a node-steamid object for a user from a given input
	 * @param {string|Number} input - the input, steam64, STEAM_, vanity url, link to profile, etc
	 * @param {Object} [options] - Contains optional settings for the parser
	 * @param {string} [options.apiKey] - optional, if not given uses apiKey from constructor
	 * @param {boolean} [options.checkForAccountID=false] - Sets whether the parser should check if the input given is an accountid if it's a number.
	 * 		checkNumberForVanity is recommended to be off if this setting is on. This setting would be useful for any Dota 2 api's as Dota 2 relies on accountids.
	 * @param {boolean} [options.checkNumberForVanity=true] - Sets whether the parser should check for a matching vanity if the input is a number.
	 * 		Recommended to be off if you have checkForAccountID on.
	 * @returns {Promise} Returns node-steamid object for the steamid, rejects if not
	 */
	get(input, options) {
		return new Promise(async(resolve, reject) => {
			options = Object.assign({}, this.options, options);
			console.log(options);
			let steamid;
			if (!input || typeof input != 'string' && typeof input != 'number')
				return reject(new Error("Invalid input"));

			if (typeof input == 'number')
				input = input.toString();

			input = input.replace(/\s/g, '');
			if (input.includes('//steamcommunity.com/')) {
				input = this._cleanURL(input);
			}
			
			// Do a small check to see if it's already valid before doing a request
			try {
				steamid = new SteamID(input);
			} catch (err) {}
	
			if ((!steamid || !steamid.isValid()) && (isNumber(input) && options.checkNumberForVanity || !isNumber(input))) { // check to parse vanity if not already valid
				try {
					input = await this._getSteamIDFromVanity(input, options.apiKey);
				} catch (err) {
					if (!isNumber(input))
						return reject(err);
				}
			}

			// We should have a steamid to check now
			if (!steamid || !steamid.isValid())
				steamid = new SteamID(input);
			if (!steamid.isValid() && options.checkForAccountID && isNumber(input)) // It might be an account ID instead... we can check for that too
				steamid = SteamID.fromIndividualAccountID(input);

			if (!steamid.isValid())
				return reject(new Error("Invalid SteamID"));
			resolve(steamid);
		});
	}

	/**
	 * Helper function to remove everything except the last path in a url, e.g. _cleanURL("https://example.com/asdf/") = asdf
	 * @param {string} url - URL to chop
	 */
	_cleanURL(url) {
		if (url.substring(url.length-1) == "/") //remove slash at end if exists
			url = url.substring(0, url.length-1);
	
		return url.split('/').pop();
	}

	/**
	 * Helper function to get a SteamID64 from a vanity
	 * @param {string} vanity - the vanity of a user 
	 * @param {string} [apiKey] - optional, if not given uses apiKey from constructor
	 */
	_getSteamIDFromVanity(vanity, apiKey) {
		if (!apiKey) apiKey = this.apiKey;
		return request({
			url: `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${vanity}&url_type=1`,
			json: true
		})
		.then((data) => {
			const res = data.response;
			if (!res || res.success !== 1) {
				return Promise.reject(res && res.message ? new Error(res.message) : new Error("No match"));
			} else {
				return Promise.resolve(res.steamid);
			}
		});
	}
}

module.exports = SteamIDParser;