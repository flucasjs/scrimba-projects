import React from "react";

type Teams = {
  [propName: string]: number;
};

function Scoreboard() {
  const [scores, setScores] = React.useState<Teams>({
    home: 0,
    guest: 0,
  });

  const [game, setGame] = React.useState<boolean>(false);
  const [gamePaused, setGamePaused] = React.useState<boolean>(false);
  const [reset, setReset] = React.useState<boolean>(false);
  
  const resetGame = () => {
    setGame(false);
    setGamePaused(false);
    setReset(true);
    setScores({
      home: 0,
      guest: 0,
    });
  }

  const updateScore = (name: string) => {
    return (incrementValue: number) => {
      setScores((oldScores) => ({
        ...oldScores,
        [name]: oldScores[name] + incrementValue,
      }));
    };
  };

  const updateGame = (state: boolean) => setGame(state);

  return (
    <div className="bg-[#E5E5E5] w-screen h-screen overflow-auto">
      <div className="container">
        <main className="flex mx-auto bg-[#1B244A] w-fit px-24 py-12 flex-col mt-24">
          <Timer start={game} paused={gamePaused} reset={reset}/>
          <div className="flex mb-12 gap-x-14">
            <ScoreDisplay
              name="Home"
              score={scores.home}
              handleClick={() => updateScore("home")}
              gameRunning={game}
              gamePaused={gamePaused}
            />
            <ScoreDisplay
              name="Guest"
              score={scores.guest}
              handleClick={() => updateScore("guest")}
              gameRunning={game}
              gamePaused={gamePaused}
            />
          </div>
          <Controls updateGame={updateGame} pauseGame={setGamePaused} resetGame={resetGame} gameRunning={game} gamePaused={gamePaused}/>
        </main>
      </div>
    </div>
  );
}

type ControlsType = {
  updateGame: (state: boolean) => void;
  pauseGame: (state: boolean) => void;
  resetGame: () => void;
  gameRunning: boolean;
  gamePaused: boolean;
}

function Controls({ updateGame, pauseGame, resetGame, gameRunning, gamePaused }: ControlsType) {
  return (
    <div className="flex flex-col gap-y-4">
      <button 
        className={`px-2 py-1 border rounded-[5px] ${gameRunning ? "text-[#9AABD8]/50 cursor-not-allowed" : "text-[#9AABD8] hover:text-[#9AABD8]/80"} transition-colors duration-75 ease-out`}
        onClick={() => {updateGame(true); pauseGame(false)}}
        disabled={gameRunning}
      >
        Start Game
      </button>
      <button 
        className={`px-2 py-1 border rounded-[5px] ${gameRunning ? "text-[#9AABD8] hover:text-[#9AABD8]/80" : "text-[#9AABD8]/50 cursor-not-allowed"} transition-colors duration-75 ease-out`}
        onClick={() => pauseGame(!gamePaused)}
        disabled={!gameRunning}
      >
        {gamePaused ? "Resume Game" : "Pause Game"}
      </button>
      <button
        className={`px-2 py-1 border rounded-[5px] ${gameRunning ? "text-[#9AABD8] hover:text-[#9AABD8]/80" : "text-[#9AABD8]/50 cursor-not-allowed"} transition-colors duration-75 ease-out`}
        onClick={resetGame}
        disabled={!gameRunning && !gamePaused}
      >
        Reset Game
      </button>
    </div>
  ) 
}

type TimerProps = {
  start: boolean;
  paused: boolean;
  reset: boolean;
}

function Timer({ start, paused, reset }: TimerProps) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (start && !paused) {
      setTimeout(() => setSeconds((elapsedSeconds) => elapsedSeconds + 1), 1000);
    } else if (reset) {
      setSeconds(0);
    }
  }, [start, seconds, reset, paused]);

  const InitialDisplay = () => (
    <span className="text-[2.5rem] font-timer text-[#F94F6D]">
      Start
    </span>
  );

  const TimerDisplay = () => (
    <span className="text-[2.5rem] font-timer text-[#F94F6D]">
      {String(Math.floor(seconds / 60)).padStart(2, "0")}:
      {String(seconds % 60).padStart(2, "0")}
    </span>
  );

  const PausedDisplay = () => (
    <span className="text-[2.5rem] font-timer text-[#F94F6D] relative">
      <span className="text-[1rem] font-timer text-[#F94F6D] absolute top-0 -left-[5rem]">Paused</span>
      {String(Math.floor(seconds / 60)).padStart(2, "0")}:
      {String(seconds % 60).padStart(2, "0")}
    </span>
  );

  return (
    <section className="mb-4">
      <div className="flex justify-center bg-black">
        {start ?
          paused ? <PausedDisplay /> : <TimerDisplay /> :
          <InitialDisplay />
        }
      </div>
    </section>
  );
}

function ScoreDisplay({ name, score, handleClick, gameRunning, gamePaused}: ScoreProps) {
  return (
    <section className="flex flex-col gap-y-5">
      <h2 className="font-['verdana'] text-[2.25rem] font-bold uppercase text-center -mb-3">
        {name}
      </h2>
      <div className="py-3 text-center bg-black rounded-[5px]">
        <span className="text-[#F94F6D] font-timer text-[2.5rem]">{score}</span>
      </div>
      <div className="flex justify-between gap-x-2">
        <ScoreIncrementor value={1} handleClick={handleClick} gameRunning={gameRunning} gamePaused={gamePaused}/>
        <ScoreIncrementor value={2} handleClick={handleClick} gameRunning={gameRunning} gamePaused={gamePaused}/>
        <ScoreIncrementor value={3} handleClick={handleClick} gameRunning={gameRunning} gamePaused={gamePaused}/>
      </div>
    </section>
  );
}

type ScoreProps = {
  name: string;
  score: number;
  handleClick: () => (incrementValue: number) => void;
  gameRunning: boolean;
  gamePaused: boolean;
};

function ScoreIncrementor({ value, gameRunning, handleClick, gamePaused }: ScoreIncrementorProps) {
  return (
    <button
      onClick={() => handleClick()(value)}
      className={`border-2 rounded-[5px] px-2 py-2 leading-[1.4] font-timer text-[1rem] transition-[color_transform] duration-75 ease-out ${(gameRunning && !gamePaused) ? "text-[#9AABD8] active:translate-y-[2px] active:scale-105 hover:text-[#9AABD8]/80" : "text-[#9AABD8]/50 cursor-not-allowed"}`}
      disabled={gameRunning && gamePaused}
    > 
      +{value}
    </button>
  );
}

type ScoreIncrementorProps = {
  value: number;
  handleClick: () => (incrementValue: number) => void;
  gameRunning: boolean;
  gamePaused: boolean;
};

export default Scoreboard;
