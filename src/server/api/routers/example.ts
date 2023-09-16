import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import OpenAI from "openai";
import { env } from "@/env.mjs";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY
})


export const AIRouter = createTRPCRouter({

  questions: publicProcedure.input(z.object({
    text: z.string(),
    difficulty: z.string(),
    questionsnum: z.string(),
    optionsnum: z.string(),
    questiontype: z.string()
  })).mutation(async ({ input }) => {
    const prompt =
      `you are a high level teacher and are asked to create a test for your students based on a textbook and some specific criteria.
Text for material reference: ${input.text} 

Criteria: 
Number of Questions:${input.questionsnum}
Difficulty Level:${input.difficulty}
Question Type: ${input.questiontype}

Specific for Multiple Choice Questions, ignore if it is anything but this type:
Number of Options: ${input.optionsnum}
Ensure that there is only one correct answer per question.
Make sure the incorrect options are plausible and relevant to the text.
Make sure the options are labeled A, B, C, D, E, etc

Guidelines:
Ensure that the questions are clear and unambiguous.
Avoid questions that can be answered without referring to the text.
Ensure that the questions test comprehension and critical thinking, rather than rote memorization.
Once you have created the questions, please provide them along with the correct answers on the bottom of your response.
Ensure that your responses only contains the questions and the answers

description of difficulty:

1. Easy:
Focus: Questions at this level test the basic understanding and recall of the text.
Characteristics:
Directly stated in the text.
Require minimal interpretation.
Often target the main idea, key details, or basic vocabulary.
Can be answered quickly with a clear reference from the text.


2. Medium:
Focus: Questions at this level require a deeper understanding of the text and some analytical skills.
Characteristics:
May not be directly stated but can be inferred from the text.
Require making connections between different parts of the text.
Might involve understanding the author's purpose, tone, or implied messages.
Could require the reader to identify cause and effect, make predictions, or compare and contrast information.


3. Hard:
Focus: Questions at this level test critical thinking, deeper analysis, and synthesis of information from the text.
Characteristics:
Often require the reader to evaluate or analyze the text critically.
Might involve drawing conclusions, assessing the validity of an argument, or analyzing the effectiveness of a technique.
Could require the reader to relate the text to broader concepts, themes, or external knowledge.
Often open-ended with multiple plausible answers that need justification using the text.

`

    const testCompletion = await openai.chat.completions.create({
      messages: [{
        role: "user", content: prompt
      }],
      model: "gpt-3.5-turbo",
    });

    return testCompletion.choices[0]?.message.content

  }),
});

