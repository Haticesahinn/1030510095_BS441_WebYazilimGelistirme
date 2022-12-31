import React, { useState, useEffect } from 'react';
import rock from './tas.png';
import paper from './kagit.png';
import scissors from './makas.png';

const Game = () => {
    const [gameMode, setGameMode] = useState(null);
    const [player1Choice, setPlayer1Choice] = useState(null);
    const [player2Choice, setPlayer2Choice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState(null);

    const choices = ['rock', 'paper', 'scissors'];
    const icons = { rock, paper, scissors };

    const makeComputerChoice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        setComputerChoice(choices[randomIndex]);
    };

    useEffect(() => {
        if (gameMode === 'single' && player1Choice && !computerChoice) {
            makeComputerChoice();
        }
    }, [gameMode, player1Choice, computerChoice]);

    useEffect(() => {
        if (gameMode === 'multi' && player1Choice && player2Choice) {
            setResult(null);
            if (player1Choice === player2Choice) {
                setResult('draw');
            } else if (
                (player1Choice === 'rock' && player2Choice === 'scissors') ||
                (player1Choice === 'paper' && player2Choice === 'rock') ||
                (player1Choice === 'scissors' && player2Choice === 'paper')
            ) {
                setResult('player1');
            } else {
                setResult('player2');
            }
        }
    }, [gameMode, player1Choice, player2Choice]);

    useEffect(() => {
        if (gameMode === 'single' && player1Choice && computerChoice) {
            setResult(null);
            if (player1Choice === computerChoice) {
                setResult('draw');
            } else if (
                (player1Choice === 'rock' && computerChoice === 'scissors') ||
                (player1Choice === 'paper' && computerChoice === 'rock') ||
                (player1Choice === 'scissors' && computerChoice === 'paper')
            ) {
                setResult('win');
            } else {
                setResult('lose');
            }
        }
    }, [gameMode, player1Choice, computerChoice]);

    const handleSinglePlayerClick = () => {
        setGameMode('single');
    };

    const handleMultiPlayerClick = () => {
        setGameMode('multi');
    };

    const handleChoiceClick = (player, choice) => {
        if (player === 'player1') {
            setPlayer1Choice(choice);
        } else {
            setPlayer2Choice(choice);
        }
    };

    const handlePlayAgainClick = () => {
        setPlayer1Choice(null);
        setPlayer2Choice(null);
        setComputerChoice(null);
        setResult(null);
    };

    return (
        <div>
            {gameMode === null && (
                <div>
                    <Button name={"Single Player"} onClick={handleSinglePlayerClick}></Button>
                    <Button name={"Multi Player"} onClick={handleMultiPlayerClick}></Button>
                </div>
            )}
            {gameMode === 'single' && !result && (
                <div>
                    {choices.map(choice => (
                        <Button
                            key={choice}
                            icon={icons[choice]}
                            onClick={() => handleChoiceClick('player1', choice)}
                        />
                    ))}
                </div>
            )}
            {gameMode === 'multi' && !result && (

                <div>
                    <div>Player 1 </div>
                    {choices.map(choice => (
                        <Button
                            key={choice}
                            icon={icons[choice]}
                            onClick={() => handleChoiceClick('player1', choice)}
                        />
                    ))}
                    <p>VS</p>
                    <div>Player 2 </div>
                    {choices.map(choice => (
                        <Button
                            key={choice}
                            icon={icons[choice]}
                            onClick={() => handleChoiceClick('player2', choice)}
                        />
                    ))}
                </div>
            )}
            {result && (
                <div>
                    {gameMode === 'single' && (
                        <div>
                            {result === 'win' && <div>Player: {player1Choice} <br/> Computer: {computerChoice}<p>You won!</p></div>}
                            {result === 'lose' && <div>Player: {player1Choice} <br/> Computer: {computerChoice}<p>You lost.</p></div>}
                            {result === 'draw' && <div>Player: {player1Choice} <br/> Computer: {computerChoice}<p>It's a draw.</p></div>}
                        </div>
                    )}
                    {gameMode === 'multi' && (
                        <div>
                            {result === 'player1' && <p>Player 1 won!</p>}
                            {result === 'player2' && <p>Player 2 won!</p>}
                            {result === 'draw' && <p>It's a draw.</p>}
                        </div>
                    )}
                    <Button onClick={handlePlayAgainClick} name={"Play Again"} ></Button>
                </div>
            )}
        </div>
    );
};

const Button = ({ icon, onClick,name }) => {
    return (
        <button onClick={onClick}>{name}
            <img src={icon} alt="" />
        </button>
    );
};

export default Game;

