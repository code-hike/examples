"use client"

import { cn, slugify } from "@/lib/utils"
import React from "react"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { QuizData } from "@/lib/content"

export function Quiz({ quiz }: { quiz: QuizData }) {
  const [questionIndex, setQuestionIndex] = React.useState(0)
  const [answerIndex, setAnswerIndex] = React.useState<number | undefined>(
    undefined,
  )

  const [submitted, setSubmitted] = React.useState(false)

  const question = quiz.questions[questionIndex]
  const { answers } = question
  return (
    <section
      className="max-w-3xl xl:max-w-4xl my-16 mx-auto bg-zinc-50 md:px-16 px-4 py-12"
      id={slugify("Check your understanding")}
    >
      <h2 className="text-3xl text-center font-semibold">{quiz.title}</h2>
      <hr className="my-12" />
      <div className="text-sm text-zinc-600">
        Question {questionIndex + 1} of {quiz.questions.length}
      </div>
      <div className="my-6 text-lg font-semibold">{question.title}</div>
      <div className="prose mb-6">{question.children}</div>
      <form
        onSubmit={(e) => {
          setSubmitted(true)
          e.preventDefault()
        }}
      >
        <RadioGroup
          onValueChange={(value) => {
            setSubmitted(false)
            setAnswerIndex(+value)
          }}
          value={answerIndex?.toString()}
        >
          {answers.map((answer: any, i: number) => (
            <Label
              htmlFor={`answer-${i}`}
              key={i}
              data-state={
                i == answerIndex && submitted
                  ? answer.title == "correct"
                    ? "right"
                    : "wrong"
                  : ""
              }
              className={cn(
                "flex items-center bg-white border border-zinc-200 py-8 px-4 rounded-lg cursor-pointer",
                "data-[state=right]:bg-green-100/70 data-[state=right]:border-green-500",
                "data-[state=wrong]:bg-red-100/70 data-[state=wrong]:border-red-400",
              )}
            >
              <RadioGroupItem
                value={i.toString()}
                id={`answer-${i}`}
                className="mr-4"
              />
              <div className="prose">
                {answer.children}
                {submitted && i == answerIndex && (
                  <div className="text-sm">{answer.hint}</div>
                )}
              </div>
            </Label>
          ))}
        </RadioGroup>

        <div className="mt-12 flex justify-center gap-4">
          <Button
            className="w-56 bg-blue-600 text-white rounded-2xl py-1"
            type="submit"
            disabled={submitted || answerIndex === undefined}
          >
            Submit
          </Button>
          <Button
            className="w-56 bg-blue-600 text-white rounded-2xl py-1"
            onClick={() => {
              setSubmitted(false)
              setAnswerIndex(undefined)
              setQuestionIndex((questionIndex + 1) % quiz.questions.length)
            }}
            disabled={questionIndex === quiz.questions.length - 1}
          >
            Next question
          </Button>
        </div>
      </form>
    </section>
  )
}
