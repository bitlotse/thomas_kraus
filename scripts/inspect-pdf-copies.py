from pathlib import Path
import pypdfium2 as pdfium
from pypdf import PdfReader
import hashlib,json
checks=[]
for p in Path('src/assets/documents').glob('*.pdf'):
 original=Path('..')/p.name
 checks.append({'file':p.name,'sameAsSupplied':p.read_bytes()==original.read_bytes(),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
 doc=pdfium.PdfDocument(str(p))
 doc[0].render(scale=1).to_pil().save('reports/original/'+p.stem+'.png')
 if p.name=='untersuchungsstellen_trinkwv.pdf':
  reader=PdfReader(p)
  for i,page in enumerate(reader.pages):
   if 'Kraus' in (page.extract_text() or ''):
    doc[i].render(scale=1).to_pil().save('reports/original/lgl-kraus-'+str(i+1)+'.png')
    print('Kraus listed on PDF page',i+1)
Path('reports/pdf-integrity.json').write_text(json.dumps(checks,indent=2),encoding='utf-8')
print(json.dumps(checks))
