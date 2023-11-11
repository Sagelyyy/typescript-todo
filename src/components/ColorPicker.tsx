import "../styles/ColorPicker.css";

interface PickerProps {
  handleColor: (color: string, id: string) => void;
  id: string;
}

export default function ColorPicker({ handleColor, id }: PickerProps) {
  const colors = [
    "#FFD1DC",
    "#AEC6CF",
    "#FFD700",
    "#98FB98",
    "#FFB6C1",
    "#CFCFC4",
    "#FFA07A",
    "#ADD8E6",
    "#F0E68C",
    "#87CEEB",
    "#242424",
  ];
  return (
    <div className="color-container">
      {colors.map((color: string, i) => {
        return (
          <div
            key={i}
            onClick={() => handleColor(color, id)}
            className="color-div"
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
}
