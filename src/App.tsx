import { useState, useEffect } from 'react';
import './App.css';
import defaultBgImg from './assets/bg.png';
import defaultCharImg from './assets/char.png';
import { storyScript } from './storyData';
import type { StoryNode } from './storyData';
import { INITIAL_STATE, POSITIONS, checkTimePenalty } from './gameLogic';
import type { GameState } from './gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('businessMathGameSave');
    if (saved) {
      const parsed = JSON.parse(saved);
      return checkTimePenalty(parsed);
    }
    return INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('businessMathGameSave', JSON.stringify(gameState));
  }, [gameState]);

  const advanceToNode = (nodeId: string) => {
    const nextNode = storyScript[nodeId];
    if (!nextNode) return;

    setGameState((prev) => {
      let newState = { ...prev, lastPlayedTime: Date.now(), currentSceneId: nodeId };

      if (nextNode.salaryChange) {
        newState.salary += nextNode.salaryChange;
      }
      if (nextNode.staminaChange) {
        newState.stamina += nextNode.staminaChange;
        if (newState.stamina <= 0) {
          newState.isGameOver = true;
          newState.gameOverReason = '過労により倒れました...クビです。';
        }
      }
      if (nextNode.correctAnswersChange) {
        newState.correctAnswers += nextNode.correctAnswersChange;
        const currentPos = POSITIONS[newState.positionLevel];
        if (newState.correctAnswers >= currentPos.nextPromo && newState.positionLevel < POSITIONS.length - 1) {
          newState.positionLevel += 1;
          newState.salary = POSITIONS[newState.positionLevel].baseSalary;
          newState.correctAnswers = 0;
          newState.stamina = Math.min(100, newState.stamina + 30);
        }
      }
      return newState;
    });
  };

  const handleQuizChoice = (index: number, node: StoryNode) => {
    if (!node.quiz) return;
    const isCorrect = index === node.quiz.correctIndex;
    const nextNodeId = isCorrect ? node.quiz.onCorrectNodeId : node.quiz.onIncorrectNodeId;
    advanceToNode(nextNodeId);
  };

  const handleNext = (node: StoryNode) => {
    if (node.nextNodeId) {
      advanceToNode(node.nextNodeId);
    }
  };

  const restartGame = () => {
    setGameState(INITIAL_STATE);
  };

  const debugAdvanceTime = () => {
    setGameState((prev) => {
      const advancedState = { ...prev, lastPlayedTime: prev.lastPlayedTime - (25 * 60 * 60 * 1000) };
      return checkTimePenalty(advancedState);
    });
  };

  if (gameState.isGameOver) {
    return (
      <div className="app-wrapper">
        <div id="game-container" style={{ backgroundColor: '#111', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: '#e74c3c', fontSize: '3rem', textShadow: '2px 2px 0 #000' }}>GAME OVER</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>{gameState.gameOverReason}</p>
          <button className="choice-btn" onClick={restartGame} style={{ fontSize: '1.2rem' }}>最初からやり直す</button>
        </div>
      </div>
    );
  }

  const currentNode = storyScript[gameState.currentSceneId] || storyScript['start'];
  const position = POSITIONS[gameState.positionLevel];
  const bgImg = currentNode.bgImage || defaultBgImg;
  const charImg = currentNode.charImage || defaultCharImg;

  return (
    <div className="app-wrapper">
      <div id="game-container" style={{ backgroundImage: `url(${bgImg})` }}>
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item date">📅 現実時間連動中</div>
          <div className="status-item position">🏢 役職: {position.name}</div>
          <div className="status-item salary">💴 給与: ¥{gameState.salary.toLocaleString()}</div>
          <div className="status-item stamina">
            体力:
            <div className="stamina-bar-container">
              <div className="stamina-bar-fill" style={{ width: `${Math.max(0, gameState.stamina)}%`, background: gameState.stamina < 30 ? '#e74c3c' : 'linear-gradient(90deg, #ff416c, #ff4b2b)' }}></div>
            </div>
          </div>
        </div>

        {/* Character */}
        {charImg && (
          <div className="character-container">
            <img src={charImg} className="character-sprite" alt="character" />
          </div>
        )}

        {/* Text Box / Quiz Box */}
        <div className="text-box-container">
          <div className="speaker-name">{currentNode.speaker}</div>
          <div className="text-message">{currentNode.message}</div>
          
          <div className="choices">
            {currentNode.quiz ? (
              currentNode.quiz.choices.map((choice, idx) => (
                <button key={idx} className="choice-btn" onClick={() => handleQuizChoice(idx, currentNode)}>
                  {choice}
                </button>
              ))
            ) : currentNode.branches ? (
              currentNode.branches.map((branch, idx) => (
                <button key={idx} className="choice-btn" onClick={() => advanceToNode(branch.nextNodeId)}>
                  {branch.text}
                </button>
              ))
            ) : currentNode.nextNodeId ? (
              <button className="choice-btn" onClick={() => handleNext(currentNode)}>
                次へ
              </button>
            ) : (
              <button className="choice-btn" onClick={restartGame}>
                最初から
              </button>
            )}
          </div>
        </div>

        {/* Debug Menu */}
        <div style={{ position: 'absolute', top: '60px', left: '10px', zIndex: 100, display: 'flex', gap: '10px' }}>
          <button onClick={debugAdvanceTime} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid #aaa', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>[デバッグ] 24時間進める (サボり判定)</button>
          <button onClick={restartGame} style={{ background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid #aaa', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>リセット</button>
        </div>
      </div>
    </div>
  );
}

export default App;
