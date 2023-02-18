#!/usr/bin/env bash

uvicorn src.main:app --reload --workers 1 --host 0.0.0.0 --port 3600