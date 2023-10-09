import React from "react";

type NumberObject = {
  [propName: string]: number;
};

type StringObject = {
  [propName: string]: string;
};

const CONVERSIONS: NumberObject = {
  feetToMeters: 3.28084,
  metersToFeet: 0.3048,
  gallonsToLiters: 0.264172,
  litersToGallons: 3.785412,
  poundsToKilos: 2.204623,
  kilosToPounds: 0.4535924,
};

function UnitConverter() {
  const [input, setInput] = React.useState<StringObject>({
    units: "1",
  });
  const [parsedInput, setParsedInput] = React.useState<number>(
    parseFloat(input.units)
  );
  const [parsedOutput, setParsedOutput] = React.useState<StringObject>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.units) {
      setParsedInput(1)
    } else {
      setParsedInput(parseFloat(input.units));
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    const parsedOutput: StringObject = Object.entries(CONVERSIONS).reduce(
      (result, [conversion, conversionFactor]) => {
        const measurementUnits: string = conversion.substring(
          0,
          conversion.indexOf("To")
        );
        const convertedValue: string = convert(
          parsedInput,
          conversionFactor,
          3
        );

        return {
          ...result,
          [measurementUnits]: convertedValue,
        };
      },
      {}
    );

    setParsedOutput({ units: String(parsedInput), ...parsedOutput });
  }, [parsedInput]);

  return (
    <div className="container max-w-[600px]">
        <div className="bg-[#6943FF] px-12 py-8 flex flex-wrap justify-center">
          <h2 className="mb-6 text-base font-extrabold tracking-wider text-center basis-full font-inter">Metric/Imperial Unit Conversion</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <input
              name="units"
              type="text"
              maxLength={7}
              size={7}
              pattern="[0-9]*(?:\.(?=[0-9]+)(?<=\.)[0-9]+)?"
              placeholder="#.##"
              value={input.units}
              onChange={handleChange}
              className="py-2 font-inter text-3xl font-extrabold text-center focus:outline-none bg-[#6943FF] border-[#B295FF] border-[2px] rounded-[5px]"
            />
            <button className="text-sm text-[#3D3D3D] bg-[#FFFFFF] py-4 font-inter font-medium rounded-[5px]" type="submit">Convert</button>
          </form>
        </div>
        <div className="bg-[#F4F4F4] text-[#5A537B] px-12 py-8 flex flex-col gap-y-6">
          <div className="bg-[#FFFFFF] p-4 rounded-tl-[5px]">
            <h2 className="color-[#5A537B] text-center font-inter font-semibold text-base tracking-wide">Length (Meter/Feet)</h2>
            <output className="color=[#353535] text-sm">
              {parsedOutput.units} {pluralizeUnits("meter", parsedOutput.units)} = {parsedOutput.feet} {pluralizeUnits("foot", parsedOutput.feet)} |{" "}
              {parsedOutput.units} {pluralizeUnits("foot", parsedOutput.units)} = {parsedOutput.meters} {pluralizeUnits("meter", parsedOutput.meters)}
            </output>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-tl-[5px]">
            <h2 className="color-[#5A537B] text-center font-inter font-semibold text-base tracking-wide">Volume (Liters/Gallons)</h2>
            <output className="color=[#353535] text-sm">
              {parsedOutput.units} {pluralizeUnits("liter", parsedOutput.units)} = {parsedOutput.liters} {pluralizeUnits("gallon", parsedOutput.liters)} |{" "}
              {parsedOutput.units} {pluralizeUnits("gallon", parsedOutput.units)} = {parsedOutput.gallons} {pluralizeUnits("liter", parsedOutput.gallons)}
            </output>
          </div>
          <div className="bg-[#FFFFFF] p-4 rounded-tl-[5px]">
            <h2 className="color-[#5A537B] text-center font-inter font-semibold text-base tracking-wide">Mass (Kilograms/Pounds)</h2>
            <output className="color=[#353535] text-sm">
              {parsedOutput.units} {pluralizeUnits("kilo", parsedOutput.units)} = {parsedOutput.pounds} {pluralizeUnits("pound", parsedOutput.pound)} |{" "}
              {parsedOutput.units} {pluralizeUnits("pound", parsedOutput.units)} = {parsedOutput.kilos} {pluralizeUnits("kilo", parsedOutput.kilos)}
            </output>
          </div>
        </div>
    </div>
  );
}

function convert(
  units: number,
  conversionFactor: number,
  fractionalDigits: number
): string {
  return (units * conversionFactor).toFixed(fractionalDigits);
}

function pluralizeUnits(singularUnit: string, amount: string): string {
  console.log(parseFloat(amount))
  if (singularUnit === "foot") {
    return (parseFloat(amount) % 1) ? "feet" : singularUnit;
  }

  return (parseFloat(amount) % 1) ? `${singularUnit}s` : singularUnit;
}

export default UnitConverter;
