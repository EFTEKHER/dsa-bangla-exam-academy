'use strict';
/* Chapters 13–18, quick-test pool, revision sheet */

CH.push({ id: 'dijkstra', tier: 2, t: [`Dijkstra's shortest path`, `Dijkstra-র shortest path`], s: [`The table method that never fails`, `যে টেবিল পদ্ধতি কখনও ভুল হয় না`], b: [
P([`Google Maps finds the cheapest route from your home to every other place. That is the <b>single-source shortest path</b> problem.`, `Google Maps আপনার বাসা থেকে অন্য সব জায়গায় সবচেয়ে কম খরচের পথ বের করে। এটাই <b>single-source shortest path</b> সমস্যা।`],
  [`<b>Dijkstra's algorithm</b> solves it for a weighted graph with <b>no negative weights</b>. It is a greedy algorithm.`, `<b>Dijkstra-র algorithm</b> এটা সমাধান করে এমন weighted graph-এ যেখানে <b>negative weight নেই</b>। এটা একটা greedy algorithm।`],
  [`Keep one number for every vertex: dist = the cheapest known cost from the source. Start with dist[source] = 0 and all others = ∞.`, `প্রতিটি vertex-এর জন্য একটা সংখ্যা রাখুন: dist = উৎস থেকে এখন পর্যন্ত জানা সবচেয়ে কম খরচ। শুরুতে dist[source] = 0, বাকি সব ∞।`],
  [`Pick the unvisited vertex with the smallest dist. Its distance is now final.`, `Unvisited vertex-দের মধ্যে যার dist সবচেয়ে কম, তাকে নিন। তার দূরত্ব এখন চূড়ান্ত।`],
  [`<b>Relax</b> each of its neighbours: if dist[u] + weight(u, v) &lt; dist[v], then a cheaper route to v has been found, so update dist[v].`, `তার প্রতিটি প্রতিবেশীকে <b>relax</b> করুন: dist[u] + weight(u, v) &lt; dist[v] হলে v-তে যাওয়ার সস্তা পথ পাওয়া গেছে, তাই dist[v] বদলান।`],
  [`Repeat until every vertex has been visited.`, `সব vertex visited না হওয়া পর্যন্ত চালিয়ে যান।`]),
V('dijkstra', `BPDB AE (CSE) 2024: shortest paths from vertex 0`, `BPDB AE (CSE) 2024: vertex 0 থেকে shortest path`),
H(`The table method for the exam`, `পরীক্ষার জন্য টেবিল পদ্ধতি`),
T([`Selected`, `0`, `1`, `2`, `3`, `4`, `5`], [[`start`, `0`, `∞`, `∞`, `∞`, `∞`, `∞`], [`0`, `0 ✓`, `4`, `2`, `∞`, `∞`, `∞`], [`2`, ``, `3`, `2 ✓`, `12`, `10`, `∞`], [`1`, ``, `3 ✓`, ``, `8`, `10`, `∞`], [`3`, ``, ``, ``, `8 ✓`, `10`, `10`], [`4`, ``, ``, ``, ``, `10 ✓`, `10`], [`5`, ``, ``, ``, ``, ``, `10 ✓`]]),
P([`One row per step. Each row: the vertex you selected, then the updated dist of every unvisited vertex. Tick a value when it becomes final.`, `প্রতি ধাপে একটা সারি। প্রতিটি সারিতে: যে vertex বেছে নিলেন, তারপর প্রতিটি unvisited vertex-এর নতুন dist। মান চূড়ান্ত হলে টিক দিন।`],
  [`Final answer from 0: to 1 = 3 (0→2→1), to 2 = 2, to 3 = 8 (0→2→1→3), to 4 = 10, to 5 = 10 (0→2→1→3→5).`, `0 থেকে চূড়ান্ত উত্তর: 1 পর্যন্ত 3 (0→2→1), 2 পর্যন্ত 2, 3 পর্যন্ত 8 (0→2→1→3), 4 পর্যন্ত 10, 5 পর্যন্ত 10 (0→2→1→3→5)।`]),
C(`
import heapq

def dijkstra(graph, source):          # graph: {u: [(v, weight), ...]}
    dist = {v: float('inf') for v in graph}
    dist[source] = 0
    pq = [(0, source)]                # min-heap of (distance, vertex)
    visited = set()
    while pq:
        d, u = heapq.heappop(pq)      # smallest tentative distance
        if u in visited:
            continue
        visited.add(u)
        for v, w in graph[u]:
            alt = dist[u] + w         # relaxation
            if alt < dist[v]:
                dist[v] = alt
                heapq.heappush(pq, (alt, v))
    return dist

g = {0: [(1,4), (2,2)], 1: [(0,4), (2,1), (3,5)],
     2: [(0,2), (1,1), (3,10), (4,8)], 3: [(1,5), (2,10), (4,2), (5,2)],
     4: [(2,8), (3,2), (5,6)], 5: [(3,2), (4,6)]}
print(dijkstra(g, 0))   # {0:0, 1:3, 2:2, 3:8, 4:10, 5:10}
`),
X('trap', `Dijkstra fails on <b>negative edge weights</b>, because it assumes a finalised vertex can never be improved. For negative weights use <b>Bellman-Ford</b>, O(V·E). Writing this one line earns bonus marks.`, `<b>Negative edge weight</b> থাকলে Dijkstra ভুল উত্তর দেয়, কারণ সে ধরে নেয় চূড়ান্ত হওয়া vertex আর উন্নত হবে না। Negative weight-এ <b>Bellman-Ford</b> ব্যবহার করুন, O(V·E)। এই এক লাইন লিখলে বাড়তি নম্বর।`),
T([`Implementation`, `Time`, `Use when`], [[`Simple array (scan for the minimum)`, `O(V²)`, `Dense graphs`], [`Binary heap / priority queue`, `O((V + E) log V)`, `Sparse graphs (the usual answer)`], [`Fibonacci heap`, `O(E + V log V)`, `Theoretical best`]]),
X('trick', `Dijkstra = Prim's with addition. Prim asks "which edge is cheapest?" (w). Dijkstra asks "which total route so far is cheapest?" (dist[u] + w).`, `Dijkstra = যোগসহ Prim। Prim জিজ্ঞেস করে "কোন edge সবচেয়ে সস্তা?" (w)। Dijkstra জিজ্ঞেস করে "এখন পর্যন্ত কোন পুরো পথ সবচেয়ে সস্তা?" (dist[u] + w)।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Find the shortest path from vertex 0 to all other vertices.`, `BPDB AE (CSE) 2024`, `Use Dijkstra's table method (table above). Final distances from 0: to 1 = 3 (0-2-1), to 2 = 2 (0-2), to 3 = 8 (0-2-1-3), to 4 = 10 (0-2-4 or 0-2-1-3-4), to 5 = 10 (0-2-1-3-5).`, `টেবিলটা এঁকে শেষে প্রতিটি vertex-এর পথ ও খরচ আলাদা করে লিখুন।`),
Q(`Write the greedy algorithm to generate the single-source shortest path of a graph.`, `45th BCS CSE 2024`, `Dijkstra's algorithm. Step 1: set dist[source] = 0 and dist[v] = ∞ for all other vertices; mark all unvisited. Step 2: select the unvisited vertex u with the minimum dist. Step 3: mark u visited. Step 4: for each unvisited neighbour v of u, compute alt = dist[u] + weight(u, v); if alt &lt; dist[v], set dist[v] = alt and prev[v] = u. Step 5: repeat Steps 2 to 4 until all vertices are visited. Step 6: exit.`, `৬ ধাপে লিখুন। "Relaxation" শব্দটা ব্যবহার করুন।`),
Q(`S1 to S5 are five power stations; edge values are transmission costs. Find the shortest path from S1 and the average cost.`, `NESCO AM (ICT) 2018`, `Run Dijkstra from S1 using the cost matrix. S2, S3 and S5 are reached directly at cost 1; S4 is reached through an intermediate station, for example S1 ⇒ S3 ⇒ S4, at cost 1 + 1 = 2. The expected answer for the S1-to-S4 route is cost 2.`, `Graph আঁকুন, cost matrix বানান, তারপর Dijkstra-র টেবিল। S4-এ সরাসরি রাস্তা নেই, তাই মাঝের একটা station হয়ে যেতে হয়।`)],
z: [Z([`Dijkstra's algorithm does not work correctly when the graph has:`, `Graph-এ কী থাকলে Dijkstra ঠিকভাবে কাজ করে না?`], [`Cycles`, `Negative edge weights`, `More than 10 vertices`, `Undirected edges`], 1, [`Use Bellman-Ford for negative weights.`, `Negative weight-এ Bellman-Ford ব্যবহার করুন।`]),
  Z([`Dijkstra's algorithm belongs to which design technique?`, `Dijkstra কোন design technique-এর অন্তর্গত?`], [`Greedy`, `Backtracking`, `Divide and conquer`, `Brute force`], 0, [`It always picks the closest unvisited vertex.`, `সবসময় সবচেয়ে কাছের unvisited vertex নেয়।`]),
  Z([`dist[u] = 5, weight(u, v) = 3, dist[v] = 9. After relaxing, dist[v] is:`, `dist[u] = 5, weight(u, v) = 3, dist[v] = 9। Relax করার পর dist[v]:`], [`9`, `8`, `3`, `12`], 1, [`5 + 3 = 8 &lt; 9, so update.`, `5 + 3 = 8 &lt; 9, তাই বদলাবে।`]),
  Z([`Time complexity of Dijkstra with a binary heap:`, `Binary heap দিয়ে Dijkstra-র time complexity:`], [`O(V)`, `O((V + E) log V)`, `O(V³)`, `O(E²)`], 1, [`With a simple array it is O(V²).`, `সাধারণ array দিয়ে O(V²)।`])] });

