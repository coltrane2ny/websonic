#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import urllib
import subsonic
from xml.sax import ContentHandler
from xml.sax import make_parser
from SubsonicHandler import ArtistIndexHandler        

if __name__ == "__main__":
    TITLE = "Index of My Music Library"
    table_header = """
<div class="contents">
 <table class="artist_index">
"""
    table_footer = """
 </table>
</div>
"""

    conf = subsonic.Config('config.txt')
    s = subsonic.Subsonic(conf)
    body = '<body>\n'
    body = body + ('<h1><a name="head">%s</a></h1>\n' % TITLE)
    body = body + subsonic.get_index_links()

    table = []
    handler = ArtistIndexHandler(table, table_header, table_footer)

    parser = make_parser()

    xmlFile = urllib.urlopen(s.get_url('getArtists', ''))

    parser.setContentHandler(handler)
    parser.parse(xmlFile)

    body = body + ''.join(table)
    body = body + '</body>\n</html>\n'

    subsonic.print_header(TITLE, 'style.css')
    print body
