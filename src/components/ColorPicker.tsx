import "../styles/ColorPicker.css";

interface PickerProps {
  handleColor: (color: string, id: string) => void;
  id: string;
  currentColor: string;
}

export default function ColorPicker({
  handleColor,
  id,
  currentColor,
}: PickerProps) {
  const colors = [
    "#242424",
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
    "#34495e",
    "#2c3e50",
  ];
  return (
    <div className="color-container">
      {colors.map((color: string, i) => {
        return currentColor == color ? (
          <div
            key={i}
            onClick={() => handleColor(color, id)}
            className="color-div"
            style={{ backgroundColor: color, outline: "3px solid white" }}
          ></div>
        ) : (
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
