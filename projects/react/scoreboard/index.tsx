import React from "react";

type Teams = {
  [propName: string]: number;
}

function Scoreboard() {
  const [scores, setScores] = React.useState<Teams>({
    home: 0,
    guest: 0,
  });

  const updateScore = (name: string) => {
    return (incrementValue: number) => {
      setScores((oldScores) => ({
        ...oldScores,
        [name]: oldScores[name] + incrementValue,
      }));
    }
  };

  return (
    <div className="bg-[#E5E5E5] w-screen h-screen pt-24">
      <div className="container">
        <div className="flex mx-auto gap-x-14 bg-[#1B244A] w-fit p-12">
          <ScoreDisplay name="Home" score={scores.home} handleClick={() => updateScore("home")} />
          <ScoreDisplay name="Guest" score={scores.guest} handleClick={() => updateScore("guest")} />
        </div>
      </div>
    </div>
  );
}

function ScoreDisplay({ name, score, handleClick }: ScoreProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="font-['verdana'] text-[2.25rem] font-bold uppercase text-center -mb-3">{name}</h1>
      <div className="py-3 text-center bg-black rounded-[5px]">
        <span className="text-[#F94F6D] font-timer text-[2.5rem]">{score}</span>
      </div>
      <div className="flex justify-between gap-x-2">
        <ScoreIncrementor value={1} handleClick={handleClick} />
        <ScoreIncrementor value={2} handleClick={handleClick} />
        <ScoreIncrementor value={3} handleClick={handleClick} />
      </div>
    </div>
  );
}

type ScoreProps = {
  name: string;
  score: number;
  handleClick: () => (incrementValue: number) => void;
};

function ScoreIncrementor({ value, handleClick }: ScoreIncrementorProps) {
  return (
    <button
      onClick={() => handleClick()(value)}
      className="border-2 rounded-[5px] text-[#9AABD8] px-2 py-2 leading-[1.4] font-timer text-[1rem] hover:text-[#9AABD8]/80 transition-[color_transform] duration-75 ease-out active:translate-y-[2px] active:scale-105"
    >
      +{value}
    </button>
  )
}

type ScoreIncrementorProps = {
  value: number;
  handleClick: () => (incrementValue: number) => void;
}

export default Scoreboard;