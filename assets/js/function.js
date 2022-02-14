import {body, tempo, Mutes, beatsDisplay, SkankChords, BassChords, DrumBeats, ChordsTable, FX} from "./const.js";

let dTempo = 70;
let bassTone , drumBeat, lock;
let mBass, mSkank, mDrum;
let bTempo = false;
let firefox = false;
mBass = mSkank = mDrum = 0;
bassTone = drumBeat = lock = 'none';
var firefoxGap = -0.05;
BassChords.forEach(e => e.playbackRate = 1);
DrumBeats.forEach(e => e.playbackRate = 1);
navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? firefox = true : firefox = false;

// Skank & bass diese
function diese(key) {
    BassChords.forEach(e => e.muted = true);
    lock != 'none' ? synchro(lock) : '';
    if (key === "z" || key === "Z") {
        bassTone = 'ad';
        mBass === 0 ? bassAd.muted = false : bassAd.muted = true;
        key === "z" ? ad.play() : Ad.play();
    }
    if (key === "v" || key === "V") {
        bassTone = 'cd';
        mBass === 0 ? bassCd.muted = false : bassCd.muted = true;
        key === "v" ? cd.play() : Cd.play();
    }
    if (key === "s" || key === "S") {
        bassTone = 'dd';
        mBass === 0 ? bassDd.muted = false : bassDd.muted = true;
        key === "s" ? dd.play() : Dd.play();
    }
    if (key === "r" || key === "R") {
        bassTone = 'fd';
        mBass === 0 ? bassFd.muted = false : bassFd.muted = true;
        key === "r" ? fd.play() : Fd.play();
    }
    if (key === "h" || key === "H") {
        bassTone = 'gd';
        mBass === 0 ? bassGd.muted = false : bassGd.muted = true;
        key === "h" ? gd.play() : Gd.play();
    }
};

// Style when key pressed
function pressed (v, indexTable) {
    if (v) {
        ChordsTable[indexTable].style.fontWeight = "bold";
        ChordsTable[indexTable].style.color = "white";
        ChordsTable[indexTable].style.backgroundColor = "black";
    }
    else {
        ChordsTable.forEach(e => {
            e.style.fontWeight = 'normal';
            e.style.color = 'black';
            e.style.backgroundColor = 'transparent';
        });
    };
};

// keyboard event
export function keyboardEvent(){
    body.addEventListener('keydown', (k) => {
        // console.log(k.key);
        // Key testing with SkankChords, BassChords, FX and ChordsTable
        var index = SkankChords.findIndex(e => e.id === k.key);
        var indexBass = BassChords.findIndex(e => e.id === `bass${k.key.toUpperCase()}`);
        var indexSample = FX.findIndex(e => e.id == `fx${k.key}`);
        var indexTable = ChordsTable.findIndex(e => e.id === `${k.key}Table`);

        if (index != -1) {
            // Skank
            SkankChords[index].play()
            // Bass
            BassChords.forEach(e => e.muted = true);
            lock != 'none' ? synchro(lock) : '';
            bassTone = k.key;
            BassChords[indexBass].muted = (mBass === 0) ? false : true;
        }

        // FX
        indexSample != -1 && FX[indexSample].play();
        // Chords table display
        indexTable != -1 && pressed(true, indexTable);
        // Diese chords playing
        if (k.key === "z" || k.key === "Z" || k.key === "v" || k.key === "V" || k.key === "s" || k.key === "S" || k.key === "r" || k.key === "R" ||
        k.key === "h" || k.key === "H") {
            diese(k.key);
        }

        // Pink noise for calculating loop gap
        //k.key === "Dead" ? pink.play() : '';
        //if (k.key === "*") {
        //    pink.pause();
        //    pink.currentTime = 0;
        //}

        // Drum & bass tempo
        if (k.key === "+"){
            if (dTempo <= 196){
                DrumBeats.forEach(e => e.playbackRate += 0.04);
                BassChords.forEach(e => e.playbackRate += 0.04);
                dTempo += 4;
                tempoDisplay('update', dTempo);
            }
        }
        if (k.key === "-"){
            if (dTempo >= 34) {
                DrumBeats.forEach(e => e.playbackRate -= 0.04);
                BassChords.forEach(e => e.playbackRate -= 0.04);
                dTempo -= 4;
                tempoDisplay('update', dTempo);
            }
        }
        if (k.key === "Escape"){
                DrumBeats.forEach(e => e.playbackRate = 1);
                BassChords.forEach(e => e.playbackRate = 1);
                dTempo = 70;
                tempoDisplay('update', dTempo);
        }

        // FX
        k.key === "<" && switchOnOff('bass');
        k.key === "w" && switchOnOff('skank');
        k.key === "x" && switchOnOff('drum');
        // Drum
        k.key === "ArrowDown" && lock !== 'rockers' && drumPlay('rockers');
        k.key === "ArrowLeft" && lock !== 'onedrop' && drumPlay('onedrop');
        k.key === "ArrowRight" && lock !== 'stepper' && drumPlay('stepper');
        if (k.key === "ArrowUp"){
            drumPlay('none');
            BassStop();
            tempoDisplay('no', dTempo);
        }
    });
    // Chords table display stop
    body.addEventListener('keyup', (k) => {
        pressed(false);
    });
};

