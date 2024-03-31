FROM python:3.11
COPY ./app /app
WORKDIR /app
# --no-cache-dir : 이미지 크기 줄임
RUN pip install --no-cache-dir --upgrade -r requirements.txt
EXPOSE 80
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]