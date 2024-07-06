#!/bin/bash

# Load environment variables from test.env
export $(grep -v '^#' test.env | xargs)

# Run tests
go test ./controllers