// Stop bass loop
function BassStop() {
    BassChords.forEach(e => {
        e.pause();
        e.currentTime = 0; 
    });
    bassTone = 'none';
};

// Synchro bass
function synchroBass(l) {
    firefox ? BassChords.forEach(e => e.currentTime = l.currentTime + firefoxGap) : BassChords.forEach(e => e.currentTime = l.currentTime);
    l.addEventListener('timeupdate',function(){
        if (l.currentTime === 0 || l.currentTime === 1 || l.currentTime === 2) {
            (function sync() {
                firefox ? BassChords.forEach(e => e.currentTime = l.currentTime + firefoxGap) : BassChords.forEach(e => e.currentTime = l.currentTime);
            });
        }
    },false);
};

// DRUM SECTION

// Start drum loop
function drumStart() {
    DrumBeats.forEach(e => {
        e.currentTime = 0;
        e.play();
    });
    BassChords.forEach(e => { 
        e.muted = true;
        e.play();
    });
};

// Drum beats & bass synchro
function synchro(beat) {
    //synchroBass(beat);
    var indexDrum = DrumBeats.findIndex(e => e.id === beat);
    if (!rockers.paused) {
        synchroBass(rockers);
        DrumBeats[indexDrum].currentTime = rockers.currentTime;
        rockers.muted = true;
    }
    if (!onedrop.paused) {
        synchroBass(onedrop);
        DrumBeats[indexDrum].currentTime = onedrop.currentTime;
        onedrop.muted = true;
    }
    if (!stepper.paused) {
        synchroBass(stepper);
        DrumBeats[indexDrum].currentTime = stepper.currentTime;
        stepper.muted = true;
    }
    DrumBeats[indexDrum].muted = (mDrum === 1) ? true : false;
};

// Drum beat play
export function drumPlay(beat) {
    if (beat === 'rockers' || beat === 'onedrop' || beat === 'stepper') {
        drumDisplay(beat);
        tempoDisplay('yes', dTempo);
        if (lock === 'none') {
            drumStart();
            synchro(beat);
        }
        if (lock !== 'none') {
            synchro(beat);
        }
        if (beat === 'rockers') {
            lock = beat;
            onedrop.paused && stepper.paused ? onedrop.muted = stepper.muted = true : '';
        }
        if (beat === 'onedrop') {
            lock = beat;
            stepper.paused && rockers.paused ? rockers.muted = stepper.muted = true : '';
        }
        if (beat === 'stepper') {
            lock = beat;
            onedrop.paused && rockers.paused ? onedrop.muted = rockers.muted = true : '';
        }
    }
    if (beat === 'none') {
        DrumBeats.forEach(e => {
            e.muted = true;
            e.currentTime = 0;
            e.pause();
        });
        BassStop();
        drumDisplay('none');
        tempoDisplay('no', dTempo);
        lock = beat;
    }
};

