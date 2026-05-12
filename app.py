@app.route('/api/v1/loadtest', methods=['POST'])
def loadtest():

    data = request.json

    ip = data.get("ip")
    port = data.get("port")
    duration = data.get("duration", "200s")
    vus = data.get("vus", 500)

    cmd = [
        "k6",
        "run",
        "--env", f"TARGET_IP={ip}",
        "--env", f"TARGET_PORT={port}",
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
