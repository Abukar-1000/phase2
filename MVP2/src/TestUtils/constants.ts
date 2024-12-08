/**
 * This module only contains mocks for our tests.
 * @author DSinc
 */
import path from 'path';
import { Repository } from '../Types/DataTypes';
import { BaseRepoQueryResponse, GraphQLResponse, NPMRegistryResponse } from '../Types/ResponseTypes';
import { PackageURL } from '../Types/URLTypes';

export const validFilePath = () => path.resolve(__dirname, '../TestUtils/validUrls.txt');
export const validSpacePath = () => path.resolve(__dirname, '../TestUtils/space dir/space file.txt');
export const mockUrls = [
    'https://github.com/Cinnamon/kotaemon',
    'https://github.com/Z4nzu/hackingtool',
    'https://github.com/mendableai/firecrawl',
    'https://github.com/cemu-project/Cemu',
    'https://github.com/dokku/dokku',
    'https://github.com/x/someunkonwrepo',
    'https://www.npmjs.com/package/react',
    'https://www.npmjs.com/package/@google-cloud/firestore',
    'https://www.npmjs.com/package/@launchdarkly/node-server-sdk',
    'https://www.npmjs.com/package/@digest/eslint-config-typescript',
    'https://www.npmjs.com/package/@applicaster/zapp-react-native-bridge',
];

export const repoSchemaQueryString = `
       query {
        __type(name: "Repository") {
                name
                kind
                description
                fields {
                    name
                }
            }
        }

    `;

