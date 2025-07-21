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

func TraverseNode(root *html.Node) {
	// queue := queue.New()
	for child := range root.Descendants() {
		for _, attr := range child.Attr {
			if slices.Contains(URL_ATTRIBUTES, attr.Key) {
				fmt.Println(child.Data, ": ", attr.Val)
			}
		}
	}
}
