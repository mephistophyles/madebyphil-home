---
title: Not all Channels are created Equal
excerpt: Some thoughts on channels, CAC and ARR
category: product
featured: false
tags: [product-management, pricing, marketing]
date: 2025-05-14
---

Most channels have non-linear characteristics in their evaluation metrics. As a result sometimes it's comparing apples to oranges, and sometimes one of them isn't even a fruit. For simplicity's sake I'll focus just on CAC and ARR. Since many other metrics depend on those or follow similar features, I think those will serve to illustrate my points.

## Non-linearity

There is a non-linearity to CAC and ARR that I think deserves some discussion here, and I think one of the a key determinants of that is the channel. The x axis here is just each subsequent transaction (ie customer N). In theory, many of this will also hold for the differential here, eg customers per quarter. This is pretty common if you think in terms of systems.

I think CAC is usually some kind of step function with a light upward trend most of the time and then a sudden cliff. Let's simplify this and say there is the section of low hanging fruit in most channels, ie the quick wins, which often leads to potentially poor decisions of a channel's long-term potential. Then there is the meat of the channel characteristic, which applies really so long as the channel isn't saturated (channels can get saturated in different ways, that's a topic for another post); this could conceivably be broken down into different characteristics too, often very worth doing to truly understand your revenue channels. And then finally there is a steep increase in CAC, usually an indication that this channel isn't really worth investing in further. This isn't just a CAC function, but also applies to things like CPM and other TOFU metrics.

Your ARR features a different behavior that is non-linear, and that is how many whales do you catch per minnow. This metaphor is helpful because it abstracts different behavior (how many paid customers come in relative to freemium ones, or how many enterprise opportunities come in per webinar, etc). Think of this as the minimum viable amount of output (strongly correlated with effort or input) before you see a stable, predictable outcome. 

For example, if I get 1 paid opportunity for every 10 freemium customers or leads, and they convert at a 20% rate, I need to reliably get 50 leads per closed paid opportunity. This doesn't mean you won't see results from efforts that yield fewer leads, but you'll need to run more of them to see the channel start to produce.

In this case, the step function starts at 0, and then after your first significant number of outputs you will see a roughly steady behavior of incoming revenue. Oftentimes this is not just one step, but multiple:

Further example: if I get 1 enterprise customer that spends 10x a normal customer for each 7 opportunity, I now need to see 350 leads per closed enterprise opportunity. So I see another step on my graph at 350, because I am now reliably bringing in the enterprise opps too. 

So working out this example further with more numbers: 

1. if this channel costs me $1/lead
2. 20% close rate
3. I'm seeing $100 ARR for each closed SMB opportunity and $1000 ARR for enterprise
4. 1:7:70 ratio of enterprise to SMB to freemium opportunities 

Your CAC and ARR graphs would look like this:

![channel-graph.png](Image of CAC and ARR trends as leads increase per channel)

Now in reality, your channel lead costs will go up and down based on different factors and how you track or segment your channels (often they overlap a bit) eg: each subsequent webinar may be cheaper than the first because you can amortize costs and effort. But at some point you see diminishing returns because eg the opportunity costs and availability of SMEs because a factor and it costs more effort to keep coming up with highly converting topics. You will also see that not every campaign per channel costs the same, you may need to do a given amount at first to earn the opportunity to do other activities (ie we sponsored an event yearly or paid a partnership fee, which allowed us to run a monthly marketing campaign with that partner - we might need to pay more for more campaigns but not linearly more). So variable 1 is exactly that, variable. 

You will also see different close rates and enterprise:smb:freemium ratios per channel. This is a factor that you'll likely want to keep a close eye on, because you may also see variability in lifetime conversion rates by channel. Also worth noting that depending on your marketing incentives, your team may shoot for many high freemium generating campaigns because they're evaluated by total MQLs (if this is the only metric, you're in major trouble).

You may also see a variability in variable 4, since some channels have a higher ratio of enterprise customers (eg executive lunch and learns do better than webinars).

## Complexity follows

This gets worse because you may have multiple products and the ratio of interest varies by channel and by product too. You will see audiences vary by channel and even by campaign frankly. 

Naturally, you won't have a random mix of SMB and Enterprise customers in most of your channels, you will be deliberate about that, it just serves as an example of how ARR behavior changes. 

This doesn't even cover the LTV angle. It is quite possible that some channels correlate highly with a type of customer that has a better or worse LTV (just by virtue of lifetime duration or churn rates). 