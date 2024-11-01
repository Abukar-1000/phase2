/**
 * This module creates various fields, some are used some are unused.
 * @author DSinc
 */
export const createLanguagesField = (first: number) => `
    languages(first: ${first}) {
        nodes {
            name
        }
    }
`;

export const createVulnerabilityAlertsField = (first: number) => `
    vulnerabilityAlerts(first: ${first}) {
        nodes {
            securityAdvisory {
                severity
            }
        }
    }
`;

export const createLicenseField = () => `
    licenseInfo {
        name
        spdxId
        url
    }
`;

export const createReactionsField = (first: number) => `
    reactions: issues(first: ${first}) {
        nodes {
            reactions(first: 5) {
                nodes {
                    content
                    user {
                        login
                    }
                }
            }
        }
    }
`;

export const createIssuesField = (first: number) => `
    openIssues: issues(states:OPEN) {
        totalCount
    }
    closedIssues: issues(states:CLOSED) {
        totalCount
    }
`;

export const createCommitsField = (first: number) => `
ref(qualifiedName: "main") {
    target {
        ... on Commit {
            history(first: ${first}) {
                edges {
                    node {
                        oid
                        message
                        committedDate
                        author {
                            name
                            email
                        }
                    }
                }
            }
        }
    }
}`;

export const createReadmeField = () => `
readmeFile: object(expression: "HEAD:README.md") {
            ... on Blob {
                text
            }
        }
`;

export const createTestMainQuery = () => `
  testsCheckMain: object(expression: "main:") {  
      ... on Tree {
        entries {
          name
          type
        }
      }
    }
`;

export const createTestMasterQuery = () => `
  testsCheckMaster: object(expression: "main:") {  
      ... on Tree {
        entries {
          name
          type
        }
      }
    }
`;
