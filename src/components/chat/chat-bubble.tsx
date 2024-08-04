import { marked } from "marked";
import { LucideSparkle, User2Icon } from "lucide-react";
const ChatBubble = ({ message, from, dir }: any) => {
  const htmlContent = marked(message);
  const proseFormat = "";
  if (dir === "left") {
    return (
      <div className="flex flex-row gap-2.5  py-4">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg border border-black/10 bg-white">
          {from === "user" ? (
            <User2Icon className="text-black/60" size={20} />
          ) : (
            <LucideSparkle className="text-primary" size={20} />
          )}
        </div>
        <div className="">
          <article
            className="prose text-md font-normal  prose-bold:text-white prose-bold:font-semibold prose-2xl:font-normal prose-2xl:text-lg prose-2xl:py-2 prose-2xl:leading-1.5"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-2.5  py-4">
      <div className="flex flex-col    max-w-[500px] leading-1.5 px-4 py-2 bg-white/70 border border-primary/20 rounded-3xl">
        <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
        <article className="text-[17px] font-normal  ml-auto">
          {message}
        </article>
      </div>
      {/* <Avatar className="w-8 h-8 rounded-full">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar> */}
    </div>
  );
};

export default ChatBubble;
