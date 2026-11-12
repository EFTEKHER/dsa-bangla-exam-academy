'use strict';
/* Chapters 1–6. P = line-by-line pairs [English, Bangla]. */

CH.push({ id: 'basics', tier: 1, t: [`Data Structure: the foundation`, `ডাটা স্ট্রাকচার: ভিত্তি`], s: [`Definition, types, the six operations`, `সংজ্ঞা, প্রকারভেদ, ছয়টি অপারেশন`], b: [
P([`A <b>data structure</b> is a way of storing and organizing data in a computer so that it can be used efficiently.`, `<b>ডাটা স্ট্রাকচার</b> হলো কম্পিউটারে ডাটা গুছিয়ে রাখার একটা পদ্ধতি, যাতে পরে সেই ডাটা দ্রুত ও সহজে ব্যবহার করা যায়।`],
  [`Think of a kitchen. Plates sit in a pile, spices sit in labelled jars. Same kitchen, different arrangements for different jobs.`, `রান্নাঘরের কথা ভাবুন। থালা থাকে একটার ওপর একটা, মসলা থাকে নাম লেখা বয়ামে। একই রান্নাঘর, কিন্তু কাজ অনুযায়ী সাজানোর ধরন আলাদা।`],
  [`The arrangement decides the speed. A good arrangement makes searching, adding and removing fast.`, `সাজানোর ধরনই গতি ঠিক করে। ভালোভাবে সাজালে খোঁজা, যোগ করা আর মুছে ফেলা দ্রুত হয়।`],
  [`Data structure answers "how do I keep the data?" Algorithm answers "what steps do I run on it?"`, `Data structure বলে "ডাটা কীভাবে রাখব?" আর algorithm বলে "সেই ডাটার ওপর কোন কোন ধাপে কাজ করব?"`]),
X('trick', `Three advantages = <b>E-R-A</b>: Efficiency (faster programs), Reusability (write once, use many times), Abstraction (use it without knowing the inside).`, `তিনটি সুবিধা = <b>E-R-A</b>: Efficiency (program দ্রুত চলে), Reusability (একবার লিখে বারবার ব্যবহার), Abstraction (ভেতরের খুঁটিনাটি না জেনেও ব্যবহার করা যায়)।`),
H(`Types of data structure`, `ডাটা স্ট্রাকচারের প্রকারভেদ`),
V('classify', `The master diagram`, `মূল চিত্র`),
P([`<b>Primitive</b> types are built into the language: int, float, char, boolean. They hold one value.`, `<b>Primitive</b> টাইপ ভাষার ভেতরেই দেওয়া থাকে: int, float, char, boolean। এরা একটা করে মান রাখে।`],
  [`<b>Non-primitive</b> types are built from primitives and hold many values. They split into linear and non-linear.`, `<b>Non-primitive</b> টাইপ primitive দিয়ে তৈরি এবং অনেক মান একসাথে রাখে। এরা দুই ভাগ: linear ও non-linear।`],
  [`<b>Linear</b>: elements stand in one line, each has one previous and one next. Array, Linked List, Stack, Queue.`, `<b>Linear</b>: element-গুলো এক সারিতে দাঁড়ায়, প্রত্যেকের একটা আগের ও একটা পরের element থাকে। Array, Linked List, Stack, Queue।`],
  [`<b>Non-linear</b>: one element can connect to many others, in levels or as a network. Tree, Graph.`, `<b>Non-linear</b>: একটা element অনেকগুলোর সাথে যুক্ত থাকতে পারে, স্তরে স্তরে বা জালের মতো। Tree, Graph।`]),
T([`Point`, `Linear`, `Non-linear`], [[`Arrangement`, `Sequential, one after another`, `Hierarchical or networked`], [`Levels`, `Single level`, `Multiple levels`], [`Traversal`, `All elements in one run`, `Not possible in one run`], [`Implementation`, `Easy`, `Complex`], [`Memory use`, `Less efficient`, `More efficient`], [`Examples`, `Array, Stack, Queue, Linked List`, `Tree, Graph`]]),
H(`The six operations`, `ছয়টি অপারেশন`),
P([`<b>Traversing</b>: visit every element once. <b>Insertion</b>: add a new element. <b>Deletion</b>: remove an element.`, `<b>Traversing</b>: প্রতিটি element একবার করে দেখা। <b>Insertion</b>: নতুন element যোগ করা। <b>Deletion</b>: element মুছে ফেলা।`],
  [`<b>Searching</b>: find where an element is. <b>Sorting</b>: arrange in order. <b>Merging</b>: join two sorted lists into one.`, `<b>Searching</b>: element কোথায় আছে খুঁজে বের করা। <b>Sorting</b>: ক্রম অনুযায়ী সাজানো। <b>Merging</b>: দুটো sorted list জুড়ে একটা বানানো।`]),
X('trick', `Six operations = T-I-D-S-S-M: "<b>T</b>en <b>I</b>ndians <b>D</b>rank <b>S</b>weet <b>S</b>our <b>M</b>ilk."`, `ছয় অপারেশন = T-I-D-S-S-M। বাক্যটা মুখস্থ রাখুন: "Ten Indians Drank Sweet Sour Milk."`),
X('trap', `<b>Overflow</b> = inserting into a structure that is already full. <b>Underflow</b> = deleting from a structure that is empty. Students swap these two all the time.`, `<b>Overflow</b> = ভর্তি structure-এ আরও ঢোকাতে যাওয়া। <b>Underflow</b> = খালি structure থেকে মুছতে যাওয়া। এই দুটো অনেকে উল্টে লেখে।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`What is a data structure? Explain linear and non-linear data structures with examples.`, `17th NTRCA (ICT) 2023`, `A data structure is a group of data elements that provides an efficient way of storing and organizing data in a computer so it can be used efficiently. <b>Linear</b>: elements are arranged sequentially, each attached to its previous and next element; single level; can be traversed in one run. Examples: Array, Stack, Queue, Linked List. <b>Non-linear</b>: elements are attached hierarchically; multiple levels; cannot be traversed in one run. Examples: Tree, Graph. Draw the classification diagram.`, `সংজ্ঞা এক বাক্যে, তারপর linear ও non-linear-এর দুই লাইন করে ব্যাখ্যা আর উদাহরণ। সাথে শ্রেণিবিভাগের চিত্র আঁকলে পুরো নম্বর।`),
Q(`Difference between linear and non-linear data structure.`, `PSB ADA 2018`, `Give the six-row table: arrangement, levels, traversal, implementation, memory utilisation, examples (see the table above).`, `উপরের ছয় সারির টেবিলটাই উত্তর। পার্থক্যের প্রশ্নে সবসময় টেবিল আঁকুন।`),
Q(`What are the operations performed on a data structure?`, `Common`, `Six operations: Traversing, Insertion, Deletion, Searching, Sorting, Merging. Add that inserting into a full structure causes overflow and deleting from an empty one causes underflow.`, `ছয়টি নাম এক লাইন করে সংজ্ঞাসহ লিখুন, শেষে overflow ও underflow উল্লেখ করুন।`),
Q(`Discuss the different types of relations in DBMS.`, `Combined Bank AP 2024`, `A relation is a table. Relationship types: <b>One-to-One</b> (employee and passport), <b>One-to-Many</b> (one branch, many accounts; the most common), <b>Many-to-Many</b> (students and courses; needs a junction table). A self (unary) relationship relates a table to itself (employee and manager).`, `এটা DBMS-এর প্রশ্ন, তবে এই অধ্যায়ের সাথে আসে। তিন ধরনের সম্পর্ক উদাহরণসহ লিখুন।`)],
z: [Z([`Which one is a non-linear data structure?`, `কোনটি non-linear data structure?`], [`Stack`, `Queue`, `Tree`, `Array`], 2, [`Tree and Graph are non-linear: data is arranged in levels, not in one line.`, `Tree ও Graph non-linear: ডাটা এক সারিতে নয়, স্তরে স্তরে থাকে।`]),
  Z([`Trying to delete from an empty stack causes:`, `খালি stack থেকে delete করতে গেলে হয়:`], [`Overflow`, `Underflow`, `Garbage collection`, `Traversal`], 1, [`Empty + delete = underflow. Full + insert = overflow.`, `খালি + delete = underflow। ভর্তি + insert = overflow।`]),
  Z([`Combining two sorted lists into one sorted list is called:`, `দুটি sorted list মিলিয়ে একটি sorted list বানানোকে বলে:`], [`Sorting`, `Searching`, `Merging`, `Traversing`], 2, [`Merging joins two sorted lists.`, `Merging মানে দুটো sorted list জোড়া লাগানো।`]),
  Z([`Which is a primitive data type?`, `কোনটি primitive data type?`], [`Array`, `Linked list`, `Integer`, `Graph`], 2, [`int, float, char and boolean are primitive.`, `int, float, char, boolean হলো primitive।`])] });

CH.push({ id: 'bigo', tier: 1, t: [`Algorithm, complexity and Big-O`, `Algorithm, complexity ও Big-O`], s: [`Best, average, worst case; O, Ω, Θ; time and space`, `Best, average, worst case; O, Ω, Θ; time ও space`], b: [
P([`An <b>algorithm</b> is a finite sequence of clear, logical steps that solves a problem and then stops.`, `<b>Algorithm</b> হলো সীমিত সংখ্যক স্পষ্ট, যৌক্তিক ধাপের একটা ক্রম, যা একটা সমস্যার সমাধান করে এবং তারপর থেমে যায়।`],
  [`A recipe is an algorithm: fixed ingredients (input), numbered steps, a finished dish (output), and it ends.`, `রান্নার recipe-ও একটা algorithm: নির্দিষ্ট উপকরণ (input), ধাপে ধাপে কাজ, তৈরি খাবার (output), এবং একসময় শেষ হয়।`],
  [`Five properties: Input, Output, Definiteness (each step is clear), Finiteness (it ends), Effectiveness (each step is doable).`, `পাঁচটি বৈশিষ্ট্য: Input, Output, Definiteness (প্রতিটি ধাপ স্পষ্ট), Finiteness (শেষ হবে), Effectiveness (প্রতিটি ধাপ করা সম্ভব)।`],
  [`An algorithm can be written in three ways: flowchart, pseudocode, or a programming language.`, `Algorithm তিনভাবে প্রকাশ করা যায়: flowchart, pseudocode, অথবা programming language।`]),
H(`Why complexity?`, `Complexity কেন দরকার?`),
P([`Two programs can both be correct, yet one takes a second and the other takes a year. Complexity tells us which is which before we run them.`, `দুটো program-ই সঠিক হতে পারে, অথচ একটা লাগায় এক সেকেন্ড, অন্যটা এক বছর। Complexity চালানোর আগেই বলে দেয় কোনটা কেমন।`],
  [`<b>Time complexity</b>: how the number of steps grows as the input size n grows.`, `<b>Time complexity</b>: input-এর আকার n বাড়লে ধাপের সংখ্যা কীভাবে বাড়ে।`],
  [`<b>Space complexity</b>: how much memory it needs. S(P) = C + S<sub>P</sub>(I): a fixed part plus a part that depends on the input.`, `<b>Space complexity</b>: কতটা memory লাগে। S(P) = C + S<sub>P</sub>(I): একটা স্থির অংশ আর একটা input-নির্ভর অংশ।`],
  [`We do not count seconds. We count key operations, such as comparisons in a sort, because seconds depend on the machine.`, `আমরা সেকেন্ড গুনি না। মূল অপারেশন গুনি, যেমন sorting-এ তুলনার সংখ্যা। কারণ সেকেন্ড নির্ভর করে machine-এর ওপর।`]),
V('bigo', `Move the slider and watch the gap open`, `Slider সরান, পার্থক্যটা নিজেই দেখুন`),
H(`Best, average, worst and the three symbols`, `Best, average, worst এবং তিনটি চিহ্ন`),
P([`Searching for a name in an unsorted list: <b>best case</b> it is first (1 step), <b>worst case</b> it is last or absent (n steps), <b>average</b> about n/2.`, `অগোছালো list-এ একটা নাম খোঁজা: <b>best case</b>-এ সে প্রথমেই (১ ধাপ), <b>worst case</b>-এ সে শেষে বা নেই (n ধাপ), <b>average</b>-এ প্রায় n/2।`],
  [`<b>Big-O (O)</b> is the upper bound. It says "never slower than this". We use it for the worst case.`, `<b>Big-O (O)</b> হলো ঊর্ধ্বসীমা। এর মানে "এর চেয়ে ধীর কখনও হবে না"। Worst case বোঝাতে এটা ব্যবহার হয়।`],
  [`<b>Omega (Ω)</b> is the lower bound. It says "never faster than this". Best case.`, `<b>Omega (Ω)</b> হলো নিম্নসীমা। এর মানে "এর চেয়ে দ্রুত কখনও হবে না"। Best case।`],
  [`<b>Theta (Θ)</b> is a tight bound: upper and lower are the same order.`, `<b>Theta (Θ)</b> হলো আঁটসাঁট সীমা: ঊর্ধ্ব ও নিম্নসীমা একই মাত্রার।`],
  [`When simplifying, drop constants and smaller terms: 3n² + 5n + 9 becomes O(n²).`, `সরল করার সময় ধ্রুবক ও ছোট পদ বাদ দিন: 3n² + 5n + 9 হয়ে যায় O(n²)।`]),
X('trick', `O = "Over" (upper bound, worst). Ω = a horseshoe sitting on the floor (lower bound, best). Θ = "Tight" (both).`, `O = "Over" (উপরের সীমা, worst)। Ω = মেঝেতে বসা ঘোড়ার নাল (নিচের সীমা, best)। Θ = "Tight" (দুটোই)।`),
T([`Order`, `Name`, `Example`], [[`O(1)`, `Constant`, `Read A[i], push, pop`], [`O(log n)`, `Logarithmic`, `Binary search`], [`O(n)`, `Linear`, `Linear search, traversal`], [`O(n log n)`, `Linearithmic`, `Merge sort, heap sort`], [`O(n²)`, `Quadratic`, `Bubble, selection, insertion sort`], [`O(2ⁿ)`, `Exponential`, `Tower of Hanoi, naive Fibonacci`]]),
X('simple', `Fast to slow: 1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; 2ⁿ &lt; n!`, `দ্রুত থেকে ধীর: 1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; 2ⁿ &lt; n!`),
H(`Deriving T(n) = 2T(n/2) + n`, `T(n) = 2T(n/2) + n কীভাবে আসে`),
P([`Merge sort does three things. <b>Divide</b> the array into two halves: constant time.`, `Merge sort তিনটা কাজ করে। <b>Divide</b>: array-কে দুই ভাগ করা, এতে ধ্রুব সময় লাগে।`],
  [`<b>Conquer</b>: sort each half. Each half has n/2 elements, and there are two of them: 2T(n/2).`, `<b>Conquer</b>: প্রতিটি অর্ধেক sort করা। প্রতি অর্ধেকে n/2টি element, আর অর্ধেক দুটো: 2T(n/2)।`],
  [`<b>Combine</b>: merge the two sorted halves, touching every element once: n.`, `<b>Combine</b>: দুই sorted অর্ধেক জোড়া লাগানো, প্রতিটি element একবার ছুঁতে হয়: n।`],
  [`Expand it: T(n) = 2<sup>i</sup>T(n/2<sup>i</sup>) + i·n. It stops when n/2<sup>i</sup> = 1, so i = log₂n. Result: n + n log₂n = <b>O(n log n)</b>.`, `বিস্তার করলে: T(n) = 2<sup>i</sup>T(n/2<sup>i</sup>) + i·n। n/2<sup>i</sup> = 1 হলে থামে, অর্থাৎ i = log₂n। ফল: n + n log₂n = <b>O(n log n)</b>।`]),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Define time complexity. Why is the worst-case complexity of Quicksort O(n²)?`, `45th BCS CSE 2024`, `Time complexity is the amount of time an algorithm needs to run to completion, expressed as a function T(n) of the input size. Quicksort's worst case happens when the pivot is always the smallest or largest element, which occurs when the array is already sorted. Each partition then removes only one element, giving n levels of recursion with O(n) work each: O(n²).`, `Pivot যদি প্রতিবার সবচেয়ে ছোট বা বড় element হয় (array আগে থেকে sorted থাকলে), ভাগ হয় n−1 আর 0-তে। তখন n স্তর × n কাজ = n²।`),
Q(`Describe the algorithm complexity factors.`, `Combined Bank Officer (IT) 2020`, `<b>Time factor</b>: measured by counting the number of key operations, such as comparisons in a sorting algorithm. <b>Space factor</b>: measured by counting the maximum memory the algorithm needs. S(P) = C + S<sub>P</sub>(I), a fixed part (code, constants, simple variables) plus a variable part (dynamic memory, recursion stack).`, `দুটো factor: time (মূল অপারেশনের সংখ্যা) আর space (সর্বোচ্চ memory)। Space-এর সূত্রটা লিখে দিন।`),
Q(`Explain Big-O, Omega and Theta notation.`, `Common`, `Big-O is the formal way to express the upper bound of running time; it measures the worst case. Omega expresses the lower bound; it measures the best case. Theta expresses both bounds at once (a tight bound). Draw the three small graphs of f(n) against c·g(n).`, `তিনটা সংজ্ঞার সাথে তিনটা ছোট graph আঁকুন: f(n) রেখা c·g(n)-এর নিচে (O), উপরে (Ω), দুইয়ের মাঝে (Θ)।`),
Q(`The complexity of merge sort is T(n) = 2T(n/2) + n. Explain how it is derived.`, `BPSC AP 2023, BBL AD 2017`, `Divide: split into two halves (constant). Conquer: sort each half recursively, 2T(n/2). Combine: merging touches every element once, n. So T(n) = 2T(n/2) + n. By substitution T(n) = 2<sup>i</sup>T(n/2<sup>i</sup>) + i·n; with n/2<sup>i</sup> = 1, i = log₂n, giving T(n) = n + n log₂n = O(n log n).`, `Divide, Conquer, Combine তিন ধাপের খরচ আলাদা করে লিখুন, তারপর substitution করে O(n log n) দেখান।`),
Q(`What is an algorithm? How many ways can it be represented?`, `BPSC AP 2021`, `An algorithm is an ordered set of a finite number of unambiguous logical steps that produces a result and terminates in finite time. It can be represented in three ways: flowchart, pseudocode, and programming language.`, `সংজ্ঞা + তিনটি উপায়। সংজ্ঞায় "finite" আর "unambiguous" শব্দ দুটো রাখুন।`)],
z: [Z([`Big-O notation describes the:`, `Big-O notation বোঝায়:`], [`Lower bound`, `Upper bound`, `Exact time in seconds`, `Memory address`], 1, [`Big-O is the upper bound, used for the worst case.`, `Big-O ঊর্ধ্বসীমা, worst case-এর জন্য।`]),
  Z([`3n² + 100n + 7 simplifies to:`, `3n² + 100n + 7 সরল করলে হয়:`], [`O(n)`, `O(n²)`, `O(100n)`, `O(1)`], 1, [`Keep only the fastest-growing term and drop its constant.`, `সবচেয়ে দ্রুত বাড়া পদটা রাখুন, ধ্রুবক বাদ দিন।`]),
  Z([`Which grows fastest?`, `কোনটি সবচেয়ে দ্রুত বাড়ে?`], [`O(n log n)`, `O(n²)`, `O(2ⁿ)`, `O(log n)`], 2, [`Exponential beats every polynomial.`, `Exponential যেকোনো polynomial-কে ছাড়িয়ে যায়।`]),
  Z([`The step-by-step instruction that solves a problem is called:`, `কোনো সমস্যা সমাধানের ধাপে ধাপে নির্দেশনাকে বলে:`], [`A compiler`, `An algorithm`, `A data type`, `A pointer`], 1, [`Asked in IREB 2019.`, `IREB 2019-এ এসেছিল।`])] });

