#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

class Config:
  def __init__(self, filepath):
    f = open(filepath).read()
    self.config = json.loads(f)
    self.resturl = "http://"\
      + self.config["host"] + ":" + self.config["port"]\
      + self.config["rest"]["base"]

  def get(self, key):
    return self.config[key]

class Subsonic:
  def __init__(self, config):
    self.config = config

  def get_url(self, func, queries):
    url = self.config.resturl\
      + "/" + func + ".view"\
      + "?u=" + self.config.get("rest")["user"]\
      + "&p=" + self.config.get("rest")["pass"]\
      + "&v=" + self.config.get("rest")["version"]\
      + "&c=" + self.config.get("rest")["client_name"]\
      + "&" + queries
    return url

def error(str):
    print "Content-Type: text/html\n"
    print str
    exit(1)

def print_header(title, cssPath):
    print """Content-Type: text/html

<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>
<html lang="ja">
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
<title>%s</title>
<link rel="stylesheet" type="text/css" href="%s">
</head>
""" % (title, cssPath)

def get_index_links():
    index_links = """
<table class="index_link">
 <tr>
  <td><a href="#A">A</a></td>
  <td><a href="#B">B</a></td>
  <td><a href="#C">C</a></td>
  <td><a href="#D">D</a></td>
  <td><a href="#E">E</a></td>
  <td><a href="#F">F</a></td>
  <td><a href="#G">G</a></td>
  <td><a href="#H">H</a></td>
  <td><a href="#I">I</a></td>
  <td><a href="#J">J</a></td>
  <td><a href="#K">K</a></td>
  <td><a href="#L">L</a></td>
  <td></td>
 </tr><tr>
  <td><a href="#M">M</a></td>
  <td><a href="#N">N</a></td>
  <td><a href="#O">O</a></td>
  <td><a href="#P">P</a></td>
  <td><a href="#Q">Q</a></td>
  <td><a href="#R">R</a></td>
  <td><a href="#S">S</a></td>
  <td><a href="#T">T</a></td>
  <td><a href="#U">U</a></td>
  <td><a href="#V">V</a></td>
  <td><a href="#W">W</a></td>
  <td><a href="#X-Z">X-Z</a></td>
  <td><a href="##">#</a></td>
 </tr>
</table>
"""
    return index_links


### unittest
if __name__ == '__main__':
    c = Config('config.txt')
    print c.get('host')
    print c.get('rest')['base']
    s = Subsonic(c)
    print s.get_url("search", "a=bcd&moge=fuga")
    print_header("test", "./style.css")
    print get_index_links()
    error("test test")
    print "this will not be printed."
