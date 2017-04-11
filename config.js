module.exports = {
    cat1 : ["Baby, Kind", "Backwaren", "Brotaufstriche", "Dessert, Nachtisch",
            "Eier", "Elektrisch", "Elektronische Artikel", "Fertiggerichte",
            "Fleisch, Fisch", "Früchte, Obst", "Gemüse", "Getränke, Alkohol",
            "Haushalt, Büro", "Kochzutaten", "Konditorei, Zuckerwaren",
            "Kosmetische Mittel", "Milchprodukte", "Präparate", "Raucherwaren",
            "Sojaprodukte", "Süsswaren, Snacks", "Teigwaren, Getreideprodukte",
            "Tierbedarf", "Waschen, Reinigen", "Zusatzstoffe","Haus, Hof und Freizeit"],
    cat2 : [
        ["Ausstattung","Babygetränke","Babynahrung","Gesundheit, Pflege","Kleider, Textilien","Spiele Lernen","Wickel"],
        ["Backmischungen","Backzutaten","Brotarten","Dauerbackwaren, Zwieback","Frischbackwaren","Gebäck, Panettone", "Hefe","Kuchen, Cakes","Teig"],
        ["Honig","Konfitüren, Marmeladen","verschiedene"],
        ["Creme","Pudding","Speiseeis"],
        ["Eier"],
        ["Anschluss-und Verbrauchsmaterial","Batterien","Licht","Netzteile, Ladegeräte"],
        ["Computer","Fotografie","HIFI","Massenspeichermedien","PDA","TV, Fernsehen","Telefon","Uhren","Video","DVD","BD (Blu-ray)"],
        ["Andere","Asia Gerichte","Bouillon, Brühe","Fleischerzeugnisse","Gericht, Menü","Kartoffelprodukte","Pasta", "Pizza","Salat","Sandwich","Saucen","Suppen","Tiefgekühltes, Tiefkühlkost"],
        ["Fisch","Fischkonserven","Fleischkonserven","Frischfleisch","Geflügel","Meeresfrüchte","Trockenfleisch, Salami", "Wurstwaren"],
        ["Exotische Früchte","Früchte, Obst","Nüsse","Obstkonserven","Trockenfrüchte","kandierte Früchte"],
        ["Antipasti","Essigkonserven","Gemüse","Gemüsekonserven","Salat","Trockengemüse"],
        ["Alcopops","Bier","Energy Drinks","Frucht-und Gemüsesäfte","Instantgetränke","Kaffee","Kakao,Schokoladen", "Limonaden","Mineralwasser","Sirup","Spirituosen","Tee","Wein/Sekt/Champagner"],
        ["Bücher allgemein","Fachbücher","Literatur","Bügeln, Textilpflege","Dekoration","Essen","Garten", "Kleider, Textilien","Küche","Küchen-, Haushaltgeräte","Mercerie","Papeterie", "Zeitungen, Zeitschriften allgemein","Fachzeitungen, -zeitschriften","Schreib- und Zeichengeräte"],
        ["Backpulver","Essig","Frische Gewürze","Gelatine","Gewürze","Mehl","Öl, Fette","Salz", "Senf, Mayonnaise, Püree, Cremen","Stärkearten"],
        ["Kuchendekoration","Marzipan","Süßstoffe","Zucker"],
        ["Badezusätze","Gesichtspflege","Haarpflege","Körperpflege","Make-up Artikel","Monatshygiene","Nagel, Fusspflege", "Parfüm","Pflaster, Watte","Rasierprodukte","Schwangerschaftstest","Sonnen-, Insektenschutz","Toilettenartikel", "Verhütung","Zahnpflege"],
        ["Butter, Margarine","Joghurt","Käse","Milch","Milchgetränke","Quark","Rahm, Rahmprodukte"],
        ["Calcium","Magnesium","Medikamente","Sonstige","Vitamine","kombinierte Präparate"],
        ["Tabak","Zigaretten","Zigarren","Zubehör"],
        ["Sojamilch","Sojasaucen","Tofu","sonstiges"],
        ["Bisquits, Kekse, Konfekt","Bonbons","Chips","Energiespender","Fruchtgummi","Getreide, Schokoriegel, Waffeln","Kaugummi", "Schokolade","salzige Snacks"],
        ["Frühstücksflocken","Getreide","Teigwaren"],
        ["Hunde","Katzen","Nager","Sonstige"],
        ["Abwaschen","Boden-und Teppichreiniger","Entkalker","Entsorgen","Fleckenreiniger","Glas-und Festerreiniger", "Küchenreiniger","Lufterfrischer","Putzgeräte und Zubehör","Putzmittel","Schuhpflege","Spezialreiniger", "WC- und Bad Reiniger","Waschmittel","Wohnzimmerreiniger"],
        ["Zusatzstoffe"],
        ["Baumaterialien","Farbe","Werkzeuge","Pflanzenmittel","Pflanzen","Modellbau","Sportgeräte","Sonstige","Spielzeug/Spiele"]
    ],
    errors : [
        {
            code :'OK',
            msg : 'Operation war erfolgreich'
        },
        {
            code: 'not found',
            msg: 'die EAN konnte nicht gefunden werden',
        },
        {
            code: 'checksum',
            msg: 'die EAN war fehlerhaft (Checksummenfehler)'
        },
        {
            code: 'EAN-format',
            msg: 'Die EAN war fehlerhaft (ungültiges Format / fehlerhafte Ziffernanzahl)'
        },
        {
            code: 'not a global',
            msg: 'Unique EAN - es wurde eine für interne Anwendungen reservierte EAN eingegeben (In-Store, Coupon etc.)'
        },
        {
            code: 'access limit exceeded',
            msg: 'Zugriffslimit auf die Datenbank wurde überschritten'
        },
        {
            code: 'no product name',
            msg: 'Es wurde kein Produktname angegeben'
        },
        {
            code: 'product name too long',
            msg: 'der Produktname ist zu lang (max. 20 Zeichen)'
        },
        {
            code: 'no or wrong main category id',
            msg: 'Die Nummer für die Hauptkategorie fehlt oder liegt außerhalb des erlaubten Bereiches'
        },
        {
            code: 'no or wrong sub category id',
            msg: 'die Nummer für die zugehörige Unterkategorie fehlt oder liegt außerhalb des erlaubten Bereiches'
        },
        {
            code: 'illegal data in vendor field',
            msg: 'Unerlaubte Daten im Herstellerfeld'
        },
        {
            code: 'illegal data in description field',
            msg: 'Unerlaubte Daten im Beschreibungsfeld'
        },
        {
            code: 'data already submitted',
            msg: 'Daten wurden bereits übertragen'
        }
    ],
    contentsMask : {
        'lactose_free' : 1,  // (binär 000000000001) - laktosefrei
        'caffeine_free' : 2,  // (binär 000000000010) - koffeeinfrei
        'diet_food' : 4, //(binär 000000000100) - diätetisches Lebensmittel
        'gluten_free' : 8, //(binär 000000001000) - glutenfrei
        'fructose_free' : 16, // (binär 000000010000) - fruktosefrei
        'organic_food' : 32, // (binär 000000100000) - BIO-Lebensmittel nach EU-Ökoverordnung
        'fairtrade' : 64, // (binär 000001000000) - fair gehandeltes Produkt nach FAIRTRADE™-Standard
        'vegetarian' : 128, // (binär 000010000000) - vegetarisch
        'vegan' : 256, //(binär 000100000000) - vegan
        'microplastic' : 512, //(binär 001000000000) - Warnung vor Mikroplastik
        'mineral_oil_warning' :  1024, // (binär 010000000000) - Warnung vor Mineralöl
        'nicotine_warning' :  2048  // (binär 100000000000) - Warnung vor Nikotin
    }
}