CH.push({ id: 'array', tier: 3, t: [`Structure, array and pointer`, `Structure, array ও pointer`], s: [`Why arrays exist, address formula, pointer basics`, `Array কেন, address-এর সূত্র, pointer-এর মূল কথা`], b: [
P([`An <b>array</b> is a collection of items of the <b>same type</b>, stored in <b>consecutive</b> memory cells under one name.`, `<b>Array</b> হলো <b>একই টাইপের</b> অনেকগুলো item, যা memory-তে <b>পাশাপাশি</b> ঘরে একটাই নামে রাখা হয়।`],
  [`Picture a row of numbered lockers. You can walk straight to locker 5 without opening lockers 0 to 4.`, `নম্বর দেওয়া এক সারি locker-এর কথা ভাবুন। 0 থেকে 4 নম্বর না খুলেই সোজা 5 নম্বর locker-এ যাওয়া যায়।`],
  [`That direct jump is called <b>random access</b> and it costs O(1).`, `এই সরাসরি যাওয়াকে বলে <b>random access</b>, খরচ O(1)।`],
  [`Address of A[i] = Base address + i × size of one element.`, `A[i]-এর ঠিকানা = Base address + i × একটা element-এর size।`],
  [`Example: base = 1000, each int = 4 bytes. A[3] is at 1000 + 3 × 4 = 1012.`, `উদাহরণ: base = 1000, প্রতিটি int = 4 byte। A[3] আছে 1000 + 3 × 4 = 1012 ঠিকানায়।`],
  [`2D array, row-major: address of A[i][j] = Base + (i × columns + j) × size.`, `2D array, row-major: A[i][j]-এর ঠিকানা = Base + (i × column সংখ্যা + j) × size।`]),
V('array', `Insert or delete in the middle and count the shifts`, `মাঝখানে insert বা delete করে দেখুন কতগুলো ঘর সরে`),
X('trap', `Reading A[i] is O(1), but inserting or deleting in the middle is O(n) because the other elements must shift. Also, an array's size is fixed when it is created.`, `A[i] পড়া O(1), কিন্তু মাঝখানে insert বা delete O(n), কারণ বাকি element সরাতে হয়। আর array-র size তৈরির সময়ই ঠিক হয়ে যায়।`),
H(`Structure`, `Structure`),
P([`An array holds many values of one type. A <b>structure</b> (struct) groups values of <b>different</b> types under one name.`, `Array একই টাইপের অনেক মান রাখে। <b>Structure</b> (struct) <b>ভিন্ন ভিন্ন</b> টাইপের মান একটা নামের নিচে একসাথে রাখে।`],
  [`A student record needs a name (text), a roll (integer) and a CGPA (decimal). That is a structure.`, `একজন ছাত্রের তথ্যে লাগে নাম (text), রোল (integer) আর CGPA (দশমিক)। এটাই structure।`],
  [`Linked lists, trees and graphs are all built from structures, because a node must hold data and a pointer together.`, `Linked list, tree, graph সবই structure দিয়ে তৈরি, কারণ একটা node-এ data আর pointer একসাথে রাখতে হয়।`]),
C(`
# Python has no struct keyword; a class does the same job
class Student:
    def __init__(self, name, roll, cgpa):
        self.name = name      # text
        self.roll = roll      # integer
        self.cgpa = cgpa      # decimal

s = Student("Rahim", 17, 3.75)
print(s.name, s.roll, s.cgpa)

marks = [70, 85, 90]          # an array (list)
print(marks[1])               # 85  -> direct access, O(1)
`),
H(`Pointer`, `Pointer`),
P([`A <b>pointer</b> is a variable that stores the <b>memory address</b> of another variable.`, `<b>Pointer</b> এমন একটা variable যা অন্য একটা variable-এর <b>memory address</b> জমা রাখে।`],
  [`A normal variable is a house. A pointer is a slip of paper with that house's address written on it.`, `সাধারণ variable হলো একটা বাড়ি। Pointer হলো একটা চিরকুট, যাতে সেই বাড়ির ঠিকানা লেখা।`],
  [`In C: <code>int *p = &amp;x;</code> Here <code>&amp;x</code> means "address of x" and <code>*p</code> means "the value at that address".`, `C-তে: <code>int *p = &amp;x;</code> এখানে <code>&amp;x</code> মানে "x-এর ঠিকানা", আর <code>*p</code> মানে "ওই ঠিকানায় রাখা মান"।`],
  [`<b>Pointer arithmetic</b>: only ++, --, + and - are allowed. p + 1 jumps by one whole element, not one byte.`, `<b>Pointer arithmetic</b>: শুধু ++, --, + আর - চলে। p + 1 করলে এক byte নয়, পুরো একটা element পরিমাণ এগোয়।`],
  [`<b>Array of pointers</b>: an array whose cells hold addresses. <b>Pointer to pointer</b> (<code>**pp</code>): a pointer that stores another pointer's address.`, `<b>Array of pointers</b>: এমন array যার ঘরে ঘরে address থাকে। <b>Pointer to pointer</b> (<code>**pp</code>): এমন pointer যা আরেকটা pointer-এর address রাখে।`]),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Write the advantages of using a structure.`, `Common`, `A structure can hold variables of different data types; it lets us create objects with several attributes; it is used to implement linked lists, stacks, queues, trees and graphs; and the same layout can be reused across the program.`, `চারটা point: ভিন্ন টাইপ একসাথে, attribute-সহ object, অন্য data structure বানানোর ভিত্তি, পুনর্ব্যবহার।`),
Q(`Explain pointer arithmetic, array of pointers and pointer to pointer.`, `Common`, `<b>Pointer arithmetic</b>: four operators can be used on pointers: ++, --, + and -; each step moves by the size of the pointed type. <b>Array of pointers</b>: an array whose elements are pointers. <b>Pointer to pointer</b>: a pointer whose value is the address of another pointer; **c dereferences twice. Passing a pointer to a function (call by reference) lets the function change the caller's variable.`, `প্রতিটির জন্য এক লাইন সংজ্ঞা আর এক লাইন C উদাহরণ লিখুন।`),
Q(`Why do we use arrays? Write advantages and disadvantages.`, `Common`, `<b>Advantages</b>: many values under one name; O(1) random access by index; easy traversal with a loop; good cache performance. <b>Disadvantages</b>: fixed size; insertion and deletion are costly (shifting); memory is wasted if the array is not full; all elements must be of the same type.`, `সুবিধা: সরাসরি access। অসুবিধা: size স্থির আর মাঝখানে insert/delete ধীর।`)],
z: [Z([`Base address 2000, each element 4 bytes. Address of A[5]?`, `Base address 2000, প্রতিটি element 4 byte। A[5]-এর ঠিকানা?`], [`2005`, `2016`, `2020`, `2024`], 2, [`2000 + 5 × 4 = 2020.`, `2000 + 5 × 4 = 2020।`]),
  Z([`Accessing the i-th element of an array takes:`, `Array-র i-তম element পেতে সময় লাগে:`], [`O(1)`, `O(log n)`, `O(n)`, `O(n²)`], 0, [`Random access: the address is computed directly.`, `Random access: ঠিকানা সরাসরি হিসাব করা যায়।`]),
  Z([`A pointer stores:`, `Pointer জমা রাখে:`], [`A value`, `A memory address`, `A function`, `A data type`], 1, [`A pointer holds the address of another variable.`, `Pointer অন্য variable-এর address রাখে।`]),
  Z([`Which can hold values of different data types together?`, `কোনটি ভিন্ন ভিন্ন টাইপের মান একসাথে রাখতে পারে?`], [`Array`, `Structure`, `Pointer`, `Integer`], 1, [`A structure groups different types.`, `Structure ভিন্ন টাইপ একসাথে রাখে।`])] });

