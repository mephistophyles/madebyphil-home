---
title: How to Estimate Tasks for Org-wide Alignment
excerpt: Estimates aren't just for engineering teams (never have been)
category: software
featured: false
tags: [agile, software, product-management]
date: 2023-02-01
---

Description:  Estimating all dev tasks in story points will inevitably lead to someone trying to ‘translate’ 1 storypoint into some number of hours. Instead of hoping some over-eager Agile coach can hunt this person down and ‘educate’ them we need to acknowledge that the organization needs a better understanding of when developer tasks are going to be finished. #noestimates is not a solution because software development doesn’t happen in a vacuum. We’ll walk you through several alternative metrics that developers can use to estimate their tasks that will alleviate some of the inter departmental friction (without extra work).

There are 3 things we need to acknowledge before we can dive into the meat of this topic. 

1. Development work is not done in isolation - this isn't some hobby project. Other people in the org (both eng and non-eng) need to know roughly what you are working on and when you'll be moving on to the things they care about. This communication is a core part of our jobs.
2. Estimates mean different things to different people, ambiguity and lack of clarity are major problems - Is a storypoint worth 8 hours? Does it matter who is assigned a given task? How much slack should we build into plans when we're talking about work in the future? If a M t shirt size means 100 hours, can I allocate 10 devs to finish it in 10 hours? These are all valid questions and while we can't give perfect answers, but we can give better answers to their root asks.
3. We need to include uncertainty into our answers. "100 hours" doesn't tell anyone who reads it in a Jira ticket whether that's "I'm confident, based on my years of experience here and with these systems, we can complete that in 100 hours" or "Oh I dunno, I am still new here, that might take like... 100 hours. Is that a lot?". 

Whether your organization estimates in storypoints, t-shirt sizes, hours, or some combination of above, it doesn't matter. I am confident you'll be familiar with the consequeneces of these 3 challenges. I want to walk you through the limitations that exist with the current 'standard' practices, we'll then add way more information to a dev task than we can reasonably provide, and then we'll pair that back down to something more  practical that strikes a balance. You can take this framework back to your org and strike your own balance, because everyone needs different things.

Let's start with the discussion around hours vs storypoints.

Atlassian says: Story points are units of measure for expressing an estimate of the overall effort required to fully implement a product backlog item or any other piece of work. Teams assign story points relative to work complexity, the amount of work, and risk or uncertainty.

Asana has a whole article devoted to it, but it comes down to ![this image](https://assets.asana.biz/transform/aedd74ff-0fa8-4767-8a94-3b0a6701c167/inline-story-points-1-2x?io=transform:fill,width:1680&format=webp).  ie it's a combination of effort, time, complexity and uncertainty.

The Scrum Guide doesn't actually define storypoints. But a main article on the scrum.org blog says: A Story Point is a relative unit of measure, decided upon and used by individual Scrum teams, to provide relative estimates of effort for completing requirements

Some of this stuff dates back to 2010 (which is frankly an eternity in terms of dev processes). But this is kind of a trick question, because I think this is a false choice that actually barely represents an improvement. Sure, giving relative estimates is easier and more accurate, but we're still comparing within a backlog and trying to condense the team's opinion on the task into a single unitless number removes a lot of salient information.

So what's missing, and how should we define this in a way that's as unambiguous as possible (especially for non-team members)? Well, let's list them out in terms of the questions our colleagues need.

* When is this going to be done?
* How long will it take?
* How likely is it to be late? - This is both in terms of starting work on it and completion
* Can the work be sped up by breaking it down further or having multiple resources work on it - the 9 women having a baby in 1 month argument
* Are the answers above going to differ wildly depending on who works on it? - JR vs SR dev, specialty skills, onboarding
* How routine is the work?
* How much uncertainty is there in our ability to even do the task?
* Are there external constraints? - This isn't a task A blocks B scenario, this is "can this only be done when prod is down" or "do we have sole access to certain APIs to test/implement this" types of scenarios?

How many of these questions could you reasonably answer if you knew a given ticket was worth 8 storypoints? What about 20 hours? What about an M t-shirt size?

But then again, how many of these answers could you get (correctly) if you asked the developer that will do the work more than 2 months from now?


So in order to address this we need 3 things:

1. We need a document that removes ambiguity from the interpretation. This means we document across the org WHAT conclusion someone can draw from information being assigned to each field (more on these later). This doesn't mean every team needs to work the same way, but it should cover everything we agree is cross-team readable. Anything I can read from your team's tickets needs to be covered in this doc. 
    - If ticket 42 has a 'dev commit date' field, marketing should be able to draw a conclusion from this.
What's important to include here is that some fields need to be able to remain empty (we would much rather admit to not knowing something, than to give the wrong information and not address it). If you make fields required on creation, you will get garbage input.
It's also important to agree WHO can put WHAT information into the ticket, and WHEN. 
2. What information you need to share. Based on above discussions, you'll know what information in the tickets need to be present. I recommend the following 4 as a starting point and 2 more that are option but strongly recommended.
   1. Who - this isn't the assignee of the work, but generally some description of what type of person should do the work. You will likely have to specify based on your team composition (cross functional or not) a skillset or a seniority level. You should set this to the minimum required to do the work, it provides context for the estimates and some form of upper bound.
   2. Duration - I know, we agreed storypoints were better, but this isn't your average duration estimate. Use some time estimate that is chunked something like follows: 5h, 10h, 25h, 50h, 100h, 200h, 500h. Whatever your estimate, round it up.
   3. Confidence - This one should be paired with the other two to give you a reasonable picture of what kind of task we're looking at. I would recommend a scale of 1-4 or 5, where a 1 is a routine task and 5 is a SWAG at best. This way you know the difference between a 50h estimate that you're certain of because you've done several before, and a 100h estimate that you think is a wild guess.
   4. Isolation - this one is hard to name, but you're trying to articulate the interconnectedness of the work. I recommend another scale of 1-4, or a dropdown. 1 would be a task any dev can do in isolation, 2 is one where the dev would need to coordinate across their own team, 3 is one where an adjacent team needs to be brought into the fold for work (usually IT or infrastructure teams), 4 is org-wide coordination. You can add an optional 5th, external or special timing needs. Depending on your scale, a drop down instead of numbers may be helpful.
   5. First optional one, I would suggest a commit start date. When you have all of the above sorted out, you will want to actually declare a start date. Filling this in has all kinds of signaling attached to it (that you should document) and conditions, but you will be able to schedule work at some point. This can be as simple as next sprint, or as complex as "IT says we can't provision those resources till Q4". 
  6. Done vs released - This is to highlight somehow that when a dev commits their code, it's not done yet.  There are generally multiple stages here: committed, merged, released to prod, stable. You can add explicit QA stages, I've seen automation add comments when this workflow goes back a stage, etc.
3. A process to establish and regularly review the above. While the cross-team conversations you have to document things will already sketch out certain processes, you will inevitably run into issues. Having good blameless post-mortems will help you tweak processes, tighten conditions and requirements, add automation, etc. to this.


You need to understand that all this is still imperfect, but it's a lot better than just using story points and not much more work. You can automate a lot of the filling it with the correct conditions. You will also want to be mindful that initiatives for example will come with deadlines and not start dates, often you will need to communicate issues to plans up the WBS and management ladder. Make sure your org has the psychological safety to enable early signaling of problems. 

It's also important to note that we've made no mention yet of prioritization (which could also affect when something is going to be started). 