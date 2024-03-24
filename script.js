document.addEventListener('DOMContentLoaded', () => {
    
    // Functie om scores te weergeven in het scorebord
    const printScore = (scores) => {
        document.querySelector('.scoreBoard').innerHTML = '<h1>Score board</h1>';
        for (let kaartIndex = 0; kaartIndex < scores.length; kaartIndex++) {
            let scoreBox = document.createElement('div'); 
            scoreBox.className = 'score-box'; 
            scoreBox.innerText = scores[kaartIndex]; 
            document.querySelector('.scoreBoard').appendChild(scoreBox); 

        }
    }

    // Zet de scorebord titel en toont elke score in een nieuw vakje
    let clickCounter = 0;
    let scoreList = localStorage.getItem('scores');
    if (scoreList === null) { 
        scoreList = []; 
        localStorage.setItem('scores', JSON.stringify(scoreList)); 
    } else {
        scoreList = JSON.parse(scoreList); 
    }

    printScore(scoreList); 


// Lijst van kaartafbeeldingen voor memory
    const kaartAfb = [ 
        'images/beker-kleur.svg',
        'images/beker-kleur.svg',
        'images/eenhoorn-kleur.svg',
        'images/eenhoorn-kleur.svg',
        'images/hva-kleur.svg',
        'images/hva-kleur.svg',
        'images/kaarten-kleur.svg',
        'images/kaarten-kleur.svg',
        'images/koptelefoon-kleur.svg',
        'images/koptelefoon-kleur.svg',
        'images/lampje-kleur.svg',
        'images/lampje-kleur.svg',
        'images/loop-kleur.svg',
        'images/loop-kleur.svg',
        'images/raket-kleur.svg',
        'images/raket-kleur.svg'
    ];

    // Schudt de kaarten willekeurig
    const shuffleKaarten = kaartAfb.sort(() => Math.random() > 0.5 ? 1 : -1); 

    // Maakt en toont elke kaart in het spel.
    for (let kaartIndex = 0; kaartIndex < shuffleKaarten.length; kaartIndex++) { 
        let box = document.createElement('div'); 
        box.className = 'item'; 
        let img = document.createElement('img'); 
        img.src = shuffleKaarten[kaartIndex]; 
        box.appendChild(img); 

        //kaartkliks: telt kliks, checkt op matches, en toont succes of reset kaarten
        box.addEventListener('click', function() { 
            clickCounter++; 
            document.querySelector('.clickCounter').innerText = Math.floor(clickCounter / 2); 
            this.classList.add('cardFlipped'); 
            let openCards = document.querySelectorAll('.cardFlipped'); 
            if (openCards.length === 2) { 
                setTimeout(() => { 
                    if (openCards[0].querySelector('img').src === openCards[1].querySelector('img').src) { 
                        
                        openCards[0].classList.add('keuzeCorrect');
                        openCards[0].classList.remove('cardFlipped'); 

                        openCards[1].classList.add('keuzeCorrect'); 
                        openCards[1].classList.remove('cardFlipped'); 

                        if (document.querySelectorAll('.keuzeCorrect').length === shuffleKaarten.length) { 
                            scoreList.push(Math.floor(clickCounter / 2)); 

                            if (scoreList.length > 5) {
                                scoreList = []; 
                            }
                            localStorage.setItem('scores', JSON.stringify(scoreList)); 
                            printScore(scoreList); 
                            alert('Gefeliciteerd!'); 
                        }
                    } else { 
                        openCards.forEach(card => card.classList.remove('cardFlipped')); 
                    }
                }, 500); 
            }
        });

        document.querySelector('.game').appendChild(box); 
    }

    // Herlaadt de pagina wanneer op de resetknop wordt geklikt.
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => window.location.reload());
});


// bronnen
// code's: 
// https://www.youtube.com/watch?v=bznJPt4t_4s&t=887s
// https://www.youtube.com/watch?v=M0egyNvsN-Y 
// https://www.w3schools.com/html/html_favicon.asp
// afb: https://docplayer.nl/7592049-Cmd-brand-guide-versie-1-0-oktober-2014.html