package main

import (
	"github.com/aavtic/broler/broler"
)

func usage() string {
	return `
usage: broler [-h | --help] [<url>]`
}

func main() {
	// TODO:
	// Add independent tui support
	// args := os.Args
	//
	// if (len(args) == 1) {
	// 	fmt.Fprint(os.Stdout, usage())
	// 	os.Exit(1)
	// }
	//
	// if (args[1] == "-h" || args[1] == "--help") { fmt.Fprint(os.Stdout, usage()) }
	//
	// if (len(args) != 2) {
	// 	fmt.Fprint(os.Stderr, "Not enough arguments\n", usage())
	// 	os.Exit(1)
	// }

	broler.Run()
}
