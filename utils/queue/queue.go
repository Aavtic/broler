package queue

import "fmt"

type Queue struct {
	values []any
}

func New() *Queue {
	var q *Queue = &Queue {
		values: make([]any, 0, 1),
	}
	return q
}

func (q *Queue) Enqueue(v any) {
	q.values = append(q.values, v)
}

func (q *Queue) Print() {
	for _, v := range q.values {
		fmt.Print(v, " ")
	}
	fmt.Println()
}

func (q *Queue) Dequeue() any {
	if len(q.values) == 0 {
		return nil
	}
	val := q.values[0]
	q.values = q.values[1:]
	return val
}

func (q *Queue) Peek() any {
	if len(q.values) == 0 {
		return nil
	}
	val := q.values[0]
	return val
}
