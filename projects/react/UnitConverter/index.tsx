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

    setParsedInput(parseFloat(input.units));
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
    <div>
      <div>
        <h2>Metric/Imperial Unit Conversion</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="units"
            type="text"
            placeholder="1"
            value={input.units}
            onChange={handleChange}
          />
          <button type="submit">Convert</button>
        </form>
      </div>
      <div>
        <div>
          <h2>Length (Meter/Feet)</h2>
          <output>
            {parsedOutput.units} {pluralizeUnits("meter", parsedOutput.units)} = {parsedOutput.feet} {pluralizeUnits("foot", parsedOutput.feet)} |{" "}
            {parsedOutput.units} {pluralizeUnits("foot", parsedOutput.units)} = {parsedOutput.meters} {pluralizeUnits("meter", parsedOutput.meters)}
          </output>
        </div>
        <div>
          <h2>Volume (Liters/Gallons)</h2>
          <output>
            {parsedOutput.units} {pluralizeUnits("liter", parsedOutput.units)} = {parsedOutput.liters} {pluralizeUnits("gallon", parsedOutput.liters)} |{" "}
            {parsedOutput.units} {pluralizeUnits("gallon", parsedOutput.units)} = {parsedOutput.gallons} {pluralizeUnits("liter", parsedOutput.gallons)}
          </output>
        </div>
        <div>
          <h2>Mass (Kilograms/Pounds)</h2>
          <output>
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
