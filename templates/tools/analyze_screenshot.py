#!/usr/bin/env python3

import json
import sys
from pathlib import Path

from PIL import Image, ImageStat


def resize_keep_width(img, width=220):
    src_w, src_h = img.size
    height = max(1, round(src_h * width / src_w))
    return img.resize((width, height))


def diff_sum(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def main():
    path = Path(sys.argv[1])
    img = Image.open(path).convert("RGB")
    small = resize_keep_width(img, 220)
    w, h = small.size
    bg = small.getpixel((0, 0))

    colors = small.getcolors(maxcolors=5_000_000) or []
    stat = ImageStat.Stat(small)
    avg_stddev = sum(stat.stddev) / len(stat.stddev)

    nonbg = 0
    first_fold_nonbg = 0
    first_fold_rows = max(1, min(h, 180))
    edge_hits = 0
    edge_total = 0

    pixels = small.load()

    for y in range(h):
        for x in range(w):
            p = pixels[x, y]
            if diff_sum(p, bg) > 24:
                nonbg += 1
                if y < first_fold_rows:
                    first_fold_nonbg += 1
            elif y < first_fold_rows:
                pass

            if x + 1 < w:
                right = pixels[x + 1, y]
                edge_total += 1
                if diff_sum(p, right) > 18:
                    edge_hits += 1
            if y + 1 < h:
                down = pixels[x, y + 1]
                edge_total += 1
                if diff_sum(p, down) > 18:
                    edge_hits += 1

    result = {
        "width": img.size[0],
        "height": img.size[1],
        "sampled_unique_colors": len(colors),
        "avg_stddev": round(avg_stddev, 3),
        "nonbg_ratio": round(nonbg / (w * h), 4),
        "first_fold_nonbg_ratio": round(first_fold_nonbg / (w * first_fold_rows), 4),
        "edge_density": round(edge_hits / edge_total, 4) if edge_total else 0,
    }
    print(json.dumps(result))


if __name__ == "__main__":
    main()
