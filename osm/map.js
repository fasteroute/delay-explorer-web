var map = new mxn.Mapstraction('map', 'openlayers');

			var UK = new mxn.BoundingBox(49.95,-12.76,58.86,2.57);
			map.setBounds(UK);
                        //var latlon = new mxn.LatLonPoint(51.4, 0);
                        //map.setCenterAndZoom(latlon, 15);
 /*                       var lbg = new mxn.LatLonPoint(51.505, -0.086);
                        var nxg = new mxn.LatLonPoint(51.4755, -0.0402);
                        var byc = new mxn.LatLonPoint(51.4645, -0.0369);
                        var hpa = new mxn.LatLonPoint(51.4501, -0.0456);
                        var foh = new mxn.LatLonPoint(51.439, -0.053);
                        var syd = new mxn.LatLonPoint(51.4254, -0.0544);
                        var nwd = new mxn.LatLonPoint(51.3972, -0.075);
                        var ecr = new mxn.LatLonPoint(51.3752, -0.0923);

                        var station_points = [lbg, nxg, byc, hpa, foh, syd, nwd, ecr]
                        for (i=0; i<station_points.length-1; ++i) {
                                var pline = new mxn.Polyline([station_points[i], station_points[i+1]]);
                                var colr = '#'+Math.random().toString(16).substr(-6);
                                pline.addData({color: colr, width: 4});
                                map.addPolyline(pline);
                                var marker = new mxn.Marker(station_points[i]);
                                marker.setShadowIcon('train20.png',48);
                                map.addMarker(marker);
                                marker.icon.url = marker.iconShadowUrl;
                                marker.setLabel("Station");
                        }
                        var marker = new mxn.Marker(station_points[i]);
                        marker.setShadowIcon('train20.png',48);
                        map.addMarker(marker);
                        marker.icon.url = marker.iconShadowUrl;
                        marker.setLabel("Station");

                        map.autoCenterAndZoom();

			*/
