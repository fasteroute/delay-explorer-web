#!/usr/bin/env python3.4
import random
import json

num_days = 7

num_stations = 8
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
data = { "days": ["","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
         "stations": ["London Bridge", "New Cross Gate", "Brockley","Honor Oak Park",
         "Forest Hill", "Sydenham", "Norwood Junction", "East Croydon"],
         "trains": ["17:30", "18:30", "19:30", "20:30"],
         "data": tables
}
file = open("individual.json", "w")
file.write(json.dumps(data, indent=4))
file.close()
