from pathlib import Path
from pypdf import PdfReader
for p in Path('src/assets/documents').glob('*.pdf'):
 r=PdfReader(p)
 text='\n'.join(page.extract_text() or '' for page in r.pages)
 Path('reports/original',p.stem+'.txt').write_text(text,encoding='utf-8')
 print(p.name,len(r.pages),'pages',text[:4500])
