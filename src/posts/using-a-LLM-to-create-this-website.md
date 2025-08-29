---
title: Attempting to use a LLM to create this website
tags: posts
date: 2025-08-29
---

> This will be fast, I thought. Boy was I wrong.

## The so very helpful LLM 

I tried ChatGPT to answer me a few programming questions to big success (`How to setup SSH keys on Github`) and expected it to be a breeze to create a static website project based on the latest Eleventy starter. Add some TailwindCSS and markdown-based posts, this should be very straightforward. No big complexity, lots of boilerplate, no scripts or colors.

> You are a webdev expert. Create a Eleventy website. It is to be used as blog. Posts are written in markdown. The posts are styled via TailwindCSS.

Unfortunately, Eleventy is pretty niche, so I got a random assortment of commands to run, which all were taken from different versions of Eleventy and TailwindCSS and npm. Scripts didn't exist anymore, plugins did neither, and ChatGPT was helpfully wrong about everything. _I'm sorry, you are correct._

I expected to spend 5 minutes on building the boilerplate, mix in some styles and then get writing!

Instead I spend 5 days (!) fiddling with the different config files (The 2nd worst thing after gradle build), and then another 3 to get the project working on github pages.

Maybe I should have used some of the more suited models (Claude?), or upgraded to premium. But still, I expected a bit more. Less human intervention, less looking up script errors, just generally less time spent on the unfun things.

Worst of all is the cheerful helpfullness of ChatGPT -- if you know that the latest version of Eleventy and TailwindCSS are 3 and 4 respectively, then why do you mix in responses from older versions?! (Actually I shouldn't have been surprised -- this is how LLMs work, they have no notion of truth or context, they just repeat the thing they have seen most often before)

## Deploying on Github

Beyond getting Eleventy 3 to utilize TailwindCSS 4 in its build process, deploying the website to github pages was yet another nightmare. It took me a while to find [this](https://www.dawidsblog.com/posts/tutorial_11ty_github_pages/) post, which explains the scripting process well.

Takeaways
- Ensure you set the read & write permissions for your workflow
- Even though you created a workflow, you need to deploy from the github-pages branch
- To start the github pages build process, you need to commit to `master` to trigger the github pages process (as well as the initial gh pages setup)
- Setting up the custom domain is straightforward, you just have to follow the steps in [the github docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). My domain registrar (porkbun) even had a 1-click button to set up the DNS values

Here is my slightly adapted workflow script

```yml
# Name of the action:
name: Deploy GH Pages

# when should it trigger? 
on:
  # trigger when something is pushed to the branch main
  push: 
    branches: [ "master" ]
  # make it possible to trigger manually, useful for debugging
  workflow_dispatch: 

# what should be done
jobs:
  # we have only one stage and we name it 'build'
  build:
    # this is the (docker) image used to run the steps below
    runs-on: ubuntu-latest

    steps:
      # checkout the branch
      - uses: actions/checkout@v4

      # install the project and to build the page
      - name: npm ci & build
        uses: actions/setup-node@v4
      - run: npm ci
      - run: npx @11ty/eleventy

      # deploy the content of 'dist' to the branch gh-pages (default setting)
      - name: deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          # this line is needed for the action to be able to push something to your repository
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
