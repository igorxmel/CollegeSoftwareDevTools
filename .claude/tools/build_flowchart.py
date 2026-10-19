"""Draws the ПЗ-8 algorithm flowchart.

Writes Solution/flowchart.png for the report and Solution/flowchart.drawio so the
diagram can be reopened and edited in draw.io, which is what the course uses.

Shapes follow ГОСТ 19.701-90: oval for terminators, parallelogram for input and
output, rectangle for a process, rhombus for a decision.
"""

import html
import pathlib

from PIL import Image, ImageDraw, ImageFont

SCALE = 2
W, H = 1180, 1560

FONT_PATH = "C:/Windows/Fonts/times.ttf"
FONT_SIZE = 17
LABEL_SIZE = 15

BG = "white"
LINE = "black"
STROKE = 3

MAIN_X = 480
ERR_X = 900
LANE_SKIP = 150
LANE_LOOP = 240

# name: (kind, x, y, width, height, text)
NODES = {
    "start":   ("oval", MAIN_X, 45, 240, 62, "Начало"),
    "input":   ("io", MAIN_X, 150, 330, 62, "Ввод X0, h"),
    "chkstep": ("dec", MAIN_X, 268, 300, 104, "h > 0 ?"),
    "init":    ("proc", MAIN_X, 390, 360, 70, "k := 0;  X := X0\nD := Y(X) − L"),
    "chkeps":  ("dec", MAIN_X, 510, 300, 104, "| D | < ε ?"),
    "step":    ("proc", MAIN_X, 630, 360, 70, "k := k + 1\nX := X0 + k · h"),
    "calc":    ("proc", MAIN_X, 740, 360, 70, "Dпр := D\nD := Y(X) − L"),
    "chkfin":  ("dec", MAIN_X, 860, 320, 104, "Y(X) конечно ?"),
    "chksign": ("dec", MAIN_X, 980, 320, 104, "Dпр · D ≤ 0 ?"),
    "chkmax":  ("dec", MAIN_X, 1100, 320, 104, "k < MAX_STEPS ?"),
    "refine":  ("proc", MAIN_X, 1220, 400, 70, "Уточнение X\nполовинным делением"),
    "output":  ("io", MAIN_X, 1330, 360, 62, "Вывод X, Y(X)"),
    "end":     ("oval", MAIN_X, 1440, 240, 62, "Конец"),

    "errstep": ("io", ERR_X, 268, 320, 62, "Вывод: неверный шаг"),
    "errfin":  ("io", ERR_X, 860, 320, 62, "Вывод: переполнение"),
    "errmax":  ("io", ERR_X, 1100, 320, 76, "Вывод: точка\nне найдена"),
}


def load_font(size):
    return ImageFont.truetype(FONT_PATH, size * SCALE)


def box(name):
    _, x, y, w, h, _ = NODES[name]
    return x - w / 2, y - h / 2, x + w / 2, y + h / 2


def s(v):
    return v * SCALE


def draw_text(d, x, y, text, font):
    lines = text.split("\n")
    heights = []
    for line in lines:
        bb = d.textbbox((0, 0), line, font=font)
        heights.append(bb[3] - bb[1])
    gap = 6 * SCALE
    total = sum(heights) + gap * (len(lines) - 1)
    cur = s(y) - total / 2
    for line, lh in zip(lines, heights):
        bb = d.textbbox((0, 0), line, font=font)
        d.text((s(x) - (bb[2] - bb[0]) / 2 - bb[0], cur - bb[1]), line, font=font, fill=LINE)
        cur += lh + gap


def draw_node(d, name, font):
    kind, x, y, w, h, text = NODES[name]
    left, top, right, bottom = (s(v) for v in box(name))

    if kind == "oval":
        d.rounded_rectangle([left, top, right, bottom], radius=(bottom - top) / 2,
                            outline=LINE, width=STROKE)
    elif kind == "proc":
        d.rectangle([left, top, right, bottom], outline=LINE, width=STROKE)
    elif kind == "io":
        skew = 22 * SCALE
        d.polygon([(left + skew, top), (right, top), (right - skew, bottom), (left, bottom)],
                  outline=LINE, width=STROKE)
    elif kind == "dec":
        cx, cy = s(x), s(y)
        d.polygon([(cx, top), (right, cy), (cx, bottom), (left, cy)],
                  outline=LINE, width=STROKE)

    draw_text(d, x, y, text, font)


