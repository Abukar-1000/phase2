import supabase from "./config.ts";

export const handler = async (event: any) => {
    try {
        for (const pkg of event.packages) {
            const versionSizes: any[] = [];
            for (const version of pkg.versions) {
                try {
                    const { data, error } = await supabase.rpc("get_package_size", {
                        p_package_name: pkg.name,
                        p_version: version,
                    });
                    if (error) {
                        console.error(`Error fetching size for ${pkg.name} v${version}:`, error);
                    } else {
                        versionSizes.push({ version, size: data[0]?.Size });
                    }
                } catch (err: any) {
                    console.error(`Unexpected error for ${pkg.name} v${version}:`, err);
                }
            }
            delete pkg.versions;
            pkg.versionSizes = versionSizes;
        }

        return {
            statusCode: 200,
            body: event.packages,
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: { error: "Internal server error" },
        };
    }
};
