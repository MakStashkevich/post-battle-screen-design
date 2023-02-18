FROM python:3.10-slim

LABEL maintainer="Maksim Stashkevich <makstashkevich@gmail.com>"

WORKDIR /post-battle-api

COPY ./requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./src ./src

EXPOSE 3600

ENTRYPOINT ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3600"]