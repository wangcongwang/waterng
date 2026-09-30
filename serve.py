#!/usr/bin/env python3
import http.server, socketserver, os
os.chdir('/Users/wang/Documents/trae_projects/water')
PORT = 8080
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *a): pass
with socketserver.TCPServer(("0.0.0.0", PORT), H) as httpd:
    print(f"serving on http://localhost:{PORT}")
    httpd.serve_forever()
