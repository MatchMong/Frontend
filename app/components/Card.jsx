const Card = ({ number, title, bgColor, textColor }) => {
  return (
    <div className={`flex flex-col justify-center items-center rounded-lg w-[220px] h-[108px] p-10 ${bgColor}`}>
      <div className={`text-4xl font-bold ${textColor}`}>{number}</div>
      <div className="text-sm mt-2">{title}</div>
    </div>
  );
};

export default Card;
