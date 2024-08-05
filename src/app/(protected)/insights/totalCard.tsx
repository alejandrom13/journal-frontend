interface TotalCardProps {
    title: string;
    value: number;
    icon: any;
    iconSize: string;
    color: string;
}

const TotalCard = ({ title, value, icon, color, iconSize}: TotalCardProps) => {
  return (
    <div className="bg-white/50 rounded-2xl p-4">
      <div className="flex flex-row">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-black/70">{title}</h3>
          <h1 className="font-medium text-2xl">{value}</h1>
        </div>

        <div className="bg-primary/20 p-2 rounded-full w-10 h-10 ml-auto flex items-center justify-center">
            <div className={`${iconSize}`}>
            {icon}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
