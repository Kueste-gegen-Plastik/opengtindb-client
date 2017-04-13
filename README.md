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
After instantiating the package, use `opengtindb.get(<ean>)` to query information about an EAN.  

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
            contents: ['lactose_free', 'caffeine_free', 'gluten_free'],
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

To create a new product use the `post` method and provide the mandatory params within the options object.
For development purposes there is a "test" param that prevents the API from creating database entrys. 
It can be activated by provding a second, boolean param to the post method: `post({...}, true)`.

**Example**
```js
var tst = opengtindb.post({
    ean: 47114223666, // ean - mandatory
    name: 'Foo', // Generic product name - mandatory
    fcat1: 'Waschen, Reinigen', // main category title - mandatory
    fcat2: 'WC- und Bad Reiniger', // sub category title - mandatory
    fullname : 'Foo Bar Product', // full product name
    vendor: 'Acme corp' // vendor,
    descr: 'Some description'
}).then(res => {
    // the result will be 
    // { error: '0', data: [ {} ] }
    console.log(res);
}).catch(err => {
    // errors from the api get thrown as
    // an js-error. be sure to catch and handle them
    // accordingly
    console.log(err);
})
```

