var htmlGenerated = `<!-- Not Firefox -->`;
var htmlGeneratedF = `<!-- Firefox -->`;

const audio = document.getElementById("audio");

const htmlArray = ["A","B","C","D","E","F","G","a","b","c","d","e","f","g","Ad","Cd","Dd","Fd","Gd","ad","cd","dd","fd","gd",
"fx0","fx1","fx2","fx3","fx4","fx5","fx6","fx7","fx8","fx9"];

const htmlArrayNav = ["rockers","stepper","onedrop","bassA","bassAd","bassB","bassC","bassCd","bassD","bassDd","bassE","bassF","bassFd","bassG","bassGd"];

htmlArrayNav.forEach(e =>{
    htmlGenerated += `<audio id="${e}" src="./assets/audio/${e}.ogg" loop></audio>`;
    htmlGeneratedF += `<audio id="${e}" src="./assets/audio/firefox/${e}.ogg" loop></audio>`;
})

// we need to check user agent to detect Firefox to change audio source for bass and drum (because Firefox predict loop gap) 
function checkNavigator(){
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        audio.innerHTML += htmlGeneratedF;
        if (window.confirm(`Firefox works but doesn't groove with Jiddim :-/ \nPlease consider using another browser here like Chromium`
        )){
            window.location.href='https://download-chromium.appspot.com/';
        }
    }
    if(navigator.userAgent.toLocaleLowerCase().indexOf('mobile') > -1) {
        alert(`Jiddim is not compatible with smartphone sorry :'(`);
    }
    else {
        audio.innerHTML += htmlGenerated;
    }

};

export function createDOM() {
    audio.innerHTML = ``
    htmlArray.forEach(e =>{
        audio.innerHTML += `<audio id="${e}" src="./assets/audio/${e}.ogg"></audio>`;
    })
    checkNavigator();
};