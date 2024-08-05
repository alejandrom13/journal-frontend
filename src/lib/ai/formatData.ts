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
  

  function getAllKeysAndValues(obj:any) {
    let result = '';
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        result += `${key}:\n${getAllKeysAndValues(value)}`;
      } else {
        result += `${key}: ${value}\n`;
      }
    }
    return result;
  }
  
  export function processArray(arr:any) {
    let result = '';
    for (const item of arr) {
      result += getAllKeysAndValues(item) + '\n';
    }
    return result;
  }
  
