import React, { Component, useEffect, useRef } from 'react';
import L from 'leaflet';
import './style.css';

function LeafletContainer({ markerPositionStart, markerPositionEnd }) {
  // Create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [47.6062, -122.3321],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }, []);

  // Initialize marker bounds used to zoom and center map
  let markerRefBounds = [];

  // Add start marker
  const markerStartRef = useRef(null);
  useEffect(() => {
    if (markerStartRef.current) {
      markerStartRef.current.setLatLng(markerPositionStart);
    } else {
      markerStartRef.current = L.marker(markerPositionStart).addTo(
        mapRef.current
      );
    }

    markerRefBounds.push([markerPositionStart.lat, markerPositionStart.lng]);
  }, [markerPositionStart]);

  // Add end marker
  const markerEndRef = useRef(null);
  useEffect(() => {
    if (markerEndRef.current) {
      markerEndRef.current.setLatLng(markerPositionEnd);
    } else {
      markerEndRef.current = L.marker(markerPositionEnd).addTo(mapRef.current);
    }

    markerRefBounds.push([markerPositionEnd.lat, markerPositionEnd.lng]);

    mapRef.current.fitBounds(markerRefBounds);
  }, [markerPositionEnd]);

  return <div id='map'></div>;
}

export default LeafletContainer;
