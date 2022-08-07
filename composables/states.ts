import type { Channel } from "~~/types/Channel";
import { User } from "~~/types/User";

export const useChannels = useState<Channel[]>("channels", () => []);
export const useUsers = useState<User[]>("users", () => []);
