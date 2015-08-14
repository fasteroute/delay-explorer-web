#!/usr/bin/env python3.4
import random
import json

num_days = 7

num_stations = 7
num_trains = 4
num_delay_items = num_days
num_tables = 2
    
stations = []
for stn in range(num_stations):
    curr_station = []
    for day_avg in range(num_delay_items):
        curr_station.append( round(random.random()*20))
    stations.append(curr_station)


trains = []
for train in range(num_trains):
    curr_train = []
    for day_avg in range(num_delay_items):
        curr_train.append( round(random.random()*20))
    trains.append(curr_train)

tables = [stations, trains]
file = open("individual.json", "w")
file.write(json.dumps(tables, indent=4))
file.close()
