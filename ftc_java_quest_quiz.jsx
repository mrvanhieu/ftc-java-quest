import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Rocket, Trophy, RefreshCcw, CheckCircle2, XCircle, Sparkles, Code2, Timer, Lightbulb } from "lucide-react";

const questions = [
  {
    level: "Warm-up",
    topic: "Java Output",
    type: "choice",
    prompt: "The robot wants to print Hello FTC! Which line is correct?",
    code: "// Choose the correct Java output line",
    options: [
      "System.printline(\"Hello FTC!\");",
      "System.out.println(\"Hello FTC!\");",
      "print(\"Hello FTC!\");",
      "console.log(\"Hello FTC!\");"
    ],
    answer: 1,
    explanation: "Java uses System.out.println(...) to print a line to the screen."
  },
  {
    level: "Warm-up",
    topic: "Java Syntax",
    type: "choice",
    prompt: "What is the name of the method where a Java program usually starts?",
    code: "public static void main(String[] args) {\n  // robot code starts here\n}",
    options: ["start", "run", "main", "first"],
    answer: 2,
    explanation: "The main method is the common starting point of a Java application."
  },
  {
    level: "Mission 1",
    topic: "Comments",
    type: "choice",
    prompt: "Which one is a single-line comment in Java?",
    code: "// This explains what the robot code does",
    options: ["# comment", "// comment", "<!-- comment -->", "** comment"],
    answer: 1,
    explanation: "In Java, // starts a single-line comment."
  },
  {
    level: "Mission 1",
    topic: "Variables",
    type: "choice",
    prompt: "The robot scores 25 points. Which variable is written correctly?",
    code: "// Store an integer score",
    options: ["int score = 25;", "score int = 25;", "integer score = 25", "num score: 25;"],
    answer: 0,
    explanation: "Java variable format is: type name = value;"
  },
  {
    level: "Mission 2",
    topic: "Data Types",
    type: "choice",
    prompt: "Which data type is best for true/false robot sensor status?",
    code: "// Example: is the touch sensor pressed?",
    options: ["int", "double", "boolean", "char"],
    answer: 2,
    explanation: "boolean stores only true or false."
  },
  {
    level: "Mission 2",
    topic: "Data Types",
    type: "choice",
    prompt: "Which type is best for a decimal motor power like 0.75?",
    code: "// Example motor power: 0.75",
    options: ["int", "double", "boolean", "String"],
    answer: 1,
    explanation: "double stores decimal values."
  },
  {
    level: "Mission 3",
    topic: "Operators",
    type: "choice",
    prompt: "What value will total have?",
    code: "int total = 10 + 5 * 2;",
    options: ["20", "30", "25", "15"],
    answer: 0,
    explanation: "Multiplication happens before addition: 5 * 2 = 10, then 10 + 10 = 20."
  },
  {
    level: "Mission 3",
    topic: "Comparison Operators",
    type: "choice",
    prompt: "What does this comparison return?",
    code: "7 > 3",
    options: ["true", "false", "7", "error"],
    answer: 0,
    explanation: "7 is greater than 3, so the result is true."
  },
  {
    level: "Mission 4",
    topic: "Type Casting",
    type: "choice",
    prompt: "What is printed after casting?",
    code: "double distance = 9.8;\nint shortDistance = (int) distance;\nSystem.out.println(shortDistance);",
    options: ["9.8", "10", "9", "error"],
    answer: 2,
    explanation: "Casting double to int removes the decimal part."
  },
  {
    level: "Mission 4",
    topic: "Strings",
    type: "choice",
    prompt: "Which line stores the team name correctly?",
    code: "// Store a word or sentence",
    options: ["String team = \"Astrobots\";", "string team = Astrobots;", "Text team = \"Astrobots\"", "char team = \"Astrobots\";"],
    answer: 0,
    explanation: "String starts with a capital S and text must be inside double quotes."
  },
  {
    level: "Final Mission",
    topic: "String Concatenation",
    type: "choice",
    prompt: "What will this print?",
    code: "String bot = \"Robo\";\nint number = 7;\nSystem.out.println(bot + number);",
    options: ["Robo7", "Robo + 7", "14", "error"],
    answer: 0,
    explanation: "When a String is added with a number, Java joins them as text."
  },
  {
    level: "Final Mission",
    topic: "Booleans",
    type: "choice",
    prompt: "Which expression can be stored in a boolean variable?",
    code: "boolean ready = ?",
    options: ["5 + 5", "\"ready\"", "10 == 10", "3.14"],
    answer: 2,
    explanation: "10 == 10 evaluates to true, so it can be stored in a boolean."
  }
];

