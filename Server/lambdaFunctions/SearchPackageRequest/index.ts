import supabase from "./config.ts";
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';

export const handler = async (event: any): Promise<any> => {
    try {
        const { data, error }: any = await supabase.from('Package').select('name');
        if (error) throw error;

        const uniqueNames: any[] = [...new Set(data.map((item: any) => String(item.name)))];
        const regex: any = new RegExp(event.nameRegex);
        const matches: any[] = uniqueNames.filter((name: string) => regex.test(name));

        const searchReadme = (): void => {
            const getSize = async (name: any, version: any): Promise<any> => {
                return fetch(`https://bundlephobia.com/api/size?package=${name}@${version}`)
                    .then((response: any) => response?.json())
                    .then((data: any) => data?.size);
            };

            const getDependencies = (dep: any): any[] => {
                return Object.entries(dep || []).map(([name, version]: any) => ({
                    name,
                    version
                }));
            };

            const getContributors = (contributors: any): any[] => {
                return contributors?.map((c: any) => c?.split(" ("))?.map((entry: any) => ({
                    name: entry[0],
                    github: entry[1]?.slice(0, -1)
                }));
            };

            const { package: packageContent }: any = event;
            try {
                const buffer: any = Buffer.from(packageContent, "base64");
                const zip: any = new AdmZip(buffer);
                const readme: any = zip.getEntry("README.md");

                if (readme) {
                    const readmeContent: string = readme.getData().toString("utf8");
                }

            } catch (err: any) {
                console.error('Error processing README file:', err);
            }
        };

        return {
            statusCode: 200,
            body: matches,
        };
    } catch (err: any) {
        return {
            statusCode: 500,
            body: err.message,
        };
    }
};
