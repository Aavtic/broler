package main

import (
	"os"
	"fmt"
	"github.com/aavtic/broler/broler"
)

func usage() string {
	return `
usage: broler [-h | --help] [<url>]`
}

func main() {
	args := os.Args
	if (len(args) < 2) {
		fmt.Fprint(os.Stderr, "Not enough arguments\n", usage())
		os.Exit(1)
	}

	if (args[1] == "-h" || args[1] == "--help") { fmt.Fprint(os.Stdout, "Not enough arguments\n", usage()) }

	broler.Run(args[1])
}
