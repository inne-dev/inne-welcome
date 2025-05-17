FROM golang:1.24-alpine

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o welcome main.go

EXPOSE 80

CMD ["./welcome"]
