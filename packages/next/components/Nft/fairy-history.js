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
aVocab[intCat][1][intIncr++] = "This <place>-dwelling fairy is male with <eyecolor> eyes, a <skincolor> complexion, and <hairtype> <haircolor> hair <hairstyle>.  He is <height> and is <weight>.  He wears <malebottom>, <maletop>, and <shoes>.  He also wears <acc>.  He <trivstuff>."
aVocab[intCat][1][intIncr++] = "This <place>-dwelling fairy is female with <eyecolor> eyes, a <skincolor> complexion, and <hairtype> <haircolor> hair <hairstyle>.  She is <height> and is <weight>.  She wears <femalebottom>, <femaletop>, and <shoes>.  She also wears <acc>.  She <trivstuff>."

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "haircolor"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "auburn"
aVocab[intCat][1][intIncr++] = "black"
aVocab[intCat][1][intIncr++] = "blond"
aVocab[intCat][1][intIncr++] = "brown"
aVocab[intCat][1][intIncr++] = "dull blond"
aVocab[intCat][1][intIncr++] = "golden-blond"
aVocab[intCat][1][intIncr++] = "light brown"
aVocab[intCat][1][intIncr++] = "red"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "eyecolor"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "blue"
aVocab[intCat][1][intIncr++] = "brown"
aVocab[intCat][1][intIncr++] = "dark brown"
aVocab[intCat][1][intIncr++] = "green"
aVocab[intCat][1][intIncr++] = "hazel"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "skincolor"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "dark"
aVocab[intCat][1][intIncr++] = "fair"
aVocab[intCat][1][intIncr++] = "olive"
aVocab[intCat][1][intIncr++] = "pale"
aVocab[intCat][1][intIncr++] = "tanned"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "hairtype"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "straight"
aVocab[intCat][1][intIncr++] = "wavy"
aVocab[intCat][1][intIncr++] = "curly"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "hairstyle"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "neatly braided"
aVocab[intCat][1][intIncr++] = "cut short"
aVocab[intCat][1][intIncr++] = "in a <length> braid"
aVocab[intCat][1][intIncr++] = "in a <length> ponytail"
aVocab[intCat][1][intIncr++] = "left uncut"
aVocab[intCat][1][intIncr++] = "pinned neatly back"
aVocab[intCat][1][intIncr++] = "worn <length>"
aVocab[intCat][1][intIncr++] = "worn loose about the shoulders"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "weight"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "quite thin"
aVocab[intCat][1][intIncr++] = "somewhat thin"
aVocab[intCat][1][intIncr++] = "of average weight"
aVocab[intCat][1][intIncr++] = "a bit pudgy"
aVocab[intCat][1][intIncr++] = "quite heavy"
aVocab[intCat][1][intIncr++] = "fairly muscular"
aVocab[intCat][1][intIncr++] = "quite muscular"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "height"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "of average height"
aVocab[intCat][1][intIncr++] = "tall"
aVocab[intCat][1][intIncr++] = "a little tall"
aVocab[intCat][1][intIncr++] = "very tall"
aVocab[intCat][1][intIncr++] = "short"
aVocab[intCat][1][intIncr++] = "a little short"
aVocab[intCat][1][intIncr++] = "very short"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "acc"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<jewelry>, <hat>, and <coat>"
aVocab[intCat][1][intIncr++] = "<coat>, <hat>, and <jewelry>"
aVocab[intCat][1][intIncr++] = "<coat>, <jewelry>, and <jewelry>"
aVocab[intCat][1][intIncr++] = "<jewelry> and <coat>"
aVocab[intCat][1][intIncr++] = "<hat> and <coat>"
aVocab[intCat][1][intIncr++] = "<jewelry> and <hat>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "maletop"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<bothtop>"
aVocab[intCat][1][intIncr++] = "<MOtop>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "femaletop"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<bothtop>"
aVocab[intCat][1][intIncr++] = "<FOtop>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "bothtop"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a blouse"
aVocab[intCat][1][intIncr++] = "a shirt with <length> sleeves"
aVocab[intCat][1][intIncr++] = "a tunic with <length> sleeves"
aVocab[intCat][1][intIncr++] = "<a/an-clothingdesc>blouse"
aVocab[intCat][1][intIncr++] = "<a/an-clothingdesc>shirt with <length> sleeves"
aVocab[intCat][1][intIncr++] = "<a/an-clothingdesc>tunic with <length> sleeves"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "MOtop"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "no shirt"
aVocab[intCat][1][intIncr++] = "<bothtop>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "FOtop"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a corset"
aVocab[intCat][1][intIncr++] = "a <length> <clothingdesc>dress"
aVocab[intCat][1][intIncr++] = "<bothtop>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "femalebottom"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<length> <clothingdesc>skirt"
aVocab[intCat][1][intIncr++] = "<bothbottom>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "malebottom"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a kilt"
aVocab[intCat][1][intIncr++] = "<bothbottom>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "bothbottom"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a pair of <length> <clothingdesc>trousers"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "clothingdesc"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "embroidered "
aVocab[intCat][1][intIncr++] = "frilly "
aVocab[intCat][1][intIncr++] = "patched "
aVocab[intCat][1][intIncr++] = "patchwork "
aVocab[intCat][1][intIncr++] = "scalloped "
aVocab[intCat][1][intIncr++] = "tattered "
aVocab[intCat][1][intIncr++] = "tie-dyed "
aVocab[intCat][1][intIncr++] = ""
aVocab[intCat][1][intIncr++] = ""
aVocab[intCat][1][intIncr++] = ""
aVocab[intCat][1][intIncr++] = ""

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "a/an-clothingdesc"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "an embroidered "
aVocab[intCat][1][intIncr++] = "a frilly "
aVocab[intCat][1][intIncr++] = "a patched "
aVocab[intCat][1][intIncr++] = "a patchwork "
aVocab[intCat][1][intIncr++] = "a scalloped "
aVocab[intCat][1][intIncr++] = "a tattered "
aVocab[intCat][1][intIncr++] = "a tie-dyed "

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "hat"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a button hat"
aVocab[intCat][1][intIncr++] = "a flower hat"
aVocab[intCat][1][intIncr++] = "a wide-brimmed hat"
aVocab[intCat][1][intIncr++] = "an acorn cap"
aVocab[intCat][1][intIncr++] = "a leaf cap"
aVocab[intCat][1][intIncr++] = "a sun visor"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "jewelry"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<jtype> brooch"
aVocab[intCat][1][intIncr++] = "a really fancy belt buckle"
aVocab[intCat][1][intIncr++] = "<jtype> ring"
aVocab[intCat][1][intIncr++] = "<jtype> pendant"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "shoes"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "goes barefoot"
aVocab[intCat][1][intIncr++] = "a pair of sandals"
aVocab[intCat][1][intIncr++] = "a pair of boots"
aVocab[intCat][1][intIncr++] = "a pair of pointed boots"
aVocab[intCat][1][intIncr++] = "a pair of pointed shoes"
aVocab[intCat][1][intIncr++] = "a pair of shoes"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "coat"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a <length> coat"
aVocab[intCat][1][intIncr++] = "a <length> jacket"
aVocab[intCat][1][intIncr++] = "a <length> vest"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "jtype"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "a flower"
aVocab[intCat][1][intIncr++] = "a golden"
aVocab[intCat][1][intIncr++] = "a jeweled"
aVocab[intCat][1][intIncr++] = "a shell"
aVocab[intCat][1][intIncr++] = "a silver"
aVocab[intCat][1][intIncr++] = "a wooden"


intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "trivstuff"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<flaw>, <trivia>, and is <skill>"
aVocab[intCat][1][intIncr++] = "<flaw> and <trivia>"
aVocab[intCat][1][intIncr++] = "<flaw> and is <skill>"
aVocab[intCat][1][intIncr++] = "<trivia> and is <skill>"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "flaw"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "is afraid of <fear>"
aVocab[intCat][1][intIncr++] = "is a really picky eater"
aVocab[intCat][1][intIncr++] = "is easily confused"
aVocab[intCat][1][intIncr++] = "gets lost easily"
aVocab[intCat][1][intIncr++] = "is terrible at keeping secrets"
aVocab[intCat][1][intIncr++] = "tends to be forgetful"
aVocab[intCat][1][intIncr++] = "tends to gossip too much"
aVocab[intCat][1][intIncr++] = "had a disabling accident"
aVocab[intCat][1][intIncr++] = "has no wings"
aVocab[intCat][1][intIncr++] = "has a speech impediment"
aVocab[intCat][1][intIncr++] = "speaks with a stutter"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "fear"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "being alone"
aVocab[intCat][1][intIncr++] = "being in crowds"
aVocab[intCat][1][intIncr++] = "birds"
aVocab[intCat][1][intIncr++] = "caterpillars"
aVocab[intCat][1][intIncr++] = "cats"
aVocab[intCat][1][intIncr++] = "the dark"
aVocab[intCat][1][intIncr++] = "dogs"
aVocab[intCat][1][intIncr++] = "fire"
aVocab[intCat][1][intIncr++] = "frogs"
aVocab[intCat][1][intIncr++] = "heights"
aVocab[intCat][1][intIncr++] = "messing up"
aVocab[intCat][1][intIncr++] = "open spaces"
aVocab[intCat][1][intIncr++] = "thunder"
aVocab[intCat][1][intIncr++] = "sharp, pointy things"
aVocab[intCat][1][intIncr++] = "small spaces"
aVocab[intCat][1][intIncr++] = "snakes"
aVocab[intCat][1][intIncr++] = "spiders"
aVocab[intCat][1][intIncr++] = "water"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "trivia"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "enjoys playing games"
aVocab[intCat][1][intIncr++] = "enjoys star-gazing"
aVocab[intCat][1][intIncr++] = "is fond of sweets"
aVocab[intCat][1][intIncr++] = "just moved into the area"
aVocab[intCat][1][intIncr++] = "likes a cup of hot tea"
aVocab[intCat][1][intIncr++] = "likes to curl up with a good book"
aVocab[intCat][1][intIncr++] = "likes wearing outrageous clothing"
aVocab[intCat][1][intIncr++] = "loves eating <food>"
aVocab[intCat][1][intIncr++] = "likes watching plays"
aVocab[intCat][1][intIncr++] = "likes playing pranks on humans"
aVocab[intCat][1][intIncr++] = "looks after nature"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "food"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "ant eggs"
aVocab[intCat][1][intIncr++] = "apple pie"
aVocab[intCat][1][intIncr++] = "cherry pie"
aVocab[intCat][1][intIncr++] = "chocolate"
aVocab[intCat][1][intIncr++] = "fresh fruit"
aVocab[intCat][1][intIncr++] = "roasted nuts"
aVocab[intCat][1][intIncr++] = "roasted pumpkin seeds"
aVocab[intCat][1][intIncr++] = "roasted sunflower seeds"
aVocab[intCat][1][intIncr++] = "stewed mushrooms"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "skill"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "<skillrate> adventuresome"
aVocab[intCat][1][intIncr++] = "<skillrate> athletic"
aVocab[intCat][1][intIncr++] = "<skillrate> brave"
aVocab[intCat][1][intIncr++] = "<skillrate> curious"
aVocab[intCat][1][intIncr++] = "<skillrate> cautious"
aVocab[intCat][1][intIncr++] = "<skillrate> hardworking"
aVocab[intCat][1][intIncr++] = "<skillrate> energetic"
aVocab[intCat][1][intIncr++] = "<skillrate> friendly"
aVocab[intCat][1][intIncr++] = "<skillrate> neat"
aVocab[intCat][1][intIncr++] = "<skillrate> nice"
aVocab[intCat][1][intIncr++] = "<skillrate> outgoing"
aVocab[intCat][1][intIncr++] = "<skillrate> patient"
aVocab[intCat][1][intIncr++] = "<skillrate> talkative"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "skillrate"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "not very"
aVocab[intCat][1][intIncr++] = "fairly"
aVocab[intCat][1][intIncr++] = "very"
aVocab[intCat][1][intIncr++] = "extremely"


intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "length"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "long"
aVocab[intCat][1][intIncr++] = "mid-length"
aVocab[intCat][1][intIncr++] = "short"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "number"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "several"
aVocab[intCat][1][intIncr++] = "a few"
aVocab[intCat][1][intIncr++] = "a couple of"
aVocab[intCat][1][intIncr++] = "many"
aVocab[intCat][1][intIncr++] = "numerous"

intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "place"
aVocab[intCat][1] = new Array()
aVocab[intCat][1][intIncr++] = "beach"
aVocab[intCat][1][intIncr++] = "cave"
aVocab[intCat][1][intIncr++] = "country"
aVocab[intCat][1][intIncr++] = "desert"
aVocab[intCat][1][intIncr++] = "forest"
aVocab[intCat][1][intIncr++] = "island"
aVocab[intCat][1][intIncr++] = "meadow"
aVocab[intCat][1][intIncr++] = "tundra"
aVocab[intCat][1][intIncr++] = "water"



//Leave to Copy!
intCat++
intIncr = 0
aVocab[intCat] = new Array();
aVocab[intCat][0] = "THIRD"
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

console.log(GenPlot(1))

module.exports = {
	GenPlot
}