CH.push({ id: 'linked', tier: 2, t: [`Linked list`, `Linked list`], s: [`Singly, doubly, circular; insert, delete; array vs linked list`, `Singly, doubly, circular; insert, delete; array বনাম linked list`], b: [
P([`A <b>linked list</b> is a chain of <b>nodes</b>. Each node holds two things: the <b>data</b> and a pointer to the <b>next</b> node.`, `<b>Linked list</b> হলো <b>node</b>-এর একটা শিকল। প্রতিটি node-এ দুটো জিনিস থাকে: <b>data</b> আর <b>পরের</b> node-এর pointer।`],
  [`Think of a treasure hunt: each clue tells you where the next clue is. You cannot jump to clue 5 directly.`, `গুপ্তধন খোঁজার খেলার মতো: প্রতিটি সূত্র বলে দেয় পরের সূত্র কোথায়। সরাসরি ৫ নম্বর সূত্রে যাওয়া যায় না।`],
  [`A variable called <b>HEAD</b> stores the address of the first node. The last node's next is <b>NULL</b>.`, `<b>HEAD</b> নামের variable প্রথম node-এর ঠিকানা রাখে। শেষ node-এর next হলো <b>NULL</b>।`],
  [`Nodes can live anywhere in memory. They do not need to be side by side like array cells.`, `Node-গুলো memory-র যেকোনো জায়গায় থাকতে পারে। Array-র ঘরের মতো পাশাপাশি থাকতে হয় না।`],
  [`So the list can grow and shrink while the program runs. That is why it is called a <b>dynamic</b> data structure.`, `তাই program চলার সময়ই list বড়-ছোট হতে পারে। এজন্য একে <b>dynamic</b> data structure বলে।`]),
V('linked', `Add, delete and search. Switch the type to see the pointers change.`, `Node যোগ করুন, মুছুন, খুঁজুন। Type বদলে pointer-এর পরিবর্তন দেখুন।`),
H(`The four types`, `চার প্রকার`),
P([`<b>Singly</b>: node = data + next. One direction only. Last node points to NULL.`, `<b>Singly</b>: node = data + next। শুধু এক দিকে চলা যায়। শেষ node NULL দেখায়।`],
  [`<b>Doubly</b>: node = prev + data + next. You can move forward and backward, at the cost of one extra pointer per node.`, `<b>Doubly</b>: node = prev + data + next। সামনে-পেছনে দুই দিকেই চলা যায়, তবে প্রতি node-এ একটা বাড়তি pointer লাগে।`],
  [`<b>Circular singly</b>: the last node points back to the first. No NULL anywhere.`, `<b>Circular singly</b>: শেষ node আবার প্রথম node-কে দেখায়। কোথাও NULL নেই।`],
  [`<b>Circular doubly</b>: last.next = first and first.prev = last. A ring in both directions.`, `<b>Circular doubly</b>: last.next = first এবং first.prev = last। দুই দিকেই একটা চক্র।`]),
H(`Insert at the beginning`, `শুরুতে insert`),
A(`INSERT AT BEGINNING`, [`IF AVAIL = NULL, write OVERFLOW and go to Step 7`, `SET NEW_NODE = AVAIL`, `SET AVAIL = AVAIL → NEXT`, `SET NEW_NODE → DATA = VAL`, `SET NEW_NODE → NEXT = HEAD`, `SET HEAD = NEW_NODE`, `EXIT`], `AVAIL হলো ফাঁকা node-এর তালিকা। Step 5 আর 6-এর ক্রম খুব জরুরি: আগে নতুন node-কে পুরনো প্রথম node-এর সাথে জুড়ুন, তারপর HEAD সরান।`),
X('trap', `If you move HEAD first (Step 6 before Step 5), the address of the old list is lost forever. Always link the new node first, then move HEAD.`, `আগে HEAD সরিয়ে ফেললে (Step 5-এর আগে Step 6) পুরনো list-এর ঠিকানা চিরতরে হারিয়ে যায়। সবসময় আগে নতুন node জুড়ুন, পরে HEAD সরান।`),
C(`
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_begin(self, val):      # O(1)
        n = Node(val)
        n.next = self.head            # Step 5: link first
        self.head = n                 # Step 6: then move HEAD

    def delete(self, val):            # O(n) to find, O(1) to unlink
        cur, prev = self.head, None
        while cur and cur.data != val:
            prev, cur = cur, cur.next
        if cur is None: return        # not found
        if prev is None: self.head = cur.next
        else: prev.next = cur.next    # bypass the node

    def traverse(self):               # O(n)
        cur = self.head
        while cur:
            print(cur.data, end=" -> ")
            cur = cur.next
        print("NULL")
`),
H(`Array vs linked list`, `Array বনাম linked list`),
T([`Point`, `Array`, `Linked list`], [[`Size`, `Fixed`, `Dynamic, grows and shrinks`], [`Memory allocation`, `Compile time (static)`, `Run time (dynamic)`], [`Order in memory`, `Consecutive cells`, `Scattered nodes`], [`Access`, `Direct / random, O(1)`, `Sequential, O(n)`], [`Insert / delete`, `Slow, needs shifting`, `Fast, only pointers change`], [`Searching`, `Linear and binary`, `Linear only`], [`Memory per element`, `Less`, `More (extra pointer)`], [`Memory utilisation`, `May be wasted`, `Efficient`]]),
X('trick', `"Array = fast to READ, slow to CHANGE. Linked list = slow to READ, fast to CHANGE." Rebuild the whole table from this one sentence.`, `"Array = পড়তে দ্রুত, বদলাতে ধীর। Linked list = পড়তে ধীর, বদলাতে দ্রুত।" এই এক বাক্য থেকেই পুরো টেবিল বানিয়ে ফেলা যায়।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Write the advantages and disadvantages of using a linked list instead of an array.`, `45th BCS CSE 2024`, `<b>Advantages</b>: dynamic data structure (no initial size needed); no memory wastage; insertion and deletion need only pointer updates, no shifting; stacks and queues are easy to implement. <b>Disadvantages</b>: extra memory for the pointer in each node; no random access, traversal is sequential; reverse traversal is impossible in a singly list.`, `সুবিধা ৪টা, অসুবিধা ৩টা। প্রতিটি এক লাইনে।`),
Q(`Is it possible to apply binary search in a sorted linked list?`, `45th BCS CSE 2024`, `Technically yes, but it is useless in practice. Binary search needs O(1) access to the middle element. A linked list allows only sequential access, so reaching the middle costs O(n). The total becomes O(n log n), which is worse than a simple linear search at O(n). So binary search is not suitable for a linked list.`, `উত্তর: করা যায়, কিন্তু লাভ নেই। মাঝের node-এ যেতেই O(n) লাগে, ফলে linear search-এর চেয়েও খারাপ হয়।`),
Q(`Differentiate between linked list and array.`, `BPSC AP, 17th NTRCA 2023, BNPS AP 2017`, `Draw the comparison table: size, memory allocation, order of elements, accessing, insertion/deletion, searching, memory required, memory utilisation.`, `উপরের ৮ সারির টেবিলটা আঁকুন।`),
Q(`For which operations is a linked list better than an array?`, `NESCO AM (ICT) 2021`, `Insertion and deletion. Both need only a pointer update, O(1), whereas an array needs O(n) shifting. Searching is better in an array (O(1) random access, and binary search if sorted).`, `Insert আর delete-এ linked list ভালো। খোঁজায় array ভালো।`),
Q(`Illustrate singly, doubly and circular linked lists with diagrams.`, `BNPS AP 2017`, `Singly: [data|next] → [data|next] → NULL. Doubly: NULL ← [prev|data|next] ⇄ [prev|data|next] → NULL. Circular: the last node's next points back to the first node, no NULL. Draw each with 3 nodes and a HEAD arrow.`, `প্রতিটির জন্য ৩টা node-এর ছবি আঁকুন, HEAD তীর দিয়ে দেখান। ল্যাবের animation থেকে আকৃতিটা দেখে নিন।`),
Q(`Give the algorithm to create a linked list.`, `BPSC AE 2022`, `Write the seven-step INSERT AT BEGINNING algorithm (AVAIL, NEW_NODE, HEAD). Repeating it for each value creates the list.`, `উপরের ৭ ধাপের algorithm-টাই লিখুন। "Algorithm" চাইলে Step 1, Step 2 আকারে লিখতে হবে, code নয়।`),
Q(`Which structure needs the least data movement to remove 11 from 3, 5, 7, 11, 13, 17?`, `38th BCS 2018`, `Linked list. Only one pointer changes: the node holding 7 now points to 13. A queue must first dequeue 3, 5 and 7; a stack must pop several items; a heap must re-heapify.`, `উত্তর: linked list। একটা pointer বদলালেই হয়, কোনো element সরাতে হয় না।`)],
z: [Z([`Each node of a singly linked list contains:`, `Singly linked list-এর প্রতিটি node-এ থাকে:`], [`Only data`, `Data and next pointer`, `Two pointers and data`, `Only an index`], 1, [`Node = data + next.`, `Node = data + next।`]),
  Z([`Inserting a node at the beginning of a linked list costs:`, `Linked list-এর শুরুতে node insert করতে লাগে:`], [`O(1)`, `O(log n)`, `O(n)`, `O(n²)`], 0, [`Two pointer changes, no shifting.`, `দুটো pointer বদল, shifting নেই।`]),
  Z([`In a circular linked list, the last node points to:`, `Circular linked list-এ শেষ node দেখায়:`], [`NULL`, `Itself`, `The first node`, `The middle node`], 2, [`It loops back to the first node.`, `ঘুরে প্রথম node-এ ফিরে আসে।`]),
  Z([`Which search can be used efficiently on a linked list?`, `Linked list-এ কোন search কার্যকরভাবে চলে?`], [`Binary search`, `Linear search`, `Interpolation search`, `None`], 1, [`No random access, so only linear search.`, `Random access নেই, তাই শুধু linear search।`])] });

