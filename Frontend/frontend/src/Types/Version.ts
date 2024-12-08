
interface IRating {
    license: number,
    ramp_up: number,
    net_score: number,
    bus_factor: number,
    correctness: number,
    license_latency: number,
    ramp_up_latency: number,
    net_score_latency: number,
    bus_factor_latency: number,
    correctness_latency: number,
    responsive_maintainer: number,
    create_package_json_field: number,
    create_pull_requests_field: number,
    responsive_maintainer_latency: number,
    create_package_json_field_latency: number,
    create_pull_requests_field_latency: number
}

interface IDependency {
    name: string,
    version: string
}

interface IVersion {
    name: string;
    size: string;
    rating: IRating;
    dependencies: IDependency[],
    total_dependencies: number
}

export default IVersion;