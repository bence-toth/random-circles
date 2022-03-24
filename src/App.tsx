import { useState, useEffect, useCallback } from "react";
import "./App.css";

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

interface CircleWithOpacity extends Circle {
  opacity: number;
}

const getRandomCircle = (): Circle => ({
  centerX: getRandomNumberBetween(0, 100),
  centerY: getRandomNumberBetween(0, 100),
  radius: getRandomNumberBetween(20, 50),
  color: getRandomColor(),
});

const getRandomCircleWithOpacity = (): CircleWithOpacity => ({
  ...getRandomCircle(),
  opacity: Math.random(),
});

const getRandomCircleWithOrWithoutOpacity = (): CircleWithOrWithoutOpacity => {
  // Let's flip a coin
  if (Math.random() < 0.5) {
    // Heads
    return getRandomCircle();
  }
  // Tails
  return getRandomCircleWithOpacity();
};

type CircleWithOrWithoutOpacity = Circle | CircleWithOpacity;

const App = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [circles, setCircles] = useState<CircleWithOrWithoutOpacity[]>([]);

  const wrapperRef = useCallback((element) => {
    element.addEventListener("wheel", (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setSelectedNumber((previousValue) => previousValue + 1);
      }
      if (event.deltaY > 0) {
        setSelectedNumber((previousValue) => Math.max(previousValue - 1, 0));
      }
    });
  }, []);

  useEffect(() => {
    const oldNumber = circles.length;
    if (oldNumber < selectedNumber) {
      // When the selected number increases, generate new circles, but keep the existing ones
      const numberOfNewCircles = selectedNumber - oldNumber;
      const newCircles = new Array(numberOfNewCircles)
        .fill(undefined)
        .map(getRandomCircleWithOrWithoutOpacity);
      setCircles([...circles, ...newCircles]);
    }
    if (selectedNumber < oldNumber) {
      // When the selected number decreases, remove the unnecessary circles, but keep the existing ones
      setCircles(circles.slice(0, selectedNumber));
    }
  }, [circles, selectedNumber]);

  return (
    <div className="app" ref={wrapperRef}>
      {selectedNumber}
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
            opacity: (circle as CircleWithOpacity).opacity ?? 1,
          }}
        ></div>
      ))}
    </div>
  );
};

export default App;
