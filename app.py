import time
import csv
from datetime import datetime
import board
import busio
import adafruit_mcp9808

i2c = busio.I2C(board.SCL, board.SDA)
mcp = adafruit_mcp9808.MCP9808(i2c)

csv_file_path = "temperature_log.csv"

def initialize_csv(file_path):
    try:
        with open(file_path, mode='x', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Timestamp", "Temperature (°C)"])
    except FileExistsError:
        pass 

initialize_csv(csv_file_path)

try:
    print("Logging temperature every second. Press Ctrl+C to stop.")
    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        temperature_c = mcp.temperature

        with open(csv_file_path, mode='a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([timestamp, temperature_c])

        print(f"{timestamp} - Temperature: {temperature_c:.2f} °C")
        time.sleep(1)
except KeyboardInterrupt:
    print("\nTemperature logging stopped.")
