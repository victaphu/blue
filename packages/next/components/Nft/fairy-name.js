var aVocab = new Array();

var intIncr
var intCat

intCat = 0
intIncr = 0

//The data stored is pretty simple.  It works like this:
//
// The aVocab array has sub arrays that are named lists of data.
//
//aVocab[intCat]= new Array(); - The aVocab Array actually holds other arrays.
//aVocab[intCat][0]="FIRST" - This is the name of the list of data in this sub array.  The name helps the program find the data.
//aVocab[intCat][1] = new Array() - Yep, ANOTHER array - this is the array that holds the actual data.
//aVocab[intCat][1][intIncr++]="First thing <SECOND>" // See that <SECOND> tag?  Anything in brackets references another list.
//aVocab[intCat][1][intIncr++]="First thing <THIRD>"
//
// Unless it's the last entry, don't forget to increment and reset the counters!
//
//intCat++
//intIncr=0


aVocab[intCat] = new Array();
aVocab[intCat][0] = "FIRST"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<options>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "options"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<firstname> <lastname>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "firstname"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "Agate"
aVocab[intCat][1][intIncr++] = "Alder"
aVocab[intCat][1][intIncr++] = "Alfalfa"
aVocab[intCat][1][intIncr++] = "Almond"
aVocab[intCat][1][intIncr++] = "Aloe"
aVocab[intCat][1][intIncr++] = "Alyssum"
aVocab[intCat][1][intIncr++] = "Amaranth"
aVocab[intCat][1][intIncr++] = "Amber"
aVocab[intCat][1][intIncr++] = "Amethyst"
aVocab[intCat][1][intIncr++] = "Anemone"
aVocab[intCat][1][intIncr++] = "Anise"
aVocab[intCat][1][intIncr++] = "Apple"
aVocab[intCat][1][intIncr++] = "Apricot"
aVocab[intCat][1][intIncr++] = "Arbutus"
aVocab[intCat][1][intIncr++] = "Ash"
aVocab[intCat][1][intIncr++] = "Aspen"
aVocab[intCat][1][intIncr++] = "Aster"
aVocab[intCat][1][intIncr++] = "Autumn"
aVocab[intCat][1][intIncr++] = "Bay"
aVocab[intCat][1][intIncr++] = "Bark"
aVocab[intCat][1][intIncr++] = "Barley"
aVocab[intCat][1][intIncr++] = "Beech"
aVocab[intCat][1][intIncr++] = "Berry"
aVocab[intCat][1][intIncr++] = "Beryl"
aVocab[intCat][1][intIncr++] = "Betony"
aVocab[intCat][1][intIncr++] = "Birch"
aVocab[intCat][1][intIncr++] = "Birk"
aVocab[intCat][1][intIncr++] = "Blackberry"
aVocab[intCat][1][intIncr++] = "Blossom"
aVocab[intCat][1][intIncr++] = "Bluebell"
aVocab[intCat][1][intIncr++] = "Blueberry"
aVocab[intCat][1][intIncr++] = "Borage"
aVocab[intCat][1][intIncr++] = "Bracken"
aVocab[intCat][1][intIncr++] = "Breeze"
aVocab[intCat][1][intIncr++] = "Briar"
aVocab[intCat][1][intIncr++] = "Briony"
aVocab[intCat][1][intIncr++] = "Brook"
aVocab[intCat][1][intIncr++] = "Buck"
aVocab[intCat][1][intIncr++] = "Buckthorn"
aVocab[intCat][1][intIncr++] = "Burdock"
aVocab[intCat][1][intIncr++] = "Calla"
aVocab[intCat][1][intIncr++] = "Camellia"
aVocab[intCat][1][intIncr++] = "Carrot"
aVocab[intCat][1][intIncr++] = "Cedar"
aVocab[intCat][1][intIncr++] = "Celery"
aVocab[intCat][1][intIncr++] = "Chamomile"
aVocab[intCat][1][intIncr++] = "Cherry"
aVocab[intCat][1][intIncr++] = "Chicory"
aVocab[intCat][1][intIncr++] = "Clay"
aVocab[intCat][1][intIncr++] = "Cloud"
aVocab[intCat][1][intIncr++] = "Clove"
aVocab[intCat][1][intIncr++] = "Clover"
aVocab[intCat][1][intIncr++] = "Coal"
aVocab[intCat][1][intIncr++] = "Columbine"
aVocab[intCat][1][intIncr++] = "Comfrey"
aVocab[intCat][1][intIncr++] = "Coral"
aVocab[intCat][1][intIncr++] = "Coriander"
aVocab[intCat][1][intIncr++] = "Cricket"
aVocab[intCat][1][intIncr++] = "Crystal"
aVocab[intCat][1][intIncr++] = "Cypress"
aVocab[intCat][1][intIncr++] = "Daisy"
aVocab[intCat][1][intIncr++] = "Dandelion"
aVocab[intCat][1][intIncr++] = "Dawn"
aVocab[intCat][1][intIncr++] = "Diamond"
aVocab[intCat][1][intIncr++] = "Dill"
aVocab[intCat][1][intIncr++] = "Drake"
aVocab[intCat][1][intIncr++] = "Dulse"
aVocab[intCat][1][intIncr++] = "Dusk"
aVocab[intCat][1][intIncr++] = "Dahlia"
aVocab[intCat][1][intIncr++] = "Elm"
aVocab[intCat][1][intIncr++] = "Ember"
aVocab[intCat][1][intIncr++] = "Fawn"
aVocab[intCat][1][intIncr++] = "Feather"
aVocab[intCat][1][intIncr++] = "Fennel"
aVocab[intCat][1][intIncr++] = "Fern"
aVocab[intCat][1][intIncr++] = "Fig"
aVocab[intCat][1][intIncr++] = "Figwort"
aVocab[intCat][1][intIncr++] = "Finch"
aVocab[intCat][1][intIncr++] = "Flax"
aVocab[intCat][1][intIncr++] = "Flint"
aVocab[intCat][1][intIncr++] = "Forest"
aVocab[intCat][1][intIncr++] = "Fox"
aVocab[intCat][1][intIncr++] = "Foxglove"
aVocab[intCat][1][intIncr++] = "Frost"
aVocab[intCat][1][intIncr++] = "Gale"
aVocab[intCat][1][intIncr++] = "Garnet"
aVocab[intCat][1][intIncr++] = "Gentian"
aVocab[intCat][1][intIncr++] = "Geranium"
aVocab[intCat][1][intIncr++] = "Ginger"
aVocab[intCat][1][intIncr++] = "Glen"
aVocab[intCat][1][intIncr++] = "Gourd"
aVocab[intCat][1][intIncr++] = "Groundsel"
aVocab[intCat][1][intIncr++] = "Hawk"
aVocab[intCat][1][intIncr++] = "Hawthorn"
aVocab[intCat][1][intIncr++] = "Hazel"
aVocab[intCat][1][intIncr++] = "Heath"
aVocab[intCat][1][intIncr++] = "Heather"
aVocab[intCat][1][intIncr++] = "Hemlock"
aVocab[intCat][1][intIncr++] = "Hickory"
aVocab[intCat][1][intIncr++] = "Holly"
aVocab[intCat][1][intIncr++] = "Honey"
aVocab[intCat][1][intIncr++] = "Honeysuckle"
aVocab[intCat][1][intIncr++] = "Huckleberry"
aVocab[intCat][1][intIncr++] = "Hyacinth"
aVocab[intCat][1][intIncr++] = "Hyssop"
aVocab[intCat][1][intIncr++] = "Iris"
aVocab[intCat][1][intIncr++] = "Ivy"
aVocab[intCat][1][intIncr++] = "Jade"
aVocab[intCat][1][intIncr++] = "Jasmine"
aVocab[intCat][1][intIncr++] = "Jet"
aVocab[intCat][1][intIncr++] = "Jonquil"
aVocab[intCat][1][intIncr++] = "Juniper"
aVocab[intCat][1][intIncr++] = "Larch"
aVocab[intCat][1][intIncr++] = "Lark"
aVocab[intCat][1][intIncr++] = "Laurel"
aVocab[intCat][1][intIncr++] = "Leaf"
aVocab[intCat][1][intIncr++] = "Lilac"
aVocab[intCat][1][intIncr++] = "Lily"
aVocab[intCat][1][intIncr++] = "Linden"
aVocab[intCat][1][intIncr++] = "Luna"
aVocab[intCat][1][intIncr++] = "Magnolia"
aVocab[intCat][1][intIncr++] = "Mallow"
aVocab[intCat][1][intIncr++] = "Mandrake"
aVocab[intCat][1][intIncr++] = "Maple"
aVocab[intCat][1][intIncr++] = "Marigold"
aVocab[intCat][1][intIncr++] = "Marina"
aVocab[intCat][1][intIncr++] = "Melody"
aVocab[intCat][1][intIncr++] = "Mint"
aVocab[intCat][1][intIncr++] = "Mist"
aVocab[intCat][1][intIncr++] = "Mistletoe"
aVocab[intCat][1][intIncr++] = "Misty"
aVocab[intCat][1][intIncr++] = "Moon"
aVocab[intCat][1][intIncr++] = "Moonwort"
aVocab[intCat][1][intIncr++] = "Moss"
aVocab[intCat][1][intIncr++] = "Mulberry"
aVocab[intCat][1][intIncr++] = "Mullein"
aVocab[intCat][1][intIncr++] = "Mustard"
aVocab[intCat][1][intIncr++] = "Nettle"
aVocab[intCat][1][intIncr++] = "Oak"
aVocab[intCat][1][intIncr++] = "Oleander"
aVocab[intCat][1][intIncr++] = "Olive"
aVocab[intCat][1][intIncr++] = "Opal"
aVocab[intCat][1][intIncr++] = "Oriole"
aVocab[intCat][1][intIncr++] = "Pansy"
aVocab[intCat][1][intIncr++] = "Parsley"
aVocab[intCat][1][intIncr++] = "Peach"
aVocab[intCat][1][intIncr++] = "Pearl"
aVocab[intCat][1][intIncr++] = "Pebble"
aVocab[intCat][1][intIncr++] = "Pepper"
aVocab[intCat][1][intIncr++] = "Peppermint"
aVocab[intCat][1][intIncr++] = "Periwinkle"
aVocab[intCat][1][intIncr++] = "Petal"
aVocab[intCat][1][intIncr++] = "Pine"
aVocab[intCat][1][intIncr++] = "Pit"
aVocab[intCat][1][intIncr++] = "Plum"
aVocab[intCat][1][intIncr++] = "Poplar"
aVocab[intCat][1][intIncr++] = "Poppy"
aVocab[intCat][1][intIncr++] = "Posy"
aVocab[intCat][1][intIncr++] = "Rain"
aVocab[intCat][1][intIncr++] = "Rainbow"
aVocab[intCat][1][intIncr++] = "Raspberry"
aVocab[intCat][1][intIncr++] = "Reed"
aVocab[intCat][1][intIncr++] = "Rhubarb"
aVocab[intCat][1][intIncr++] = "River"
aVocab[intCat][1][intIncr++] = "Rock"
aVocab[intCat][1][intIncr++] = "Rose"
aVocab[intCat][1][intIncr++] = "Rowan"
aVocab[intCat][1][intIncr++] = "Ruby"
aVocab[intCat][1][intIncr++] = "Rue"
aVocab[intCat][1][intIncr++] = "Saffron"
aVocab[intCat][1][intIncr++] = "Sage"
aVocab[intCat][1][intIncr++] = "Sapphire"
aVocab[intCat][1][intIncr++] = "Shadow"
aVocab[intCat][1][intIncr++] = "Sky"
aVocab[intCat][1][intIncr++] = "Snapdragon"
aVocab[intCat][1][intIncr++] = "Snow"
aVocab[intCat][1][intIncr++] = "Sorrel"
aVocab[intCat][1][intIncr++] = "Spark"
aVocab[intCat][1][intIncr++] = "Sparrow"
aVocab[intCat][1][intIncr++] = "Spring"
aVocab[intCat][1][intIncr++] = "Spruce"
aVocab[intCat][1][intIncr++] = "Star"
aVocab[intCat][1][intIncr++] = "Stone"
aVocab[intCat][1][intIncr++] = "Storm"
aVocab[intCat][1][intIncr++] = "Strawberry"
aVocab[intCat][1][intIncr++] = "Summer"
aVocab[intCat][1][intIncr++] = "Sun"
aVocab[intCat][1][intIncr++] = "Sunflower"
aVocab[intCat][1][intIncr++] = "Sweetgrass"
aVocab[intCat][1][intIncr++] = "Tansy"
aVocab[intCat][1][intIncr++] = "Tempest"
aVocab[intCat][1][intIncr++] = "Terra"
aVocab[intCat][1][intIncr++] = "Thistle"
aVocab[intCat][1][intIncr++] = "Thorn"
aVocab[intCat][1][intIncr++] = "Tulip"
aVocab[intCat][1][intIncr++] = "Turnip"
aVocab[intCat][1][intIncr++] = "Twig"
aVocab[intCat][1][intIncr++] = "Violet"
aVocab[intCat][1][intIncr++] = "Walnut"
aVocab[intCat][1][intIncr++] = "Willow"
aVocab[intCat][1][intIncr++] = "Wind"
aVocab[intCat][1][intIncr++] = "Windy"
aVocab[intCat][1][intIncr++] = "Winter"
aVocab[intCat][1][intIncr++] = "Wisp"
aVocab[intCat][1][intIncr++] = "Wolf"
aVocab[intCat][1][intIncr++] = "Woodruff"
aVocab[intCat][1][intIncr++] = "Wren"
aVocab[intCat][1][intIncr++] = "Yarrow"
aVocab[intCat][1][intIncr++] = "Zinnia"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "lastname"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "Bird<animalverb>"
aVocab[intCat][1][intIncr++] = "Breeze<verb>"
aVocab[intCat][1][intIncr++] = "Briar<place>"
aVocab[intCat][1][intIncr++] = "Brook<place>"
aVocab[intCat][1][intIncr++] = "Cloud<verb>"
aVocab[intCat][1][intIncr++] = "Cove<place>"
aVocab[intCat][1][intIncr++] = "Dale<place>"
aVocab[intCat][1][intIncr++] = "Eagle<animalverb>"
aVocab[intCat][1][intIncr++] = "East<place>"
aVocab[intCat][1][intIncr++] = "Elm<place>"
aVocab[intCat][1][intIncr++] = "Field<place>"
aVocab[intCat][1][intIncr++] = "Flame<verb>"
aVocab[intCat][1][intIncr++] = "Forest<place>"
aVocab[intCat][1][intIncr++] = "Hawk<animalverb>"
aVocab[intCat][1][intIncr++] = "Hill<place>"
aVocab[intCat][1][intIncr++] = "Lake<place>"
aVocab[intCat][1][intIncr++] = "Light<allend>"
aVocab[intCat][1][intIncr++] = "Meadow<place>"
aVocab[intCat][1][intIncr++] = "Moon<verb>"
aVocab[intCat][1][intIncr++] = "Mountain<place>"
aVocab[intCat][1][intIncr++] = "Mouse<animalverb>"
aVocab[intCat][1][intIncr++] = "North<place>"
aVocab[intCat][1][intIncr++] = "Oaken<place>"
aVocab[intCat][1][intIncr++] = "Pond<place>"
aVocab[intCat][1][intIncr++] = "River<place>"
aVocab[intCat][1][intIncr++] = "Rock<place>"
aVocab[intCat][1][intIncr++] = "Shade<allend>"
aVocab[intCat][1][intIncr++] = "Shoemaker"
aVocab[intCat][1][intIncr++] = "Spinner"
aVocab[intCat][1][intIncr++] = "Sea<place>"
aVocab[intCat][1][intIncr++] = "South<place>"
aVocab[intCat][1][intIncr++] = "Star<verb>"
aVocab[intCat][1][intIncr++] = "Stone<place>"
aVocab[intCat][1][intIncr++] = "Sun<verb>"
aVocab[intCat][1][intIncr++] = "Tree<place>"
aVocab[intCat][1][intIncr++] = "Valley<place>"
aVocab[intCat][1][intIncr++] = "Weaver"
aVocab[intCat][1][intIncr++] = "West<place>"
aVocab[intCat][1][intIncr++] = "Wolf<animalverb>"
aVocab[intCat][1][intIncr++] = "Wood<place>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "allend"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<place>"
aVocab[intCat][1][intIncr++] = "<verb>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "place"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "child"
aVocab[intCat][1][intIncr++] = "side"
aVocab[intCat][1][intIncr++] = "holm"
aVocab[intCat][1][intIncr++] = "wick"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "verb"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "chaser"
aVocab[intCat][1][intIncr++] = "dreamer"
aVocab[intCat][1][intIncr++] = "flyer"
aVocab[intCat][1][intIncr++] = "runner"
aVocab[intCat][1][intIncr++] = "spinner"
aVocab[intCat][1][intIncr++] = "weaver"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "animalverb"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "hunter"
aVocab[intCat][1][intIncr++] = "rider"



