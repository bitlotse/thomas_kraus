from pathlib import Path
from html.parser import HTMLParser
import re
class Text(HTMLParser):
 def __init__(self): super().__init__();self.bits=[];self.links=[]
 def handle_data(self,d):
  if d.strip(): self.bits.append(d.strip())
 def handle_starttag(self,t,a):
  if t=='a': self.links.append(dict(a).get('href'))
for p in Path('reports/original').glob('*.html'):
 if '.content.' in p.name: continue
 s=p.read_text(encoding='utf-8'); m=re.search(r'<main\b[^>]*>([\s\S]*?)</main>',s)
 content=m.group(1) if m else s
 parser=Text();parser.feed(content)
 print('\nPAGE',p.stem,'\n','\n'.join(parser.bits),'\nLINKS',parser.links)
 Path('reports/original',p.stem+'.content.html').write_text(content,encoding='utf-8')
