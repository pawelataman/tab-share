package services

import (
	"math/rand/v2"
	"strings"
)

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyz0123456789")

func GenerateExportCode(codeLength int) string {
	perm := rand.Perm(len(letterRunes))
	var result strings.Builder
	for i := range codeLength {
		result.WriteRune(letterRunes[perm[i]])
	}
	return result.String()
}