CH.push({ id: 'paradigm', tier: 3, t: [`Greedy, divide and conquer, backtracking, NP`, `Greedy, divide and conquer, backtracking, NP`], s: [`Feasible vs optimal, design techniques, NP-Hard and NP-Complete`, `Feasible বনাম optimal, design technique, NP-Hard ও NP-Complete`], b: [
P([`You need to travel from Dhaka to Chattogram. Bus, train, plane, even walking: all of them work. Each one is a <b>feasible solution</b>.`, `ঢাকা থেকে চট্টগ্রাম যেতে হবে। বাস, ট্রেন, বিমান, এমনকি হেঁটে: সবগুলোতেই যাওয়া যায়। প্রতিটিই একটা <b>feasible solution</b>।`],
  [`The cheapest one (if cost matters) or the fastest one (if time matters) is the <b>optimal solution</b>.`, `এর মধ্যে সবচেয়ে সস্তাটা (খরচ গুরুত্বপূর্ণ হলে) বা সবচেয়ে দ্রুতটা (সময় গুরুত্বপূর্ণ হলে) হলো <b>optimal solution</b>।`],
  [`<b>Feasible</b> = satisfies all the constraints. <b>Optimal</b> = the best among all feasible solutions. Every optimal solution is feasible; not every feasible one is optimal.`, `<b>Feasible</b> = সব শর্ত মানে। <b>Optimal</b> = সব feasible solution-এর মধ্যে সেরা। প্রতিটি optimal solution feasible; কিন্তু সব feasible solution optimal নয়।`]),
H(`Greedy`, `Greedy`),
P([`A <b>greedy algorithm</b> always grabs the best-looking option right now and never reconsiders.`, `<b>Greedy algorithm</b> সবসময় এই মুহূর্তে যেটা সবচেয়ে ভালো দেখায় সেটাই নেয়, আর পরে ফিরে ভাবে না।`],
  [`Giving change of 80 taka with notes 50, 20, 10: take the biggest note each time. 50 + 20 + 10. It works here.`, `50, 20, 10 টাকার নোট দিয়ে 80 টাকা ভাংতি: প্রতিবার সবচেয়ে বড় নোট নিন। 50 + 20 + 10। এখানে কাজ করে।`],
  [`Greedy is optimal only when the problem has the <b>greedy-choice property</b> and <b>optimal substructure</b>.`, `Greedy তখনই optimal হয় যখন সমস্যাটির <b>greedy-choice property</b> ও <b>optimal substructure</b> থাকে।`],
  [`Works: Kruskal, Prim, Dijkstra, Huffman coding, fractional knapsack, activity selection. Fails: 0/1 knapsack, coin systems like 1, 3, 4 (for 6, greedy gives 4 + 1 + 1 but 3 + 3 is better).`, `কাজ করে: Kruskal, Prim, Dijkstra, Huffman coding, fractional knapsack, activity selection। ব্যর্থ হয়: 0/1 knapsack, 1, 3, 4 ধরনের coin (6-এর জন্য greedy দেয় 4 + 1 + 1, অথচ 3 + 3 ভালো)।`]),
H(`Divide and conquer`, `Divide and conquer`),
P([`<b>Divide</b> the problem into smaller copies of itself, <b>conquer</b> each one recursively, <b>combine</b> the answers.`, `সমস্যাটিকে একই ধরনের ছোট ছোট সমস্যায় <b>divide</b> করুন, প্রতিটিকে recursion দিয়ে <b>conquer</b> করুন, তারপর উত্তরগুলো <b>combine</b> করুন।`],
  [`Examples: merge sort, quick sort, binary search, Strassen's matrix multiplication.`, `উদাহরণ: merge sort, quick sort, binary search, Strassen-এর matrix multiplication।`],
  [`<b>Dynamic programming</b> is its cousin: when the sub-problems overlap, store each answer once and reuse it (Fibonacci, 0/1 knapsack).`, `<b>Dynamic programming</b> এর জ্ঞাতি ভাই: sub-problem বারবার ফিরে এলে প্রতিটির উত্তর একবার জমিয়ে রেখে আবার ব্যবহার করা হয় (Fibonacci, 0/1 knapsack)।`]),
H(`Backtracking`, `Backtracking`),
P([`Build a solution one step at a time. The moment a partial solution cannot possibly work, <b>undo the last step</b> and try the next option.`, `এক ধাপ এক ধাপ করে সমাধান বানান। যখনই বোঝা যায় অর্ধেক-বানানো সমাধান আর কাজ করবে না, <b>শেষ ধাপটা ফিরিয়ে নিন</b> এবং পরের বিকল্প চেষ্টা করুন।`],
  [`It is how you solve a maze: walk until a dead end, come back to the last junction, take another turn.`, `গোলকধাঁধা এভাবেই সমাধান করা হয়: বন্ধ গলি পর্যন্ত যান, শেষ মোড়ে ফিরে আসুন, অন্য দিকে ঘুরুন।`],
  [`Examples: N-Queens, Sudoku, rat in a maze, graph colouring.`, `উদাহরণ: N-Queens, Sudoku, rat in a maze, graph colouring।`]),
H(`P, NP, NP-Hard, NP-Complete`, `P, NP, NP-Hard, NP-Complete`),
P([`<b>P</b>: problems that can be <b>solved</b> in polynomial time. Sorting, searching, shortest path.`, `<b>P</b>: যে সমস্যা polynomial সময়ে <b>সমাধান</b> করা যায়। Sorting, searching, shortest path।`],
  [`<b>NP</b>: problems whose given answer can be <b>verified</b> in polynomial time, even if finding it is hard. A solved Sudoku is easy to check.`, `<b>NP</b>: যে সমস্যার দেওয়া উত্তর polynomial সময়ে <b>যাচাই</b> করা যায়, খুঁজে বের করা কঠিন হলেও। সমাধান করা Sudoku মিলিয়ে দেখা সহজ।`],
  [`<b>NP-Hard</b>: at least as hard as the hardest problems in NP. It need not be in NP itself.`, `<b>NP-Hard</b>: NP-র সবচেয়ে কঠিন সমস্যার সমান বা তার চেয়েও কঠিন। এটা নিজে NP-র ভেতরে না-ও থাকতে পারে।`],
  [`<b>NP-Complete</b>: in NP <b>and</b> NP-Hard. The hardest problems inside NP. Every NP problem reduces to them in polynomial time.`, `<b>NP-Complete</b>: NP-তেও আছে, <b>আবার</b> NP-Hard-ও। NP-র ভেতরের সবচেয়ে কঠিন সমস্যা। প্রতিটি NP সমস্যাকে polynomial সময়ে এতে রূপান্তর করা যায়।`]),
V('np', `How the four classes sit inside each other`, `চারটি শ্রেণি কীভাবে একে অন্যের ভেতরে থাকে`),
X('trick', `NP = "Not solved quickly, but Proof checks quickly." NP-Complete = the hardest problems in NP. NP-Hard = at least that hard, maybe not even in NP.`, `NP = "দ্রুত সমাধান হয় না, কিন্তু উত্তর দ্রুত যাচাই হয়।" NP-Complete = NP-র সবচেয়ে কঠিন সমস্যা। NP-Hard = অন্তত ততটাই কঠিন, হয়তো NP-তেও নেই।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Define feasible solution and optimal solution.`, `45th BCS CSE 2024`, `A <b>feasible solution</b> satisfies all the constraints and requirements of a problem; it is valid and allowable but not necessarily the best. An <b>optimal solution</b> is the best among all feasible solutions: it maximises or minimises the objective function while satisfying all constraints. An optimal solution must also be feasible.`, `দুটো সংজ্ঞা আর ঢাকা–চট্টগ্রাম যাত্রার মতো একটা উদাহরণ দিন।`),
Q(`Does a greedy algorithm always achieve the optimal solution? If not, when does it?`, `BPSC AP 2023`, `No. It achieves the optimal solution only when the problem has the <b>greedy-choice property</b> (a locally best choice leads to a globally best solution) and <b>optimal substructure</b> (an optimal solution is built from optimal solutions of sub-problems). Optimal: Huffman coding, MST, fractional knapsack, activity selection. Counter-example: finding the largest root-to-leaf sum in a tree; greedy takes the bigger child at the top and can miss a much larger value below the smaller child.`, `উত্তর: না। দুটি শর্তের নাম, যেখানে কাজ করে তার উদাহরণ, আর একটা পাল্টা উদাহরণ দিন।`),
Q(`Define backtracking, NP, NP-Hard and NP-Complete with examples.`, `45th BCS CSE 2024`, `<b>Backtracking</b>: builds candidates incrementally and abandons a candidate as soon as it cannot lead to a valid solution. Example: N-Queens. <b>NP</b>: decision problems whose solution can be verified in polynomial time. Example: Vertex Cover. <b>NP-Hard</b>: at least as hard as the hardest problems in NP; may not be in NP. Example: Travelling Salesman Problem (optimisation). <b>NP-Complete</b>: both in NP and NP-Hard. Example: Boolean Satisfiability (SAT).`, `চারটি পদ, প্রতিটির এক লাইন সংজ্ঞা আর একটা করে উদাহরণ। সাথে উপরের চিত্রটা আঁকুন।`),
Q(`You are given two 16 × 16 matrices but your processor supports only 8 × 8. How do you multiply them?`, `BGDCL AM (CSE) 2024`, `Use divide and conquer. Partition each 16 × 16 matrix into four 8 × 8 sub-matrices: A = [A11 A12; A21 A22], B likewise. Multiply the 8 × 8 blocks on the processor and combine: C11 = A11·B11 + A12·B21, C12 = A11·B12 + A12·B22, C21 = A21·B11 + A22·B21, C22 = A21·B12 + A22·B22. That is 8 block multiplications and 4 block additions.`, `Matrix-কে চারটা 8 × 8 block-এ ভাগ করুন, চারটা সূত্র লিখুন। এটাই divide and conquer।`),
Q(`Write the merge sort algorithm using the divide and conquer strategy.`, `45th BCS CSE 2024`, `MergeSort(A, l, r): if l &lt; r then m = (l + r) / 2; MergeSort(A, l, m); MergeSort(A, m + 1, r); Merge(A, l, m, r). Divide splits the array into halves, conquer sorts each half recursively, combine merges two sorted halves. T(n) = 2T(n/2) + n = O(n log n).`, `Pseudocode আর তিন ধাপের ব্যাখ্যা। বিস্তারিত Sorting অধ্যায়ে।`),
Q(`Write the advantages of the IDA* algorithm.`, `BUET M.Sc April 2017`, `IDA* (iterative deepening A*) is memory-efficient: it stores only the current path, O(d), instead of all generated nodes as A* does. With an admissible heuristic it still guarantees an optimal solution. It combines the low memory of depth-first search with the guidance of A*, so it scales to very large state spaces.`, `মূল সুবিধা: A*-এর মতো optimal, কিন্তু memory লাগে DFS-এর মতো কম।`)],
z: [Z([`A problem whose solution can be verified in polynomial time belongs to:`, `যে সমস্যার সমাধান polynomial সময়ে যাচাই করা যায় তা কোন শ্রেণির?`], [`NP`, `Only NP-Hard`, `Undecidable`, `None`], 0, [`NP = verifiable quickly.`, `NP = দ্রুত যাচাইযোগ্য।`]),
  Z([`Which problem is solved by backtracking?`, `কোন সমস্যা backtracking দিয়ে সমাধান হয়?`], [`Merge sort`, `N-Queens`, `Binary search`, `Dijkstra`], 1, [`Place a queen, and undo it when stuck.`, `একটা queen বসান, আটকে গেলে ফিরিয়ে নিন।`]),
  Z([`Merge sort uses which strategy?`, `Merge sort কোন কৌশল ব্যবহার করে?`], [`Greedy`, `Divide and conquer`, `Backtracking`, `Branch and bound`], 1, [`Divide, conquer, combine.`, `Divide, conquer, combine।`]),
  Z([`What is the time complexity of Huffman coding?`, `Huffman coding-এর time complexity কত?`], [`O(n)`, `O(n log n)`, `O(n²)`, `O(2ⁿ)`], 1, [`Asked in Officer IT/ICT 2019. It uses a priority queue.`, `Officer IT/ICT 2019-এ এসেছিল। এটা priority queue ব্যবহার করে।`])] });

