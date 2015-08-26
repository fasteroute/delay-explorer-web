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
            {
                "name":"17:30 Caterham",
                "route":2,
                "schedule":"7db628469132d0728b2a24b324dcf8"
            },
            {
                "name":"17:45 Brighton (East Sussex)",
                "route":0,
                "schedule":"7367a1280397eb44e2cc5ae648539"
            },
            {
                "name":"17:59 Tattenham Corner",
                "route":1,
                "schedule":"662c8d51623a306f259478761e649d"
            },
            {
                "name":"18:02 Caterham",
                "route":2,
                "schedule":"7b672582baecfa8cb599262929880a"
            }
        ],
         "data": trains
}

detail_data = {
         "stations": ["lbg", "nxg", "bcy","hpa",
         "foh", "syd", "nwd", "ecr"],
         "data": stations
}
file = open("trains.json", "w")
file.write(json.dumps(train_data, indent=4))
file.close()
file = open("stations.json", "w")
file.write(json.dumps(detail_data, indent=4))
file.close()

