import supabase from "./config.ts";

export const handler = async (event: any): Promise<any> => {
    try {
        let { data, error }: any = await supabase.rpc("get_packages_in_range", {
            start_index: event.startIndex,
            stop_index: event.stopIndex,
        });

        let { data: prevPkgs, error: err2 }: any = await supabase.rpc("get_prevoius_packages_in_range", {
            start_index: event.startIndex,
            stop_index: event.stopIndex,
        });

        console.log("prev: ", prevPkgs);

        if (error) {
            console.error(error);
            throw new Error("Failed to fetch data from Supabase");
        }

        const processedData: any = data.map((item: any) => {
            const { index, versions, ...rest }: any = item;
            const prevDataEntry: any = prevPkgs?.filter((pkg: any) => item.package_name === pkg.package_name);

            if (prevDataEntry?.length > 0) {
                return prevDataEntry?.map((prevEntry: any) => ({
                    ...rest,
                    current_version: versions,
                    previous_versions: prevEntry?.previous_version,
                }))[0];
            }

            return {
                ...rest,
                current_version: versions,
                previous_versions: [],
            };
        });

        return {
            statusCode: 200,
            body: processedData,
        };
    } catch (err: any) {
        console.error("Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};