import click
from jinja2 import Environment, FileSystemLoader
import yaml
import re

loader = FileSystemLoader("templates")
env = Environment(loader=loader)


def kebab(input):
    """Custom filter"""
    step1 = re.sub(r"[^\w]", "-", input.lower())
    return re.sub(r"-+", "-", step1)


env.filters["kebab"] = kebab


@click.command()
@click.argument("filepath", default="nerm.yaml")
@click.argument("output", default="index.html")
def cli(filepath, output):
    with open(filepath, "r") as nermfile:
        nerm = yaml.load(nermfile, Loader=yaml.SafeLoader)

    # print(nerm)

    t = env.get_template("menu.html")
    out = t.render(**nerm)
    with open(output, "w") as out_file:
        out_file.write(out)


if __name__ == "__main__":
    cli()