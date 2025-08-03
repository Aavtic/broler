package parsing

import (
	"fmt"
	"golang.org/x/net/html"
	"io"
	"slices"
	"strings"
	// "golang.org/x/net/html/atom"
	// "github.com/aavtic/broler/utils/queue"
)

var URL_ATTRIBUTES = []string{
	"href",
	"src",
}

func ParseHTML(html_string string) (*html.Node, error) {
	return html.Parse(strings.NewReader(html_string))
}

func RenderHTML(node *html.Node, writer io.Writer) error {
	return html.Render(writer, node)
}

// {
// 			Root: map[string]*pb.Paths{
// 				"aavtic.dev": {
// 					IsEnd: false,
// 					Paths: map[string]*pb.Paths{
// 						"styles.css": { IsEnd: true, Paths: nil },
// 						"projects/ass_parser": {
// 							IsEnd: false,
// 							Paths: map[string]*pb.Paths{
// 								"scripts.js": { IsEnd: true, Paths: nil },
// 							},
// 						},
// 					},
// 				},
// 			},
// 		}

func TraverseNode(root *html.Node) []string {
	paths := make([]string, 0);
	for child := range root.Descendants() {
		for _, attr := range child.Attr {
			if slices.Contains(URL_ATTRIBUTES, attr.Key) {
				fmt.Println(child.Data, ": ", attr.Val)
				paths = append(paths, attr.Val)
			}
		}
	}

	return paths
}
