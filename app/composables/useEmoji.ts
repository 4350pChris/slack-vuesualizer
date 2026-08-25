import EmojiConvertor from 'emoji-js'
import type { MaybeRef } from '@vueuse/core'

export default (name: MaybeRef<string>) => {
  const emoji = new EmojiConvertor()
  emoji.replace_mode = 'unified'

  const emojiUnicode = computed(() => {
    return emoji.replace_colons(`:${unref(name)}:`)
  })

  return { emojiUnicode }
}
