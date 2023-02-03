import click
from jinja2 import Environment, FileSystemLoader
import yaml
import re
from pathlib import Path

loader = FileSystemLoader("templates")
env = Environment(loader=loader)


def kebab(input):
    """Custom filter"""
    step1 = re.sub(r"[^\w]", "-", input.lower())
    return re.sub(r"-+", "-", step1).strip("-")


env.filters["kebab"] = kebab


@click.command()
@click.argument("filepath", default="nerm.yaml")
@click.argument("output_dir", default=".")
def cli(filepath, output_dir):
    with open(filepath, "r") as nermfile:
        nerm = yaml.load(nermfile, Loader=yaml.SafeLoader)

    t = env.get_template("menu.html")
    out = t.render(choice_label_classes={
        "must": "fa-heart",
        "like": "fa-circle-check",
        "maybe": "fa-circle-question",
        "never": "fa-circle-xmark",
    }, **nerm)

    index_path = Path(output_dir) / "index.html"
    with open(index_path, "w") as out_file:
        out_file.write(out)

    t = env.get_template("about.html")
    out = t.render(**nerm)

    about_path = Path(output_dir) / "about.html"
    with open(about_path, "w") as out_file:
        out_file.write(out)

if __name__ == "__main__":
    cli()