// Tempo display
export function tempoDisplay(bold, t) {
    if (bold === 'yes') {
        if (mDrum === 0) {
            tempo.innerHTML = `<b>Tempo : <span class="selected">${t}</span> BPM</b>`;
            bTempo = true;
        }
        else {
            tempo.innerHTML = `Tempo : ${t} BPM`;
            bTempo = false;
        }
    }
    if (bold === 'no') {
        tempo.innerHTML = `Tempo : ${t} BPM`;
        bTempo = false;
    }
    if (bold === 'update') {
        tempo.innerHTML = (bTempo) ? `<b>Tempo : <span class="selected">${t}</span> BPM</b>` : `Tempo : ${t} BPM`; 
    }
};

// Drumbeat display
function normalBeatDisplay() {
    rockersDisplay.innerHTML = ` Rockers beat`;
    onedropDisplay.innerHTML = ` Onedrop beat`;
    stepperDisplay.innerHTML = ` Stepper beat`;
};

export function drumDisplay(drumBeat = 'none') {
    normalBeatDisplay();
    var indexBeat = beatsDisplay.findIndex(e => e.id === `${drumBeat}Display`);
    indexBeat != -1 ? beatsDisplay[indexBeat].innerHTML = `<b class="selected"> ${drumBeat} beat</b>` : normalBeatDisplay();
};

// FX SECTION 

// Switch on/off
function switchOnOff (muteSwitch) {
    if (muteSwitch === 'bass'){
        if (mBass === 0) {
            fxDisplay('bassMuteOn');
            BassChords.forEach(e => e.muted = true);
            mBass++;
        }
        else{
            fxDisplay('bassMuteOff')
            mBass = 0;
            if (bassTone === 'a' || bassTone === 'b' || bassTone === 'c' || bassTone === 'd' || bassTone === 'e' || bassTone === 'f' || bassTone === 'g' ||
            bassTone === 'ad' || bassTone === 'cd' || bassTone === 'dd' || bassTone === 'fd' || bassTone === 'gd'){
                var indexTone = BassChords.findIndex(e => e.id === `bass${bassTone.charAt(0).toUpperCase()}`);
                BassChords[indexTone].muted = false;
            };
        };
    }
    if (muteSwitch === 'skank') {
        if (mSkank === 0) {
            fxDisplay('skankMuteOn');
            mSkank++;
            SkankChords.forEach(e => e.muted = true);
        }
        else {
            fxDisplay('skankMuteOff');
            mSkank = 0;
            SkankChords.forEach(e => e.muted = false);
        };
    }
    if (muteSwitch === 'drum') {
        if (mDrum === 0) {
            fxDisplay('drumMuteOn');
            DrumBeats.forEach(e => e.muted = true);
            mDrum++;
            tempoDisplay('no', dTempo);
        }
        else {
            fxDisplay('drumMuteOff');
            mDrum = 0;
            drumBeat === 'rockers' ? rockers.muted = false : drumBeat === 'stepper' ? stepper.muted = false : drumBeat === 'onedrop' ? onedrop.muted = false : '';
            drumBeat !== 'none' ? tempoDisplay('yes', dTempo) : tempoDisplay('no', dTempo);
        };
    }
};

// FX display
export function fxDisplay(display = 'none'){
    if (display === 'none') {
        bassMute.innerHTML = `<span><b>< :</b> Mute bass</span>`;
        skankMute.innerHTML = `<span><b>w :</b> Mute skank</span>`;
        drumMute.innerHTML = `<span><b>x :</b> Mute drum</span>`;
    }
    display === 'bassMuteOn' ? bassMute.innerHTML = `<span class="selected"><b>< : Mute bass</b></span>` :
    display === 'bassMuteOff' ? bassMute.innerHTML = `<span><b>< :</b> Mute bass</span>`:
    display === 'skankMuteOn' ? skankMute.innerHTML = `<span class="selected"><b>w : Mute skank</b></span>`:
    display === 'skankMuteOff' ? skankMute.innerHTML = `<span><b>w :</b> Mute skank</span>`:
    display === 'drumMuteOn' ? drumMute.innerHTML = `<span class="selected"><b>x : Mute drum</b></span>`:
    display === 'drumMuteOff' ? drumMute.innerHTML = `<span><b>x :</b> Mute drum</span>` : '';
};