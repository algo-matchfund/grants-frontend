const composeMarkdown = (contentInfo) => (
`## About this project
${contentInfo.aboutProject}

## Use of funds
${contentInfo.useOfFunds.map(el => `- **${el.title}:** ${el.description}`).join('\n')}
## Timeline
${contentInfo.timeline.map(el => `- **${el.title}:** ${el.description}`).join('\n')}
## About us
${contentInfo.aboutCompany}

`);
  
  export default composeMarkdown;
  