export const mockRepos: Repository<any>[] = [
    {
        owner: 'Cinnamon',
        repoName: 'kotaemon',
        fileUrl: 'https://github.com/Cinnamon/kotaemon',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/Cinnamon/kotaemon',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'Z4nzu',
        repoName: 'hackingtool',
        fileUrl: 'https://github.com/Z4nzu/hackingtool',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/Z4nzu/hackingtool',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'mendableai',
        repoName: 'firecrawl',
        fileUrl: 'https://github.com/mendableai/firecrawl',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/mendableai/firecrawl',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'cemu-project',
        repoName: 'Cemu',
        fileUrl: 'https://github.com/cemu-project/Cemu',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/cemu-project/Cemu',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'dokku',
        repoName: 'dokku',
        fileUrl: 'https://github.com/dokku/dokku',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/dokku/dokku',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'x',
        repoName: 'someunkonwrepo',
        fileUrl: 'https://github.com/x/someunkonwrepo',
        queryResult: null,
        NDJSONRow: {
            URL: 'https://github.com/x/someunkonwrepo',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
];

export const mockValidRepos: Repository<any>[] = [
    {
        owner: 'Cinnamon',
        repoName: 'kotaemon',
        fileUrl: 'https://github.com/Cinnamon/kotaemon',
        queryResult: {
            description: 'An open-source RAG-based tool for chatting with your documents.',
            name: 'kotaemon',
            url: 'https://github.com/Cinnamon/kotaemon',
            owner: {
                login: 'Cinnamon',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/Cinnamon/kotaemon',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'Z4nzu',
        repoName: 'hackingtool',
        fileUrl: 'https://github.com/Z4nzu/hackingtool',
        queryResult: {
            description: 'ALL IN ONE Hacking Tool For Hackers',
            name: 'hackingtool',
            url: 'https://github.com/Z4nzu/hackingtool',
            owner: {
                login: 'Z4nzu',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/Z4nzu/hackingtool',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'mendableai',
        repoName: 'firecrawl',
        fileUrl: 'https://github.com/mendableai/firecrawl',
        queryResult: {
            description:
                '🔥 Turn entire websites into LLM-ready markdown or structured data. Scrape, crawl and extract with a single API.',
            name: 'firecrawl',
            url: 'https://github.com/mendableai/firecrawl',
            owner: {
                login: 'mendableai',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/mendableai/firecrawl',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'cemu-project',
        repoName: 'Cemu',
        fileUrl: 'https://github.com/cemu-project/Cemu',
        queryResult: {
            description: 'Cemu - Wii U emulator',
            name: 'Cemu',
            url: 'https://github.com/cemu-project/Cemu',
            owner: {
                login: 'cemu-project',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/cemu-project/Cemu',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    {
        owner: 'dokku',
        repoName: 'dokku',
        fileUrl: 'https://github.com/dokku/dokku',
        queryResult: {
            description:
                'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
            name: 'dokku',
            url: 'https://github.com/dokku/dokku',
            owner: {
                login: 'dokku',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/dokku/dokku',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
];

export const mockGQLResult: GraphQLResponse<any> = {
    data: {
        repo0: {
            description: 'An open-source RAG-based tool for chatting with your documents.',
            name: 'kotaemon',
            url: 'https://github.com/Cinnamon/kotaemon',
            owner: {
                login: 'Cinnamon',
            },
        },
        repo1: {
            description: 'ALL IN ONE Hacking Tool For Hackers',
            name: 'hackingtool',
            url: 'https://github.com/Z4nzu/hackingtool',
            owner: {
                login: 'Z4nzu',
            },
        },
        repo2: {
            description:
                '🔥 Turn entire websites into LLM-ready markdown or structured data. Scrape, crawl and extract with a single API.',
            name: 'firecrawl',
            url: 'https://github.com/mendableai/firecrawl',
            owner: {
                login: 'mendableai',
            },
        },
        repo3: {
            description: 'Cemu - Wii U emulator',
            name: 'Cemu',
            url: 'https://github.com/cemu-project/Cemu',
            owner: {
                login: 'cemu-project',
            },
        },
        repo4: {
            description:
                'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
            name: 'dokku',
            url: 'https://github.com/dokku/dokku',
            owner: {
                login: 'dokku',
            },
        },
        repo5: null,
    },
    errors: [
        {
            type: 'NOT_FOUND',
            path: [],
            locations: [],
            message: "Could not resolve to a Repository with the name 'x/someunkonwrepo'.",
        },
    ],
};

export const registryMocking: {
    validPackageUrl: PackageURL;
    validPackageNpmResponse: NPMRegistryResponse;
    invalidPackageUrl: PackageURL;
} = {
    validPackageUrl: {
        raw: 'https://www.npmjs.com/package/queue-lit',
        tokens: ['www.npmjs.com', 'package', 'queue-lit'],
        protocol: 'https:',
        packageName: 'queue-lit',
    },
    validPackageNpmResponse: {
        repository: {
            type: '',
            url: 'https://github.com/joelvoss/queue-lit',
        },
    },
    invalidPackageUrl: {
        packageName: 'O_o',
        raw: ':O',
        tokens: [],
        protocol: '',
    },
};

export const licenseScoringMocks: {
    knownCompatibleLicenses: string[];
    knownIncompatibleLicenses: string[];
    repoWithValidLicense: Repository<BaseRepoQueryResponse & { owner: { login: string } }>;
    repoWithInvalidLicense: Repository<any>;
    repoWithUnknownLicense: Repository<any>;
} = {
    knownCompatibleLicenses: [
        'LGPL-2.1 License',
        'MIT License',
        'GNU Affero General Public License v3.0',
        'Mozilla Public License 2.0',
        'Artistic License 2.0',
        'BSD-2-Clause license',
        'BSD-3-Clause license',
        'GPL-2.0 license',
        'GPL-3.0 license',
        'EPL-2.0 license',
    ],
    knownIncompatibleLicenses: ['Apache License 2.0', 'CDDL-1.0 license', 'Other'],
    repoWithValidLicense: {
        owner: 'Z4nzu',
        repoName: 'hackingtool',
        fileUrl: 'https://github.com/Z4nzu/hackingtool',
        queryResult: {
            description: '',
            name: '',
            url: '',
            licenseInfo: {
                name: 'MIT License',
            },
            stargazerCount: 10,
            owner: {
                login: 'Z4nzu',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/Z4nzu/hackingtool',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    repoWithInvalidLicense: {
        owner: 'Cinnamon',
        repoName: 'kotaemon',
        fileUrl: 'https://github.com/Cinnamon/kotaemon',
        queryResult: {
            description: 'An open-source RAG-based tool for chatting with your documents.',
            name: 'kotaemon',
            url: 'https://github.com/Cinnamon/kotaemon',
            owner: {
                login: 'Cinnamon',
            },
            licenseInfo: {
                name: 'Apache License 2.0',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/Cinnamon/kotaemon',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
    repoWithUnknownLicense: {
        owner: 'dokku',
        repoName: 'dokku',
        fileUrl: 'https://github.com/dokku/dokku',
        queryResult: {
            description:
                'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
            name: 'dokku',
            url: 'https://github.com/dokku/dokku',
            owner: {
                login: 'dokku',
            },
        },
        NDJSONRow: {
            URL: 'https://github.com/dokku/dokku',
            NetScore: 0,
            NetScore_Latency: 0,
            RampUp: 0,
            RampUp_Latency: 0,
            Correctness: 0,
            Correctness_Latency: 0,
            BusFactor: 0,
            BusFactor_Latency: 0,
            ResponsiveMaintainer: 0,
            ResponsiveMaintainer_Latency: 0,
            License: 0,
            License_Latency: 0,
        },
    },
};

export const rampUpRepo = {
    owner: 'dokku',
    repoName: 'dokku',
    fileUrl: 'https://github.com/dokku/dokku',
    queryResult: {
        description: 'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
        name: 'dokku',
        url: 'https://github.com/dokku/dokku',
        owner: {
            login: 'dokku',
        },
        readmeFile: {
            text: '                                                       ',
        },
    },
    NDJSONRow: {
        URL: 'https://github.com/dokku/dokku',
        NetScore: 0,
        NetScore_Latency: 0,
        RampUp: 0,
        RampUp_Latency: 0,
        Correctness: 0,
        Correctness_Latency: 0,
        BusFactor: 0,
        BusFactor_Latency: 0,
        ResponsiveMaintainer: 0,
        ResponsiveMaintainer_Latency: 0,
        License: 0,
        License_Latency: 0,
    },
};

export const correctnessRepo = {
    owner: 'dokku',
    repoName: 'dokku',
    fileUrl: 'https://github.com/dokku/dokku',
    queryResult: {
        description: 'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
        name: 'dokku',
        url: 'https://github.com/dokku/dokku',
        owner: {
            login: 'dokku',
        },
        readmeFile: {
            text: '                                                       ',
        },
        openIssues: {
            totalCount: 10,
        },
        closedIssues: {
            totalCount: 10,
        },
    },
    NDJSONRow: {
        URL: 'https://github.com/dokku/dokku',
        NetScore: 0,
        NetScore_Latency: 0,
        RampUp: 0,
        RampUp_Latency: 0,
        Correctness: 0,
        Correctness_Latency: 0,
        BusFactor: 0,
        BusFactor_Latency: 0,
        ResponsiveMaintainer: 0,
        ResponsiveMaintainer_Latency: 0,
        License: 0,
        License_Latency: 0,
    },
};
