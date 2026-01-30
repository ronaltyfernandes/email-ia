import re
import string


def preprocess_text(text: str) -> str:
    # lowercase
    text = text.lower()

    # remove urls
    text = re.sub(r"http\S+", "", text)

    # remove pontuação
    text = text.translate(str.maketrans("", "", string.punctuation))

    # remove espaços extras
    text = re.sub(r"\s+", " ", text).strip()

    return text