CH.push({ id: 'stack', tier: 1, t: [`Stack`, `Stack`], s: [`LIFO, push and pop, applications`, `LIFO, push ও pop, ব্যবহার`], b: [
P([`A <b>stack</b> is a list where insertion and deletion both happen at <b>one end only</b>, called the <b>top</b>.`, `<b>Stack</b> এমন একটা list যেখানে ঢোকানো আর বের করা দুটোই হয় <b>শুধু এক প্রান্তে</b>, যার নাম <b>top</b>।`],
  [`Think of a pile of plates. You put a plate on top, and you take a plate from the top.`, `থালার স্তূপের কথা ভাবুন। থালা রাখেন উপরে, নেনও উপর থেকে।`],
  [`So the plate that went in last comes out first: <b>LIFO</b>, Last In First Out.`, `তাই যে থালা সবার শেষে ঢুকেছে সে-ই আগে বের হয়: <b>LIFO</b>, Last In First Out।`],
  [`<b>Push</b> = add to the top. <b>Pop</b> = remove from the top. <b>Peek</b> = look at the top without removing.`, `<b>Push</b> = উপরে যোগ করা। <b>Pop</b> = উপর থেকে সরানো। <b>Peek</b> = না সরিয়ে শুধু উপরেরটা দেখা।`],
  [`Only one pointer is needed: <b>top</b>. Empty stack: top = −1. Full stack: top = MAX − 1.`, `একটাই pointer লাগে: <b>top</b>। খালি stack: top = −1। ভর্তি stack: top = MAX − 1।`],
  [`Push, pop and peek are all O(1).`, `Push, pop, peek সবই O(1)।`]),
V('stack', `Push, pop, then run the BAPEX exam example`, `Push ও pop করুন, তারপর BAPEX পরীক্ষার উদাহরণ চালান`),
A(`PUSH`, [`Check if the stack is full (top = MAX − 1)`, `If full, produce OVERFLOW error and exit`, `If not full, increment top to point to the next empty space`, `Add the data element where top is pointing`, `Return success`]),
A(`POP`, [`Check if the stack is empty (top = −1)`, `If empty, produce UNDERFLOW error and exit`, `If not empty, access the data element at top`, `Decrement top by 1`, `Return success`], `Push-এ আগে top বাড়ে, তারপর মান বসে। Pop-এ আগে মান নেওয়া হয়, তারপর top কমে।`),
C(`
class Stack:
    def __init__(self, size):
        self.items = []
        self.size = size

    def push(self, x):
        if len(self.items) == self.size:
            return "OVERFLOW"
        self.items.append(x)          # add on top

    def pop(self):
        if not self.items:
            return "UNDERFLOW"
        return self.items.pop()       # remove from top

s = Stack(5)
s.push(200); s.push(500); s.push(100)
print(s.pop())                        # 100  (last in, first out)
`),
H(`Where stacks are used`, `Stack কোথায় ব্যবহার হয়`),
P([`<b>Function calls and recursion</b>: every call is pushed on the call stack and popped when it returns.`, `<b>Function call ও recursion</b>: প্রতিটি call, call stack-এ push হয় আর return করলে pop হয়।`],
  [`<b>Expression evaluation</b>: converting infix to postfix and evaluating postfix.`, `<b>Expression evaluation</b>: infix থেকে postfix-এ রূপান্তর এবং postfix-এর মান বের করা।`],
  [`<b>Bracket matching</b>, <b>undo</b> in editors, the browser <b>Back</b> button, <b>DFS</b> and backtracking.`, `<b>Bracket মেলানো</b>, editor-এর <b>undo</b>, browser-এর <b>Back</b> button, <b>DFS</b> ও backtracking।`]),
X('trick', `Stack = plate pile (thala). Or the browser Back button: the last page you visited is the first one you go back to.`, `Stack = থালার স্তূপ। অথবা browser-এর Back button: সবার শেষে যে page দেখেছেন, back চাপলে সেটাতেই আগে ফেরেন।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Describe the operations of a stack.`, `BPSC S&E 2021`, `<b>Push</b> adds an element to the top: check if full; if full report overflow; otherwise increment top and store the element. <b>Pop</b> removes the top element: check if empty; if empty report underflow; otherwise read the element at top and decrement top. Also peek (read the top), isEmpty and isFull. All are O(1).`, `Push ও pop-এর পাঁচ ধাপ করে লিখুন, সাথে stack-এর ছোট একটা ছবি।`),
Q(`Why do we use a stack?`, `BNPS AP 2017`, `Because it enforces LIFO order, which several problems need: function call management and recursion, expression evaluation and conversion, syntax parsing and bracket matching, undo operations, the browser back button, and depth-first search.`, `LIFO দরকার এমন কাজের তালিকা দিন: function call, expression, undo, DFS।`),
Q(`Push(200), Push(500), Push(100), S = Pop(). What is the value of S?`, `BAPEX AGM (ICT) 2023`, `After the three pushes the stack holds 200 (bottom), 500, 100 (top). Pop removes the top element, so <b>S = 100</b>. Draw the four stages of the stack.`, `উত্তর 100। চারটা ধাপের stack এঁকে দেখান। ল্যাবে "BAPEX 2023 উদাহরণ" চালিয়ে দেখুন।`),
Q(`Write about two problems solved by a stack.`, `Combined Bank AP 2024`, `(i) <b>Function call stack</b>: execution contexts are pushed on a call and popped on return, which makes nested calls and recursion possible. (ii) <b>Expression evaluation and parsing</b>: operators and intermediate results are stored by precedence; used for postfix evaluation and parenthesis matching.`, `দুটো উদাহরণ ২–৩ লাইন করে: function call stack আর expression evaluation।`)],
z: [Z([`A stack follows:`, `Stack অনুসরণ করে:`], [`FIFO`, `LIFO`, `Random order`, `Priority order`], 1, [`Last In, First Out.`, `শেষে ঢুকে আগে বের হয়।`]),
  Z([`Push(5), Push(9), Pop(), Push(2), Pop(), Pop(). The last Pop returns:`, `Push(5), Push(9), Pop(), Push(2), Pop(), Pop()। শেষ Pop ফেরত দেয়:`], [`9`, `2`, `5`, `Underflow`], 2, [`Pops give 9, then 2, then 5.`, `Pop-গুলো দেয় 9, তারপর 2, তারপর 5।`]),
  Z([`The terms push and pop are related to:`, `Push ও pop শব্দ দুটি কীসের সাথে সম্পর্কিত?`], [`Queue`, `Stack`, `Tree`, `Array`], 1, [`Asked in PKB Programmer 2019.`, `PKB Programmer 2019-এ এসেছিল।`]),
  Z([`Which data structure does recursion use internally?`, `Recursion ভেতরে ভেতরে কোন data structure ব্যবহার করে?`], [`Queue`, `Heap`, `Stack`, `Graph`], 2, [`The call stack.`, `Call stack।`])] });

