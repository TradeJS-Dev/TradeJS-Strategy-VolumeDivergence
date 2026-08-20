import { defineStrategyPlugin } from "@tradejs/core/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import type { StrategyConfig } from "@tradejs/types";
import { config as volumeDivergenceDefaultConfig } from "./VolumeDivergence/config";
import { VolumeDivergenceStrategyDefinition } from "./VolumeDivergence/strategy";

export const strategyEntries: ValidatedStrategyRegistryEntry<any>[] = [
  VolumeDivergenceStrategyDefinition,
];

const defaultConfigs: Record<string, StrategyConfig> = {
  VolumeDivergence: volumeDivergenceDefaultConfig,
};

export const getBuiltInStrategyDefaultConfig = (
  strategyName: string,
): StrategyConfig | undefined => defaultConfigs[strategyName];

export { VolumeDivergenceStrategyDefinition } from "./VolumeDivergence/strategy";
export { volumeDivergenceDefaultConfig };
export { volumeDivergenceManifest } from "./VolumeDivergence/manifest";
export { volumeDivergenceAiAdapter } from "./VolumeDivergence/adapters/ai";
export { volumeDivergenceMlAdapter } from "./VolumeDivergence/adapters/ml";

export default defineStrategyPlugin({ strategyEntries });
