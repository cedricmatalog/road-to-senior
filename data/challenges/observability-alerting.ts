import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'observability-alerting',
  title: 'Set Up Meaningful Alerts',
  description: 'Your monitoring is noisy and the team ignores alerts. Fix the alerting strategy.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['observability'],
  content: {
    overview: 'Alert fatigue is as dangerous as no alerts. When every alert is a false positive, engineers stop responding. Good alerting means: alert on symptoms (what users experience), not causes (what the system is doing). Page on things that require immediate action; log and ticket everything else.',
    situation: `Your team has 47 alerts configured. In the past month, the on-call engineer was paged 200 times. 180 of those were resolved by doing nothing — the alert auto-resolved. Engineers have started ignoring pages.\n\nCurrent alerts include: CPU > 70%, memory > 60%, disk > 50%, response time > 500ms (fires constantly during deploys), 5xx rate > 0.1%, queue depth > 100, pod restarts > 0.\n\nHow do you fix this?`,
    options: [
      {
        id: 'a',
        label: 'Raise all thresholds so alerts fire less often',
        explanation: 'Raising thresholds reduces noise but doesn\'t fix the root problem: you\'re alerting on the wrong things. A 90% CPU threshold is still a resource metric, not a user-facing symptom. You\'ll miss real incidents that don\'t manifest as resource pressure.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Audit alerts into three tiers: page (user impact, requires immediate action), ticket (degraded but not urgent), and log (informational). Delete or downgrade anything that doesn\'t require human action',
        explanation: 'This is the right framework. The question for every alert is: "If this fires at 3am, does an engineer need to wake up right now?" If no — it\'s not a page. CPU at 70% rarely requires immediate action; error rate > 1% sustained for 5 minutes probably does. Alerts should map to user symptoms: latency, error rate, availability. Resource metrics (CPU, memory) belong in dashboards, not pagers.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Add a "snooze" feature to the alerting system so engineers can silence noisy alerts temporarily',
        explanation: 'Snoozing is a symptom of the real problem, not a fix. It means your team has accepted that alerts are noise. The right fix is to delete or downgrade alerts that require no action, not to make it easier to ignore them.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Keep all alerts but route low-priority ones to a Slack channel instead of paging',
        explanation: 'Better than paging for everything, but you\'ll just move alert fatigue from on-call to a Slack channel that everyone learns to ignore. If an alert doesn\'t require action, it shouldn\'t exist as an alert — it belongs in a dashboard.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
