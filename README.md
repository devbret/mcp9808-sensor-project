# MCP9808 Sensor Project

![Visualization of the average temperatures for every minute from six twenty four hour periods.](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/083a8baa-9cbe-4435-9a2b-825bd9222ec2.jpg)

## About

Code for combining a Raspberry Pi Zero 2 WH computer with an Adafruit MCP9808 temperature sensor. The files in this repo are related to [the following Hackaday.io project](https://hackaday.io/project/202152-enviropi-temp-monitor).

## Instructions

1. Upload the Python file to a RPi Zero 2 WH via SSH and run it using the following command: `python3 app.py`

2. Before exiting your terminal session from step one, use Screen to keep the Python file operating.

3. Allow your Raspberry Pi computer and Adafruit sensor contraption to capture data for as long as desired.

4. Once you have collected enough temperature data, export your `temperature_log.csv` file from the Raspberry Pi unit, onto your main computer.

5. Finally, visualize your data using the HTML, CSS and JavaScript files provided.

## Please Note

There are two kinds of graphs available for exploring your temperature measurements. The first (type of) chart displays an average twenty four hour period, based on all of your readings. Whereas the second variety of charts displays each day's measurements, from when measurements began until their ending.

Also, in my experience, the Python file will generate between three and four megabytes of data every twenty four hours. Although your results may vary.
