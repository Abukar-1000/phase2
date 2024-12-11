import AdmZip from 'adm-zip';
import fetch from 'node-fetch';

interface Dependency {
    name: string;
    version: string;
}

interface Contributor {
    name: string;
    github: string | undefined;
}

interface TestRating {
    net_score: number;
    net_score_latency: number;
    ramp_up: number;
    ramp_up_latency: number;
    correctness: number;
    correctness_latency: number;
    bus_factor: number;
    bus_factor_latency: number;
    responsive_maintainer: number;
    responsive_maintainer_latency: number;
    license: number;
    license_latency: number;
    create_package_json_field: number;
    create_package_json_field_latency: number;
    create_pull_requests_field: number;
    create_pull_requests_field_latency: number;
}

interface PackageData {
    package_name: string;
    current_version: {
        name: string;
        location: string;
        size: string;
        total_dependencies: number;
        rating: TestRating;
        dependencies: Dependency[];
    };
}

interface OptionalData {
    description?: string;
    license?: string;
    contributors?: Contributor[];
}

interface Event {
    package: string;
}

export const handler = async (event: Event): Promise<{ status: number; body?: { data: PackageData; optional: OptionalData }; message?: string; error?: string }> => {
    const getSize = async (name: string, version: string): Promise<number | undefined> => {
        return fetch(`https://bundlephobia.com/api/size?package=${name}@${version}`)
            .then((response) => response?.json())
            .then((data) => data?.size);
    };

    const getDependencies = (dep: Record<string, string> | undefined): Dependency[] => {
        return Object.entries(dep || {}).map(([name, version]) => ({ name, version }));
    };

    const getContributors = (contributors: string[] | undefined): Contributor[] => {
        return (contributors || []).map((c) => {
            const [name, github] = c.split(" (");
            return {
                name,
                github: github ? github.slice(0, -1) : undefined,
            };
        });
    };

    const { package: packageContent } = event;

    try {
        const buffer = Buffer.from(packageContent, "base64");
        const zip = new AdmZip(buffer);
        const pkgJson = zip.getEntry("package.json");

        if (pkgJson) {
            const pkgJsonFile = pkgJson.getData().toString("utf8");
            const jsonData = JSON.parse(pkgJsonFile);
            const dep = jsonData.dependencies;
            const sizeData = await getSize(jsonData.name, jsonData.version);
            const dependencies = getDependencies(dep);
            const dependencyCount = dependencies.length;
            const testRating: TestRating = {
                net_score: 0,
                net_score_latency: 0,
                ramp_up: 0,
                ramp_up_latency: 0,
                correctness: 0,
                correctness_latency: 0,
                bus_factor: 0,
                bus_factor_latency: 0,
                responsive_maintainer: 0,
                responsive_maintainer_latency: 0,
                license: 0,
                license_latency: 0,
                create_package_json_field: 0,
                create_package_json_field_latency: 0,
                create_pull_requests_field: 0,
                create_pull_requests_field_latency: 0,
            };

            const pkgData: PackageData = {
                package_name: jsonData.name,
                current_version: {
                    name: jsonData.version,
                    location: `${jsonData.name}/${jsonData.version}/${jsonData.name}_${jsonData.version}.zip`,
                    size: `${sizeData}`,
                    total_dependencies: dependencyCount,
                    rating: testRating,
                    dependencies,
                },
            };

            const optional: OptionalData = {
                description: jsonData.description,
                license: jsonData.license,
                contributors: getContributors(jsonData.contributors),
            };

            return {
                status: 200,
                body: {
                    data: pkgData,
                    optional,
                },
            };
        }

        return {
            status: 400,
            message: "Could not find package.json file",
        };
    } catch (err: any) {
        console.error("Error reading the file:", err);
        return {
            status: 400,
            message: "No zipped package file provided.",
            error: err.message,
        };
    }
};
