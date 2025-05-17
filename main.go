// main.go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var messages = map[string]map[string]string{
	"en": {"Title": "Welcome to inne.space!", "Desc": "Visit our blog for the latest updates.", "Button": "Go to Blog", "BlogURL": "https://blog.inne.space/en"},
	"ru": {"Title": "Добро пожаловать на inne.space!", "Desc": "Посетите наш блог для последних обновлений.", "Button": "Перейти в блог", "BlogURL": "https://blog.inne.space/ru"},
	"uk": {"Title": "Ласкаво просимо на inne.space!", "Desc": "Відвідайте наш блог для останніх оновлень.", "Button": "Перейти до блогу", "BlogURL": "https://blog.inne.space/uk"},
}
var supported = []string{"en", "ru", "uk"}

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Static("/css", "public/css")
	r.StaticFile("/icons/language.svg", "public/icons/language.svg")

	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/en")
	})

	r.GET("/:lang", func(c *gin.Context) {
		lang := c.Param("lang")
		if _, ok := messages[lang]; !ok {
			lang = "en"
		}
		msg := messages[lang]
		curPath := c.Request.URL.Path
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"Title":     msg["Title"],
			"Desc":      msg["Desc"],
			"Button":    msg["Button"],
			"BlogURL":   msg["BlogURL"],
			"Lang":      lang,
			"Supported": supported,
			"CurPath":   curPath,
		})
	})

	r.Run(":3000")
}
