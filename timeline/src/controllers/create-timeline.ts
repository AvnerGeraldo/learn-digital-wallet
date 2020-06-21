import UserParams from "@src/types/user-params";
import Timeline from "@src/types/timeline";
import timelineRepo from '@src/ports/repos/timeline'

export default async (userParams: UserParams): Promise<Timeline> => {
  const timeline: Timeline = {
    userId: userParams.userId
  }

  await timelineRepo.insert(timeline)
  return timeline
}
