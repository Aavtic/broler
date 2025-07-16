package parsing

import "testing"

func TestHTMLParser(t *testing.T) {
	err := ParseHTML()
	if err != nil {
		t.Errorf("ParseHTML() Failed")
	}
}
