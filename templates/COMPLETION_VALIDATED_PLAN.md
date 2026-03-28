# Completion Validated Plan

## Current Truth

The system is not fully done. It is currently:

- structurally generated
- browser-reviewable
- screenshot-covered
- criteria-validated against the current automated gate

It is not yet proven as a final production template library in the stronger sense.

## What Is Still Missing

### 1. Creative Differentiation Is Still Under-Validated

The templates now differ more than the first pass, but they still share too much generator DNA.

Missing proof:

- a scored visual differentiation review across all 10 homepages side by side
- a scored differentiation review across key secondary pages
- evidence that hero mechanics, section cadence, and nav behavior are genuinely distinct enough

### 2. Production Readiness Is Not Fully Proven

The templates are GitHub Pages-ready in structure, but not yet proven through actual deployment runs.

Missing proof:

- successful deploy from each template repo shape
- verification that relative paths work under a GitHub Pages project subpath
- final published artifact sanity check after deployment

### 3. Placeholder Assets Are Still Synthetic

The current system uses generated SVG stand-ins to satisfy image-role review. That is acceptable for internal scaffolding, but not enough for a premium template library.

Missing proof:

- stronger art-directed placeholder asset sets
- template-level asset cohesion
- image crops and content that feel real rather than structural

### 4. Quality Is Not Yet Measured Beyond Structural Review

The current validation focuses on existence, coverage, and banned patterns. It does not yet enforce quality metrics for accessibility, responsiveness, performance, or page behavior.

Missing proof:

- Lighthouse or equivalent performance baseline
- accessibility baseline
- broken-link verification
- JavaScript error scan in browser console
- viewport sweep beyond one desktop and one mobile preset

### 5. The Templates Have Not Been Pressure-Tested As Starters

A template library is not actually done until it survives reuse.

Missing proof:

- cloning or copying a template into a clean starter directory
- swapping copy, colors, and assets without breaking layout
- confirming README instructions are enough for another session to use the template correctly

### 6. Validation Criteria Need One More Layer

Current validation checks structural integrity well. It still lacks subjective-but-enforced visual quality gates.

Missing proof:

- a cross-template review board
- a minimum visual score threshold
- a manual or semi-manual signoff rubric stored alongside evidence

## Definition Of Done

The template system is only done when all six categories below pass:

1. Structural validity
2. Browser review validity
3. Visual differentiation validity
4. Deployment validity
5. Reusability validity
6. Quality baseline validity

If any one category fails, the system is not done.

## Phase Plan

## Phase 1: Freeze The Baseline

Objective:

Create an evidence snapshot of the current library so future changes can be compared, not guessed.

Required work:

- generate a baseline review board containing homepage desktop screenshots for all 10 templates
- generate a second review board for a representative interior page from each template
- archive current `summary.json` files as baseline evidence

Validation:

- all 10 homepage screenshots appear in one board
- all 10 interior screenshots appear in one board
- baseline folder exists and is timestamped

Failure condition:

- if any template is missing from either board, Phase 1 fails

## Phase 2: Visual Differentiation Pass

Objective:

Force the templates farther apart until they no longer feel like siblings with different palettes.

Required work:

- redesign headers so each template family has a clearly different frame behavior
- redesign hero structure so no two templates share the same opening logic
- redesign section cadence so the pacing changes materially across templates
- tighten typography pairings so each template has a distinct reading voice
- reduce any recurring generator patterns that are too easy to spot across the set

Validation rubric:

Every template must be scored from 1 to 5 on:

- first-glance distinctiveness
- hero originality
- nav originality
- section pacing
- type character
- still-frame memorability

Minimum passing score:

- no category below 4 for any template

Failure condition:

- if two templates can reasonably be described as “the same system with different colors,” both fail

## Phase 3: Asset Realism Pass

Objective:

Replace obvious structural placeholder feeling with believable placeholder asset direction.

Required work:

- replace generic SVG scaffolds with more art-directed placeholder visuals
- ensure each template’s asset language matches its sector
- improve image rhythm and crop logic on pages with multiple visuals
- make sure visual frames feel intentional even before real client content is added

Validation:

