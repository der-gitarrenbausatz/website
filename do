#!/bin/bash

set -euo pipefail

script_dir="$(cd "$(dirname "${0}")"; pwd -P)"

# Use gsed on macOS if available, otherwise use sed
if [[ "$(uname)" == "Darwin" ]] && command -v gsed &>/dev/null; then
    SED="gsed"
else
    SED="sed"
fi

function info() {
    date_time="$(date +%F) $(date +%T)"
    level="INFO"
    >&2 echo -e "\033[0;34m$date_time \033[0;35m[$level] \033[0;32m$1\033[0m"
}

function debug() {
    date_time="$(date +%F) $(date +%T)"
    level="DEBUG"
    >&2 echo -e "\033[0;34m$date_time \033[0;35m[$level] \033[0;32m$1\033[0m"
}

function error() {
    date_time="$(date +%F) $(date +%T)"
    level="ERROR"
    >&2 echo -e "\033[0;34m$date_time \033[0;31m[$level] \033[0;32m$1\033[0m"
}

## serve: run website locally
function task_serve {
  npm run dev
}

function task_usage() {
	echo "Usage: $0"
	sed -n 's/^##//p' <"$0" | column -t -s ':' | sed -E $'s/^/\t/' | sort
}

cmd=${1:-}
shift || true
resolved_command=$(echo "task_${cmd}" | sed 's/-/_/g')
if [[ "$(LC_ALL=C type -t "${resolved_command}")" == "function" ]]; then
	pushd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null
	${resolved_command} "$@"
else
	task_usage && exit 1
fi
