import { Button } from "../ui/button";

const IntegrationsCard = ({ title, description, icon, hasButton, button }: any) => {
    return (
      <div className="w-full bg-white/40 p-4 rounded-3xl transition-all ease-in ">
        <div className="flex flex-row items-center">
          {icon}
          <div className="text-sm font-semibold text-black/80 pl-2">{title}</div>
        </div>
        <div className="pt-2 pb-4 ">
          <div className="text-md text-black/60">{description}</div>
        </div>
        
        {
            hasButton ? (
                button
            ) : (
                <Button
                variant="ghost"
                size={"lg"}
                disabled
                className="w-full rounded-full bg-white hover:bg-white/80 text-primary"
              >
                Coming soon
              </Button>
            )
        }

      </div>
    );
  };
  

export default IntegrationsCard;