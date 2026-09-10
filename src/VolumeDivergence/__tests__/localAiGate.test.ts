import type { AiPayload, Signal } from "@tradejs/types";
import { volumeDivergenceAiAdapter } from "../adapters/ai";

const evaluate = ({
  direction = "SHORT",
  spreadAbsBps,
  nearestBuyPressureAgeBars,
}: {
  direction?: "LONG" | "SHORT";
  spreadAbsBps?: number;
  nearestBuyPressureAgeBars?: number;
}) =>
  volumeDivergenceAiAdapter.postProcessLocalAnalysis?.({
    signal: {
      direction,
      prices: { takeProfitPrice: 90, stopLossPrice: 105 },
    } as Signal,
    payload: {
      additionalIndicators: {
        marketContext: {
          execution: {
            binanceCoinbaseSpread: { absBps: spreadAbsBps },
          },
        },
        baseContext: {
          structure: {
            liquidityTails: {
              nearestBuyPressure: { ageBars: nearestBuyPressureAgeBars },
            },
          },
        },
      },
    } as unknown as AiPayload,
    analysis: { direction, quality: 5 },
  });

describe("VolumeDivergence price-pivots local AI gate", () => {
  it("approves the inclusive SHORT boundary", () => {
    expect(
      evaluate({ spreadAbsBps: 7, nearestBuyPressureAgeBars: 30 }),
    ).toEqual(
      expect.objectContaining({
        direction: "SHORT",
        quality: 4,
        approved: true,
        gateDecision: "approved",
      }),
    );
  });

  it.each([
    [
      "LONG",
      {
        direction: "LONG" as const,
        spreadAbsBps: 7,
        nearestBuyPressureAgeBars: 30,
      },
    ],
    [
      "spread below boundary",
      { spreadAbsBps: 6.999999, nearestBuyPressureAgeBars: 30 },
    ],
    [
      "pressure age below boundary",
      { spreadAbsBps: 7, nearestBuyPressureAgeBars: 29.999999 },
    ],
    ["missing spread", { nearestBuyPressureAgeBars: 30 }],
    ["missing pressure age", { spreadAbsBps: 7 }],
  ])("rejects %s", (_name, input) => {
    expect(evaluate(input)).toEqual(
      expect.objectContaining({
        direction: null,
        quality: 3,
        approved: false,
        gateDecision: "rejected",
      }),
    );
  });
});
