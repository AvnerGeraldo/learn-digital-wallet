import { expect } from 'chai'
import UserParams from '@src/types/user-params'
import createTimeline from '@src/controllers/create-timeline'
import timelineRepo from '@src/ports/repos/timeline'
import { SinonStub, stub, restore } from 'sinon'

let insertTimeline: SinonStub

describe('Create timeline', () => {
  beforeEach(() => {
    insertTimeline = stub(timelineRepo, 'insert') 
  })

  afterEach(() => restore())

  it('should persist a timeline in the database', async () => {
    const userParams: UserParams = {
      userId: 'Some user id',
      fullname: 'Some fullname'
    }

    await createTimeline(userParams)

    expect(insertTimeline).to.have.been.calledOnce
  });

  it('should return a timeline with all events inside', async () => {
    const userParams: UserParams = {
      userId: 'Some user id',
      fullname: 'Some fullname'
    }

    const timeline = await createTimeline(userParams)

    expect(timeline.events).to.be.an('array').that.has.length(1)
    expect(timeline.events[0].description).to.be.equal(`Welcome ${userParams.fullname}!`)
  });
});
