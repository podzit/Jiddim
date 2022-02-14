import { createDOM } from "./audio.js";

export const body = document.getElementById("body");

createDOM();

// Function to declare each document.getElementById
function declaration(array) {
    array.forEach (e => {
        function elements (value) {
            'const ' + value.id + `= document.getElementById(${value.id})` + ';';
        }
        elements(e);
    })
};

// Skank
export const SkankChords = [A,B,C,D,E,F,G,a,b,c,d,e,f,g,ad,cd,dd,fd,gd,Ad,Cd,Dd,Fd,Gd];

// Drum
export const beatsDisplay = [rockersDisplay, onedropDisplay, stepperDisplay];
export const DrumBeats = [rockers, stepper, onedrop];

// FX
export const FX = [fx0,fx1,fx2,fx3,fx4,fx5,fx6,fx7,fx8,fx9];
export const Mutes = [bassMute, skankMute, drumMute];

// Tempo
export const tempo = document.getElementById("tempo");

// Bass
export const BassChords = [bassA,bassB,bassC,bassD,bassE,bassF,bassG,bassAd,bassCd,bassDd,bassFd,bassGd];

// Chords table
export const ChordsTable = [aTable,bTable,cTable,dTable,eTable,fTable,gTable,ATable,BTable,CTable,DTable,ETable,FTable,GTable,
    zTable,ZTable,vTable,VTable,sTable,STable,rTable,RTable,hTable,HTable];

// Pink noise for loop gap calculating (0.105s)
// export const pink = document.getElementById("pink");

// Declaration of all arrays
const Arrays = [SkankChords, DrumBeats, FX, BassChords, ChordsTable, beatsDisplay, Mutes];

Arrays.forEach (e => {
    declaration(e);
});