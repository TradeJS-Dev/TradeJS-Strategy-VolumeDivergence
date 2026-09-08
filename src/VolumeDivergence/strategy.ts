import { createCostIsolatedStrategyConfigParser } from "@tradejs/strategy-kit/config";
import type { ValidatedStrategyRegistryEntry } from "@tradejs/strategy-kit/config";
import { config as DEFAULT_CONFIG, VolumeDivergenceConfig } from "./config";
import { createVolumeDivergenceCore } from "./core";
import { volumeDivergenceManifest } from "./manifest";

export const VolumeDivergenceStrategyDefinition: ValidatedStrategyRegistryEntry<VolumeDivergenceConfig> =
  {
    defaults: DEFAULT_CONFIG,
    parseConfig: createCostIsolatedStrategyConfigParser({
      strategyName: "VolumeDivergence",
      defaults: DEFAULT_CONFIG,
    }),
    createCore: createVolumeDivergenceCore,
    manifest: volumeDivergenceManifest,
  };
