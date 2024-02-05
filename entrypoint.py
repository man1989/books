#!/usr/bin/python3

import subprocess
import sys

# CONTAINER_NAME=postgres-db
def run(command):
    print("command: ", command)
    return_value = subprocess.run(command, shell=True, stdout=subprocess.PIPE)
    return return_value.stdout.decode()


def get_container(container_name):
    print(f"docker ps -aq --filter name={container_name}")
    containerId = run(f"docker ps -aq --filter name={container_name}")
    return containerId

def start_container(container_name, container_image, options):
    if container_id := get_container(container_name):
        isRunning = run(f"docker ps -q --filter id={container_id}")
        if not isRunning:
            print(f"Resuming Container {container_id}")
            run(f"docker start {container_id}")
    else:
        print(f"Starting container {container_image}")
        docker_command = "docker run -d "
        if env_path := options.get("env_path"):
            docker_command += f"--env-file {env_path} "
        if port := options.get("port"):
            docker_command += f"-p {port} "
        if network := options.get("network"):
            docker_command += f"--network {network} "
        if mount_paths := options.get("mount_paths"):
            for mount_path in mount_paths:
                docker_command += f"-v {mount_path} "
        docker_command += f"--name {container_name} {container_image}"
        run(docker_command)

def start_db(network, volume):
    start_container("postgres-db", "postgres", {
        "env_path": "./db/.env",
        "mount_paths": [
            f"{volume}:/var/lib/postgresql/data"
        ],        
        "port": "5433:5432",
        "network": network
    })
def start_pgadmin(network, volume):
    start_container(container_name="pgadmin", container_image="dpage/pgadmin4", options={
        "env_path": "./db/pgadmin.env",
        "mount_paths": [
            f"{volume}:/var/lib/pgadmin"
        ],
        "port": "82:80",
        "network": network
    })

def create_network(name):
    networkId = run(f"docker network ls -f name={name} -q")
    if not networkId:
        print(f"creating network {name}")
        run(f"docker network create {name}")

def create_volume(name):
    volumeId = run(f"docker volume ls -f name={name} -q")
    if not volumeId:
        print(f"creating volume {name}")
        run(f"docker volume create {name}")

def start_backend():
    run("cd server && npm run dev:server")

def destroy():
    run("docker stop $(docker ps -q)")
    run("docker rm $(docker ps -qa)")
    
def init():
    options = sys.argv[1:]
    if "--destroy" in options:
        destroy()
    else:
        create_network("bookish")
        create_volume("pgdata")
        create_volume("pgadmin")
        start_db(network="bookish", volume="pgdata")
        start_pgadmin(network="bookish", volume="pgadmin")
        start_backend()
init()

