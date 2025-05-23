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

export const sortByDictDisplay = new Map([
  ["users", ["first name", "last name", "email", "role"]],
]);

export const displayToValue = new Map([
  ["first name", "firstName"],
  ["last name", "lastName"],
  ["email", "email"],
  ["role", "role"],
]);

export const roleDictServerClient = {
  ADMIN: "admin",
  USER: "user",
};

export const calculateLineCosts = (quantity, price) => {
  return Math.round(quantity * price * LINE_ROUNDING) / LINE_ROUNDING;
};

export const generatePagesArray = (length) => {
  return Array.from({ length: length }, (_, i) => i + 1);
};

export const inspectPath = (role, rolesList, path) => {
  if (rolesList.includes(role)) return path;
};