- every `data-review-image` still exists
- E2E screenshot counts remain exact
- no asset appears copied thoughtlessly across unrelated templates
- luxury, photography, and event templates must feel most improved in this phase

Failure condition:

- if visuals still read as wireframe-grade placeholders, the template fails

## Phase 4: Interaction And Behavior Pass

Objective:

Verify the templates behave like real sites, not static mockups pretending to be finished.

Required work:

- add and test hover states, focus states, and keyboard usability
- ensure forms feel intentional even if they stay frontend-only
- verify presentation deck navigation by keyboard
- verify calculator logic responds correctly across multiple inputs
- ensure sticky headers, motion, and section transitions do not create broken states

Validation:

- browser console is clean during scripted navigation
- no keyboard trap exists
- form controls are reachable and legible
- calculator outputs change in response to input edits
- slide deck navigation works forward and backward

Failure condition:

- if the template only survives screenshots but not interaction, it fails

## Phase 5: Quality Gate Expansion

Objective:

Add automated quality checks beyond the current structural gate.

Required work:

- add broken-link checks
- add console error checks
- add accessibility checks for headings, landmarks, alt coverage, and contrast
- add a viewport sweep at more than one mobile width
- add a Lighthouse-style baseline for key templates

Validation:

- every template passes the expanded validator
- every failure produces a machine-readable error
- quality outputs are written beside the existing review artifacts

Failure condition:

- if the expanded validator is not integrated into the main runner, this phase fails

## Phase 6: Deployment Proof

Objective:

Prove the templates work after real publication, not just local serving.

Required work:

- deploy each template to a GitHub Pages-compatible location
- verify all assets load correctly from a project subpath
- check that internal navigation works after deployment
- confirm no path breaks due to relative links

Validation:

- live URL recorded for each template
- post-deploy screenshot for each homepage
- no broken asset or stylesheet paths

Failure condition:

- if even one template breaks after deployment, the system is not done

## Phase 7: Starter-Reuse Proof

Objective:

Prove the templates are reusable products, not one-off artifacts.

Required work:

- copy at least 3 templates into fresh starter directories
- swap name, colors, and sample content
- confirm layouts remain intact after the swap
- confirm the README is sufficient for reuse

Validation:

- one corporate-style starter succeeds
- one image-led starter succeeds
- one utility-style starter succeeds

Failure condition:

- if the template only works in the original generated folder, it fails

## Validation Matrix

The plan itself is only complete if every phase has a named validator and named evidence artifact.

| Phase | Validator | Evidence |
| --- | --- | --- |
| 1 | review-board builder | baseline boards |
| 2 | visual scorecard | per-template score sheets |
| 3 | browser review rerun | updated screenshots and manifests |
| 4 | scripted interaction test | behavior logs |
| 5 | expanded validator | machine-readable reports |
| 6 | post-deploy verification | live URLs and post-deploy screenshots |
| 7 | starter clone test | cloned starter folders and pass logs |

If a phase lacks a validator or evidence artifact, it does not count.

## Hard Execution Order

1. Freeze baseline evidence.
2. Run the visual differentiation pass.
3. Re-run browser review and validation.
4. Run the asset realism pass.
5. Re-run browser review and validation.
6. Run the interaction and behavior pass.
7. Expand the validator.
8. Re-run the full validation suite.
9. Prove deployment.
10. Prove starter reuse.
11. Re-run the full validation suite one final time.

## Final Acceptance Gate

Do not call the system complete until:

- all 10 templates pass the current browser review
- all 10 templates pass the current validation criteria
- all 10 templates pass the expanded validation suite
- all 10 templates have live deployment proof
- at least 3 templates survive starter reuse tests
- every template scores at least 4 out of 5 on the visual differentiation rubric
- no pill-shaped UI appears anywhere

## Immediate Next Actions

The highest-leverage next moves are:

1. Build a cross-template review board generator.
2. Create a visual scorecard file for all 10 templates.
3. Add console-error and broken-link checks to the validator.
4. Run a third differentiation pass using the review boards as the comparison surface.

Until those are done, the system is advanced and validated structurally, but not fully finished.
