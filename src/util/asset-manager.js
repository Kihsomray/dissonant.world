class AssetManager {

    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.downloadQueue = [];
        this.images = [];
        this.audio = [];
    };

    queueDownload(name, path) {
        // push a file to queue
        console.log(`Queueing ${name} @ ${path}`);
        this.downloadQueue.push({name, path});
    };

    isLoaded() {
        // check if all have been loaded
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    #download(name, path, callback) {

        // print the object out
        console.log(`Downloading ${name} @ ${path}`);

        // pull out the extension
        const split = path.split(".");
        const extension = split[split.length - 1];

        switch (extension) {

            case 'jpg':
            case 'png':
                this.images[name] = this.#downloadImage(path, callback);
                break;

            case 'wav':
            case 'mp3':
                this.audio[name] = this.#downloadAudio(path, callback);
                break;
            case 'mp4':
                this.audio[name] = this.#downloadAudio(path, callback);
                break;

        }
    }

    #downloadImage(path, callback) {

        // new image object
        const image = new Image();

        // listen for load
        image.addEventListener("load", () => {
            console.log(`Success loading ${image.src}.`);
            this.successCount++;
            if (this.isLoaded()) callback();
        });

        // listen for error
        image.addEventListener("error", () => {
            console.log(`Error loading ${image.src}.`);
            this.errorCount++;
            if (this.isLoaded()) callback();
        });

        // set the src, load, and return
        image.src = path;
        return image;

    }

    #downloadAudio(path, callback) {

        // new audio object
        const audio = new Audio();

        // listen for load
        audio.addEventListener("loadeddata", () => {
            console.log(`Success loading ${audio.src}.`);
            this.successCount++;
            if (this.isLoaded()) callback();
        });

        // listen for error
        audio.addEventListener("error", () => {
            console.log(`Error loading ${audio.src}.`);
            this.errorCount++;
            if (this.isLoaded()) callback();
        });

        // listen for end, pause and restart.
        audio.addEventListener("ended", () => {
            audio.pause();
            audio.currentTime = 0;
        });

        // set the src, load, and return
        audio.src = path;
        audio.load();
        return audio;
    }

    downloadAll(callback) {

        // timeout if empty queue
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);

        // loop through the download queue
        for (let i = 0; i < this.downloadQueue.length; i++) {

            // destructure it
            const {name, path} = this.downloadQueue[i];
            this.#download(name, path, callback);
        }
    };

    getImage(name) {
        return this.images[name];
    };

    getAudio(name) {
        return this.audio[name];
    };

    playAudio(name) {

        // get and play audio
        const audio = this.getAudio(name);
        audio.currentTime = 0;
        audio.play();
    };

    muteAudio(name, mute) {
            
        // mute audio
        this.getAudio(name).muted = mute;
    };

    muteAllAudio(mute) {

        // mute all audio
        for (let name in this.audio) {
            this.muteAudio(name, mute);
        }
    };

    adjustVolume(volume) {

        // adjust volume
        for (let name in this.audio) {
            this.getAudio(name).volume = volume;
        }
    };

    adjustAllVolume(volume) {

        // adjust all volume
        for (let name in this.audio) {
            this.adjustVolume(name, volume);
        }
    };

    restartMusic(name) {

        // restart music
        const audio = this.getAudio(name);
        audio.pause();
        audio.currentTime = 0;
    };

    restartAllMusic() {

        // restart all music
        for (let name in this.audio) {
            this.restartMusic(name);
        }
    };

    autoRepeat(name) {

        // auto repeat audio
        const audio = this.audio[name];
        audio.addEventListener("ended", () => {
            audio.play();
        });
    };
    
};
