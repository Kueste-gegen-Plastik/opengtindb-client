# opengtindb-client
A NodeJS Client to read/write the Open EAN/GTIN Database API (http://opengtindb.org/).   
THIS IS BETA SOFTWARE AND CURRENTLY UNDER DEVELOPMENT. DO NOT USE IN PRODUCTION!

## Requirements
- Node > 7.4.0 (remember to start your app with `--harmony` as this package uses ES6 Classes)
- An opengtindb API-Key (see http://opengtindb.org/api.php for more details on how to obtain one).

## Installation
Install via npm: `npm install --save opengtindb-client`  
Require the client inside your NodeJS application: `const opengtindb = require('opengtindb-client')(<api key>)`.

## Usage

### GET
After instantiating the package, use `opengtindb.getEan(<ean>)` to query information about an EAN.  

**Example**
```js
opengtindb.get('3057640360718').then(res => {
    console.log(res);
})
/**
PRINTS:
{ 
    error: '0',
    data: [ 
    {    asin: '',
            name: 'Apfelschorle',
            detailname: 'Volvic Apfel',
            vendor: 'Danone Waters Deutschland GmbH',
            maincat: 'Getränke, Alkohol',
            subcat: 'Limonaden',
            maincatnum: '11',
            subcatnum: '7',
            contents: [Object],
            pack: '0',
            origin: 'Frankreich',
            descr: 'Erfrischungsgetränk aus natürlichen Mineralwasser mit Fruchtgeschmack\\nZutaten: Natürliches Mineralwasser Volvic (95,7%), Zucker (3%), Säuerun
        gsmittel: Citonensäure, Aroma, Konservierungsstoff: Kaliumbenzoat',
            name_en: '',
            detailname_en: '',
            descr_en: '',
            validated: '100 %' 
        },
    ] 
}
**/
```


### POST

TBD