const badgeTitles = [
  { min: 0, title: "Java Explorer", emoji: "🧭", note: "Great start — keep exploring." },
  { min: 5, title: "Robot Code Builder", emoji: "🤖", note: "You understand many Java basics." },
  { min: 9, title: "FTC Java Pilot", emoji: "🚀", note: "Strong foundation for robot programming." },
  { min: 12, title: "Autonomous Java Champion", emoji: "🏆", note: "Excellent! Ready for harder robot code challenges." }
];

function RobotMascot({ mood }) {
  return (
    <motion.div
      className="relative mx-auto h-36 w-36"
      animate={{ y: [0, -8, 0], rotate: mood === "correct" ? [0, -5, 5, 0] : mood === "wrong" ? [0, 4, -4, 0] : 0 }}
      transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-200 via-indigo-200 to-fuchsia-200 blur-xl" />
      <div className="absolute left-5 top-6 h-24 w-26 rounded-3xl border-4 border-slate-800 bg-white shadow-xl">
        <div className="absolute -top-5 left-12 h-6 w-1 bg-slate-800" />
        <div className="absolute -top-8 left-10 h-5 w-5 rounded-full bg-amber-300 border-2 border-slate-800" />
        <div className="absolute left-5 top-7 h-5 w-5 rounded-full bg-slate-800" />
        <div className="absolute right-5 top-7 h-5 w-5 rounded-full bg-slate-800" />
        <div className="absolute left-8 top-16 h-2 w-12 rounded-full bg-slate-800" />
        <div className="absolute -left-5 top-9 h-10 w-4 rounded-full bg-slate-800" />
        <div className="absolute -right-5 top-9 h-10 w-4 rounded-full bg-slate-800" />
      </div>
      <motion.div className="absolute bottom-0 left-8 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white" animate={{ scale: mood === "correct" ? [1, 1.1, 1] : 1 }}>
        FTC BOT
      </motion.div>
    </motion.div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-emerald-200 shadow-inner">
      <code>{children}</code>
    </pre>
  );
}

