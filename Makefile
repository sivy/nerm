requirements.txt:
	touch requirements.txt

.venv: requirements.txt
	python3 -m venv .venv
	pip install -r requirements.txt

install_requirements: | .venv requirements.txt
	pip install -r requirements.txt

index.html: nerm.yaml
	. .venv/bin/activate
	python main.py nerm.yaml .