CH.push({ id: 'queue', tier: 1, t: [`Queue`, `Queue`], s: [`FIFO, enqueue and dequeue, variants, stack vs queue`, `FIFO, enqueue ও dequeue, প্রকারভেদ, stack বনাম queue`], b: [
P([`A <b>queue</b> is a list where items are inserted at one end, the <b>rear</b>, and removed from the other end, the <b>front</b>.`, `<b>Queue</b> এমন একটা list যেখানে item ঢোকে এক প্রান্তে (<b>rear</b>) আর বের হয় অন্য প্রান্ত থেকে (<b>front</b>)।`],
  [`Think of the line at a bank counter or a ticket booth. Whoever came first is served first.`, `ব্যাংকের কাউন্টার বা টিকিটের লাইনের কথা ভাবুন। যে আগে এসেছে, সে আগে সেবা পায়।`],
  [`That is <b>FIFO</b>: First In, First Out.`, `এটাই <b>FIFO</b>: First In, First Out।`],
  [`<b>Enqueue</b> = insert at the rear. <b>Dequeue</b> = remove from the front.`, `<b>Enqueue</b> = rear-এ ঢোকানো। <b>Dequeue</b> = front থেকে বের করা।`],
  [`Two pointers are needed: <b>front</b> and <b>rear</b>. Empty: front = −1. Full (linear): rear = MAX − 1.`, `দুটো pointer লাগে: <b>front</b> ও <b>rear</b>। খালি: front = −1। ভর্তি (linear): rear = MAX − 1।`]),
V('queue', `Enqueue until it is full, dequeue two, then try again. Now switch to circular.`, `ভর্তি না হওয়া পর্যন্ত enqueue করুন, দুটো dequeue করুন, আবার enqueue-এর চেষ্টা করুন। এবার circular বেছে নিন।`),
A(`ENQUEUE (insert)`, [`Check if the queue is full`, `If full, produce OVERFLOW error and exit`, `If not full, increment the rear pointer to point to the next empty space`, `Add the data element at the location rear is pointing to`, `Return success`]),
A(`DEQUEUE (delete)`, [`Check if the queue is empty`, `If empty, produce UNDERFLOW error and exit`, `If not empty, access the data where front is pointing`, `Increment the front pointer to the next available element`, `Return success`], `Enqueue rear-কে সরায়, dequeue front-কে সরায়। দুটোই O(1)।`),
H(`Types of queue`, `Queue-র প্রকারভেদ`),
P([`<b>Simple (linear) queue</b>: front and rear only move forward. Freed cells at the front are wasted.`, `<b>Simple (linear) queue</b>: front ও rear শুধু সামনে এগোয়। সামনে খালি হওয়া ঘর নষ্ট হয়।`],
  [`<b>Circular queue</b>: the last cell connects back to the first, so freed cells are reused. rear = (rear + 1) % MAX.`, `<b>Circular queue</b>: শেষ ঘর আবার প্রথম ঘরের সাথে যুক্ত, তাই খালি ঘর আবার কাজে লাগে। rear = (rear + 1) % MAX।`],
  [`<b>Priority queue</b>: each item has a priority; the highest priority leaves first, not the oldest. Usually built with a heap.`, `<b>Priority queue</b>: প্রতিটি item-এর একটা priority থাকে; সবচেয়ে বেশি priority-র item আগে বের হয়, সবচেয়ে পুরনোটা নয়। সাধারণত heap দিয়ে বানানো হয়।`],
  [`<b>Deque</b> (double-ended queue): insertion and deletion are allowed at both ends.`, `<b>Deque</b> (double-ended queue): দুই প্রান্তেই ঢোকানো ও বের করা যায়।`]),
C(`
from collections import deque

q = deque()
q.append(10)        # enqueue at rear
q.append(20)
q.append(30)
print(q.popleft())  # dequeue from front -> 10 (first in, first out)

# circular queue index rule
MAX = 5
rear = 4
rear = (rear + 1) % MAX   # wraps around to 0
`),
H(`Stack vs queue`, `Stack বনাম queue`),
T([`Point`, `Stack`, `Queue`], [[`Principle`, `LIFO`, `FIFO`], [`Ends`, `Insert and delete at the same end`, `Insert at rear, delete at front`], [`Pointers`, `One: top`, `Two: front and rear`], [`Operations`, `Push, Pop`, `Enqueue, Dequeue`], [`Empty condition`, `top = −1`, `front = −1`], [`Full condition`, `top = MAX − 1`, `rear = MAX − 1`], [`Variants`, `None`, `Circular, priority, deque`], [`Implementation`, `Simpler`, `Comparatively complex`]]),
X('trick', `Stack = one door (in and out through the same door). Queue = two doors (in through the back, out through the front).`, `Stack = এক দরজা (একই দরজা দিয়ে ঢোকা ও বের হওয়া)। Queue = দুই দরজা (পেছন দিয়ে ঢোকা, সামনে দিয়ে বের হওয়া)।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Difference between stack and queue.`, `Combined Bank AP 2024, DESCO S&E 2023, PSC Lecturer 2017`, `Draw the eight-row table: working principle, ends used, pointers, operations, empty condition, full condition, variants, implementation.`, `উপরের ৮ সারির টেবিল। এই প্রশ্ন প্রায় প্রতি বছর আসে।`),
Q(`Write the steps of the enqueue operation of a queue.`, `Combined Bank Officer (IT) 2020`, `Step 1: check if the queue is full. Step 2: if full, produce overflow error and exit. Step 3: if not full, increment the rear pointer to the next empty space. Step 4: add the data element at the location rear points to. Step 5: return success.`, `পাঁচ ধাপ হুবহু লিখুন। সাথে front ও rear চিহ্নিত একটা ছোট ছবি দিন।`),
Q(`Write about two problems solved by a queue.`, `Combined Bank AP 2024`, `(i) <b>Breadth-first search</b> in graphs: the queue keeps the order in which vertices are visited and gives the shortest path in an unweighted graph. (ii) <b>Task scheduling and resource management</b>: ready queues and job queues serve tasks in FIFO order, which is fair and prevents starvation.`, `দুটো উদাহরণ: BFS আর CPU বা printer-এর task scheduling।`),
Q(`Write the applications of a queue.`, `Common`, `Waiting lists for a shared resource (printer, disk, CPU); asynchronous data transfer (pipes, file I/O, sockets); buffers in media players; playlists; interrupt handling in operating systems; packet queues in routers and switches.`, `৫–৬টা বাস্তব ব্যবহার লিখুন। Printer-এর লাইন সবচেয়ে সহজ উদাহরণ।`)],
z: [Z([`A queue follows:`, `Queue অনুসরণ করে:`], [`LIFO`, `FIFO`, `LILO only`, `Random`], 1, [`First In, First Out.`, `আগে ঢুকে আগে বের হয়।`]),
  Z([`In a queue, deletion happens at the:`, `Queue-তে deletion হয়:`], [`Rear`, `Front`, `Middle`, `Top`], 1, [`Insert at rear, delete at front.`, `Rear-এ insert, front থেকে delete।`]),
  Z([`Which queue reuses the empty cells at the front?`, `কোন queue সামনে খালি হওয়া ঘর আবার ব্যবহার করে?`], [`Linear queue`, `Circular queue`, `Priority queue`, `None`], 1, [`rear = (rear + 1) % MAX wraps around.`, `rear = (rear + 1) % MAX ঘুরে আসে।`]),
  Z([`Which data structure does BFS use?`, `BFS কোন data structure ব্যবহার করে?`], [`Stack`, `Queue`, `Heap`, `Tree`], 1, [`BFS uses a queue; DFS uses a stack.`, `BFS-এ queue; DFS-এ stack।`])] });
