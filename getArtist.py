#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import cgi
import urllib
import subsonic
from SubsonicHandler import ArtistHandler
from xml.sax import make_parser

if __name__ == "__main__":
    try:
        query = os.environ["QUERY_STRING"]
    except:
        subsonic.error("environ not specified.")
    
    if len(query) == 0:
        subsonic.error("no queries.")

    TITLE = "Artist Result"
    table_header = """
<div class="contents">
 <table class="search_result">
  <col id="artist" />
  <col id="album" />
  <tr class="index">
   <th scope="col">artist</th>
   <th scope="col">album</th>
  </tr>
"""
    table_footer = """
 </table>
</div>
"""

    conf = subsonic.Config('config.json')
    s = subsonic.Subsonic(conf)
    body = '<body>\n'
    body = body + subsonic.get_player()
    body = body + ('<h1><a name="head">%s</a></h1>\n' % TITLE)

    table = []
    handler = ArtistHandler(table, table_header, table_footer)

    parser = make_parser()

    xmlFile = urllib.urlopen(s.get_url("getArtist", query))

    parser.setContentHandler(handler)
    parser.parse(xmlFile)

    body = body + ''.join(table)
    body = body + '</body>\n' + '</html>\n'

    subsonic.print_header(TITLE, "style.css")
    print body
