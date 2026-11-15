"""Serve only public HealthNotes assets locally. python serve.py --port 8770"""
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit,unquote
import argparse
import mimetypes

ROOT=Path(__file__).resolve().parent
PUBLIC={'visit.css','visit-match.js','visit-app.js','index.html','styles.css','app.js','inference.js','model.json','evaluation/results.json','evaluation/parity_cases.json','evaluation/summary.png'}
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        route=unquote(urlsplit(self.path).path).lstrip('/') or 'index.html'
        if self.headers.get('Host') not in {f'127.0.0.1:{self.server.server_port}',f'localhost:{self.server.server_port}'}:
            return self.send_error(403)
        if route not in PUBLIC:return self.send_error(404)
        path=ROOT/route
        if not path.is_file():return self.send_error(404)
        payload=path.read_bytes()
        content=mimetypes.guess_type(str(path))[0] or 'application/octet-stream'
        if path.suffix=='.js':content='text/javascript'
        self.send_response(200)
        self.send_header('Content-Type',content+'; charset=utf-8' if path.suffix!='.png' else content)
        self.send_header('Content-Length',str(len(payload)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Permissions-Policy','camera=(), microphone=(), geolocation=()')
        self.end_headers();self.wfile.write(payload)
    def log_message(self,*args):pass

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8770);args=parser.parse_args()
    print(f'HealthNotes: http://127.0.0.1:{args.port}/',flush=True)
    ThreadingHTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
