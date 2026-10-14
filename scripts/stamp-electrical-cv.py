"""Add an artwork-only PDF overlay without replacing the owner's original PDF."""
import sys
from pathlib import Path
from pypdf import PdfReader, PdfWriter

source, overlay, output = sys.argv[1:]
if Path(source).resolve() == Path(output).resolve():
    raise ValueError("The original document must never be overwritten")
writer = PdfWriter(clone_from=source)
writer.pages[0].merge_page(PdfReader(overlay).pages[0])
with open(output, "wb") as target:
    writer.write(target)
if len(PdfReader(output).pages) != len(PdfReader(source).pages):
    raise RuntimeError("Electrical CV page count changed")

if PdfReader(output).pages[0].extract_text().split() != PdfReader(source).pages[0].extract_text().split():
    raise RuntimeError("Electrical CV text changed")
