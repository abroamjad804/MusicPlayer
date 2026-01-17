document.addEventListener('DOMContentLoaded', function () {
    // Song paths for local songs stored on your computer
    const songPaths = [
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song1.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song2.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song3.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song4.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song5.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song6.mp3",
        "C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song7.mp3"
    ];

    // Circular Doubly Linked List Node constructor
    function Node(song, name) {
        this.song = song; // Path to the song
        this.name = name; // Name of the song (for display)
        this.next = null; // Points to the next node
        this.prev = null; // Points to the previous node
    }

    // Circular Doubly Linked List constructor
    function CircularDoublyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Method to add song to the list
    CircularDoublyLinkedList.prototype.add = function (song, name) {
        const node = new Node(song, name);
        if (this.size === 0) {
            this.head = node;
            this.tail = node;
            node.next = node; // Points to itself
            node.prev = node; // Points to itself
        } else {
            node.prev = this.tail;
            node.next = this.head;
            this.tail.next = node;
            this.head.prev = node;
            this.tail = node;
        }
        this.size++;
    };

    // Method to get the current song from the list
    CircularDoublyLinkedList.prototype.getCurrentSong = function (currentNode) {
        if (currentNode) {
            return currentNode.song;
        } else {
            return null;
        }
    };

    // Method to get the current song's name
    CircularDoublyLinkedList.prototype.getCurrentSongName = function (currentNode) {
        if (currentNode) {
            return currentNode.name;
        } else {
            return null;
        }
    };

    // Method to get the next song
    CircularDoublyLinkedList.prototype.getNextSong = function (currentNode) {
        if (currentNode && currentNode.next) {
            return currentNode.next.song;
        } else {
            return null;
        }
    };

    // Method to get the next song's name
    CircularDoublyLinkedList.prototype.getNextSongName = function (currentNode) {
        if (currentNode && currentNode.next) {
            return currentNode.next.name;
        } else {
            return null;
        }
    };

    // Method to get the previous song
    CircularDoublyLinkedList.prototype.getPrevSong = function (currentNode) {
        if (currentNode && currentNode.prev) {
            return currentNode.prev.song;
        } else {
            return null;
        }
    };

    // Method to get the previous song's name
    CircularDoublyLinkedList.prototype.getPrevSongName = function (currentNode) {
        if (currentNode && currentNode.prev) {
            return currentNode.prev.name;
        } else {
            return null;
        }
    };

    // Create the circular linked list and add songs (with names)
    const songList = new CircularDoublyLinkedList();
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song1.mp3", "O Mahi");
    
    
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song2.mp3", "Khuda Aur Mohabt");
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song3.mp3", "Tere Hawali");
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song4.mp3", "Sang E Mah");
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song5.mp3", "Ehd e Wafa");
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song6.mp3", "Mere Dholna");
    songList.add("C:\\Users\\WINSOFT COMPUTERS\\Desktop\\WebProject\\Songs\\song7.mp3", "Koi chand Rakh");

    // Set up the audio element
    const audio = new Audio();
    let currentSongNode = songList.head; // Start from the first song

    // UI Elements
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar input');
    const volumeBar = document.querySelector('.volume-bar input');
    const songNameDisplay = document.getElementById('songName');

    // Display the current song name
    function displaySongName() {
        songNameDisplay.textContent = songList.getCurrentSongName(currentSongNode);
    }

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '❚❚'; // Change to pause symbol
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶'; // Change to play symbol
        }
    });

    // Load and play current song
    function loadAndPlaySong(songPath) {
        audio.src = songPath;
        audio.play();
        playPauseBtn.textContent = '❚❚'; // Update play button to pause
    }

    // Automatically play the next song when the current one finishes
    audio.addEventListener('ended', function () {
        if (currentSongNode && currentSongNode.next) {
            currentSongNode = currentSongNode.next; // Move to next song
        } else {
            currentSongNode = songList.head; // Loop back to the first song
        }
        loadAndPlaySong(songList.getCurrentSong(currentSongNode));
        displaySongName(); // Update the song name display
    });

    // Next button functionality
    nextBtn.addEventListener('click', function () {
        if (currentSongNode && currentSongNode.next) {
            currentSongNode = currentSongNode.next;
        } else {
            currentSongNode = songList.head; // Loop to the start if at the end
        }
        loadAndPlaySong(songList.getCurrentSong(currentSongNode));
        displaySongName(); // Update the song name display
    });

    // Prev button functionality
    prevBtn.addEventListener('click', function () {
        if (currentSongNode && currentSongNode.prev) {
            currentSongNode = currentSongNode.prev;
        } else {
            currentSongNode = songList.tail; // Loop to the end if at the start
        }
        loadAndPlaySong(songList.getCurrentSong(currentSongNode));
        displaySongName(); // Update the song name display
    });

    // Volume control functionality
    volumeBar.addEventListener('input', function () {
        audio.volume = volumeBar.value / 100; // Adjust volume
    });

    // Update progress bar as the audio plays
    audio.addEventListener('timeupdate', function () {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    });

    // When the user interacts with the progress bar
    progressBar.addEventListener('input', function () {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime; // Update the current time of the audio
    });

    // Initialize volume and progress bar
    volumeBar.value = 50; // Set initial volume to 50%
    audio.volume = volumeBar.value / 100;
    progressBar.value = 0; // Set initial progress to 0%

    // Load and play the first song
    loadAndPlaySong(songList.getCurrentSong(currentSongNode));
    displaySongName(); // Update the song name display
});
