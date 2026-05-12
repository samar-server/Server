from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/")
def home():
    return "k6 backend running"

@app.route('/api/v1/loadtest', methods=['POST'])
def loadtest():

    data = request.json

    url = data.get("url")
    vus = data.get("vus", 5000)
    duration = data.get("duration", "300s")

    cmd = [
        "k6",
        "run",
        "--env", f"TARGET_URL={url}",
        "--vus", str(vus),
        "--duration", duration,
        "loadtest.js"
    ]

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True
    )

    return jsonify({
        "success": True,
        "output": result.stdout[-3000:]
    })

app.run(host="0.0.0.0", port=8080)
