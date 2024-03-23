document.addEventListener('DOMContentLoaded', () => {
    //scores is een array exmp: [6,34]
    const printScore = (scores) => {
        
        for (let i = 0; i < scores.length; i++) { //forloop
            let scoreBox = document.createElement('div'); //zet html code voor div klaar
            scoreBox.className = 'score-box'; //classe naam op scorebox
            scoreBox.innerText = scores[i]; //zet innertekst gelijk aan scores positie i
            document.querySelector('.scoreBoard').appendChild(scoreBox); //voeg een sub element toe aan een element met klasse scoreboard.
    
        }
    } 
    
    //reset als je pagina refresht
    let clickCounter = 0;
    let scoreList = localStorage.getItem('scores'); //check in de browser of scores bestaat (browser memory)
    if(scoreList === null){ //controleert of scorelijst bestaat
        scoreList = []; //bestaat niet -> maak aan als lege lijst
        localStorage.setItem('scores', JSON.stringify(scoreList)); //maak van array een string en sla op in memory
    }else{
        scoreList = JSON.parse(scoreList); //bestaat wel in de memory -> maak van de string een array
    }

    printScore(scoreList); //functie aangeroepen (soms lege array, soms lijst uit memory)



    const kaartAfb = [ //array van kaartjes
        'images/juiste-size-01.png',
        'images/juiste-size-01.png',
        'images/juiste-size-02.png',
        'images/juiste-size-02.png',
        'images/juiste-size-03.png',
        'images/juiste-size-03.png',
        'images/juiste-size-04.png',
        'images/juiste-size-04.png',
        'images/juiste-size-05.png',
        'images/juiste-size-05.png',
        'images/juiste-size-06.png',
        'images/juiste-size-06.png',
        'images/juiste-size-07.png',
        'images/juiste-size-07.png',
        'images/juiste-size-08.png',
        'images/juiste-size-08.png'
    ];

  
    const shuffleKaarten = kaartAfb.sort(() => Math.random() > 0.5 ? 1 : -1);   // Schud de kaarten

    for (let i = 0; i < shuffleKaarten.length; i++) { //forloop stel in ; check of dit waar is; hoeveel erbij komt
        let box = document.createElement('div'); //maakt de <div> aan
        box.className = 'item'; //geeft een klasse met de naam item
        let img = document.createElement('img'); //maakt <img> aan
        img.src = shuffleKaarten[i]; //[] positie van lijst '1' = +1
        box.appendChild(img); //stop supelement in de box (spreekt div aan)

        box.addEventListener('click', function() { //op het element wordt er geluisterd als er wordt geklikt
            clickCounter++; //elke keer als je klikt komt er +1 bij
            document.querySelector('.clickCounter').innerText = Math.floor(clickCounter / 2); //zoekt een actief element met de klasse clickcounter, stelt de inner text gelijk aan naar beneden afgerond clickcounter : 2
            this.classList.add('boxOpen'); //zet op de box de klasse 'boxOpen'
            let openCards = document.querySelectorAll('.boxOpen'); //selcteert alle elementen met de klasse 'boxOpen'
            if (openCards.length === 2) { //bij het openen van tweede kaart.
                setTimeout(() => {  //0.5 sec wachten (set timer). (function)
                    if (openCards[0].querySelector('img').src === openCards[1].querySelector('img').src) { //vergelijken of plaatjes het zelfde zijn
                    //als ze het zelfde 
                        openCards[0].classList.add('boxMatch'); //de kaart blijft open
                        openCards[0].classList.remove('boxOpen'); //maak de kaart niet meer actief

                        openCards[1].classList.add('boxMatch'); //same
                        openCards[1].classList.remove('boxOpen'); //same

                        if (document.querySelectorAll('.boxMatch').length === shuffleKaarten.length) { //kijkt of je hebt gewonnen
                            scoreList.push(Math.floor(clickCounter / 2)); //voeg score toe aan array
                            localStorage.setItem('scores', JSON.stringify(scoreList)); //slaat de score op in memory
                            printScore(scoreList); //roept funcite aan voor updaten van scorelist
                            alert('Gewonnen!'); //functie alert -> popup
                        }
                    } else { //als ze anders zijn
                        openCards.forEach(card => card.classList.remove('boxOpen')); //flipt kaart terug loser.
                    }
                }, 500); //time out 500ms
            }
        });

        document.querySelector('.game').appendChild(box); //gaat een element in een ander element stoppen (box in de game)
    }

    const resetButton = document.querySelector('.reset'); 
    resetButton.addEventListener('click', () => window.location.reload());
});

