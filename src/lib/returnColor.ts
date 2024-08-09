export function returnColor(feeling: string) {
    if (feeling === "Happy") {
      return "#3379E3";
    }
    if (feeling === "Sad") {
      return "#AA88F1";
    }
    if (feeling === "Angry") {
      return "#FF9B9B";
    }
    if (feeling === "Anxious") {
      return "#FFD27F";
    }
    if (feeling === "Calm") {
      return "#B7B7B7";
    }
    if (feeling === "Stress") {
      return "#333333";
    }
  
    return "yellow";
  }