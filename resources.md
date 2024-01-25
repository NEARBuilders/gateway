# Ideation: Resources Page 
Opening this file as a place where we can collect ideas, links, etc for the [Resources](https://www.nearbuilders.org/resources) page

## Existing content
If you have anything already made floating around out there, let's start collecting links and similar here:

**Very thorough:**
[BOS DevX](https://docs.google.com/document/d/1u5kUC4X9BS_2GYliRkbe4ENaUbXcURZCMVoQqfUH2JU/edit) - by Lachlan

### Components
(what existing components are must have for devs coming onboard?)

[Social Components Library](https://near.social/mob.near/widget/N.Library)

https://www.boshacks.com/#/ndcplug.near/widget/BOSHACKS.Index?tab=resources

Good example of component library using modules: https://nearbuilders.org/buildhub.near/widget/components.Library

See all the apps on sidebar of [everything.dev].


### Writings
(blog posts, socials posts, anything that isn't docs but is written content)

[Past present future near social](https://mob.near.social/)

### Key doc links
(what do you send devs to read when they onboard?)

[BOS Docs](https://docs.near.org/bos)
Workshop video: [Building Anything with Everything](https://www.youtube.com/watch?v=DukrdJtZtSU&list=PLfhNHA8XzVu47dMbIk83W0WE5Krn3uhyG&index=18)
Workshop video: [Putting Components Inside of Social Posts](https://youtu.be/YHvUE34WI5A?si=mt0dLmLuQQOpGsc2)


**START**
(a lot of random links I had in a "Docs" document)

https://near.social/itexpert120-contra.near/widget/Events

https://near.social/#/devs.near/widget/every.group

https://near.org/devgovgigs.near/widget/gigs-board.pages.Post?id=1469

https://near.org/devgovgigs.near/widget/gigs-board.pages.Post?id=1472

https://github.com/near/neardevhub-widgets/issues/287

https://www.figma.com/file/WJz2Epuk4ipUsx5F1IqFbt/KYC%2FB-Verification?type=design&node-id=0-1&mode=design

https://discoverbos-6ld8iqdv2-nearbuilders.vercel.app/

https://github.com/near/neardevhub-widgets/issues/253

https://github.com/near/neardevhub-widgets/milestone/10

[https://docs.google.com/document/d/1hLriGYMvHZFJei9Ym8uFliZLWt2Fhya5DQprlEHC4Fw/edit?usp=sharing](https://docs.google.com/document/d/1hLriGYMvHZFJei9Ym8uFliZLWt2Fhya5DQprlEHC4Fw/edit?usp=sharing&hl=en)

[https://docs.google.com/document/d/1ViQM-aSptllLbx7UVkEp3QbMflDcQ56E_XnoPB9SHw8/edit?usp=sharing](https://docs.google.com/document/d/1ViQM-aSptllLbx7UVkEp3QbMflDcQ56E_XnoPB9SHw8/edit?usp=sharing&hl=en)

[https://docs.google.com/document/d/1wJIfSJyhCPUg6Spu50506lS2Q17lhmV-NtSx4oXH5NI/edit#heading=h.g8raa7di9thf](https://docs.google.com/document/d/1wJIfSJyhCPUg6Spu50506lS2Q17lhmV-NtSx4oXH5NI/edit?hl=en#heading=h.g8raa7di9thf)

[https://docs.google.com/document/d/15iz2qWsysZ4rOdQ8GS9cQ7r-lZS5dw67D-omyxlwXTU/edit#heading=h.vrhk2ljbqs4y](https://docs.google.com/document/d/15iz2qWsysZ4rOdQ8GS9cQ7r-lZS5dw67D-omyxlwXTU/edit?hl=en#heading=h.vrhk2ljbqs4y)

https://github.com/orgs/Harmonic-Guild/projects/1/views/2

**END**


### Tools? 

[bos-loader](https://github.com/near/bos-loader/tree/main) - Serves a local directory of component files as a JSON payload properly formatted to be plugged into a BOS `redirectMap`. When paired with a viewer configured to call out to this loader, it enables local component development—especially when working on multiple components in parallel.

[bos-cli-rs](https://github.com/bos-cli-rs/bos-cli-rs) - Component syncing and CI/CD. Ability to download and deploy widgets, as well as make calls to the social contract.

[bos-component-ts-starter](https://github.com/frol/bos-component-ts-starter/blob/main/README.md) - Transpiles TSX to JSX using sucrase. Also, automatically returns the `export default function` as BOS component, so you don't need to have a free-standing `return <MyComponent props={props} />` statement at the end of your file.


[bos-workspace](https://github.com/NEARBuilders/bos-workspace) - like bos-loader, but more feature-rich. Starts a local gateway, supports Typescript (instead of ts-starter), has hot reload, local widget development in favorite text editor.

### Getting started with bos-workspace

Install [create-bos-app](https://github.com/archetype-org/create-bos-app)

```
create-bos-app
 (create app)
```

```
cd app
yarn dev
```

bos-workspace is having a new version coming out.
Feedback on [bos-workspace v1](https://github.com/NEARBuilders/bos-workspace/pull/51). This will be combining create-bos-app and bos-workspace.


## Needs built out
What do we need to write, build, etc to cover everything we want to make available? If it doesn't already exist, it goes here


## Current Build DAO Projects

2️⃣ Build DAO gateway (Jas, Megha, João, Emmanuel, and LIT Collective): https://github.com/orgs/NEARBuilders/projects/6

3️⃣ SDKs and Component Libraries (Matt, Zeeshan, and Manza): https://docs.google.com/document/d/1jAGEuwlf5w-p_D4WZ0b1bYw55nwsRFuye2s6S6nexF4/edit?usp=sharing

About VM.require: https://near.social/mob.near/widget/MainPage.N.Post.Page?accountId=sdks.near&blockHeight=109924527

SDKs: https://near.social/sdks.near/widget/SDKs.App.Pages.Home

—> Example ~ Lens SDK: https://docs.google.com/document/d/152w5HqoohSYAgqpknwjjZwUi_xP9vbaK1iWU16Zhw8c/edit?usp=sharing

Background / context of libraries: https://near.social/devhub.near/widget/app?page=post&id=380

—> Example ~ Build DAO common component library: https://www.nearbuilders.org/library

4️⃣ Archetype (Seth, AJ, and Cory): https://gov.near.org/t/proposal-archetype-funding-request/37606

5️⃣ Hyperfiles (Elijah): https://gov.near.org/t/proposal-hyperfiles-funding-request-february-2024/37557

6️⃣ Assisterr (Nick and Dima): https://gov.near.org/t/proposal-assisterr-funding-proposal-assisterr-ai-powered-developer-relations-agents-supporting-developer-onboarding-to-bos/37710

7️⃣ DevRel / Build City (Dawn, Tony, and community builders): https://docs.google.com/document/d/1dwaUaVGdQJyvAJ1Za5GR3szV4yl1TOFbakRFW73iLW0/edit?usp=sharing

8️⃣ everything.dev (everyone): https://github.com/orgs/near-everything/projects/1