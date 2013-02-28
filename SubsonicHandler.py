#!/usr/bin/env python
# -*- coding: utf-8 -*-

import urllib
from xml.sax import ContentHandler

class ArtistIndexHandler(ContentHandler):
    def __init__(self, page_, header, footer):
        self.page = page_
        self.table_header = header
        self.table_footer = footer
    def startDocument(self):
        self.page.append(self.table_header)
    def endDocument(self):
        self.page.append(self.table_footer)
    def startElement(self, name, attrs):
        if name == 'index':
            attr = attrs['name'].encode('utf-8')
            self.page.append('<tr id="index"><td id="artist">')
            self.page.extend(['<a name="', attr, '">', attr, '</a>'])
            self.page.append('</td><td id="top">')
            self.page.append('<a href="#head">- Top -</a>')
            self.page.append('</td></tr>\n')
        if name == 'artist':
            self.page.append('<tr><td colspan="2">')
            self.page.extend(['<a href="getArtist.py?id=', urllib.quote(attrs['id'].encode('utf-8')), '">'])
            self.page.append(attrs['name'].encode('utf-8'))
            self.page.append('</a>')
            self.page.append('</td></tr>\n')

class SearchHandler(ContentHandler):
    def __init__(self, contents_, header, footer):
        self.contents = contents_
        self.table_header = header
        self.table_footer = footer
    def startDocument(self):
        self.contents.append(self.table_header)
    def endDocument(self):
        self.contents.append(self.table_footer)
    def startElement(self, name, attrs):
        if name == 'match':
            self.contents.append('  <tr><td>')
            self.contents.append(attrs.get('artist', "").encode('utf-8'))
            self.contents.append('</td><td>')
            self.contents.append(attrs.get('album', "").encode('utf-8'))
            self.contents.append('</td><td>')
            self.contents.append(attrs.get('title', "").encode('utf-8'))
            self.contents.append('</td></tr>\n')

class ArtistHandler(ContentHandler):
    def __init__(self, contents_, header, footer):
        self.contents = contents_
        self.table_header = header
        self.table_footer = footer
    def startDocument(self):
        self.contents.append(self.table_header)
    def endDocument(self):
        self.contents.append(self.table_footer)
    def startElement(self, name, attrs):
        if name == 'album':
            self.contents.append('  <tr><td>')
            self.contents.append(attrs.get('artist', "").encode('utf-8'))
            self.contents.append('</td><td>')
            self.contents.extend(['<a href="getAlbum.py?id=', urllib.quote(attrs['id'].encode('utf-8')), '">'])
            self.contents.append(attrs.get('name', "").encode('utf-8'))
            self.contents.append('</a>')
            self.contents.append('</td></tr>\n')

class AlbumHandler(ContentHandler):
    def __init__(self, contents_, header, footer):
        self.contents = contents_
        self.table_header = header
        self.table_footer = footer
    def startDocument(self):
        self.contents.append(self.table_header)
    def endDocument(self):
        self.contents.append(self.table_footer)
    def startElement(self, name, attrs):
        if name == 'song':
            self.contents.append('  <tr><td>')
            self.contents.append(attrs.get('artist', "").encode('utf-8'))
            self.contents.append('</td><td>')
            self.contents.append(attrs.get('title', "").encode('utf-8'))
            self.contents.append('</td><td>')
            self.contents.extend(['<button class="play" id="', urllib.quote(attrs['id'].encode('utf-8')), '">play</button>'])
            self.contents.append('</td></tr>\n')
