import { Repository } from '../Types/DataTypes';

export function scoreDependencyPinning<T>(repo: Repository<T>): number {
  const packageJsonText = repo.queryResult?.packageJson?.text;

  if (!packageJsonText) {
    // If package.json is not found, assume zero dependencies.
    return 1.0;
  }

  let packageJson;
  try {
    packageJson = JSON.parse(packageJsonText);  // Try parsing the JSON
  } catch (error) {
    // If JSON parsing fails, return 1.0 as per the test requirement
    return 1.0;
  }

  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  const allDependencies = { ...dependencies, ...devDependencies };
  const totalDeps = Object.keys(allDependencies).length;

  if (totalDeps === 0) {
    return 1.0;
  }

  let pinnedDeps = 0;

  for (const version of Object.values(allDependencies)) {
    if (isPinnedToMajorMinor(version as string)) {
      pinnedDeps++;
    }
  }

  return pinnedDeps / totalDeps;
}

function isPinnedToMajorMinor(version: string): boolean {
  // Regex to match versions pinned to major.minor (e.g., '2.3.x', '2.3.0')
  const regex = /^(\d+)\.(\d+)\./;
  return regex.test(version);
}