CH.push({ id: 'search', tier: 1, t: [`Searching`, `Searching`], s: [`Linear and binary search, blind vs intelligent search`, `Linear ও binary search, blind বনাম intelligent search`], b: [
P([`<b>Searching</b> means finding where a given value sits in a collection, or reporting that it is not there.`, `<b>Searching</b> মানে একটা নির্দিষ্ট মান কোনো সংগ্রহের কোথায় আছে তা খুঁজে বের করা, অথবা নেই বলে জানানো।`],
  [`<b>Linear search</b>: check the items one by one from the start. It works on any list, sorted or not. O(n).`, `<b>Linear search</b>: শুরু থেকে একটা একটা করে মিলিয়ে দেখা। যেকোনো list-এ চলে, sorted হোক বা না হোক। O(n)।`],
  [`<b>Binary search</b>: look at the <b>middle</b> item. If it is too big, throw away the right half; if too small, throw away the left half. Repeat.`, `<b>Binary search</b>: <b>মাঝের</b> item দেখুন। সেটা বেশি বড় হলে ডান অর্ধেক বাদ; বেশি ছোট হলে বাঁ অর্ধেক বাদ। আবার করুন।`],
  [`It is how you find a word in a dictionary: you never read page by page.`, `অভিধানে শব্দ খোঁজার মতো: কেউ পাতা ধরে ধরে পড়ে না।`],
  [`Each step halves the data, so a million items need only about 20 steps. O(log n).`, `প্রতি ধাপে ডাটা অর্ধেক হয়, তাই দশ লক্ষ item-এ মাত্র প্রায় 20 ধাপ লাগে। O(log n)।`],
  [`Binary search has two conditions: the data must be <b>sorted</b>, and it must allow <b>random access</b> (an array, not a linked list).`, `Binary search-এর দুটো শর্ত: ডাটা <b>sorted</b> হতে হবে, আর <b>random access</b> থাকতে হবে (array, linked list নয়)।`]),
V('search', `Search for 41 with both methods and compare the step counts`, `দুই পদ্ধতিতেই 41 খুঁজুন, ধাপের সংখ্যা তুলনা করুন`),
A(`BINARY SEARCH`, [`SET BEG = lower_bound, END = upper_bound, POS = −1`, `Repeat Steps 3 and 4 while BEG ≤ END`, `SET MID = (BEG + END) / 2`, `IF A[MID] = VAL then POS = MID, print POS and go to Step 6; ELSE IF A[MID] &gt; VAL then END = MID − 1; ELSE BEG = MID + 1`, `IF POS = −1, print "value is not present in the array"`, `EXIT`]),
C(`
def linear_search(a, x):              # O(n)
    for i in range(len(a)):
        if a[i] == x:
            return i
    return -1

def binary_search(a, x):              # O(log n), a must be sorted
    beg, end = 0, len(a) - 1
    while beg <= end:
        mid = (beg + end) // 2
        if a[mid] == x:
            return mid
        elif a[mid] > x:
            end = mid - 1             # discard the right half
        else:
            beg = mid + 1             # discard the left half
    return -1
`),
T([`Point`, `Linear search`, `Binary search`], [[`Sorted data needed?`, `No`, `Yes`], [`Other name`, `Sequential search`, `Half-interval search`], [`Best case`, `O(1)`, `O(1)`], [`Average / worst case`, `O(n)`, `O(log n)`], [`Works on`, `Arrays and linked lists`, `Arrays only (random access)`], [`Comparison type`, `Equality`, `Ordering (&lt;, &gt;)`], [`Speed on large data`, `Slow`, `Very fast`]]),
X('trick', `"Binary needs Books in order." Search once → linear. Search many times → sort once, then binary.`, `"Binary needs Books in order": বই সাজানো না থাকলে binary চলে না। একবার খুঁজলে → linear। বারবার খুঁজলে → একবার sort করে নিন, তারপর binary।`),
H(`Blind search vs intelligent search`, `Blind search বনাম intelligent search`),
P([`<b>Blind (uninformed) search</b> knows nothing about where the goal is. It explores systematically. Examples: BFS, DFS.`, `<b>Blind (uninformed) search</b> জানে না লক্ষ্য কোথায়। সে নিয়ম মেনে সব দিক ঘুরে দেখে। উদাহরণ: BFS, DFS।`],
  [`<b>Intelligent (heuristic, informed) search</b> uses knowledge of the problem to move towards the goal. Examples: A*, greedy best-first search.`, `<b>Intelligent (heuristic, informed) search</b> সমস্যার জ্ঞান কাজে লাগিয়ে লক্ষ্যের দিকে এগোয়। উদাহরণ: A*, greedy best-first search।`],
  [`A <b>heuristic function</b> h(n) estimates the cost from the current state to the goal, like the straight-line distance to a city. If it never overestimates, it is <b>admissible</b>.`, `<b>Heuristic function</b> h(n) বর্তমান অবস্থা থেকে লক্ষ্য পর্যন্ত খরচের আনুমানিক হিসাব দেয়, যেমন কোনো শহরের সরলরৈখিক দূরত্ব। এটা কখনও বেশি অনুমান না করলে তাকে <b>admissible</b> বলে।`]),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Difference between linear search and binary search.`, `17th NTRCA (CSE) 2023`, `Draw the table: sorted data needed, other name, time complexity, data structures supported, type of comparison, speed.`, `উপরের টেবিলটা দিন।`),
Q(`Explain the algorithm of binary search.`, `BEPZA Programmer 2023`, `Write the six-step algorithm with BEG, END, MID and POS, then trace it on a small sorted array such as 3, 8, 12, 17, 21, 26, 30 searching for 26: MID = 3 (17 &lt; 26, BEG = 4); MID = 5 (26 found).`, `৬ ধাপের algorithm লিখে একটা ছোট উদাহরণে BEG, END, MID-এর মান ধাপে ধাপে দেখান।`),
Q(`Best and worst case complexity of binary search, quick sort and DFS.`, `BPSC ADA 2022`, `Binary search: best O(1), worst O(log n). Quick sort: best O(n log n), worst O(n²). DFS: O(V + E) for a graph in every case.`, `তিন লাইনের একটা ছোট টেবিল যথেষ্ট।`),
Q(`Compare blind search and intelligent search. What is a heuristic function?`, `45th BCS ICT 2024`, `<b>Blind (uninformed) search</b> has no knowledge of the goal's location and explores the search space systematically; examples: BFS, DFS. <b>Intelligent (heuristic) search</b> uses domain knowledge to guide the search towards the goal; examples: A*, greedy best-first. It is more efficient but needs a good heuristic. A <b>heuristic function</b> estimates the cost of reaching the goal from a given state; if it never overestimates the true cost it is called admissible.`, `দুই ধরনের search-এর সংজ্ঞা ও উদাহরণ, তারপর heuristic function-এর সংজ্ঞা।`)],
z: [Z([`The complexity of the binary search algorithm is:`, `Binary search algorithm-এর complexity:`], [`O(n)`, `O(log n)`, `O(n²)`, `O(n log n)`], 1, [`Asked in Combined Bank IT/ICT 2018.`, `Combined Bank IT/ICT 2018-এ এসেছিল।`]),
  Z([`Binary search requires the data to be:`, `Binary search-এর জন্য ডাটা হতে হবে:`], [`Unsorted`, `Sorted`, `In a linked list`, `All equal`], 1, [`Without order you cannot discard half.`, `ক্রম না থাকলে অর্ধেক বাদ দেওয়া যায় না।`]),
  Z([`How many comparisons does binary search need at most for 1024 sorted items?`, `1024টি sorted item-এ binary search-এ সর্বোচ্চ কয়টি তুলনা লাগে?`], [`About 10`, `About 100`, `512`, `1024`], 0, [`log₂1024 = 10 (at most 11 comparisons).`, `log₂1024 = 10 (সর্বোচ্চ 11টি তুলনা)।`]),
  Z([`Which algorithm is used for path finding with a heuristic?`, `Heuristic দিয়ে path finding-এ কোন algorithm ব্যবহার হয়?`], [`A*`, `Bubble sort`, `Binary search`, `Kruskal`], 0, [`A* uses f(n) = g(n) + h(n).`, `A* ব্যবহার করে f(n) = g(n) + h(n)।`])] });

CH.push({ id: 'sort', tier: 1, t: [`Sorting: all six algorithms`, `Sorting: ছয়টি algorithm`], s: [`Bubble, selection, insertion, merge, quick, heap`, `Bubble, selection, insertion, merge, quick, heap`], b: [
P([`<b>Sorting</b> means arranging data in order, ascending or descending. You need to know six algorithms and one table.`, `<b>Sorting</b> মানে ডাটাকে ক্রম অনুযায়ী সাজানো, ছোট থেকে বড় বা বড় থেকে ছোট। ছয়টি algorithm আর একটা টেবিল জানতে হবে।`],
  [`Three are simple and slow, O(n²): bubble, selection, insertion. Three are clever and fast, O(n log n): merge, quick, heap.`, `তিনটা সহজ কিন্তু ধীর, O(n²): bubble, selection, insertion। তিনটা বুদ্ধিদীপ্ত ও দ্রুত, O(n log n): merge, quick, heap।`]),
V('sort', `Pick an algorithm, type your own numbers, press play`, `একটা algorithm বেছে নিন, নিজের সংখ্যা লিখুন, play চাপুন`),
H(`The three simple sorts`, `তিনটি সহজ sort`),
P([`<b>Bubble sort</b>: compare each pair of neighbours and swap them if they are in the wrong order. After each pass the largest remaining value "bubbles" to the end.`, `<b>Bubble sort</b>: পাশাপাশি দুটো মান তুলনা করুন, ভুল ক্রমে থাকলে swap করুন। প্রতি pass-এর পর বাকিদের মধ্যে সবচেয়ে বড় মান বুদবুদের মতো শেষে চলে যায়।`],
  [`<b>Selection sort</b>: find the smallest value in the unsorted part and swap it into the first unsorted position. At most n − 1 swaps.`, `<b>Selection sort</b>: unsorted অংশের সবচেয়ে ছোট মান খুঁজে তাকে unsorted অংশের প্রথম ঘরে swap করুন। সর্বোচ্চ n − 1টি swap।`],
  [`<b>Insertion sort</b>: take the next value and slide it left into its correct place among the already-sorted values, the way you arrange playing cards in your hand.`, `<b>Insertion sort</b>: পরের মানটা নিন এবং আগে থেকে sorted মানগুলোর মধ্যে ঠিক জায়গায় বাঁ দিকে সরিয়ে বসান, হাতে তাস সাজানোর মতো।`]),
C(`
def bubble_sort(a):
    n = len(a)
    for p in range(n - 1):
        swapped = False
        for j in range(n - 1 - p):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped: break          # already sorted: best case O(n)

def selection_sort(a):
    n = len(a)
    for i in range(n - 1):
        m = i
        for j in range(i + 1, n):
            if a[j] < a[m]: m = j      # index of the smallest
        a[i], a[m] = a[m], a[i]

def insertion_sort(a):
    for i in range(1, len(a)):
        key, j = a[i], i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]            # shift right
            j -= 1
        a[j + 1] = key
`),
H(`The three fast sorts`, `তিনটি দ্রুত sort`),
P([`<b>Merge sort</b>: divide the array into two halves, sort each half recursively, then merge the two sorted halves. Always O(n log n), but needs O(n) extra space.`, `<b>Merge sort</b>: array-কে দুই ভাগ করুন, প্রতিটি ভাগ recursion দিয়ে sort করুন, তারপর দুই sorted ভাগ জোড়া লাগান। সবসময় O(n log n), তবে O(n) বাড়তি জায়গা লাগে।`],
  [`<b>Quick sort</b>: choose a <b>pivot</b>, move smaller values to its left and larger values to its right (partition), then sort the two sides recursively.`, `<b>Quick sort</b>: একটা <b>pivot</b> বাছুন, ছোট মানগুলো তার বাঁয়ে আর বড়গুলো ডানে নিন (partition), তারপর দুই পাশ recursion দিয়ে sort করুন।`],
  [`Quick sort is O(n log n) on average but O(n²) in the worst case, which happens when the array is already sorted and the pivot is always the smallest or largest value.`, `Quick sort গড়ে O(n log n), কিন্তু worst case-এ O(n²), যা হয় array আগে থেকে sorted থাকলে এবং pivot প্রতিবার সবচেয়ে ছোট বা বড় মান হলে।`],
  [`<b>Heap sort</b>: build a max-heap, then repeatedly swap the root with the last item and heapify. O(n log n) always, O(1) space. See the Heap chapter.`, `<b>Heap sort</b>: একটা max-heap বানান, তারপর বারবার root-কে শেষ item-এর সাথে swap করে heapify করুন। সবসময় O(n log n), space O(1)। Heap অধ্যায় দেখুন।`]),
C(`
def merge_sort(a):
    if len(a) <= 1: return a
    m = len(a) // 2
    L, R = merge_sort(a[:m]), merge_sort(a[m:])   # divide + conquer
    out, i, j = [], 0, 0
    while i < len(L) and j < len(R):              # combine
        if L[i] <= R[j]: out.append(L[i]); i += 1
        else:            out.append(R[j]); j += 1
    return out + L[i:] + R[j:]

def quick_sort(a, low, high):
    if low < high:
        pi = partition(a, low, high)
        quick_sort(a, low, pi - 1)
        quick_sort(a, pi + 1, high)

def partition(a, low, high):
    pivot, i = a[high], low - 1
    for j in range(low, high):
        if a[j] < pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[high] = a[high], a[i + 1]         # pivot to its final place
    return i + 1
`),
H(`The table to memorise`, `যে টেবিল মুখস্থ রাখতে হবে`),
T([`Algorithm`, `Best`, `Average`, `Worst`, `Space`, `Stable`], [[`Bubble`, `O(n)`, `O(n²)`, `O(n²)`, `O(1)`, `Yes`], [`Selection`, `O(n²)`, `O(n²)`, `O(n²)`, `O(1)`, `No`], [`Insertion`, `O(n)`, `O(n²)`, `O(n²)`, `O(1)`, `Yes`], [`Merge`, `O(n log n)`, `O(n log n)`, `O(n log n)`, `O(n)`, `Yes`], [`Quick`, `O(n log n)`, `O(n log n)`, `O(n²)`, `O(log n)`, `No`], [`Heap`, `O(n log n)`, `O(n log n)`, `O(n log n)`, `O(1)`, `No`]]),
X('trick', `Three simple sorts: all O(n²), all O(1) space. Three fast sorts: all O(n log n) on average. Only two exceptions: Selection is O(n²) even in the best case, and Quick is O(n²) in the worst case.`, `তিন সহজ sort: সবই O(n²), সবার space O(1)। তিন দ্রুত sort: সবই গড়ে O(n log n)। মাত্র দুটো ব্যতিক্রম: Selection best case-এও O(n²), আর Quick worst case-এ O(n²)।`),
X('simple', `<b>Stable</b> means equal values keep their original order. <b>In-place</b> means no extra array is needed. Quick saves memory but risks O(n²). Merge costs memory but guarantees O(n log n).`, `<b>Stable</b> মানে সমান মানগুলোর আগের ক্রম ঠিক থাকে। <b>In-place</b> মানে বাড়তি array লাগে না। Quick memory বাঁচায় কিন্তু O(n²)-র ঝুঁকি আছে। Merge-এ memory লাগে কিন্তু O(n log n) নিশ্চিত।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`How many swaps are needed to sort 5, 8, 3, 6, 2 using bubble sort?`, `BPSC ADA 2022`, `Trace: 5 8 3 6 2 → 5 3 8 6 2 → 5 3 6 8 2 → 5 3 6 2 8 → 3 5 6 2 8 → 3 5 2 6 8 → 3 2 5 6 8 → 2 3 5 6 8. The sorted list is 2, 3, 5, 6, 8 and it takes <b>7 swaps</b>.`, `উত্তর 7। উপরের animation-এ এটাই default input: play চেপে swap গুনে মিলিয়ে নিন।`),
Q(`Sort {11, 6, 3, 24, 46, 22, 7} using merge sort. Give the best and worst case.`, `BIWTA AE (CSE) 2023`, `Divide down to single elements, then merge upward: {6, 11}, {3, 24}, {22, 46}, {7} → {3, 6, 11, 24}, {7, 22, 46} → 3, 6, 7, 11, 22, 24, 46. Best, average and worst cases are all O(n log n); space is O(n). Draw the divide tree and the merge tree.`, `উপরে ভাগ করার tree, নিচে জোড়া লাগানোর tree আঁকুন। ল্যাবে এই সংখ্যাগুলো বসিয়ে দেখে নিন।`),
Q(`How is quick sort implemented? What is its complexity?`, `BPSC AP 2021`, `Choose a pivot, partition the array so that smaller elements are on its left and larger ones on its right, then recursively quick-sort both sides: if (low &lt; high) { pi = partition(arr, low, high); quickSort(arr, low, pi − 1); quickSort(arr, pi + 1, high); }. Best and average O(n log n), worst O(n²), space O(log n).`, `Pivot, partition, recursion: এই তিন শব্দ দিয়ে ব্যাখ্যা করুন, তারপর pseudocode ও complexity।`),
Q(`Compare quick sort and merge sort in terms of time and space.`, `BPSC ME 2021`, `Both use divide and conquer. Quick sort may split in any ratio; merge sort always splits into halves. Worst case: quick O(n²), merge O(n log n). Extra space: quick O(log n) for the stack, merge O(n) for a temporary array. Merge sort is stable; quick sort is not. Quick sort is usually faster in practice on arrays.`, `টেবিল দিন: split, worst case, space, stable।`),
Q(`Advantages and complexity of merge sort, heap sort and insertion sort.`, `BBL AM (ICT) 2019`, `<b>Merge</b>: works for files of any size, consistent running time, stable; O(n log n) in all cases, O(n) space. <b>Heap</b>: in place, no worst-case slowdown; O(n log n) in all cases, O(1) space. <b>Insertion</b>: simple, stable, can sort a list as it arrives, very good for small or nearly sorted lists; best O(n), average and worst O(n²), O(1) space.`, `প্রতিটির ২টা সুবিধা আর complexity লিখুন।`),
Q(`Write down the time complexities of different sorting algorithms.`, `DBBL PO 2017`, `Give the six-row table of best, average and worst case with space.`, `উপরের টেবিলটাই উত্তর।`),
Q(`Which is the fastest sorting algorithm?`, `NSFCL AE (IT) 2023`, `There is no single fastest. Quick sort is usually fastest in practice for general data but risks O(n²). Merge sort is the fastest with a guaranteed O(n log n) and is stable. Heap sort is best when memory is tight. Insertion sort wins on tiny or nearly sorted arrays. O(n log n) is the lower bound for comparison sorts; counting and radix sort reach O(n) for restricted integer input.`, `"কোনো একটাই সবচেয়ে দ্রুত নয়" বলে শুরু করুন, তারপর কোন অবস্থায় কোনটা ভালো তা লিখুন।`)],
z: [Z([`What is the worst-case complexity of bubble sort?`, `Bubble sort-এর worst case complexity কত?`], [`O(n)`, `O(n log n)`, `O(n²)`, `O(log n)`], 2, [`n passes with up to n comparisons each.`, `n টি pass, প্রতিটিতে সর্বোচ্চ n টি তুলনা।`]),
  Z([`What is the average-case time complexity of merge sort?`, `Merge sort-এর average case time complexity কত?`], [`O(n)`, `O(n log n)`, `O(n²)`, `O(1)`], 1, [`Merge sort is O(n log n) in every case.`, `Merge sort সব case-এই O(n log n)।`]),
  Z([`Which sort is O(n²) even in the best case?`, `কোন sort best case-এও O(n²)?`], [`Bubble`, `Insertion`, `Selection`, `Merge`], 2, [`It always scans the whole unsorted part.`, `সে সবসময় পুরো unsorted অংশ খুঁজে দেখে।`]),
  Z([`S = {1, 2, 3, 8, 15, 10} is nearly sorted. Which algorithm sorts it fastest?`, `S = {1, 2, 3, 8, 15, 10} প্রায় sorted। কোন algorithm সবচেয়ে দ্রুত sort করবে?`], [`Insertion sort`, `Selection sort`, `Heap sort`, `Quick sort (last pivot)`], 0, [`Insertion sort is O(n) on nearly sorted data. Note: this was asked in Combined 4 Banks AP 2020, and some answer keys print "merge sort" because of the options that were given.`, `প্রায় sorted ডাটায় insertion sort O(n)। দ্রষ্টব্য: এটি Combined 4 Banks AP 2020-এ এসেছিল; সেখানকার option-এর কারণে কিছু answer key-তে "merge sort" ছাপা আছে।`]),
  Z([`Worst-case complexity of randomized quicksort, as expected in exams:`, `Randomized quicksort-এর complexity, পরীক্ষায় যে উত্তর আশা করা হয়:`], [`O(n log n) expected`, `O(n) always`, `O(log n)`, `O(1)`], 0, [`Asked in Officer IT/ICT 2019. A random pivot gives expected O(n log n); the true worst case, O(n²), becomes extremely unlikely.`, `Officer IT/ICT 2019-এ এসেছিল। Random pivot-এ প্রত্যাশিত সময় O(n log n); আসল worst case O(n²) ঘটার সম্ভাবনা নগণ্য।`])] });

CH.push({ id: 'expr', tier: 3, t: [`Expression parsing`, `Expression parsing`], s: [`Infix, prefix, postfix and every conversion`, `Infix, prefix, postfix ও সব ধরনের রূপান্তর`], b: [
P([`The same calculation can be written in three ways, depending on where the operator sits.`, `একই হিসাব তিনভাবে লেখা যায়, operator কোথায় বসছে তার ওপর নির্ভর করে।`],
  [`<b>Infix</b>: operator <b>between</b> the operands. <code>A + B</code>. This is how humans write.`, `<b>Infix</b>: operator থাকে দুই operand-এর <b>মাঝে</b>। <code>A + B</code>। মানুষ এভাবেই লেখে।`],
  [`<b>Prefix</b> (Polish notation): operator <b>before</b> the operands. <code>+ A B</code>.`, `<b>Prefix</b> (Polish notation): operator থাকে operand-এর <b>আগে</b>। <code>+ A B</code>।`],
  [`<b>Postfix</b> (Reverse Polish notation): operator <b>after</b> the operands. <code>A B +</code>.`, `<b>Postfix</b> (Reverse Polish notation): operator থাকে operand-এর <b>পরে</b>। <code>A B +</code>।`],
  [`Infix needs brackets and precedence rules. Postfix needs neither, so a computer can evaluate it in one left-to-right pass with a stack.`, `Infix-এ bracket আর precedence-এর নিয়ম লাগে। Postfix-এ কোনোটাই লাগে না, তাই কম্পিউটার একটা stack দিয়ে বাঁ থেকে ডানে একবার পড়েই মান বের করতে পারে।`],
  [`Precedence, high to low: <code>^</code> (exponent), then <code>* /</code>, then <code>+ −</code>. All are left-associative except <code>^</code>, which is right-associative.`, `Precedence, বেশি থেকে কম: <code>^</code> (exponent), তারপর <code>* /</code>, তারপর <code>+ −</code>। সবগুলো left-associative, শুধু <code>^</code> right-associative।`]),
V('expr', `Type any infix expression and watch the stack work`, `যেকোনো infix expression লিখুন, stack কীভাবে কাজ করে দেখুন`),
A(`INFIX TO POSTFIX`, [`Scan the infix expression from left to right`, `If the symbol is an operand, add it to the output`, `If it is "(", push it on the stack`, `If it is ")", pop and output until "(" is found; discard both brackets`, `If it is an operator, pop and output every operator on the stack with higher or equal precedence, then push the new operator`, `At the end, pop and output everything left on the stack`], `মূল কথা: operand সরাসরি output-এ যায়, operator stack-এ অপেক্ষা করে। বেশি precedence-এর operator আগে বের হয়।`),
H(`The expression-tree shortcut`, `Expression tree-র সহজ পথ`),
P([`Draw the expression as a tree: operators are internal nodes, operands are leaves. The operator applied last is the root.`, `Expression-টাকে tree আকারে আঁকুন: operator হলো internal node, operand হলো leaf। সবার শেষে যে operator কাজ করে সে root।`],
  [`Read the tree in <b>pre-order</b> to get prefix. Read it in <b>post-order</b> to get postfix. In-order gives back the infix.`, `Tree-টা <b>pre-order</b>-এ পড়লে prefix পাবেন। <b>Post-order</b>-এ পড়লে postfix। In-order-এ ফিরে পাবেন infix।`],
  [`Check: the operands appear in the same order (A B C …) in all three forms.`, `যাচাই: তিন রূপেই operand-গুলো একই ক্রমে (A B C …) থাকে।`]),
T([`Infix`, `Prefix`, `Postfix`], [[`A + B`, `+ A B`, `A B +`], [`A + B * C`, `+ A * B C`, `A B C * +`], [`(A + B) * C`, `* + A B C`, `A B + C *`], [`A * B + C / D`, `+ * A B / C D`, `A B * C D / +`], [`(A + B) * (C − D)`, `* + A B − C D`, `A B + C D − *`]]),
H(`Evaluating a postfix expression`, `Postfix expression-এর মান বের করা`),
P([`Scan left to right. Operand: push it. Operator: pop two values, apply the operator (second popped <i>op</i> first popped), push the result.`, `বাঁ থেকে ডানে পড়ুন। Operand পেলে push। Operator পেলে দুটো মান pop করুন, operator প্রয়োগ করুন (পরে pop হওয়া <i>op</i> আগে pop হওয়া), ফল push করুন।`],
  [`Example <code>2 3 4 * +</code>: push 2, 3, 4. See *: 3 × 4 = 12, push. See +: 2 + 12 = <b>14</b>.`, `উদাহরণ <code>2 3 4 * +</code>: 2, 3, 4 push। * পেলে: 3 × 4 = 12, push। + পেলে: 2 + 12 = <b>14</b>।`]),
C(`
def evaluate_postfix(tokens):
    stack = []
    for t in tokens:
        if t.isdigit():
            stack.append(int(t))
        else:
            b = stack.pop()            # first popped = right operand
            a = stack.pop()            # second popped = left operand
            if   t == '+': stack.append(a + b)
            elif t == '-': stack.append(a - b)
            elif t == '*': stack.append(a * b)
            elif t == '/': stack.append(a / b)
    return stack.pop()

print(evaluate_postfix("2 3 4 * +".split()))   # 14
`),
X('trap', `For − and /, the order matters. The value popped first is the RIGHT operand. With <code>8 2 −</code> the answer is 8 − 2 = 6, not 2 − 8.`, `− আর /-এ ক্রম গুরুত্বপূর্ণ। আগে যে মান pop হয় সেটা ডান দিকের operand। <code>8 2 −</code>-এর উত্তর 8 − 2 = 6, 2 − 8 নয়।`),
X('trick', `Whatever the question asks, draw the expression tree. It answers every conversion, and a picture is much harder to get wrong than a stack trace in your head.`, `প্রশ্ন যা-ই হোক, expression tree আঁকুন। সব রূপান্তরের উত্তর এখান থেকেই আসে, আর মাথায় stack চালানোর চেয়ে ছবিতে ভুল অনেক কম হয়।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Explain infix, prefix and postfix notation.`, `BTCL JAM 2022`, `<b>Infix</b>: the operator is between the operands (a + b); natural for humans but needs brackets and precedence rules. <b>Prefix</b> (Polish): the operator comes before the operands (+ a b). <b>Postfix</b> (Reverse Polish): the operator comes after the operands (a b +); it needs no brackets or precedence rules, so computers evaluate it easily with a stack. Add a small table of examples.`, `তিনটির সংজ্ঞা ও একটা করে উদাহরণ, সাথে ছোট টেবিল।`),
Q(`Convert ((A + B) * C − (D − E) ^ (F + G)) to prefix and postfix.`, `Worked example`, `<b>Prefix</b>: − * + A B C ^ − D E + F G. <b>Postfix</b>: A B + C * D E − F G + ^ −. Method: draw the expression tree with − at the root; its left child is * (children + and C) and its right child is ^ (children − and +). Read pre-order for prefix and post-order for postfix.`, `উপরের animation-এ এটাই default expression। শেষ ধাপে prefix ও postfix দুটোই দেখায়।`),
Q(`Convert the postfix expression A B + C * to infix.`, `Common`, `Scan left to right with a stack. Push A, push B. On +, pop B and A and push (A + B). Push C. On *, pop C and (A + B) and push ((A + B) * C). Result: (A + B) * C.`, `Operand পেলে push; operator পেলে দুটো pop করে মাঝে operator বসিয়ে bracket-সহ আবার push।`)],
z: [Z([`The postfix form of A + B * C is:`, `A + B * C-এর postfix রূপ:`], [`A B + C *`, `A B C * +`, `+ A * B C`, `A B C + *`], 1, [`* binds tighter, so B C * comes first.`, `*-এর precedence বেশি, তাই B C * আগে।`]),
  Z([`Which data structure converts infix to postfix?`, `Infix থেকে postfix রূপান্তরে কোন data structure লাগে?`], [`Queue`, `Stack`, `Tree only`, `Graph`], 1, [`Operators wait on a stack.`, `Operator-রা stack-এ অপেক্ষা করে।`]),
  Z([`Evaluate the postfix expression 6 2 / 3 +`, `Postfix expression 6 2 / 3 +-এর মান কত?`], [`6`, `9`, `1.2`, `5`], 0, [`6 / 2 = 3, then 3 + 3 = 6.`, `6 / 2 = 3, তারপর 3 + 3 = 6।`]),
  Z([`Prefix notation is also called:`, `Prefix notation-এর আরেক নাম:`], [`Reverse Polish`, `Polish notation`, `Infix`, `Hungarian`], 1, [`Postfix is Reverse Polish.`, `Postfix হলো Reverse Polish।`])] });

CH.push({ id: 'recur', tier: 3, t: [`Recursion and the algorithm toolkit`, `Recursion ও algorithm toolkit`], s: [`Factorial, Fibonacci, Tower of Hanoi, prime, flowcharts`, `Factorial, Fibonacci, Tower of Hanoi, prime, flowchart`], b: [
P([`<b>Recursion</b> is when a function solves a problem by calling <b>itself</b> on a smaller version of the same problem.`, `<b>Recursion</b> হলো যখন একটা function একই সমস্যার ছোট সংস্করণের জন্য <b>নিজেকেই</b> call করে সমাধান বের করে।`],
  [`Think of Russian dolls: open one, find a smaller one inside, until the smallest doll that does not open.`, `রাশিয়ান পুতুলের কথা ভাবুন: একটা খুললে ভেতরে আরেকটা ছোট, এভাবে একদম ছোটটা পর্যন্ত যেটা আর খোলে না।`],
  [`Every recursive function needs two parts. A <b>base case</b>: when to stop. A <b>recursive case</b>: how the problem gets smaller.`, `প্রতিটি recursive function-এ দুটো অংশ লাগে। <b>Base case</b>: কখন থামবে। <b>Recursive case</b>: সমস্যা কীভাবে ছোট হবে।`],
  [`Without a base case the function calls itself forever and the program crashes with a stack overflow.`, `Base case না থাকলে function অনন্তকাল নিজেকে call করতে থাকে, আর program stack overflow হয়ে ভেঙে পড়ে।`],
  [`Each call waits on the <b>call stack</b> until the call it made returns. Watch it below.`, `প্রতিটি call <b>call stack</b>-এ অপেক্ষা করে, যতক্ষণ না তার করা call ফিরে আসে। নিচে দেখুন।`]),
V('fact', `factorial(n) = n × factorial(n − 1), base case factorial(1) = 1`, `factorial(n) = n × factorial(n − 1), base case factorial(1) = 1`),
C(`
def factorial(n):
    if n <= 1:                 # base case
        return 1
    return n * factorial(n - 1)    # recursive case

def fib(n):                    # plain recursion: O(2^n), very slow
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)

def fib_dp(n):                 # dynamic programming: O(n) time, O(1) space
    f0, f1 = 0, 1
    for _ in range(n):
        f0, f1 = f1, f0 + f1
    return f0

print(factorial(5), fib_dp(10))    # 120 55
`),
H(`Fibonacci and dynamic programming`, `Fibonacci ও dynamic programming`),
P([`Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, … Each number is the sum of the two before it: F(n) = F(n − 1) + F(n − 2).`, `Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, … প্রতিটি সংখ্যা আগের দুটোর যোগফল: F(n) = F(n − 1) + F(n − 2)।`],
  [`Plain recursion computes the same values again and again: F(5) needs F(3) twice and F(2) three times. That costs O(2ⁿ).`, `সাধারণ recursion একই মান বারবার হিসাব করে: F(5)-এ F(3) লাগে দুইবার, F(2) তিনবার। খরচ O(2ⁿ)।`],
  [`<b>Dynamic programming</b> stores each answer the first time and reuses it. The cost drops to O(n).`, `<b>Dynamic programming</b> প্রতিটি উত্তর প্রথমবারেই জমিয়ে রাখে এবং পরে সেটাই ব্যবহার করে। খরচ নেমে আসে O(n)-এ।`]),
H(`Tower of Hanoi`, `Tower of Hanoi`),
P([`Three pegs, n disks. Move all disks from the source to the destination. Only one disk moves at a time, and a bigger disk can never sit on a smaller one.`, `তিনটি খুঁটি, n টি disk। সব disk উৎস থেকে গন্তব্যে নিতে হবে। একবারে একটাই disk সরে, আর ছোট disk-এর ওপর বড় disk রাখা যায় না।`],
  [`The trick: (1) move the top n − 1 disks to the auxiliary peg, (2) move the biggest disk to the destination, (3) move the n − 1 disks onto it.`, `কৌশল: (১) উপরের n − 1টি disk সহায়ক খুঁটিতে নিন, (২) সবচেয়ে বড় disk গন্তব্যে নিন, (৩) n − 1টি disk তার ওপর নিয়ে আসুন।`],
  [`Minimum moves = 2ⁿ − 1. For 3 disks, 7 moves. Time complexity O(2ⁿ).`, `সর্বনিম্ন চাল = 2ⁿ − 1। 3টি disk-এ 7 চাল। Time complexity O(2ⁿ)।`]),
V('hanoi', `Count the moves for 3 disks, then try 4`, `3টি disk-এ চাল গুনুন, তারপর 4টি দিয়ে চেষ্টা করুন`),
A(`TOWER OF HANOI`, [`Procedure Hanoi(disk, source, dest, aux)`, `IF disk = 1 THEN move disk from source to dest`, `ELSE Hanoi(disk − 1, source, aux, dest)`, `move disk from source to dest`, `Hanoi(disk − 1, aux, dest, source)`, `END IF, END Procedure`]),
H(`Small algorithms that are asked every year`, `প্রতি বছর আসা ছোট algorithm`),
C(`
def is_prime(num):
    if num < 2: return False
    i = 2
    while i * i <= num:            # only up to the square root
        if num % i == 0:
            return False
        i += 1
    return True

def second_largest(a):
    first = second = float('-inf')
    for x in a:
        if x > first:
            first, second = x, first
        elif first > x > second:
            second = x
    return second

def odd_numbers(n):
    return [i for i in range(1, n + 1) if i % 2 == 1]
`),
T([`Flowchart symbol`, `Meaning`], [[`Oval`, `Start / Stop`], [`Parallelogram`, `Input / Output`], [`Rectangle`, `Process (calculation, assignment)`], [`Diamond`, `Decision (yes / no)`], [`Arrow`, `Flow of control`], [`Small circle`, `Connector`]]),
X('tip', `"Write the algorithm" means numbered Step 1, Step 2, Step 3 in plain language. "Write the program" or "pseudocode" means code. Writing a program when an algorithm was asked wastes time; writing loose prose when an algorithm was asked loses marks.`, `"Write the algorithm" মানে Step 1, Step 2, Step 3 আকারে সাধারণ ভাষায় লেখা। "Write the program" বা "pseudocode" মানে code। Algorithm চাইলে program লিখলে সময় নষ্ট; algorithm চাইলে এলোমেলো গদ্য লিখলে নম্বর কাটা যায়।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Write the Tower of Hanoi recursive algorithm.`, `17th NTRCA (ICT) 2023`, `Procedure Hanoi(disk, source, dest, aux): IF disk = 1 THEN move the disk from source to dest; ELSE Hanoi(disk − 1, source, aux, dest); move the disk from source to dest; Hanoi(disk − 1, aux, dest, source); END IF. Minimum moves = 2ⁿ − 1; time complexity O(2ⁿ).`, `Procedure লিখে শেষে চালের সূত্র 2ⁿ − 1 উল্লেখ করুন। তিন খুঁটির একটা ছবি দিন।`),
Q(`Find the Fibonacci series using dynamic programming.`, `BPSC ADA 2022, PSB Programmer 2018`, `Plain recursion Fib(n) = Fib(n − 1) + Fib(n − 2) is O(2ⁿ) because the same values are recomputed many times. Dynamic programming stores each computed value and reuses it, reducing the cost to O(n). Bottom-up: f0 = 0, f1 = 1; repeat n times: (f0, f1) = (f1, f0 + f1); f0 is the answer. This uses O(1) space.`, `প্রথমে বলুন সাধারণ recursion কেন ধীর, তারপর DP-র table বা loop দেখান।`),
Q(`Write an algorithm to check whether a number is prime.`, `NSDA AP 2021`, `Step 1: read num. Step 2: if num &lt; 2, print "not prime" and exit. Step 3: set i = 2. Step 4: while i × i ≤ num, if num mod i = 0 then print "not prime" and exit; otherwise i = i + 1. Step 5: print "prime". Step 6: exit.`, `√num পর্যন্ত পরীক্ষা করলেই যথেষ্ট, এটা উল্লেখ করলে ভালো দেখায়।`),
Q(`Write an algorithm and draw a flowchart to print the odd numbers between 1 and n.`, `MoL AME 2023`, `Step 1: start. Step 2: input N. Step 3: set I = 1. Step 4: if I &gt; N go to Step 7. Step 5: if I mod 2 = 1, display I. Step 6: I = I + 1, go to Step 4. Step 7: stop. Flowchart: oval (Start), parallelogram (Input N), rectangle (I = 1), diamond (I &gt; N?), diamond (I mod 2 = 1?), parallelogram (Display I), rectangle (I = I + 1), oval (Stop).`, `আগে Step আকারে algorithm, তারপর সঠিক আকৃতির box দিয়ে flowchart।`),
Q(`What is recursion? What are its two essential parts?`, `Common`, `Recursion is a technique in which a function calls itself to solve a smaller instance of the same problem. It needs a base case, which stops the recursion, and a recursive case, which reduces the problem towards the base case. Each call is stored on the call stack, so deep recursion uses O(depth) memory.`, `সংজ্ঞা, base case, recursive case, আর factorial-এর উদাহরণ।`)],
z: [Z([`Minimum number of moves to solve Tower of Hanoi with 4 disks:`, `4টি disk-এর Tower of Hanoi সমাধানে সর্বনিম্ন চাল:`], [`8`, `15`, `16`, `31`], 1, [`2⁴ − 1 = 15.`, `2⁴ − 1 = 15।`]),
  Z([`What stops a recursive function from calling itself forever?`, `Recursive function-কে অনন্তকাল নিজেকে call করা থেকে কী থামায়?`], [`The base case`, `A loop`, `The compiler`, `A pointer`], 0, [`No base case means stack overflow.`, `Base case না থাকলে stack overflow।`]),
  Z([`Time complexity of Fibonacci with dynamic programming:`, `Dynamic programming দিয়ে Fibonacci-র time complexity:`], [`O(2ⁿ)`, `O(n)`, `O(n²)`, `O(log n)`], 1, [`Each value is computed once.`, `প্রতিটি মান একবারই হিসাব হয়।`]),
  Z([`In a flowchart, a decision is drawn as a:`, `Flowchart-এ decision আঁকা হয়:`], [`Rectangle`, `Oval`, `Diamond`, `Parallelogram`], 2, [`Diamond = yes / no question.`, `Diamond = হ্যাঁ / না প্রশ্ন।`])] });

/* Extra MCQs for the mock test (from the guide's quick test and common exam items) */
QUICK = [
  Z([`Minimum number of queues needed to implement a stack:`, `একটা stack বানাতে সর্বনিম্ন কয়টি queue লাগে?`], [`1`, `2`, `3`, `4`], 0, [`One queue is enough: after each push, rotate the queue so the new item comes to the front. (The classic two-queue method also works, but 1 is the minimum.)`, `একটা queue-ই যথেষ্ট: প্রতি push-এর পর queue ঘুরিয়ে নতুন item সামনে আনুন। (দুই queue-র পদ্ধতিও আছে, তবে সর্বনিম্ন 1।)`]),
  Z([`Minimum number of stacks needed to implement a queue:`, `একটা queue বানাতে সর্বনিম্ন কয়টি stack লাগে?`], [`1`, `2`, `3`, `4`], 1, [`One stack for enqueue and one for dequeue.`, `একটা stack enqueue-র জন্য, আরেকটা dequeue-র জন্য।`]),
  Z([`Which data structure is used to check balanced parentheses?`, `Balanced parentheses যাচাই করতে কোন data structure লাগে?`], [`Queue`, `Stack`, `Graph`, `Heap`], 1, [`Push on an opening bracket, pop on a closing one.`, `Opening bracket-এ push, closing bracket-এ pop।`]),
  Z([`A full binary tree with 7 internal nodes has how many leaves?`, `7টি internal node-এর full binary tree-তে কয়টি leaf?`], [`6`, `7`, `8`, `14`], 2, [`Leaves = internal nodes + 1.`, `Leaf = internal node + 1।`]),
  Z([`Which traversal of a BST gives sorted output?`, `BST-র কোন traversal sorted output দেয়?`], [`Pre-order`, `In-order`, `Post-order`, `Level-order`], 1, [`Left, Root, Right.`, `Left, Root, Right।`]),
  Z([`Which sorting algorithm is not stable?`, `কোন sorting algorithm stable নয়?`], [`Merge sort`, `Insertion sort`, `Bubble sort`, `Quick sort`], 3, [`Quick, heap and selection sort are not stable.`, `Quick, heap ও selection sort stable নয়।`]),
  Z([`Which sorting algorithm needs O(n) extra space?`, `কোন sorting algorithm-এ O(n) বাড়তি জায়গা লাগে?`], [`Heap sort`, `Merge sort`, `Bubble sort`, `Selection sort`], 1, [`It needs a temporary array for merging.`, `Merge করার জন্য একটা অস্থায়ী array লাগে।`]),
  Z([`Quick sort's worst case occurs when the array is:`, `Quick sort-এর worst case হয় যখন array:`], [`Random`, `Already sorted (first or last pivot)`, `All different`, `Very small`], 1, [`The pivot becomes the smallest or largest every time.`, `Pivot প্রতিবার সবচেয়ে ছোট বা বড় মান হয়।`]),
  Z([`Which data structure implements a priority queue most efficiently?`, `Priority queue সবচেয়ে কার্যকরভাবে বানানো হয় কোনটি দিয়ে?`], [`Stack`, `Linked list`, `Heap`, `Array`], 2, [`Insert and extract are both O(log n).`, `Insert ও extract দুটোই O(log n)।`]),
  Z([`The number of edges in a complete undirected graph with n vertices:`, `n টি vertex-এর complete undirected graph-এ edge সংখ্যা:`], [`n`, `n − 1`, `n(n − 1)/2`, `n²`], 2, [`Every pair of vertices is joined once.`, `প্রতি জোড়া vertex একবার করে যুক্ত।`]),
  Z([`Which algorithm finds the shortest path when edge weights can be negative?`, `Edge weight negative হতে পারলে shortest path বের করে কোন algorithm?`], [`Dijkstra`, `Bellman-Ford`, `Prim`, `Kruskal`], 1, [`Dijkstra fails with negative weights.`, `Negative weight-এ Dijkstra ব্যর্থ হয়।`]),
  Z([`Which data structure allows insertion and deletion at both ends?`, `কোন data structure-এ দুই প্রান্তেই insert ও delete করা যায়?`], [`Stack`, `Simple queue`, `Deque`, `Heap`], 2, [`Double-ended queue.`, `Double-ended queue।`]),
  Z([`In a doubly linked list each node has how many pointers?`, `Doubly linked list-এর প্রতিটি node-এ কয়টি pointer থাকে?`], [`1`, `2`, `3`, `0`], 1, [`prev and next.`, `prev ও next।`]),
  Z([`The height of a balanced binary search tree with n nodes is about:`, `n টি node-এর balanced BST-র height প্রায়:`], [`n`, `log₂n`, `n²`, `n/2`], 1, [`That is why its operations are O(log n).`, `এজন্যই এর অপারেশন O(log n)।`])];

SHEET = [
  { h: [`Definitions to write word for word`, `যে সংজ্ঞাগুলো হুবহু লিখতে হবে`], t: [[`Term`, `One-line definition`],
    [`Data structure`, `A group of data elements that provides an efficient way of storing and organizing data so that it can be used efficiently.`],
    [`Algorithm`, `A finite set of well-defined logical steps that solves a problem and terminates in finite time.`],
    [`Linear DS`, `Elements arranged in linear order, each attached to its previous and next; traversable in one run.`],
    [`Non-linear DS`, `Elements attached hierarchically; multiple levels; not traversable in one run.`],
    [`Stack`, `An ordered list where insertion and deletion happen only at one end, the top. LIFO.`],
    [`Queue`, `An ordered list where insertion happens at the rear and deletion at the front. FIFO.`],
    [`Linked list`, `A collection of nodes where each node holds data and the address of the next node.`],
    [`Binary tree`, `A tree in which every node has at most two children.`],
    [`BST`, `A binary tree where left subtree &lt; node &lt; right subtree at every node.`],
    [`Heap`, `A complete binary tree where every parent is ≥ (max-heap) or ≤ (min-heap) its children.`],
    [`Graph`, `G = (V, E): a set of vertices and a set of edges connecting pairs of vertices.`],
    [`Spanning tree`, `A sub-graph that connects all V vertices with V − 1 edges and no cycle.`],
    [`Time complexity`, `The amount of time an algorithm needs, as a function of the input size.`],
    [`Recursion`, `A function calling itself on a smaller instance, with a base case to stop.`]] },
  { h: [`Every formula in one place`, `সব সূত্র এক জায়গায়`], t: [[`What`, `Formula`],
    [`Address of A[i]`, `Base + i × size`], [`Address of A[i][j], row-major`, `Base + (i × columns + j) × size`],
    [`Stack empty / full`, `top = −1 / top = MAX − 1`], [`Circular queue next position`, `(rear + 1) % MAX`],
    [`Max nodes at level L (root = 0)`, `2<sup>L</sup>`], [`Max nodes, height h`, `2<sup>h+1</sup> − 1`], [`Min nodes, height h`, `h + 1`],
    [`Leaves of a full binary tree`, `internal nodes + 1`], [`Edges of a tree with n nodes`, `n − 1`],
    [`Children of i (root at 1)`, `2i and 2i + 1`], [`Children of i (root at 0)`, `2i + 1 and 2i + 2`],
    [`Edges of an MST`, `V − 1`], [`Edges of a complete graph`, `n(n − 1)/2`],
    [`Tower of Hanoi moves`, `2ⁿ − 1`], [`Merge sort recurrence`, `T(n) = 2T(n/2) + n = O(n log n)`], [`Space complexity`, `S(P) = C + S<sub>P</sub>(I)`]] },
  { h: [`The complexity table`, `Complexity-র টেবিল`], t: [[`Algorithm`, `Best`, `Average`, `Worst`, `Space`],
    [`Linear search`, `O(1)`, `O(n)`, `O(n)`, `O(1)`], [`Binary search`, `O(1)`, `O(log n)`, `O(log n)`, `O(1)`],
    [`Bubble sort`, `O(n)`, `O(n²)`, `O(n²)`, `O(1)`], [`Selection sort`, `O(n²)`, `O(n²)`, `O(n²)`, `O(1)`], [`Insertion sort`, `O(n)`, `O(n²)`, `O(n²)`, `O(1)`],
    [`Merge sort`, `O(n log n)`, `O(n log n)`, `O(n log n)`, `O(n)`], [`Quick sort`, `O(n log n)`, `O(n log n)`, `O(n²)`, `O(log n)`], [`Heap sort`, `O(n log n)`, `O(n log n)`, `O(n log n)`, `O(1)`],
    [`BST search / insert / delete`, `O(1)`, `O(log n)`, `O(n)`, `O(h)`], [`BFS / DFS`, `O(V + E)`, `O(V + E)`, `O(V + E)`, `O(V)`],
    [`Kruskal / Prim`, `O(E log V)`, `O(E log V)`, `O(E log V)`, `O(V)`], [`Dijkstra (binary heap)`, `—`, `O((V + E) log V)`, `O((V + E) log V)`, `O(V)`], [`Tower of Hanoi`, `O(2ⁿ)`, `O(2ⁿ)`, `O(2ⁿ)`, `O(n)`]] },
  { h: [`Which data structure is used where`, `কোথায় কোন data structure লাগে`], t: [[`Job`, `Data structure`],
    [`Function calls, recursion, undo, DFS, expression evaluation`, `Stack`], [`BFS, CPU and printer scheduling, buffers`, `Queue`],
    [`Priority scheduling, Dijkstra, Prim, heap sort`, `Heap (priority queue)`], [`Database and file-system indexes`, `B-tree / B+ tree`],
    [`Fast lookup in sorted, changing data`, `Binary search tree (AVL)`], [`Maps, networks, social links`, `Graph`], [`Kruskal's cycle check`, `Union-Find (disjoint set)`]] },
  { h: [`Ten sentences that carry the most marks`, `সবচেয়ে বেশি নম্বর আনে যে দশটি বাক্য`], l: [
    [`Stack is LIFO with one pointer (top); queue is FIFO with two pointers (front and rear).`, `Stack হলো LIFO, একটা pointer (top); queue হলো FIFO, দুটো pointer (front ও rear)।`],
    [`An array is fast to read and slow to change. A linked list is slow to read and fast to change.`, `Array পড়তে দ্রুত, বদলাতে ধীর। Linked list পড়তে ধীর, বদলাতে দ্রুত।`],
    [`Binary search needs sorted data and random access, so it works on arrays, not on linked lists.`, `Binary search-এ sorted ডাটা ও random access লাগে, তাই এটা array-তে চলে, linked list-এ নয়।`],
    [`A graph can have a cycle; a tree cannot.`, `Graph-এ cycle থাকতে পারে; tree-তে পারে না।`],
    [`Pre-order = Root, Left, Right. In-order = Left, Root, Right. Post-order = Left, Right, Root.`, `Pre-order = Root, Left, Right। In-order = Left, Root, Right। Post-order = Left, Right, Root।`],
    [`The in-order traversal of a BST comes out sorted. Use it to check your own answer.`, `BST-র in-order traversal sorted আসে। নিজের উত্তর যাচাইয়ে এটা ব্যবহার করুন।`],
    [`BFS uses a queue and finds shortest paths in unweighted graphs; DFS uses a stack and backtracks.`, `BFS queue ব্যবহার করে ও unweighted graph-এ shortest path দেয়; DFS stack ব্যবহার করে ও backtrack করে।`],
    [`Quick sort is O(n²) when the array is already sorted, because the pivot becomes the smallest or largest element.`, `Array আগে থেকে sorted হলে quick sort O(n²), কারণ pivot সবচেয়ে ছোট বা বড় element হয়ে যায়।`],
    [`Greedy is optimal only when the problem has the greedy-choice property and optimal substructure.`, `Greedy তখনই optimal যখন সমস্যার greedy-choice property ও optimal substructure থাকে।`],
    [`NP means an answer can be verified quickly; NP-Complete problems are the hardest ones in NP.`, `NP মানে উত্তর দ্রুত যাচাই করা যায়; NP-Complete হলো NP-র সবচেয়ে কঠিন সমস্যা।`]] },
  { h: [`Exam-hall checklist`, `পরীক্ষার হলের চেকলিস্ট`], l: [
    [`Draw first, write second. A labelled diagram earns marks that words cannot.`, `আগে আঁকুন, পরে লিখুন। নাম লেখা একটা চিত্র যে নম্বর আনে, শুধু লেখা তা আনে না।`],
    [`"Difference between" always means a table.`, `"Difference between" মানেই টেবিল।`],
    [`"Write the algorithm" means Step 1, Step 2, Step 3. "Write the program" means code.`, `"Write the algorithm" মানে Step 1, Step 2, Step 3। "Write the program" মানে code।`],
    [`End every algorithm answer with its time complexity.`, `প্রতিটি algorithm-এর উত্তরের শেষে time complexity লিখুন।`],
    [`In a trace question (sorting, Kruskal, Dijkstra), show every step. The marks are in the steps, not in the final line.`, `Trace-এর প্রশ্নে (sorting, Kruskal, Dijkstra) প্রতিটি ধাপ দেখান। নম্বর থাকে ধাপে, শেষ লাইনে নয়।`]] }];
