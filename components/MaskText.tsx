
const phrases = [
  "Elevate customer experiences and boost sales with",
  "AI and AR.Upgrade your dining space with the future",
  "of innovation today.Simplify tasks from ordering to ",
  "inventory management, reducing errors and enhancing ",
  "service speed."
];

export function MaskText() {
  return (
    <div className="tracking-tight flex flex-col items-start space-y-1">
      {phrases.map((phrase, index) => (
        <p 
          key={index} 
          className="text-xl text-gray-300 font-normal"
        >
          {phrase}
        </p>
      ))}
    </div>
  );
}
