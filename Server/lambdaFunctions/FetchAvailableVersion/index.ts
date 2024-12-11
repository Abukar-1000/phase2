import supabase from "./config.ts";

export const handler = async (event: any): Promise<any> => {
    let { data: Version, error } = await supabase
        .from('Version')
        .select('location,name')
        .like('location', `%${event.packageName}%`);

    const names: any = Version.map((item: any) => item.name);
    const uniqueNames: any = Array.from(new Set(names));

    const parseVersion = (version: any): any => {
        return version.split('.').map((num: any) => parseInt(num, 10));
    };

    const compareVersions = (v1: any, v2: any): any => {
        for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
            const num1 = v1[i] || 0;
            const num2 = v2[i] || 0;
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
        }
        return 0;
    };

    const isVersionInRange = (version: any, min: any, max: any): any => {
        const v = parseVersion(version);
        const minV = parseVersion(min);
        const maxV = parseVersion(max);
        return compareVersions(v, minV) >= 0 && compareVersions(v, maxV) <= 0;
    };

    const filterVersions = (names: any, searchStr: any): any => {
        searchStr = searchStr.trim();

        const exactMatch = names.filter((name: any) => name === searchStr);
        if (exactMatch.length > 0) {
            return exactMatch;
        }

        const rangeRegex = /^([\d+\.\d+\.\d+]+)\s*-\s*([\d+\.\d+\.\d+]+)$/;
        const rangeMatch = searchStr.match(rangeRegex);
        if (rangeMatch) {
            const min = rangeMatch[1];
            const max = rangeMatch[2];
            return names.filter((name: any) => isVersionInRange(name, min, max));
        }

        if (searchStr.startsWith('^')) {
            const baseVersion = searchStr.slice(1);
            const parsedBase = parseVersion(baseVersion);
            const major = parsedBase[0];
            const min = baseVersion;
            const max = `${major + 1}.0.0`;
            return names.filter((name: any) => isVersionInRange(name, min, max));
        }

        if (searchStr.startsWith('~')) {
            const baseVersion = searchStr.slice(1);
            const parsedBase = parseVersion(baseVersion);
            const major = parsedBase[0];
            const minor = parsedBase[1];
            const min = baseVersion;
            const max = `${major}.${minor + 1}.0`;
            return names.filter((name: any) => isVersionInRange(name, min, max));
        }

        return [];
    };

    const result = filterVersions(uniqueNames, event.version);

    const response = {
        statusCode: 200,
        body: result,
    };

    return response;
};
