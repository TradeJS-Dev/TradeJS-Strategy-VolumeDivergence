# @tradejs/strategy-volume-divergence

TradeJS strategy plugin providing `VolumeDivergence`.

## Strategy overview

`VolumeDivergence` compares pivot-to-pivot price movement with normalized
volume behavior to find bullish and bearish divergence. It requires
configurable reclaim, confirmation-candle quality, and optional retests, then
derives stops and R-multiple targets from the setup.

## Logic at a glance

![VolumeDivergence strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-VolumeDivergence/main/docs/strategy-logic.svg)

## Install

```bash
yarn add @tradejs/strategy-volume-divergence
```

Register the package in `tradejs.config.ts`:

```ts
import { defineConfig } from "@tradejs/core/config";

export default defineConfig({
  strategies: ["@tradejs/strategy-volume-divergence"],
});
```

The package exports `strategyEntries` for the TradeJS plugin loader together
with its strategy definitions, manifests, default configs, and public AI/ML
adapters. Strategy implementation changes are released from this repository,
independently of the TradeJS engine.

## Development

```bash
yarn install --immutable
yarn checks
```

Publishing is triggered by a GitHub release and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow.

Keywords: ai, claude, codex.
