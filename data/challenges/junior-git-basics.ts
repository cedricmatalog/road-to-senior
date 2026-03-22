import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-git-basics',
  title: 'You Broke Main — What Do You Do?',
  description: 'You accidentally pushed broken code directly to main. How do you handle it?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging', 'communication'],
  content: {
    overview: 'Mistakes happen. What matters is how fast you contain the damage and how clearly you communicate. Silence and waiting are never the right move.',
    situation: `It's your second week on the job. You pushed a commit directly to main, and within minutes your tech lead pings you: "Did you just push to main? The CI pipeline is failing and the staging deploy is broken."\n\nYou realise you pushed the wrong branch. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Tell your lead immediately, explain what happened, ask how they want to fix it — revert the commit or push a fix',
        explanation: 'The right move. Your lead already knows something is wrong — the worst thing you can do is stay quiet or pretend it wasn\'t you. Say: "Yes, that was me — I pushed the wrong branch by mistake. I can either revert the commit now or push a fix. What do you prefer?" This shows ownership, clear communication, and that you know how to fix it. Everyone makes this mistake early on. How you handle it is what people remember.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Quickly push a fix commit to main before anyone notices the details',
        explanation: 'Rushing another push to main without telling anyone can make things worse — especially if others are already investigating or pulling from main. Communicate first, then act. Your lead may have a preferred approach (revert vs fix-forward) and may need to coordinate with the team.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wait and see if the CI pipeline recovers on its own before saying anything',
        explanation: 'Waiting while staging is broken costs the whole team time. Your lead is already aware. Staying silent looks far worse than owning the mistake immediately. The sooner you speak up, the sooner it gets fixed.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
