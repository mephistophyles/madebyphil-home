---
title: Some Thoughts on Pricing
excerpt: How you price your products matters
category: software
featured: false
tags: [product-management, pricing, marketing]
date: 2025-04-28
---

Pricing has 2 dimensions; the value and the modifier(s), i.e. based on what criteria, if any, it increases. 

Example 1: Atlassian’s Jira charges per user per month (or per year). The rate of increase of this isn’t perfectly linear, but effectively your cost increases with more users.

Example 2: DigitalOcean offers a fee for its droplets per month, but is actually prorated to how long it’s been running, and the fee depends on the droplet’s specifications. Your cost increases the more hardware power you need.

Example 3: Mailchimp charges per contacts you have stored with them. Your cost increases with a greater number of contacts stored (and emailed).

A tiering system effectively translates to different products, though in actuality it rarely changes the modifier type. Many secondary modifiers exist, but you could decompose them into a separate product that is free up to a specific point (for example, DigitalOcean may charge me more if my droplet exceeds some bandwidth threshold, or MailChimp will charge me more if I need to send more emails than the tier allows)

While simple to describe, there is a lot of thought that goes into this. Once you settle on a modifier type, it is very hard to change. The potential dislocation and surprise increases for some customers would be immense. Two key things to consider when determining your modifier is aligning to cost and aligning to value.

## Aligning to Cost:

Simply put, you need to make sure your pricing model allows you to generally cover all your costs, so as you see more usage (more users, using more features, etc) you need to make sure a few excess users don’t end up breaking the bank or system. This is why a lot of those secondary modifiers exist, because it is often a way to pass on the extra costs over what is baked into the pricing model. Similarly, you will need to understand that, even if not directly, your growth will need to keep track with your costs. A common example you see in SaaS is the PUPM (per user per month) system, where they are initially cheaper than their costs, but plan to raise prices gradually as the users are locked into their tool till they cross that profitability threshold. 

Another aspect I think is worth looking at, the free tier. If you offer a free tier to your customers, you will need to make sure that those costs are also covered in the total profit of your paying tier(s). One key monitor here is the ratio of the costs, so if you assume 10% of your customers are paying, their payments should cover the full usage of the other 90%. Key here is to be clear if one of those 90 exceeds a threshold, that you can convert them to paid (harder if you don’t have their payment information) or you lock down that cost before it happens. 

One last thing to consider with cost, is the customer support cost. It is quite possible that your product will require some level of customer support, and you will need to see how that cost grows too!

## Aligning to Value:

This is where I think a lot about pricing as a consumer, and also where I see interesting variance. This doesn’t always align to cost. For example, the PUPM I think is often a bad proxy for value growth in many products. If anything, you see more value as individual users start to use the product more. These power users generally drive the bulk of the value for the customers. You can generally start to build in some models for this, like assuming an account is healthy if they have a certain ratio of power users to regular users. 

Some aligning to value pricing mechanisms are a lot easier to build than others. Stripe charges roughly 30 cents and 3% of the transaction price to process credit cards. This means I only pay when I generate value from the product’s use. 

Naturally, it’s not always easy or desirable to directly track this, you need a simple pricing strategy so customers can understand and forecast their own usage. This is why many product tiers have a list of features that have a cap: for example Github teams account is $4 PUPM and comes with 3000 minutes of Github actions per month, this is regardless of how many users. 

# Balancing

You'll want to track costs and revenues as usage grows. But since they're generally different units, it's hard to give a perfect answer. So in this case you can do one of several things:

- Grab all your users and map their current (either aggregate/lifetime, or snapshot) respective costs and revenues and graph those along any or all your major usage parameters (users, contacts, events, etc). Identify outliers and see if you're comfortable with their respective costs. You should be able to identify trends here and hopefully identify where you want to dig in further.
- Segmentation analysis: Grab a subset of your users that you think is representative, ideally ICP, and see how their cost/revenue maps along your usage parameters. Outliers should be evaluated as their own segment - in many cases you treat your outliers here as the cost of doing business. You can consider a free-tier an outlier or its own cost center. 
- [Cohort analysis](https://userpilot.com/blog/cohort-analysis/) based: Take one or several cohorts of users and see how their costs and revenues grow or would grow (projecting growth is another art/science, but any data-based hypotheses can be helpful). Cohort based is particularly useful to see how life time value of customers grows and where that offsets any costs. In particular you'll want to understand what percentage converts to higher tiers, when, and if that is getting better with each newer cohort. This is especially important for revenue models where upfront acquisition costs are high relative to revenue and they payoff is later. A challenge here is defining the right cohort and having enough data that each cohort is large enough to yield stable enough datapoints.

# Conclusion

As a general rule, I dislike aligning to cost generally because any customer should look at that and say “that’s not my problem”. It often also leads to more complexity in terms of larger deals (enterprise deals don’t follow this trend, though sometimes it helps to anchor pricing), since you need to figure out a way to discount without hurting yourself at renewal time. I prefer aligning to value, for obvious reasons (mostly because I think selling is really helping customers make a buying decision, and pricing is part of selling). One important aspect here is I think when aligning to value, it’s important to give the benefit to the customer. Ideally they capture more of the value as usage goes up. In an even more ideal world, you can eliminate the modifier component completely (such as in selling self-hosted software, like Mokkapi). That way your cost is always the same and the customer gets all the upside in increased usage.
