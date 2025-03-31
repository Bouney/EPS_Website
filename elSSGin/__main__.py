import os
import sys
import re
import shutil
from pathlib import Path
from datetime import datetime, timezone

# import json5 as json
import jinja2
import yaml

debug_info = datetime.now(timezone.utc).isoformat(), sys.version

print(debug_info)

# Add noindex if run with --dev-build
if '--dev-build' in sys.argv:
    dev_build = True
    print('Building with --dev-build: noindex and debug information added.')
else:
    dev_build = False


def write_file(full_path, content):
    with open(full_path, 'w', encoding='UTF-8') as f:
        f.write(content)
    print('Wrote %d bytes to %s ' % (len(bytes(content, "UTF-8")), full_path))


jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader('templates/'))
paths = []

departments = []
for dept_list_entry in os.scandir('pods/departments'):
    if os.path.isfile(dept_list_entry):
        with open(dept_list_entry.path, 'r') as file:
            dept = yaml.safe_load(file.read())

        departments.append({
            'name': dept['name'],
            'id': re.sub('.yaml$', '', dept_list_entry.name)
        })

specialized_programs = []
for specialized_program_path in os.scandir(
        'pods/specialized'):
    with open(specialized_program_path.path, 'r') as file:
        specialized_program = yaml.safe_load(file.read())

    specialized_programs.append({
        'name': specialized_program['name'],
        'id': re.sub('.yaml$', '', specialized_program_path.name)
    })

def bob(template: jinja2.Template,
        path_: str | None,
        params: dict = None) -> str:
    """Bob the builder, actually a renderer.

    :param template: Template object
    :type template: jinja2.Template
    :param params: Parameters to pass to template
    :type params: dict
    :param path_: Path (with first /) for canonical URL tag.
    If None, don't include canonical URL tag.
    :type path_: str | None
    :return: str
    """
    global paths
    paths.append(path_)

    if params is None:
        params = {}

    return template.render(
        departments=departments, specialized_programs=specialized_programs,
        dev_build=dev_build, debug_info=debug_info,
        last_update=datetime.now(timezone.utc).strftime('%A, %B %-d, %Y'
                                                        ' at %-I:%M:%S %p'),
        path_=path_,
        **params
    )

root = Path('..')
site_path = root / 'site'

# Delete existing site
if os.path.exists(site_path):
    shutil.rmtree(site_path)
print('Deleted site contents')

# Copy resources
shutil.copytree(root / 'static', site_path)
print('Copied static')

# Create directories
for dir in [
    'elSSGin/pods',
    'departments',
    'specialized',
    'orca-news',
]:
    os.makedirs(site_path / dir)
print('Created directories')

# index
write_file('%s/index.html' % site_path,
    bob(jinja_env.get_template('index.html'), ''))

# 404
write_file('%s/404.html' % site_path,
    bob(jinja_env.get_template('404.html'), None))

def dept_pages(pods: list[dict], file_dir: str) -> None:
    for entry in pods:
        pod_path = os.path.abspath('pods/%s/%s.yaml'
                                    % (file_dir, entry['id']))

        with open(pod_path, 'r') as pod_file:
            pod_data = yaml.safe_load(pod_file.read())

        write_file(
            os.path.abspath(
                '%s/%s/' % (site_path, file_dir) + re.sub(".yaml?$",
                    ".html", os.path.basename(pod_path))),
            bob(
                jinja_env.get_template('departments.html'),
                f'/{file_dir}/{entry["id"]}',
                {
                    'dept': pod_data,
                    'dept_id': entry['id']
                }
            )
        )
# Departments
dept_pages(departments, 'departments')
# Specialized programs
dept_pages(specialized_programs, 'specialized')


# Clubs
with open('pods/clubs.yaml', 'r') as file:
    clubs = yaml.safe_load(file.read())

html_text = bob(
    jinja_env.get_template('clubs.html'),
    '/clubs',
    {'clubs': clubs}
)
write_file(os.path.abspath('%s/clubs.html') % site_path, html_text)

# Forms
with open('pods/forms.yaml', 'r') as file:
    forms = yaml.safe_load(file.read())

html_text = bob(
    jinja_env.get_template('forms.html'),
    '/forms',
    {'forms': forms}
)
write_file(os.path.abspath('%s/forms.html') % site_path, html_text)

# Edit requests
write_file('%s/edit-requests.html' % site_path,
    bob(jinja_env.get_template('edit-requests.html'), '/edit-requests'))

# Contact
write_file('%s/contact.html' % site_path,
    bob(jinja_env.get_template('contact.html'), '/contact'))

# Orca News stubs
# Messages
write_file('%s/orca-news/messages.html' % site_path,
    bob(jinja_env.get_template('orca-news/messages.html'),
        '/orca-news/messages'))
# Calendar
write_file('%s/orca-news/calendar.html' % site_path,
    bob(jinja_env.get_template('orca-news/calendar.html'),
        '/orca-news/calendar'))

# Sitemap
write_file('%s/sitemap.txt' % site_path,
    bob(jinja_env.get_template('sitemap.txt'), None, {'paths': paths}))

if os.path.isdir(os.path.abspath('%s/elSSGin/pods' % site_path)):
    shutil.rmtree(os.path.abspath('%s/elSSGin/pods' % site_path))
    print('Deleted old pods in site')
shutil.copytree('pods', os.path.abspath('%s/elSSGin/pods' % site_path))
print('Copied pods to site')
