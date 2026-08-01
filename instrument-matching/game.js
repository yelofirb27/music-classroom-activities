// Add future matching sets here. Each image path is relative to this index.html file.
    const gameSets = {
      band: {
        title: "Common Band Instruments",
        instruments: [
          { name: "Bass Clarinet", image: "common-band/bass clarinet.png" },
          { name: "Bass Drum", image: "common-band/bass drum.png" },
          { name: "Bassoon", image: "common-band/bassoon.png" },
          { name: "Clarinet", image: "common-band/clarinet.png" },
          { name: "Contrabassoon", image: "common-band/contrabassoon.png" },
          { name: "Cymbals", image: "common-band/cymbals.png" },
          { name: "English Horn", image: "common-band/English horn.png" },
          { name: "Flute", image: "common-band/flute.png" },
          { name: "French Horn", image: "common-band/French horn.png" },
          { name: "Oboe", image: "common-band/oboe.png" },
          { name: "Piccolo", image: "common-band/piccolo.png" },
          { name: "Snare Drum", image: "common-band/snare drum.png" },
          { name: "Sousaphone", image: "common-band/sousaphone.png" },
          { name: "Tenor Saxophone", image: "common-band/tenor saxophone.png" },
          { name: "Trombone", image: "common-band/trombone.png" },
          { name: "Trumpet", image: "common-band/trumpet.png" },
          { name: "Tuba", image: "common-band/tuba.png" }
        ]
      },
      orff: {
        title: "Orff Mallet Instruments",
        instruments: [
          { name: "Chromatic Glockenspiel", image: "orff-mallet/chromatic glockenspiel.png" },
          { name: "Diatonic Glockenspiel", image: "orff-mallet/glockenspiel (diatonic).png" },
          { name: "Soprano Xylophone", image: "orff-mallet/soprano xylophone.png" },
          { name: "Alto Xylophone", image: "orff-mallet/alto xylophone.png" },
          { name: "Bass Xylophone", image: "orff-mallet/bass xylophone.png" },
          { name: "Soprano Metallophone", image: "orff-mallet/soprano metallophone.png" },
          { name: "Alto Metallophone", image: "orff-mallet/alto metallophone.png" },
          { name: "Bass Metallophone", image: "orff-mallet/bass metallophone.png" },
          { name: "Tone Bar", image: "orff-mallet/tone bar.png" }
        ]
      },
      general: {
        title: "General Music Instruments",
        instruments: [
          { name: "Jingle Ring", image: "general-music/bells(1).png" },
          { name: "Hand Bells", image: "general-music/bells.png" },
          { name: "Cabasa", image: "general-music/cabasa.png" },
          { name: "Claves", image: "general-music/claves.png" },
          { name: "Cowbell", image: "general-music/cowbell.png" },
          { name: "Cymbals", image: "general-music/cymbals.png" },
          { name: "Egg Shakers", image: "general-music/egg shakers.png" },
          { name: "Finger Cymbals", image: "general-music/finger cymbals.png" },
          { name: "Guiro", image: "general-music/guiro.png" },
          { name: "Keyboard", image: "general-music/keyboard.png" },
          { name: "Lollipop Drum", image: "general-music/lollipop drum.png" },
          { name: "Maracas", image: "general-music/maracas.png" },
          { name: "Ocean Drum", image: "general-music/ocean drum.png" },
          { name: "Rainstick", image: "general-music/rainstick.png" },
          { name: "Recorder", image: "general-music/recorder.png" },
          { name: "Rhythm Sticks", image: "general-music/rhythm sticks.png" },
          { name: "Sandblocks", image: "general-music/sandblocks.png" },
          { name: "Slapstick", image: "general-music/slapstick.png" },
          { name: "Sleigh Bells", image: "general-music/sleigh bells.png" },
          { name: "Spoons", image: "general-music/spoons.png" },
          { name: "Hand Drum", image: "general-music/tambour drum.png" },
          { name: "Tambourine", image: "general-music/tambourine.png" },
          { name: "Tone Block", image: "general-music/toneblock.png" },
          { name: "Triangle", image: "general-music/triangle.png" },
          { name: "Ukulele", image: "general-music/ukulele.png" },
          { name: "Vibraslap", image: "general-music/vibraslap.png" },
          { name: "Washboard", image: "general-music/washboard.png" },
          { name: "Wind Chimes", image: "general-music/wind chimes.png" },
          { name: "Woodblock", image: "general-music/woodblock.png" },
          { name: "Wrist Bells", image: "general-music/wrist bells.png" }
        ]
      }
    };

    const menuScreen = document.getElementById("menuScreen");
    const gameScreen = document.getElementById("gameScreen");
    const board = document.getElementById("board");
    const setSelect = document.getElementById("setSelect");
    const setName = document.getElementById("setName");
    const matchesCount = document.getElementById("matchesCount");
    const turnCount = document.getElementById("turnCount");
    const matchedList = document.getElementById("matchedList");
    const emptyMessage = document.getElementById("emptyMessage");
    const winOverlay = document.getElementById("winOverlay");
    const winMessage = document.getElementById("winMessage");
    const soundButton = document.getElementById("soundButton");
    let soundOn = true;
    let audioContext = null;

    let selectedSetKey = "band";
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;
    let turns = 0;

    function playTone(frequency, duration = 0.16, type = "sine") {
      if (!soundOn) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      audioContext = audioContext || new AudioCtx();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration + 0.03);
    }

    function playMatchSound() {
      playTone(523.25, 0.14, "triangle");
      setTimeout(() => playTone(659.25, 0.18, "triangle"), 110);
    }

    function playMissSound() {
      playTone(220, 0.16, "sine");
    }

    function playWinSound() {
      [523.25, 659.25, 783.99, 1046.5].forEach((note, index) => {
        setTimeout(() => playTone(note, 0.24, "triangle"), index * 135);
      });
    }

    function launchConfetti() {
      const colors = ["#ff5d73", "#ffd166", "#06d6a0", "#4c9ae4", "#8b5cf6"];
      for (let i = 0; i < 70; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.setProperty("--drift", `${(Math.random() - .5) * 220}px`);
        piece.style.animationDelay = `${Math.random() * .45}s`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3400);
      }
    }

    function shuffle(items) {
      const array = [...items];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function chooseEight(instruments) {
      return shuffle(instruments).slice(0, 8);
    }

    function showScreen(screen) {
      menuScreen.classList.toggle("active", screen === "menu");
      gameScreen.classList.toggle("active", screen === "game");
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    function startGame() {
      selectedSetKey = setSelect.value;
      const selectedSet = gameSets[selectedSetKey];
      const chosen = chooseEight(selectedSet.instruments);
      const deck = shuffle([...chosen, ...chosen].map((instrument, index) => ({
        ...instrument,
        uniqueId: `${instrument.name}-${index}-${Math.random()}`
      })));

      firstCard = null;
      secondCard = null;
      lockBoard = false;
      matches = 0;
      turns = 0;
      matchesCount.textContent = "0";
      turnCount.textContent = "0";
      setName.textContent = selectedSet.title;
      matchedList.innerHTML = "";
      emptyMessage.hidden = false;
      winOverlay.classList.remove("show");
      board.innerHTML = "";

      deck.forEach((instrument) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "card";
        card.dataset.name = instrument.name;
        card.setAttribute("aria-label", "Hidden instrument card");
        card.innerHTML = `
          <span class="card-inner">
            <span class="card-face card-back" aria-hidden="true"></span>
            <span class="card-face card-front">
              <img src="${instrument.image}" alt="${instrument.name}" draggable="false" />
              <span class="card-name">${instrument.name}</span>
            </span>
          </span>`;
        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
      });

      showScreen("game");
    }

    function flipCard(card) {
      if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

      card.classList.add("flipped");
      card.setAttribute("aria-label", card.dataset.name);

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      turns += 1;
      turnCount.textContent = String(turns);
      checkForMatch();
    }

    function checkForMatch() {
      const isMatch = firstCard.dataset.name === secondCard.dataset.name;
      if (isMatch) {
        const matchedName = firstCard.dataset.name;
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard.disabled = true;
        secondCard.disabled = true;
        matches += 1;
        matchesCount.textContent = String(matches);
        addMatchedName(matchedName);
        playMatchSound();
        resetTurn();

        if (matches === 8) {
          setTimeout(() => {
            playWinSound();
            launchConfetti();
            winMessage.textContent = `You matched all eight instruments in ${turns} turn${turns === 1 ? "" : "s"}.`;
            winOverlay.classList.add("show");
            document.getElementById("winPlayAgain").focus();
          }, 550);
        }
      } else {
        playMissSound();
        lockBoard = true;
        setTimeout(() => {
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          firstCard.setAttribute("aria-label", "Hidden instrument card");
          secondCard.setAttribute("aria-label", "Hidden instrument card");
          resetTurn();
        }, 900);
      }
    }

    function addMatchedName(name) {
      emptyMessage.hidden = true;
      const item = document.createElement("li");
      item.textContent = name;
      matchedList.appendChild(item);
    }

    function resetTurn() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
    }

    function backToMenu() {
      winOverlay.classList.remove("show");
      showScreen("menu");
      document.getElementById("startButton").focus();
    }

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("playAgainButton").addEventListener("click", startGame);
    document.getElementById("menuButton").addEventListener("click", backToMenu);
    document.getElementById("winPlayAgain").addEventListener("click", startGame);
    document.getElementById("winMenu").addEventListener("click", backToMenu);
    soundButton.addEventListener("click", () => {
      soundOn = !soundOn;
      soundButton.textContent = soundOn ? "🔊 Sound On" : "🔇 Sound Off";
      soundButton.setAttribute("aria-pressed", String(soundOn));
      if (soundOn) playTone(660, 0.12, "triangle");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && winOverlay.classList.contains("show")) {
        winOverlay.classList.remove("show");
      }
    });
