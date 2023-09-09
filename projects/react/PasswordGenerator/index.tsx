import React from "react";

type Passwords = {
  [password: string]: string;
}

function PasswordGenerator() {
  const [passwords, setPasswords] = React.useState<Passwords>({
    first: "",
    second: "",
  });

  const allChars: string[] = React.useMemo(() => {
    const chars: string[] = [];
    for (let i = 32; i < 127; i++) {
      chars.push(String.fromCharCode(i));
    }
    return chars;
  }, []);

  const getRandomValue = () => Math.floor(Math.random() * allChars.length);

  const handleClick = () => {
    let passwordOne: string = "";
    let passwordTwo: string = "";

    for (let i = 0; i < 15; i++) {
      passwordOne += allChars[getRandomValue()];
      passwordTwo += allChars[getRandomValue()];
    }

    setPasswords({
      first: passwordOne,
      second: passwordTwo,
    });
  }

  return (
    <div className="w-screen h-screen bg-[#1C1C1C] overflow-auto">
      <div className="container flex">
        <div className="mt-24 bg-[#1F2937] grow mx-auto py-12 px-16 flex flex-col">
          <div className="flex flex-col mb-8">
            <div className="flex flex-col">
              <span className="font-extrabold font-karla text-[2.5rem] -mb-[1.5rem]">
                Generate a
              </span>
              <span className="font-extrabold font-karla text-[2.5rem] text-[#4ADF86]">
                random password
              </span>
            </div>
            <span className="font-inter font-regular text-[#D5D4D8]">
              Never use an insecure password again.
            </span>
          </div>
          <button 
            className="bg-[#10B981] py-2 px-4 rounded-[6px] mb-8 w-fit font-inter font-medium tracking-wide transition-[colors_transform] duration-75 hover:bg-[#10B981]/80 hover:scale-105 active:translate-y-[1px]"
            onClick={handleClick}
          >
            Generate Password
          </button>
          <div className="bg-[#2F3E53] h-[1px] w-full mb-8"></div>
          <div className="flex justify-between gap-x-4">
            <div className="bg-[#273549] basis-1/2 py-3 px-2 rounded-[6px] text-[#55F991] font-inter font-medium text-[1rem] flex items-center justify-center tracking-wider">{passwords.first}</div>
            <div className="bg-[#273549] basis-1/2 py-3 px-2 rounded-[6px] text-[#55F991] font-inter font-medium text-[1rem] flex items-center justify-center tracking-wider">{passwords.second}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
