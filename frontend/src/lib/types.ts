import type { components } from "./types/api";

export type UserRead = components["schemas"]["UserRead"];
export type AdminRead = components["schemas"]["AdminRead"];

export type UserCreate = components["schemas"]["UserCreate"];
export type AdminCreate = components["schemas"]["AdminCreate"];

export type User = components["schemas"]["User"];

export type MovieCreate = components["schemas"]["MovieCreate"];
export type MovieRead = components["schemas"]["MovieRead"];

export type AgeRating = components["schemas"]["MovieRead"]["age_rating"];

export const ageRatings = ["Any", "U", "PG", "12A", "12", "15", "18"];
