# Screenshot 35-Point Rubric

This rubric is the hard execution gate for the template system.

Scope:

- every full-page screenshot under `templates/review/<template>/`
- both desktop and mobile captures
- one 35-point report per screenshot

Pass rule:

- a screenshot passes only if it scores `35 / 35`
- the total run passes only if every screenshot scores `35 / 35`

The 35 checks applied to every screenshot are:

1. `template_dir_exists`: the template directory exists.
2. `page_file_exists`: the source page for the screenshot exists.
3. `screenshot_exists`: the full-page PNG exists.
4. `screenshot_png_signature_valid`: the screenshot is a valid PNG file.
5. `screenshot_dimensions_valid`: the screenshot dimensions match the expected desktop or mobile range.
6. `review_dir_exists`: the review artifact directory exists.
7. `summary_json_exists`: the template `summary.json` exists.
8. `manifest_md_exists`: the template `manifest.md` exists.
9. `summary_includes_run`: `summary.json` includes the page/device run for the screenshot.
10. `manifest_lists_screenshot`: `manifest.md` explicitly lists the full-page screenshot file.
11. `opposite_device_screenshot_exists`: the opposite device full-page screenshot exists for the same page.
12. `config_includes_page`: the page is declared in the template E2E config.
13. `readme_exists`: the template `README.md` exists.
14. `deploy_workflow_exists`: the GitHub Pages workflow exists.
15. `stylesheet_exists_and_linked`: `styles.css` exists and is linked by the page.
16. `script_exists_and_linked`: `script.js` exists and is linked by the page.
17. `body_template_class_present`: the page body declares its template variant class.
18. `body_review_page_attribute_present`: the page body declares `data-review-page` for the page slug.
19. `main_page_shell_present`: the page contains the main shell.
20. `header_present`: the page contains a header.
21. `footer_present`: the page contains a footer.
22. `primary_heading_present`: the page contains a primary heading.
23. `required_section_count_met`: the page contains every configured review section.
24. `required_review_image_count_met`: the page contains every configured review image hook for that page.
25. `page_title_complete`: the page title is present and contains both site and page context.
26. `copy_volume_meets_minimum`: the page contains enough copy to count as a finished starter page rather than a stub.
27. `relative_asset_paths_only`: the page uses relative local assets and does not depend on remote assets.
28. `banned_pill_patterns_absent`: banned pill-like patterns are absent from the page and shared stylesheet.
29. `template_board_exists`: the template contact-sheet board exists.
30. `template_level_coverage_complete`: template-level review coverage is complete for page count, devices, and summary runs.
31. `sampled_palette_variety_meets_minimum`: the screenshot contains enough sampled color variation to count as a designed page rather than a flat blank frame.
32. `contrast_spread_meets_minimum`: the screenshot has enough tonal spread to remain legible and visually distinct.
33. `non_background_signal_ratio_meets_minimum`: enough of the screenshot differs from the sampled background color to count as active page content.
34. `first_fold_signal_meets_minimum`: the first fold contains enough signal to avoid a dead opening screen.
35. `edge_transition_density_meets_minimum`: the screenshot contains enough transitions to indicate real layout/typography/visual structure.

Artifacts written by the scorer:

- `templates/review-criteria/<template>/<screenshot>.md`
- `templates/review-criteria/<template>/template-summary.md`
- `templates/review-criteria/master-summary.md`
- `templates/review-criteria/master-summary.json`

Execution:

```bash
cd /Users/andrewshea/Desktop/Websites/templates
./run-autonomous-finish-loop.sh
```
