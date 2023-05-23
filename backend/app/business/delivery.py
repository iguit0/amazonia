import heapq
from typing import Dict

import networkx as nx

from app.integration.external_data_time import fetch_external_data
from app.schemas.delivery import DeliveryCoordinatesRequest, DeliveryResponse


def build_graph(data: Dict[str, Dict[str, float]]) -> nx.MultiDiGraph:
    """Build a directed multi-graph using the provided data"""
    graph = nx.MultiDiGraph()
    for start, destinations in data.items():
        for end, time in destinations.items():
            graph.add_edge(start, end, time=float(time))
    return graph


def calculate_movement_time(
    start: str, end: str, graph: nx.MultiDiGraph
) -> float:
    "Calculates the minimum movement time between two nodes in a graph"
    if start not in graph:
        raise ValueError("Invalid start position")
    if end not in graph:
        raise ValueError("Invalid end position")

    # Initialize the heap and visited set
    heap = [(0, start)]
    visited = set()

    # Loop until the heap is empty
    while heap:
        # Pop the smallest cost point from the heap
        current_cost, current_point = heapq.heappop(heap)

        # Check if we've reached the end point
        if current_point == end:
            return current_cost

        # Add the current point to the visited set
        visited.add(current_point)

        # Loop over the neighbors of the current point
        for neighbor, cost in graph[current_point].items():
            # Skip neighbors that have already been visited
            if neighbor in visited:
                continue

            # Calculate the new cost to reach the neighbor
            new_cost = current_cost + cost[0]["time"]

            # Add the neighbor to the heap
            heapq.heappush(heap, (new_cost, neighbor))

    # If we reach here, there is no path between the start and end points
    raise ValueError("No path between start and end points")


def get_delivery_route(
    graph: nx.MultiDiGraph, start: str, pickup: str, destination: str
) -> tuple[str, float]:
    """Returns the shortest route between two points and the total time it will take"""
    # Find shortest path from start to pickup
    path_1 = nx.shortest_path(graph, start, pickup, weight="time")

    # Find shortest path from pickup to destination
    path_2 = nx.shortest_path(graph, pickup, destination, weight="time")

    # Combine the two paths into a single route
    route = list(path_1) + path_2[1:]

    # Calculate the time for each segment of the route
    total_time: float = 0
    route_times = []
    for i in range(len(route) - 1):
        start_pos = route[i]
        end_pos = route[i + 1]
        segment_time = calculate_movement_time(start_pos, end_pos, graph)
        total_time += segment_time
        route_times.append(segment_time)

    return route, total_time


def calculate_path(
    delivery_coordinates: DeliveryCoordinatesRequest,
) -> DeliveryResponse:
    """Calculate the shortest path and elapsed time"""
    external_data = fetch_external_data()
    graph = build_graph(external_data)

    origin = delivery_coordinates.origin
    pickup = delivery_coordinates.pickup
    destination = delivery_coordinates.destination

    route, time = get_delivery_route(graph, origin, pickup, destination)

    return DeliveryResponse(best_route=route, elapsed_time=time)
