#!/usr/bin/env python
# -*- coding: utf-8 -*-

host = "localhost"
port = "8180"
resturl = "http://" + host + ":" + port + "/subsonic/rest/"
q_user = "user"
q_pass = "pass"
q_ver = "1.1.0"
q_cli = "websonic"

def error(str):
    print "Content-Type: text/html\n"
    print str
    exit(1)

def get_url(func, queries):
    url = resturl\
        + func + ".view?"\
        + "u=" + q_user + "&" + "p=" + q_pass + "&"\
        + "v=" + q_ver + "&" + "c=" + q_cli + "&"\
        + queries
    
    return url

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
    print get_url("search", "a=bcd&moge=fuga")
    print_header("test", "./style.css")
    print get_index_links()
    error("test test")
    print "this will not be printed."
