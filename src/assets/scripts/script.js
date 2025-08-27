  // Game variables
        let wins = 0;
        let losses = 0;
        let draws = 0;
        
        // Audio elements
        const winSound = document.getElementById('win-sound');
        const loseSound = document.getElementById('lose-sound');
        const drawSound = document.getElementById('draw-sound');
        
        // DOM elements
        const playerChoiceDisplay = document.getElementById('player-choice');
        const computerChoiceDisplay = document.getElementById('computer-choice');
        const resultDisplay = document.getElementById('result');
        const winsDisplay = document.getElementById('wins');
        const lossesDisplay = document.getElementById('losses');
        const drawsDisplay = document.getElementById('draws');
        
        // Card elements
        const gokuCard = document.getElementById('goku-card');
        const vegetaCard = document.getElementById('vegeta-card');
        const freezaCard = document.getElementById('freeza-card');
        
        // Game logic
        function playGame(playerChoice) {
            // Reset card selections
            resetCardSelection();
            
            // Highlight selected card
            document.getElementById(`${playerChoice}-card`).classList.add('card-selected');
            
            // Computer makes random choice
            const choices = ['goku', 'vegeta', 'freeza'];
            const computerChoice = choices[Math.floor(Math.random() * 3)];
            
            // Display choices with animation
            displayChoice(playerChoiceDisplay, playerChoice);
            setTimeout(() => {
                displayChoice(computerChoiceDisplay, computerChoice);
                
                // Determine winner after a short delay
                setTimeout(() => {
                    const result = determineWinner(playerChoice, computerChoice);
                    displayResult(result);
                    updateScore(result);
                }, 500);
            }, 500);
        }
        
        function displayChoice(element, choice) {
            // Clear previous content
            element.innerHTML = '';
            element.classList.remove('card-back');
            
            // Set background based on choice
            let bgClass = '';
            let icon = '';
            let name = '';
            
            switch(choice) {
                case 'goku':
                    bgClass = 'bg-gradient-to-br from-orange-900 to-orange-600';
                    icon = 'https://www.freeiconspng.com/thumbs/goku-png/goku-png-24.png';
                    name = 'goku';
                    break;
                case 'vegeta':
                    bgClass = 'bg-gradient-to-br from-blue-900 to-blue-600';
                    icon = 'https://www.pngall.com/wp-content/uploads/13/Vegeta-PNG-Images.png';
                    name = 'vegeta';
                    break;
                case 'freeza':
                    bgClass = 'bg-gradient-to-br from-purple-900 to-purple-600';
                    icon = 'https://wallpapers.com/images/hd/frieza-dragon-ball-villain-bo44f8s7cextcc16.png';
                    name = 'freeza';
                    break;
            }
            
            // Apply styles and content
            element.className = `w-32 h-44 rounded-lg flex flex-col items-center justify-center border-2 ${bgClass} result-animation`;
            element.innerHTML = `
                <img src="${icon}" alt="${name}" class="w-16 h-16 mb-2">
                <h3 class="text-lg font-bold">${name}</h3>
            `;
        }
        
        function determineWinner(player, computer) {
            if (player === computer) {
                return 'draw';
            }
            
            if (
                (player === 'goku' && computer === 'vegeta') ||
                (player === 'vegeta' && computer === 'freeza') ||
                (player === 'freeza' && computer === 'goku')
            ) {
                return 'win';
            }
            
            return 'lose';
        }
        
        function displayResult(result) {
            resultDisplay.classList.add('result-animation');
            
            switch(result) {
                case 'win':
                    resultDisplay.textContent = 'You Won!';
                    resultDisplay.className = 'text-3xl font-bold mb-6 h-12 flex items-center justify-center text-green-400 result-animation';
                    winSound.play();
                    break;
                case 'lose':
                    resultDisplay.textContent = 'You Lost!';
                    resultDisplay.className = 'text-3xl font-bold mb-6 h-12 flex items-center justify-center text-red-400 result-animation';
                    loseSound.play();
                    break;
                case 'draw':
                    resultDisplay.textContent = 'Draw!';
                    resultDisplay.className = 'text-3xl font-bold mb-6 h-12 flex items-center justify-center text-yellow-400 result-animation';
                    drawSound.play();
                    break;
            }
            
            // Remove animation class after it's done
            setTimeout(() => {
                resultDisplay.classList.remove('result-animation');
            }, 500);
        }
        
        function updateScore(result) {
            switch(result) {
                case 'win':
                    wins++;
                    winsDisplay.textContent = wins;
                    break;
                case 'lose':
                    losses++;
                    lossesDisplay.textContent = losses;
                    break;
                case 'draw':
                    draws++;
                    drawsDisplay.textContent = draws;
                    break;
            }
        }
        
        function resetCardSelection() {
            gokuCard.classList.remove('card-selected');
            vegetaCard.classList.remove('card-selected');
            freezaCard.classList.remove('card-selected');
        }