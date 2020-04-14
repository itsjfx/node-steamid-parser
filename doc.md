<a name="SteamIDParser"></a>

## SteamIDParser
**Kind**: global class  

* [SteamIDParser](#SteamIDParser)
    * [new SteamIDParser(apiKey, [options])](#new_SteamIDParser_new)
    * [.get(input, [options])](#SteamIDParser+get) ⇒ <code>Promise</code>
    * [._cleanURL(url)](#SteamIDParser+_cleanURL)
    * [._getSteamIDFromVanity(vanity, [apiKey])](#SteamIDParser+_getSteamIDFromVanity)

<a name="new_SteamIDParser_new"></a>

### new SteamIDParser(apiKey, [options])
A SteamIDParser instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| apiKey | <code>string</code> |  | API key that will be used for any requests, can be overriden per request |
| [options] | <code>Object</code> |  | Contains optional settings for the parser |
| [options.checkForAccountID] | <code>boolean</code> | <code>false</code> | Sets whether the parser should check if the input given is an accountid if it's a number. 		checkNumberForVanity is recommended to be off if this setting is on. This setting would be useful for any Dota 2 api's as Dota 2 relies on accountids. |
| [options.checkNumberForVanity] | <code>boolean</code> | <code>true</code> | Sets whether the parser should check for a matching vanity if the input is a number. 		Recommended to turn off if you have checkForAccountID on. |

<a name="SteamIDParser+get"></a>

### steamIDParser.get(input, [options]) ⇒ <code>Promise</code>
Gets a node-steamid object for a user from a given input

**Kind**: instance method of [<code>SteamIDParser</code>](#SteamIDParser)  
**Returns**: <code>Promise</code> - Returns node-steamid object for the steamid, rejects if not  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| input | <code>string</code> \| <code>Number</code> |  | the input, steam64, STEAM_, vanity url, link to profile, etc |
| [options] | <code>Object</code> |  | Contains optional settings for the parser |
| [options.apiKey] | <code>string</code> |  | optional, if not given uses apiKey from constructor |
| [options.checkForAccountID] | <code>boolean</code> | <code>false</code> | Sets whether the parser should check if the input given is an accountid if it's a number. 		checkNumberForVanity is recommended to be off if this setting is on. This setting would be useful for any Dota 2 api's as Dota 2 relies on accountids. |
| [options.checkNumberForVanity] | <code>boolean</code> | <code>true</code> | Sets whether the parser should check for a matching vanity if the input is a number. 		Recommended to be off if you have checkForAccountID on. |

<a name="SteamIDParser+_cleanURL"></a>

### steamIDParser.\_cleanURL(url)
Helper function to remove everything except the last path in a url, e.g. _cleanURL("https://example.com/asdf/") = asdf

**Kind**: instance method of [<code>SteamIDParser</code>](#SteamIDParser)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL to chop |

<a name="SteamIDParser+_getSteamIDFromVanity"></a>

### steamIDParser.\_getSteamIDFromVanity(vanity, [apiKey])
Helper function to get a SteamID64 from a vanity

**Kind**: instance method of [<code>SteamIDParser</code>](#SteamIDParser)  

| Param | Type | Description |
| --- | --- | --- |
| vanity | <code>string</code> | the vanity of a user |
| [apiKey] | <code>string</code> | optional, if not given uses apiKey from constructor |

