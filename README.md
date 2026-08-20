# @tradejs/strategy-volume-divergence

TradeJS strategy plugin providing `VolumeDivergence`.

## Strategy overview

`VolumeDivergence` compares pivot-to-pivot price movement with normalized
volume behavior to find bullish and bearish divergence. It requires
configurable reclaim, confirmation-candle quality, and optional retests, then
derives stops and R-multiple targets from the setup.

## Logic at a glance

![VolumeDivergence strategy logic](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-VolumeDivergence/main/docs/strategy-logic.svg)

## Signal on an example chart

Price makes a lower second low while normalized sell pressure is materially weaker; the divergence becomes tradable only after the reclaim and quality checks.

![VolumeDivergence signal on an illustrative ticker chart](https://raw.githubusercontent.com/TradeJS-Dev/TradeJS-Strategy-VolumeDivergence/main/docs/signal-example.svg)

The illustration is schematic, not market data. Exact thresholds, confirmation
rules, and risk parameters come from the active TradeJS strategy config.

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

Publishing is beta-first and delegated to the pinned
`TradeJS-Workflows@v1` reusable workflow. A relevant push publishes a unique
prerelease and moves the npm `beta` tag only after the production-like Project
image passes. The current verified beta is promoted to one stable `latest`
release by the weekly automation; production never consumes prereleases.

Keywords: ai, claude, codex.
