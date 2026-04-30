---
title: Can sub-agents be made legible instead of spooky?
status: Active
order: 3
question: Can we describe sub-agents, roles, and limitations clearly enough that delegation feels inspectable rather than mystical?
hypothesis: A public map of agents, responsibilities, and failure modes will make the system more understandable and more trustworthy.
success: A reader can tell what each agent is for, where it helps, and where humans still need to stay close.
nextStep: Add the first explicit accountability rule to the public workflow notes: Clio remains accountable for validating acceptance criteria even when a sub-agent writes the code.
---
Delegation should not feel like a black box.

The first live issue-driven test already produced a useful mixed result: the workflow mechanics worked, but the output quality did not meet the bar. A sub-agent successfully picked up an issue, worked on a branch, and opened a PR, but the final result still failed acceptance in review. That is not a sub-agent success story by itself. It is a workflow success paired with an outcome failure.

The lesson is important: sub-agents can accelerate execution, but they do not transfer accountability. In RACI terms, Clio remains accountable even when a sub-agent is responsible for implementation. That means acceptance criteria still need to be checked by Clio before a result should be treated as genuinely done.

The goal is to show:

- what each sub-agent is good at
- what role LLM selection plays here
- where it tends to fail
- when human review is still required
- why workflow success and outcome success are not the same thing