export default function FTCJavaQuestQuiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const progress = finished ? 100 : Math.round((index / questions.length) * 100);
  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === q.answer;

  const badge = useMemo(() => {
    return [...badgeTitles].reverse().find((b) => score >= b.min);
  }, [score]);

  function choose(i) {
    if (isAnswered) return;
    setSelected(i);
    const correct = i === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { question: q.prompt, topic: q.topic, correct, chosen: q.options[i], answer: q.options[q.answer] }]);
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function reset() {
    setStarted(false);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 p-6 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Badge className="mb-4 bg-amber-300 text-slate-950 hover:bg-amber-300">Friendly team check • Not a judgment</Badge>
              <h1 className="text-5xl font-black leading-tight md:text-6xl">FTC Java Quest</h1>
              <p className="mt-4 max-w-2xl text-lg text-sky-100">A fun quiz adventure for new Java coders. Help the robot pass each mission by answering basics from Java syntax, output, comments, variables, data types, casting, operators, Strings, and booleans.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Card className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur">
                  <CardContent className="p-4"><Code2 className="mb-2" /> 12 questions</CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur">
                  <CardContent className="p-4"><Timer className="mb-2" /> 10–15 minutes</CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur">
                  <CardContent className="p-4"><Trophy className="mb-2" /> Badge ending</CardContent>
                </Card>
              </div>
              <Button onClick={() => setStarted(true)} className="mt-8 rounded-2xl bg-amber-300 px-8 py-6 text-lg font-black text-slate-950 shadow-lg hover:bg-amber-200">
                <Rocket className="mr-2" /> Start Mission
              </Button>
              <p className="mt-4 text-sm text-sky-200">Coach note: Let students play individually or in pairs. Celebrate explanations, not just scores.</p>
            </motion.div>
            <div className="relative">
              <RobotMascot mood="idle" />
              <motion.div className="mt-8 rounded-3xl bg-white/10 p-5 backdrop-blur" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 font-bold"><Sparkles className="text-amber-300" /> Mission Theme</div>
                <p className="mt-2 text-sky-100">Every correct answer charges the robot battery. At the end, each student gets a fun title.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 p-6 text-white">
        <div className="mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-amber-300 text-5xl shadow-xl">{badge.emoji}</div>
            <h1 className="text-5xl font-black">{badge.title}</h1>
            <p className="mt-3 text-xl text-sky-100">Score: {score} / {questions.length}</p>
            <p className="mt-2 text-sky-200">{badge.note}</p>
          </motion.div>

          <Card className="mt-8 rounded-3xl border-white/10 bg-white/95 shadow-2xl">
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-black text-slate-900">Mission Debrief</h2>
              <div className="grid gap-3">
                {answers.map((a, i) => (
                  <div key={i} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      {a.correct ? <CheckCircle2 className="mt-1 text-green-600" /> : <XCircle className="mt-1 text-red-600" />}
                      <div>
                        <div className="text-sm font-bold text-indigo-700">{a.topic}</div>
                        <div className="font-semibold text-slate-900">{a.question}</div>
                        {!a.correct && <div className="mt-1 text-sm text-slate-600">Correct answer: {a.answer}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={reset} className="rounded-2xl"><RefreshCcw className="mr-2 h-4 w-4" /> Play Again</Button>
                <Button variant="outline" className="rounded-2xl" onClick={() => window.print()}>Print Results</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-amber-300">Question {index + 1} of {questions.length}</div>
            <h1 className="text-3xl font-black">FTC Java Quest</h1>
          </div>
          <Badge className="bg-white text-slate-950 hover:bg-white">Score {score}</Badge>
        </div>
        <Progress value={progress} className="mb-6 h-3" />

        <div className="grid gap-6 md:grid-cols-[.75fr_1.25fr]">
          <Card className="rounded-3xl border-white/10 bg-white/10 text-white backdrop-blur">
            <CardContent className="p-6 text-center">
              <RobotMascot mood={isAnswered ? (isCorrect ? "correct" : "wrong") : "idle"} />
              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-left">
                <div className="flex items-center gap-2 font-black"><Bot className="text-amber-300" /> Robot Battery</div>
                <div className="mt-2 h-4 overflow-hidden rounded-full bg-slate-800">
                  <motion.div className="h-full bg-amber-300" initial={{ width: 0 }} animate={{ width: `${Math.round((score / questions.length) * 100)}%` }} />
                </div>
                <p className="mt-2 text-sm text-sky-100">Correct answers charge the robot for autonomous mode.</p>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
              <Card className="rounded-3xl border-0 bg-white shadow-2xl">
                <CardContent className="p-6 text-slate-900">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">{q.level}</Badge>
                    <Badge variant="outline">{q.topic}</Badge>
                  </div>
                  <h2 className="text-2xl font-black">{q.prompt}</h2>
                  <div className="mt-4"><CodeBlock>{q.code}</CodeBlock></div>

                  <div className="mt-5 grid gap-3">
                    {q.options.map((option, i) => {
                      const showCorrect = isAnswered && i === q.answer;
                      const showWrong = isAnswered && selected === i && i !== q.answer;
                      return (
                        <button
                          key={option}
                          onClick={() => choose(i)}
                          className={`rounded-2xl border-2 p-4 text-left font-semibold transition hover:scale-[1.01] ${
                            showCorrect ? "border-green-500 bg-green-50 text-green-900" : showWrong ? "border-red-500 bg-red-50 text-red-900" : "border-slate-200 bg-slate-50 hover:border-indigo-300"
                          }`}
                        >
                          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-sm text-white">{String.fromCharCode(65 + i)}</span>
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`mt-5 rounded-2xl p-4 ${isCorrect ? "bg-green-50" : "bg-amber-50"}`}>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="mt-1 text-amber-500" />
                        <div>
                          <div className="font-black">{isCorrect ? "Nice mission pass!" : "Good try — this is how we learn."}</div>
                          <p className="text-sm text-slate-700">{q.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <Button disabled={!isAnswered} onClick={next} className="rounded-2xl px-6">
                      {index + 1 >= questions.length ? "Finish Quest" : "Next Mission"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
