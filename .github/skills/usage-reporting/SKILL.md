---
name: usage-reporting
description: "Use when the user asks for tokens consumed, token counts, model usage, cost, latency, or usage statistics for a prompt, response, or session."
---

# Usage Reporting

Use this skill whenever reporting token or model-usage statistics. This
repository's response preference is to append a compact Usage section to every
response, even when the per-turn numbers are unavailable.

## Accuracy rules

- Report exact per-request input/output token counts only when the runtime or
  provider exposes exact counts for that request.
- Do not infer per-prompt counts from session totals. Do not present estimates
  as exact measurements.
- If exact per-prompt usage is unavailable, say so explicitly. Never claim that
  the repository, Hugo, or a local tokenizer can see hidden system prompts,
  provider-side context, image-token accounting, or runtime overhead.
- Session totals, when available, must be labeled **session-to-date** and not
  as the current prompt's usage. Include the source and scope of the metric.
- Omit cost, cache, duration, or model labels unless the runtime exposes them.
  Do not calculate cost from an assumed rate.

## Per-response format

Append a compact section:

**Usage**
- Prompt tokens: exact count or "not exposed per request"
- Response tokens: exact count or "not exposed per request"
- Other available metrics: list metric and scope, or "not exposed"

If the runtime offers only an aggregate, label it session-to-date and report its
input, output, cache, call-count, cost, and duration fields only when present.
Do not substitute the aggregate for the current prompt's counts. Explain
briefly that exact per-turn usage requires provider/runtime telemetry when it
is not available.
