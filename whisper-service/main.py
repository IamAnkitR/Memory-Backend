from fastapi import FastAPI, UploadFile
import whisper
import shutil
import uuid
import os

app = FastAPI()

model = whisper.load_model("base")

UPLOAD_DIR = "temp_audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/transcribe")
async def transcribe(file: UploadFile):

    file_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{file_id}.wav"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = model.transcribe(file_path)

    os.remove(file_path)

    return {"text": result["text"]}
