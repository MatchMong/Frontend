import classNames from "classnames";
import Card from "../Card";

const ActivityStats = () => {
  const data = [
    { number: 4, title: '참여 중인 팀' },
    { number: 7, title: '완료한 프로젝트' },
    { number: 2, title: '생성한 팀' }
  ];
  
  return (
    <div className="flex justify-between gap-4">
      {data.map((item, index) => (
        <Card
          key={index}
          number={item.number}
          title={item.title}
          bgColor={classNames(
            index === 1 ? 'bg-[#EAEDFF]' : 'bg-[#E9F5FF]'
          )}
          textColor={classNames(
            index === 1 ? 'text-[#3C5BFF]' : 'text-[#097AFF]'
          )}
        />
      ))}
    </div>
  );
};

export default ActivityStats;
