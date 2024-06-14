function formatDate(date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const daoName = "Build DAO";
const feedLink = "${alias_gateway_url}/feed";

const TEMPLATES = {
  updates: `### BUILDER UPDATE:  ${formatDate(new Date())}
(posted via [${daoName} Gateway](${feedLink}?tab=update))
**✅ DONE**
- [what'd you do]
- [link proof]
**⏩ NEXT**
- [what's next?]
- [what are you thinking about?]
**🛑 BLOCKERS**
- [what's blocking you?]
- [how can someone help?]
`,
  question: `## what is your question?
(posted via [${daoName} Gateway](${feedLink}?tab=question))

[what are you thinking about?]
[why are you asking?]
`,
  idea: `## IDEA TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=idea))

**What idea are you proposing?**
- [Describe the idea]

**Context or additional information:**
- [Provide any context or details]
`,
  request: `## REQUEST TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=request))

#### Description
[Detailed description of what the proposal is about.]

#### Why This Proposal?
[Explanation of why this proposal is necessary or beneficial.]
`,
};

return { TEMPLATES };
