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
train_data = { 
        "routes": [
            ["lbg","ecr"], 
            ["lbg","nwd","ecr"],
            ["lbg","nxg","bcy","hpa","foh","syd","nwd","ecr"]
        ],
        "stations": [
            {"name": "London Bridge", "crs": "lbg", "lat":51.505, "lon":-0.086},
            {"name": "New Cross Gate", "crs": "nxg", "lat":51.4755, "lon":-0.0402},
            {"name": "Brockley", "crs": "bcy", "lat":51.4645, "lon":-0.0369},
            {"name": "Honor Oak Park", "crs": "hpa", "lat":51.4501,
                "lon":-0.0456},
            {"name": "Forest Hill", "crs": "foh", "lat":51.439, "lon":-0.053},
            {"name": "Sydenham", "crs": "syd", "lat":51.4254, "lon":-0.0544},
            {"name": "Norwood Junction", "crs": "nwd", "lat":51.3972,
                "lon":-0.075},
            {"name": "East Croydon", "crs": "ecr", "lat":51.3752, "lon":-0.0923},
        ],
        "trains": [
            {"name":"17:30 Caterham", "route":2},
            {"name":"17:45 Brighton (East Sussex)", "route":0},
            {"name":"17:59 Tattenham Corner", "route":1}, 
            {"name":"18:02 Caterham", "route":2}
            ],
         "data": trains
}

percent = 100;
ontime = round(random.random()*percent)
percent -= ontime
fifteenmin = round(random.random()*percent)
percent -= fifteenmin
thirtymin = round(random.random()*percent)
percent -= thirtymin
cancelled = percent
day_detail_data = {
        "data": [
            {"period":"On Time", "value": ontime},
            {"period":"15m Late", "value": fifteenmin},
            {"period":"30m Late", "value": thirtymin},
            {"period":"Cancelled", "value":cancelled}
        ]
        }
detail_data = {
         "stations": ["London Bridge", "New Cross Gate", "Brockley","Honor Oak Park",
         "Forest Hill", "Sydenham", "Norwood Junction", "East Croydon"],
         "data": stations
}
file = open("trains.json", "w")
file.write(json.dumps(train_data, indent=4))
file.close()
file = open("stations.json", "w")
file.write(json.dumps(detail_data, indent=4))
file.close()
file = open("daydetail.json", "w")
file.write(json.dumps(day_detail_data, indent=4))
file.close()

