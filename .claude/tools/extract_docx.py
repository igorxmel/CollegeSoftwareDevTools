# Dumps the text of a .docx into a UTF-8 txt file next to this script.
# Usage: python .claude/tools/extract_docx.py "Task 1st/Task.docx" out.txt

import html
import re
import sys
import zipfile


def text_from_docx(path):
    xml = zipfile.ZipFile(path).read("word/document.xml").decode("utf-8", "ignore")
    xml = xml.replace("</w:p>", "\n").replace("<w:tab/>", "\t").replace("<w:br/>", "\n")
    return html.unescape(re.sub(r"<[^>]+>", "", xml))


if __name__ == "__main__":
    with open(sys.argv[2], "w", encoding="utf-8") as f:
        f.write(text_from_docx(sys.argv[1]))
    print("written to", sys.argv[2])