//Leave to Copy!
intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = ""
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = ""



function GenNumber(nRange) {
    var iNumGen
    iNumGen = Math.round((Math.random() * nRange));

    return iNumGen;
}

function GetFrom(aArray, nftId) {
    var undefined
    var sReturn
    sReturn = aArray[nftId % aArray.length];
    if (sReturn == undefined) {
        sReturn = GetFrom(aArray, nftId)
    }
    return sReturn
}


function GetArray(sArrayName) {
    for (var intLooper = 0; intLooper < aVocab.length; intLooper++) {
        if (aVocab[intLooper][0] == sArrayName) {
            return aVocab[intLooper][1];
            break;
        }
    }
}

function ScanLine(sLine, nftId) {
    var iTagStart, iTagEnd
    var sKey

    if (sLine.indexOf("<") > -1) {
        iTagStart = sLine.indexOf("<");
        iTagEnd = sLine.indexOf(">");

        sKey = sLine.substr(iTagStart + 1, iTagEnd - (iTagStart + 1));

        sKey = GetFrom(GetArray(sKey), nftId)
        sLine = sLine.substr(0, iTagStart) + sKey + sLine.substr(iTagEnd + 1, (sLine.length - iTagEnd))

    }


    if (sLine.indexOf("<") > - 1) {
        sLine = ScanLine(sLine, nftId)
    }

    return sLine;
}


function GenPlot(nftId) {
    let sLine = GetFrom(GetArray("FIRST"), nftId);
    sLine = ScanLine(sLine, nftId)

    return sLine;
}

module.exports = {
	GenPlot
}