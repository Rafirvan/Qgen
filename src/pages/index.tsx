

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Clipboard } from "lucide-react";

import { api } from "@/utils/api";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const [textValue, setTextValue] = useState('');
  const [difficultyValue, setDifficultyValue] = useState('');
  const [languageValue, setLanguageValue] = useState('');
  const [questionsNumValue, setQuestionsNumValue] = useState("");
  const [optionsNumValue, setOptionsNumValue] = useState("");
  const [typeValue, setTypeValue] = useState("")
  const [showOptionsNum, setShowOptionsNum] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [ResponseValue, setResponseValue] = useState<string | null | undefined>("");
  const {user, isLoaded} = useUser()



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
      questiontype: typeValue,
      language:languageValue
    }

    AIcall.mutate(inputs);
  }


  const handleCopy = () => {
    navigator.clipboard.writeText((typeof ResponseValue=="string"? responseParser(ResponseValue):""))
      .then(() => {
        alert('Text copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      <Navbar />
      <main className="pt-[80px] flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {isLoaded&&<div className="container flex flex-col  gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create Questions from Text
          </h1>
        
            {user?<form className="w-[90%] h-full flex flex-col justify-center text-white" onSubmit={handleSubmit}>

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
            
            <div id="languageselect">
              <label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                Select Language
              </label>
              <select
                id="difficulty"
                value={languageValue}
                onChange={(e) => setLanguageValue(e.target.value)}
                className="ml-5 mb-5 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                required
              >
                <option value="">Select an option</option>
                {languagearr.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
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
                {aiLoading?"Please wait...":"Generate Questions"}
              </Button>

          </form> :
            <SignInButton>
            <p className="text-2xl text-white hover:underline cursor-pointer">Please Login to Continue</p>
          </SignInButton>}

          {ResponseValue &&
            <>
            <p className="text-2xl text-white ">Response:</p>
            <div className="w-full relative">
          <textarea className="text-2xl text-white  w-full  resize-none border-none"
            value={responseParser(ResponseValue)}
            disabled
            rows={50}
            >
              </textarea>
              <nav
                onClick={handleCopy}
                className=" h-10 w-10 top-2 right-2 bg-black z-10 absolute flex items-center justify-center rounded-md cursor-pointer hover:outline hover:outline-1 outline-white">
                <Clipboard className="text-white" /></nav>
            </div>
            
            </>}
        </div>}
      </main>
    </>
  );
}


interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  questions: Question[];
}


function responseParser(input: string) {
  let json
  if(input) json = JSON.parse(input) as Quiz
  let output = '';

  json?.questions.forEach((q, index) => {
    output += `Question ${index + 1}: ${q.question}\n`;

    if (q.options) q.options.forEach((option, optIndex) => {
      output += `  ${optIndex + 1}. ${option}\n`;
    });

    if (q.answer) output += `Answer: ${q.answer}\n\n`;
  });

  return output;
}


const difficultyarr = [
  "Easy",
  "Medium",
  "Hard",
]

const languagearr = [
  "English",
  "Indonesian",
]

const typearr = [
  "Multiple Choices",
  "True / False",
  "Short Answer",
  "Essay"
]

const optionarr = [3, 4, 5]
const questionnumarr = [3, 4, 5, 6, 7, 8,]