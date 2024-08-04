type DataItem = {
    id: string;
    type: string;
    content: Record<string, any>;
    userId?: string;
    createdAt: string;
    updatedAt: string;
  };
  

export function formatData(items: DataItem[]): string {
    return items
      .map((item) => {
        const contentString = JSON.stringify(
          item.content,
          (key, value) => {
            if (Array.isArray(value))
              return value.map((v) =>
                typeof v === "object" ? JSON.stringify(v) : v
              );
            return value;
          },
          2
        );
        return `type: ${item.type}\ncontent: ${contentString}\ncreated: ${item.createdAt}\n---`;
      })
      .join("\n");
  }
  