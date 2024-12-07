import IVersion from "./Version";

interface IPackage {
    package_name: string,
    current_version: IVersion[],
    previous_versions: IVersion[]
}

export default IPackage;