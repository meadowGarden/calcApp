import { LINE_ROUNDING } from "./constants";

export const uomDictServerClient = {
  KILOGRAM: "kg",
  CUBIC_M: "m3",
  SQUARE_M: "m2",
  LITER: "l",
  PIECE: "pcs",
  METER: "m",
  SET: "set",
};

export const roleDictServerClient = {
  ADMIN: "admin",
  USER: "user",
};

export const calculateLineCosts = (quantity, price) => {
  return Math.round(quantity * price * LINE_ROUNDING) / LINE_ROUNDING;
};
