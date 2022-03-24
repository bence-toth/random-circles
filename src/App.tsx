import { useState, useEffect } from "react";
import "./App.css";

const numbers = new Array(101).fill(0).map((_, index) => index);

const getRandomNumberBetween = (x: number, y: number) =>
  x + Math.random() * (y - x);

const getRandomColorChannel = () => Math.round(getRandomNumberBetween(0, 255));

const getRandomColor = () => {
  const red = getRandomColorChannel();
  const green = getRandomColorChannel();
  const blue = getRandomColorChannel();
  return `rgb(${red}, ${green}, ${blue})`;
};

interface Circle {
  centerX: number;
  centerY: number;
  radius: number;
  color: string;
}

const getRandomCircle = (): Circle => ({
  centerX: getRandomNumberBetween(0, 100),
  centerY: getRandomNumberBetween(0, 100),
  radius: getRandomNumberBetween(20, 50),
  color: getRandomColor(),
});

const App = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [circles, setCircles] = useState<Circle[]>([]);

  useEffect(() => {
    const circlesArray = new Array(selectedNumber)
      .fill(undefined)
      .map(getRandomCircle);
    setCircles(circlesArray);

    // TODO: When the selected number increases, generate new circles, but keep the existing ones
    // TODO: When the selected number decreases, remove the unnecessary circles, but keep the existing ones
  }, [selectedNumber]);

  return (
    <div className="App">
      <select
        value={selectedNumber}
        onChange={(event) => {
          setSelectedNumber(Number(event.target.value));
        }}
      >
        {numbers.map((number) => (
          <option key={number}>{number}</option>
        ))}
      </select>
      {circles.map((circle, circleIndex) => (
        <div
          key={circleIndex}
          className="circle"
          style={{
            top: `${circle.centerX}vh`,
            left: `${circle.centerY}vw`,
            backgroundColor: circle.color,
            width: 2 * circle.radius,
            aspectRatio: "1 / 1",
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
