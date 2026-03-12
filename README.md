# MCP9808 Sensor Project

![Average hourly temperatures visualized over a period of time.](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/9a1d2e94-4799-4967-9ea5-164848e3397c.png)

Code for combining a Raspberry Pi Zero 2 WH computer with an Adafruit MCP9808 temperature sensor to measure ambient air temperatures. The files in this repo are related to [the following Hackaday.io project](https://hackaday.io/project/202152-enviropi-temp-monitor).

## Overview

The Python script communicates with the MCP9808 using the I2C interface and logs temperature readings once per second. Each reading is timestamped and appended to a CSV file, creating a dataset of environmental temperature measurements. The program runs indefinitely until manually stopped, allowing the device to act as a lightweight temperature monitoring system.

After sufficient data has been collected, the CSV file can be transferred from the Raspberry Pi to another computer for analysis and visualization. The project includes frontend files which load the temperature dataset and generate several charts to help explore patterns in the data. Because the script records a reading every second, the dataset can grow quickly which may require additional processing time and memory when generating the visualizations.

## Instructions

1. Upload the Python file to a RPi Zero 2 WH via SSH and run it using the following command: `python3 app.py`

2. Before exiting your terminal session from step one, use Screen to keep the Python file operating

3. Allow your Raspberry Pi computer and Adafruit sensor contraption to capture data for as long as desired

4. Once you have collected enough temperature data, export your `temperature_log.csv` file from the Raspberry Pi unit onto your main computer

5. Finally, visualize your data using the HTML, CSS and JavaScript files provided

## Please Note

There are three types of graphs available for exploring your temperature measurements. The first visualization displays average hourly temperatures as a line graph. The second (type of) chart displays an average twenty four hour period based on all of your readings. Whereas the third variety of charts displays each day's readings from when measurements began until their ending.

In my experience, the Python file will generate between two and three megabytes of data every twenty four hours. Although your results may vary.

## Please Also Note

When attempting to load visualizations of your data, the process may take several minutes to complete. As well, you will likely consume more RAM than expected by doing so. Please take these points into consideration when launching your HTML, CSS and JavaScript files.
