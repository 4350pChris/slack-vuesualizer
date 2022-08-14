import type { ApiMessage, Message } from "~/types/Message";
import mongo from "~/server/utils/mongo";

export default async function (messages: ApiMessage[]): Promise<Message[]> {
  const db = await mongo();
  const cpy = [...messages];
  return messages.map((m) => {
    if (!m.replies) {
      return m as Message;
    }
    const replies = [];
    m.replies.forEach((reply) => {
      const i = cpy.findIndex(
        (inner) => reply.ts === inner.ts && reply.user === inner.user
      );
      if (i === -1) {
        return;
      }
      const found = cpy.splice(i, 1)[0];
      replies.push(found);
    });
    return { ...m, replies } as Message;
  });
}
