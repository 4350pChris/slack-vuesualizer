import type { Channel } from '~/types/Channel'
import type { Dm } from '~/types/Dm'

export function useChannels() {
  const properChannels = useState<Channel[]>('channels', () => [])
  const dms = useState<Dm[]>('dms', () => [])
  const groups = useState<Channel[]>('groups', () => [])
  const mpims = useState<Channel[]>('mpims', () => [])

  const channels = computed(() => [
    ...properChannels.value,
    ...dms.value,
    ...groups.value,
    ...mpims.value,
  ])

  const load = async () => {
    const [_channels, _dms, _groups, _mpims] = await Promise.all([
      $fetch<Channel[]>('/api/channels'),
      $fetch<Dm[]>('/api/dms'),
      $fetch<Channel[]>('/api/groups'),
      $fetch<Channel[]>('/api/mpims'),
    ])

    properChannels.value = _channels
    dms.value = _dms
    groups.value = _groups
    mpims.value = _mpims
  }

  const typeById = (id: string) => {
    if (dms.value.some((dm) => dm.id === id)) return 'dms'
    if (groups.value.some((group) => group.name === id)) return 'groups'
    if (mpims.value.some((mpim) => mpim.name === id)) return 'mpims'
    return 'channels'
  }


  return { properChannels, dms, groups, mpims, channels, load, typeById }
}
