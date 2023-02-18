#!/bin/bash

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

# Prefix containers
prefix="battle-screen"

# Type script [production | dev]
compose_type="production"
compose_file="docker-compose.yml"

# Flags
finish_flag="false"
clear_flag="false"
detach_flag="false"

# shellcheck disable=SC2034
while getopts ':htdfc' flag; do
  case "${flag}" in
    f) finish_flag="true" ;;
    c) clear_flag="true" ;;
    t) compose_type="dev"
       compose_file="docker-compose.dev.yml" ;;
    d) detach_flag="true" ;;
    h | *) echo "Usage: $(basename \$0) [-p <string> for profile] [-i for init] [-t for test] [-d for detach container]"
       exit 1 ;;
  esac
done

echo "### Selected compose type is: ${compose_type}"

echo "### Compose DOWN ..."
docker compose -p ${prefix}-${compose_type} down
echo

echo "### Remove old containers images ..."
if [ ${compose_type} = "production" ]
then
  docker rmi ${prefix}-production-api \
             ${prefix}-production-frontend
else
  docker rmi ${prefix}-dev-api ${prefix}-dev-frontend
fi
echo

if [ ${clear_flag} = "true" ]
then
  echo "### Force clear MySQL port ..."
  # shellcheck disable=SC2046
  sudo kill $(sudo lsof -t -i:3306)
fi

if [ ${finish_flag} = "true" ]
then
  echo "### Only finish containers is successful ..."
  exit 1
fi

# Compose configuration
compose_up_args=""
if [ ${detach_flag} = "true" ]
then
  compose_up_args="-d"
fi

# https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

echo "### Compose UP ..."
docker compose -f ${compose_file} -p ${prefix}-${compose_type} up ${compose_up_args}
echo