def arrow_head(d, x, y, direction):
    a = 9 * SCALE
    x, y = s(x), s(y)
    if direction == "down":
        pts = [(x, y), (x - a * 0.6, y - a), (x + a * 0.6, y - a)]
    elif direction == "up":
        pts = [(x, y), (x - a * 0.6, y + a), (x + a * 0.6, y + a)]
    elif direction == "right":
        pts = [(x, y), (x - a, y - a * 0.6), (x - a, y + a * 0.6)]
    else:
        pts = [(x, y), (x + a, y - a * 0.6), (x + a, y + a * 0.6)]
    d.polygon(pts, fill=LINE)


def line(d, points):
    d.line([(s(px), s(py)) for px, py in points], fill=LINE, width=STROKE, joint="curve")


def label(d, x, y, text, font):
    pad = 4 * SCALE
    bb = d.textbbox((0, 0), text, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    d.rectangle([s(x) - pad, s(y) - th / 2 - pad, s(x) + tw + pad, s(y) + th / 2 + pad], fill=BG)
    d.text((s(x), s(y) - th / 2 - bb[1]), text, font=font, fill=LINE)


def build_png(out_path):
    img = Image.new("RGB", (s(W), s(H)), BG)
    d = ImageDraw.Draw(img)
    font = load_font(FONT_SIZE)
    small = load_font(LABEL_SIZE)

    # Прямые переходы по главной колонке.
    straight = [
        ("start", "input"), ("input", "chkstep"), ("chkstep", "init"),
        ("init", "chkeps"), ("chkeps", "step"), ("step", "calc"),
        ("calc", "chkfin"), ("chkfin", "chksign"), ("chksign", "chkmax"),
        ("refine", "output"), ("output", "end"),
    ]
    for a, b in straight:
        y1 = box(a)[3]
        y2 = box(b)[1]
        line(d, [(MAIN_X, y1), (MAIN_X, y2)])
        arrow_head(d, MAIN_X, y2, "down")

    # Ветки «нет» вправо, в сообщения об ошибках.
    for src, dst in [("chkstep", "errstep"), ("chkfin", "errfin"), ("chkmax", "errmax")]:
        x1 = box(src)[2]
        x2 = box(dst)[0]
        y = NODES[src][2]
        line(d, [(x1, y), (x2, y)])
        arrow_head(d, x2, y, "right")
        label(d, x1 + 12, y - 16, "нет", small)

    # Сообщения об ошибках спускаются в общий конец.
    far = ERR_X + NODES["errmax"][3] / 2 + 70
    for src in ("errstep", "errfin", "errmax"):
        y = NODES[src][2]
        line(d, [(box(src)[2], y), (far, y), (far, 1440)])
    line(d, [(far, 1440), (box("end")[2], 1440)])
    arrow_head(d, box("end")[2], 1440, "left")

    # «Да» на проверке шага и остальных.
    label(d, MAIN_X + 12, (box("chkstep")[3] + box("init")[1]) / 2, "да", small)
    label(d, MAIN_X + 12, (box("chkfin")[3] + box("chksign")[1]) / 2, "да", small)
    label(d, MAIN_X + 12, (box("chkeps")[3] + box("step")[1]) / 2, "нет", small)
    label(d, MAIN_X + 12, (box("chksign")[3] + box("chkmax")[1]) / 2, "нет", small)

    # chksign «да» уходит влево и вниз к уточнению.
    y = NODES["chksign"][2]
    line(d, [(box("chksign")[0], y), (LANE_LOOP, y), (LANE_LOOP, 1220), (box("refine")[0], 1220)])
    arrow_head(d, box("refine")[0], 1220, "right")
    label(d, LANE_LOOP + 14, y - 16, "да", small)

    # chkmax «да» возвращает на шаг цикла.
    y = NODES["chkmax"][2]
    line(d, [(box("chkmax")[0], y), (LANE_SKIP, y), (LANE_SKIP, 630), (box("step")[0], 630)])
    arrow_head(d, box("step")[0], 630, "right")
    label(d, LANE_SKIP + 14, y - 16, "да", small)

    # chkeps «да»: точка уже найдена, сразу на вывод.
    y = NODES["chkeps"][2]
    lane = 80
    line(d, [(box("chkeps")[0], y), (lane, y), (lane, 1330), (box("output")[0], 1330)])
    arrow_head(d, box("output")[0], 1330, "right")
    label(d, lane + 14, y - 16, "да", small)

    for name in NODES:
        draw_node(d, name, font)

    img.save(out_path)
    return img.size


DRAWIO_STYLE = {
    "oval": "ellipse;whiteSpace=wrap;html=1;",
    "proc": "rounded=0;whiteSpace=wrap;html=1;",
    "io": "shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;size=0.1;",
    "dec": "rhombus;whiteSpace=wrap;html=1;",
}

EDGES = [
    ("start", "input", ""), ("input", "chkstep", ""), ("chkstep", "init", "да"),
    ("init", "chkeps", ""), ("chkeps", "step", "нет"), ("step", "calc", ""),
    ("calc", "chkfin", ""), ("chkfin", "chksign", "да"), ("chksign", "chkmax", "нет"),
    ("refine", "output", ""), ("output", "end", ""),
    ("chkstep", "errstep", "нет"), ("chkfin", "errfin", "нет"), ("chkmax", "errmax", "нет"),
    ("chkeps", "output", "да"), ("chksign", "refine", "да"), ("chkmax", "step", "да"),
    ("errstep", "end", ""), ("errfin", "end", ""), ("errmax", "end", ""),
]


def build_drawio(out_path):
    cells = []
    for i, (name, (kind, x, y, w, h, text)) in enumerate(NODES.items(), start=2):
        cells.append(
            f'        <mxCell id="{name}" value="{html.escape(text).replace(chr(10), "&#10;")}" '
            f'style="{DRAWIO_STYLE[kind]}fontFamily=Times New Roman;fontSize=14;" vertex="1" parent="1">\n'
            f'          <mxGeometry x="{x - w / 2:.0f}" y="{y - h / 2:.0f}" '
            f'width="{w:.0f}" height="{h:.0f}" as="geometry" />\n'
            f'        </mxCell>'
        )
    for i, (src, dst, text) in enumerate(EDGES):
        cells.append(
            f'        <mxCell id="e{i}" value="{html.escape(text)}" '
            f'style="edgeStyle=orthogonalEdgeStyle;html=1;fontFamily=Times New Roman;fontSize=12;" '
            f'edge="1" parent="1" source="{src}" target="{dst}">\n'
            f'          <mxGeometry relative="1" as="geometry" />\n'
            f'        </mxCell>'
        )
    body = "\n".join(cells)
    xml = (
        '<mxfile host="app.diagrams.net">\n'
        '  <diagram name="ПЗ-8 блок-схема">\n'
        '    <mxGraphModel dx="1180" dy="1560" grid="1" gridSize="10" page="1" '
        'pageWidth="1180" pageHeight="1560" math="0" shadow="0">\n'
        '      <root>\n'
        '        <mxCell id="0" />\n'
        '        <mxCell id="1" parent="0" />\n'
        f'{body}\n'
        '      </root>\n'
        '    </mxGraphModel>\n'
        '  </diagram>\n'
        '</mxfile>\n'
    )
    pathlib.Path(out_path).write_text(xml, encoding="utf-8")


if __name__ == "__main__":
    here = pathlib.Path(__file__).resolve().parents[2]
    solution = here / "Task 8th Module Debugging and Exception Handling" / "Solution"
    size = build_png(solution / "flowchart.png")
    build_drawio(solution / "flowchart.drawio")
    print("flowchart.png", size)
    print("flowchart.drawio записан")
