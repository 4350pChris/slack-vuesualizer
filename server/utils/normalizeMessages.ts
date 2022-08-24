import { assert } from "@vueuse/core";
import type { ApiMessage, Message } from "~/types/Message";

export default function (messages: ApiMessage[]): Message[] {
  const cpy = [...messages];

  messages.forEach((m) => {
    // replies isa empty or undefined - we can just leave it as is, replies will be cleaned up later
    if (!m.replies) {
      return;
    }

    // for each reply, move it to the correct position in cpy
    m.replies.forEach((reply, i) => {
      const index = cpy.findIndex(
        (m) => m.ts === reply.ts && m.user === reply.user
      );
      // should not happen...
      assert(index > 0);
      // first remove from cpy
      const spliced = cpy.splice(index, 1);
      const withReplyProp = spliced.map(
        (s) => ({ ...s, reply: true } as Message)
      );
      const parentMessageIndex = cpy.findIndex(({ _id }) => _id === m._id);
      // then insert again at correct position, taking into account previously moved messages
      cpy.splice(parentMessageIndex + i + 1, 0, ...withReplyProp);
    });
  });
  return cpy;
}
