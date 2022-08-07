import type { User } from "~~/types/User";

export const useUsers = () => useState<User[]>("users", () => []);
