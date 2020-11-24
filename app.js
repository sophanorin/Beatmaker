class Drumkit
{
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.currentKick = './sounds/kick-808.wav';
        this.currentSnare = './sounds/snare-big.wav';
        this.currentHihat = './sounds/hihat-808.wav';
        this.playButton = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.selects = document.querySelectorAll("select");
        this.muteButtons = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }
    
    repeat() 
    {
        let step = this.index % 8;
        const activeBars=document.querySelectorAll(`.b${step}`);

        activeBars.forEach(bar =>{
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active'))
            {
                if(bar.classList.contains('kick-pad'))
                {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad'))
                {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad'))
                {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index ++;
    }
    activePad()
    {
        this.classList.toggle('active');
    }
    start() 
    {
        const interval = (60/this.bpm) * 1000;
        if(!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
        },interval);
        }else{
            clearInterval(this.isPlaying); 
            this.isPlaying = null;   
        }
    }
    updateButton()
    {
        if(!this.isPlaying)
        {
            this.playButton.innerText = "Stop";
            this.playButton.classList.add('active');
        }else{
            this.playButton.innerText = "Play";
            this.playButton.classList.remove('active');
        }
    }

    changeSound(e)
    {
        const selectedName = e.target.name;
        const selectedValue = e.target.value;
        switch (selectedName)
        {
            case "kick-select":
                this.kickAudio.src = selectedValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectedValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectedValue;
                break;
        }
    }
    mute(e)
    {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if(e.target.classList.contains("active"))
        {
            switch(muteIndex)
            {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else
        {
            
            switch(muteIndex)
            {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 2;
                    break;
                case "2":
                    this.hihatAudio.volume = 3;
                    break;
            }
        }
    }
    changeTempo(e)
    {
        const tempotext = document.querySelector(".tempo-nr");
        tempotext.innerText = e.target.value;
    }
    updateTempo(e)
    {
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.bpm = e.target.value;
        const playbtn = document.querySelector(".play");
        if(playbtn.classList.contains('active'))
        {
            this.start();
        }
    }
}
const drumkit = new Drumkit();

drumkit.pads.forEach(pad =>{
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend',function() {
        this.style.animation = "";
    });
});


drumkit.playButton.addEventListener('click', () => {
    drumkit.updateButton();
    drumkit.start()
});

drumkit.selects.forEach(select =>{
    select.addEventListener('change', function(e){
        drumkit.changeSound(e);
    });
});

drumkit.muteButtons.forEach(btn => {
    btn.addEventListener('click',function(e){
        drumkit.mute(e);
    })
});
drumkit.tempoSlider.addEventListener("input",function(e){
    drumkit.changeTempo(e);
})
drumkit.tempoSlider.addEventListener("change",function(e){
    drumkit.updateTempo(e);
})