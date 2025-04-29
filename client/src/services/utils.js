const LINE_ROUNDING = 1000;

export const adjustUOMClient = (s) => {
  switch (s) {
    case "KILOGRAM":
      return "kg";
    case "LITER":
      return "l";
    case "PIECE":
      return "pcs";
    case "METER":
      return "m";
    case "SET":
      return "set";
    default:
      return "n/a";
  }
};

export const adjustUOMServer = (s) => {
  switch (s) {
    case "kg":
      return "KILOGRAM";
    case "l":
      return "LITER";
    case "pcs":
      return "PIECE";
    case "m":
      return "METER";
    case "set":
      return "SET";
    default:
      return "n/a";
  }
};

export const calculateLineCosts = (quantity, price) => {
  return Math.round(quantity * price * LINE_ROUNDING) / LINE_ROUNDING;
};
