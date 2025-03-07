# MCP9808 Sensor Project

![Visualization of the average temperatures for every minute from six twenty four hour periods.](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/083a8baa-9cbe-4435-9a2b-825bd9222ec2.jpg)

## About

Code for combining a Raspberry Pi Zero 2 WH computer with an Adafruit MCP9808 temperature sensor to measure ambient air temperatures. The files in this repo are related to [the following Hackaday.io project](https://hackaday.io/project/202152-enviropi-temp-monitor).

## Instructions

1. Upload the Python file to a RPi Zero 2 WH via SSH and run it using the following command: `python3 app.py`

2. Before exiting your terminal session from step one, use Screen to keep the Python file operating.

3. Allow your Raspberry Pi computer and Adafruit sensor contraption to capture data for as long as desired.

4. Once you have collected enough temperature data, export your `temperature_log.csv` file from the Raspberry Pi unit, onto your main computer.

5. Finally, visualize your data using the HTML, CSS and JavaScript files provided.

## Please Note

There are three kinds of graphs available for exploring your temperature measurements. The first visualization displays average hourly temperatures as a line graph. The second (type of) chart displays an average twenty four hour period based on all of your readings. Whereas the third variety of charts displays each day's readings from when measurements began until their ending.

In my experience, the Python file will generate between two and three megabytes of data every twenty four hours. Although your results may vary.

## Please Also Note

When attempting to load visualizations of your data, the process may take several minutes to complete. As well, you will likely consume more RAM than expected by doing so. Please take these points into consideration when launching your files.
