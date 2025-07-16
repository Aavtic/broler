package client;

import (
	"io"
	"net/http"
)

func GetBody(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}

	body,err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}


	return string(body), nil
}
