> Superseded draft: use [WRITEUP.md](WRITEUP.md), updated for the 24-topic app and submission without a video.

# HealthNotes: Preparing for a Better Health Conversation

**AI + Health · Aarjav Vaghasiya, LASA High School**

**This project is a prototype and is not medical advice.**

[Live app](https://kalpesh99.github.io/veritas-ai-hackathon-2026/) · [Public code and full credits](https://github.com/kalpesh99/veritas-ai-hackathon-2026)

## Problem and solution

An adult preparing for a non-emergency health appointment may know what feels different without knowing medical search terms. HealthNotes helps turn that concern into educational reading and personal visit notes. It does not diagnose, decide whether care can wait, recommend treatment, or estimate disease risk. Better appointment preparation is a proposed benefit, not a measured patient outcome.

Users describe their concern, enter when it began, add optional appointment context, and select preparation reminders. AI suggests reading topics; users confirm one, choose another, or choose none. Authored follow-up prompts collect details. Users can prioritize their own questions and print, copy, or download notes. Manual browsing covers **24 source-linked topics and 168 authored search phrases**, including synonyms and selected misspellings.

## Original contribution and AI method

An earlier in-event diabetes keyword prototype struggled with broader concerns. The redesign combines meaning-based retrieval, explicit user confirmation, manual fallback, and a personal appointment agenda.

The pretrained MiniLM sentence encoder turns a concern and 24 authored topic descriptions into normalized embeddings. Cosine similarity ranks topics; up to three passing a fixed 0.30 cutoff are offered. This cutoff is an unvalidated retrieval heuristic, not a medical threshold. No project-specific training or fine-tuning occurred. Aliases support manual library search, not neural-model training. The browser downloads model files but processes concern text locally without an inference-service upload. No account or API key is required.

## Measured results and limitations

A frozen, AI-assisted synthetic evaluation contains **48 supported descriptions and 12 vague or unrelated questions**. MiniLM ranked the intended topic first on **47/48**, compared with **33/48** for a TF-IDF baseline using the same catalog. After the cutoff, the intended topic was offered on **42/48**, leaving **six misses**. There were **25 non-target extra suggestions across 16/48** supported descriptions; these differ from the author label and may still be relevant. None of the 12 vague or unrelated questions received suggestions.

Retained failures include “It stings when I pass water.” All outputs are published; no scoring, cutoff, or catalog tuning followed this run. These are retrieval counts, not medical accuracy. The small author-labeled test is not independent, representative, or clinician-validated. Language coverage, fairness, and real-user benefit remain unproven.

## Next steps and credits

Next steps are independently labeled descriptions, consented usability tests, and professional review. Sources: MedlinePlus, NIDDK, and CDC; full links are in the repository. Technology: Sentence Transformers/MiniLM, Xenova’s Apache-2.0 ONNX model, Transformers.js, and ONNX Runtime. ChatGPT/OpenAI Codex assisted with research, design, code, authored examples, testing, and writing. The participant must review and understand the work. No demo video is included.
