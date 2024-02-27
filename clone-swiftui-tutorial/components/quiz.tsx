"use client"

import { slugify } from "@/lib/utils"
import React from "react"

export function Quiz({ quiz }: { quiz: any }) {
  const [index, setIndex] = React.useState(0)
  const question = quiz.questions[index]
  const { answers } = question
  return (
    <section
      className="max-w-3xl xl:max-w-4xl my-16 mx-auto bg-zinc-50 px-16 py-12"
      id={slugify("Check your understanding")}
    >
      <h2 className="text-3xl text-center font-semibold">{quiz.query}</h2>
      <hr className="my-12" />
      <div className="text-sm text-zinc-600">
        Question {index + 1} of {quiz.questions.length}
      </div>
      <div className="mt-6 text-lg font-semibold">{question.children}</div>
      {answers.map((answer: any, i: number) => (
        <div key={i} className="flex items-center mt-8">
          <input
            type="radio"
            name="answer"
            id={`answer-${i}`}
            className="mr-4"
          />
          <label htmlFor={`answer-${i}`}>{answer.children}</label>
        </div>
      ))}
      <div className="mt-12 flex justify-center gap-4">
        <button className="w-56 bg-blue-600 text-white rounded-2xl py-1">
          Submit
        </button>
        <button
          className="w-56 bg-blue-600 text-white rounded-2xl py-1"
          onClick={() => setIndex((index + 1) % quiz.questions.length)}
        >
          Next question
        </button>
      </div>
    </section>
  )
}
