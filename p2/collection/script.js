const unoVariations =
[
    {
        "title": "Retro",
        "funToPlay": 2,
        "imgFolder": "retro",
        "img": ["retro-box.png","r0green.png", "r1yellow.png", "r5red.png", "r6blue.png", "rdraw2.png", "retro+4wild.png", "rreverseblue.png", "rwild.png"],
        "classic": true,
        "fightGauranteed": false,
        "aesthetic": true,
        "drinkfriendly": false,
        "kidfriendly": true

    },
    {
        "title": "Clasic",
        "funToPlay": 1,
        "imgFolder": "classic",
        "img": ["uno-box.png", "6blue.png", "7normalcard(dare,regular,flip).png", "9green.png", "bluereverse.png", "normal7green.png", "unobackcard.png", "wild.png", "yellowskip.png"],
        "classic": true,
        "fightGauranteed": false,
        "aesthetic": false,
        "drinkfriendly": false,
        "kidfriendly": true
    },
    {
        "title": "All Wild",
        "funToPlay": 5,
        "imgFolder": "allwild",
        "img": ["allwild-box.png", "+2allwild.png","+4allwild.png","allwildcardback.png", "doubleskipAllwild.png", "reverseallwild.png", "skipallwild.png", "switchdeckallwild.png", "target+2allwild.png"],
        "classic": false,
        "fightGauranteed": false,
        "aesthetic": false,
        "drinkfriendly": true,
        "kidfriendly": true
    },
    {
        "title": "Dare",
        "funToPlay": 3,
        "imgFolder": "dare",
        "img": ["dare-box.png", "+2dare.png","+2dareblue.png","dare2yellow.png","dare7red.png","darecardback.png"],
        "classic": false,
        "fightGauranteed": true,
        "aesthetic": false,
        "drinkfriendly": true,
        "kidfriendly": false
    },
    {
        "title": "Flex",
        "funToPlay": 6,
        "imgFolder": "flex",
        "img": ["flex-box.png", "+2flex.png","5blueflex.png","8flex.png","crossflex.png","flexback.png","skipflex.png","tickflex.png"],
        "classic": false,
        "fightGauranteed": true,
        "aesthetic": true,
        "drinkfriendly": true,
        "kidfriendly": false
    },
    {
        "title": "Flip",
        "funToPlay": 4,
        "imgFolder": "flip",
        "img": ["flip-box.png", "+5flip.png","3flip.png","7flip.png","allskipflip.png","reverseflip.png"],
        "classic": false,
        "fightGauranteed": true,
        "aesthetic": false,
        "drinkfriendly": true,
        "kidfriendly": true
    }
]
console.log(unoVariations)
const uno = document.querySelector('#uno');
//const newH1 = document.createElement('h1')
//newH1.textContent = 'My Tasks';
const pickYourUno = document.querySelector('#pickYourUno');

let showCategory = 'all';
let results = []
renderContent();
updateControls();
function renderContent() {
    uno.innerHTML = '';
    const filteredUno = document.createElement('div');
    if (showCategory == "all"){
        results = unoVariations.sort((a,b) => (a.funToPlay < b.funToPlay ? 1 : -1))
    }
    if (showCategory == "classic"){
         results = unoVariations.filter(unoVariation => unoVariation.classic).sort((a,b) => (a.funToPlay < b.funToPlay ? 1 : -1))
    }

    if (showCategory == "fightsGuaranteed"){
        results = unoVariations.filter(unoVariation => unoVariation.fightGauranteed).sort((a,b) => (a.funToPlay < b.funToPlay ? 1 : -1))
   }

   if (showCategory == "drinkFriendly"){
    results = unoVariations.filter(unoVariation => unoVariation.drinkfriendly).sort((a,b) => (a.funToPlay < b.funToPlay ? 1 : -1))
    }

    if (showCategory == "kidFriendly"){
        results = unoVariations.filter(unoVariation => unoVariation.kidfriendly).sort((a,b) => (a.funToPlay < b.funToPlay ? 1 : -1))
    }
   
    for(i=0;i<results.length;i++){
        const result=results[i]
        for (j=0;j<result.img.length;j++){
            const imgFile = result.img[j]
            const img = document.createElement('img');
            if (imgFile.includes("-box")){
                img.className = "imggay"
            } else {
                img.className = "imgstyle"  
            }
            img.src = 'photos/'+result.imgFolder+ '/' + imgFile;
            img.alt = result.title; 
            filteredUno.appendChild(img);
        }
        uno.appendChild(filteredUno);
    }
    
}
function updateControls() {

    pickYourUno.addEventListener('change', function () {
        showCategory = pickYourUno.value;
        renderContent();
    });
}
