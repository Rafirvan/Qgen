

import { useState, useEffect } from "react";

import { api } from "@/utils/api";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [textValue, setTextValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('');
  const [questionsNumValue, setQuestionsNumValue] = useState("");
  const [optionsNumValue, setOptionsNumValue] = useState("");
  const [typeValue, setTypeValue] = useState("")
  const [showOptionsNum, setShowOptionsNum] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [ResponseValue, setResponseValue] = useState<string | null | undefined>("");



  useEffect(() => {
    (typeValue == "Multiple Choices") ? setShowOptionsNum(true) : setShowOptionsNum(false)
  }, [typeValue])


  const AIcall = api.ai.questions.useMutation({
    onSuccess: (result) => {
      setAiLoading(false)
      setResponseValue(result)
    }
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResponseValue("")
    setAiLoading(true)


    const inputs = {
      text: textValue,
      difficulty: difficultyValue,
      questionsnum: questionsNumValue,
      optionsnum: optionsNumValue,
      questiontype: typeValue
    }

    AIcall.mutate(inputs);
  }




  return (
    <>
      <Navbar />
      <main className="pt-[80px] flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col  gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create Questions from Text
          </h1>
          <div >

            <form className="w-[90%] h-full flex flex-col justify-center text-white" onSubmit={handleSubmit}>

              <div id="textinput">
                <label htmlFor="text" className="block text-sm font-medium mb-2">
                  Insert text (max 5000 chars)
                </label>
                <textarea
                  id="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="ml-5 mb-3 flex w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  rows={15}
                  maxLength={5000}
                  required
                ></textarea>
              </div>


              <div id="difficultyselect">
                <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                  Select your difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficultyValue}
                  onChange={(e) => setDifficultyValue(e.target.value)}
                  className="ml-5 mb-5 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  required
                >
                  <option value="">Select an option</option>
                  {difficultyarr.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div id="questionnumsselect">
                <label htmlFor="questionnums" className="block text-sm font-medium mb-2 text-white">
                  Select how many questions you want to generate
                </label>
                <select
                  id="questionnums"
                  value={questionsNumValue}
                  onChange={(e) => setQuestionsNumValue(e.target.value)}
                  className="ml-5 mb-5 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  required
                >
                  <option value="">Select an option</option>
                  {questionnumarr.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div id="typeselect">
                <label htmlFor="type" className="block text-sm font-medium mb-2">
                  Select question type
                </label>
                <select
                  id="type"
                  value={typeValue}
                  onChange={(e) => setTypeValue(e.target.value)}
                  className="ml-5 mb-5 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  required
                >
                  <option value="">Select an option</option>
                  {typearr.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {showOptionsNum && <div id="optionselect">
                <label htmlFor="option" className="block text-sm font-medium mb-2">
                  Select how many options you want for each question
                </label>
                <select
                  id="option"
                  value={optionsNumValue}
                  onChange={(e) => setOptionsNumValue(e.target.value)}
                  className="ml-5 mb-5 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                  required
                >
                  <option value="">Select an option</option>
                  {optionarr.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>}

              <Button
                type="submit"
                className="bg-blue-700 mb-10 disabled:bg-gray-600 w-[105%]"
                disabled={aiLoading}
              >
                Generate Questions
              </Button>

            </form>


          </div>
          <p className="text-2xl text-white">
            {ResponseValue}
          </p>
        </div>
      </main>
    </>
  );
}


const difficultyarr = [
  "Easy",
  "Medium",
  "Hard",
]

const typearr = [
  "Multiple Choices",
  "True / False",
  "Short Answer",
  "Long Answer"
]

const optionarr = [3, 4, 5]
const questionnumarr = [3, 4, 5, 6, 7, 8,]