"""Stub elSSGin build script"""

print('''
!=======================================!
| This is the STUB elSSGin build script |
!=======================================!

It merely copies the course selection folder
 to site to ensure compatibility with elSSGin.
''')

from shutil import copytree

copytree('../Course_Selection_Main', '../site')