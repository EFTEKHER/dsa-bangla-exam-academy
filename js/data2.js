'use strict';
/* Chapters 7–12 */

CH.push({ id: 'tree', tier: 1, t: [`Tree and binary tree`, `Tree ও binary tree`], s: [`Terminology, types, formulas, three traversals`, `পরিভাষা, প্রকারভেদ, সূত্র, তিন traversal`], b: [
P([`A <b>tree</b> is a non-linear structure that stores data in levels, like a family tree or the folders on your computer.`, `<b>Tree</b> একটা non-linear structure যা ডাটা স্তরে স্তরে রাখে, বংশলতিকা বা কম্পিউটারের folder-এর মতো।`],
  [`The top node is the <b>root</b>. A node directly below another is its <b>child</b>; the one above is its <b>parent</b>.`, `সবার উপরের node হলো <b>root</b>। কোনো node-এর ঠিক নিচের node তার <b>child</b>; উপরেরটা তার <b>parent</b>।`],
  [`A node with no child is a <b>leaf</b>. A node with at least one child is an <b>internal node</b>. Children of the same parent are <b>siblings</b>.`, `যে node-এর child নেই সে <b>leaf</b>। যার অন্তত একটা child আছে সে <b>internal node</b>। একই parent-এর child-রা <b>sibling</b>।`],
  [`<b>Degree</b> of a node = number of its children. <b>Level</b> of the root = 0. <b>Height</b> of the tree = the largest level.`, `Node-এর <b>degree</b> = তার child সংখ্যা। Root-এর <b>level</b> = 0। Tree-র <b>height</b> = সবচেয়ে বড় level।`],
  [`A tree with n nodes always has exactly <b>n − 1 edges</b>, and it never contains a cycle.`, `n টি node-এর tree-তে সবসময় ঠিক <b>n − 1টি edge</b> থাকে, আর এতে কখনও cycle থাকে না।`],
  [`A <b>binary tree</b> is a tree where every node has <b>at most two</b> children: a left child and a right child.`, `<b>Binary tree</b> এমন tree যেখানে প্রতিটি node-এর <b>সর্বোচ্চ দুটো</b> child থাকে: left child ও right child।`]),
H(`Types of binary tree`, `Binary tree-র প্রকারভেদ`),
T([`Type`, `Rule`], [[`Full (proper / strict)`, `Every node has 0 or 2 children`], [`Complete`, `All levels are full except possibly the last, which is filled from left to right`], [`Perfect`, `All internal nodes have 2 children and all leaves are on the same level`], [`Skewed`, `Every node has only one child (it looks like a linked list)`]]),
H(`Formulas you must know`, `যে সূত্রগুলো জানতেই হবে`),
P([`Maximum nodes at level L = 2<sup>L</sup> (root is level 0).`, `Level L-এ সর্বোচ্চ node = 2<sup>L</sup> (root-এর level 0)।`],
  [`Maximum nodes in a tree of height h = 2<sup>h+1</sup> − 1. Minimum = h + 1 (a straight line).`, `Height h-এর tree-তে সর্বোচ্চ node = 2<sup>h+1</sup> − 1। সর্বনিম্ন = h + 1 (একটা সরল রেখার মতো)।`],
  [`If the question counts levels from 1 ("N levels"), the maximum is 2<sup>N</sup> − 1.`, `প্রশ্নে level যদি 1 থেকে গোনা হয় ("N levels"), তাহলে সর্বোচ্চ 2<sup>N</sup> − 1।`],
  [`In a full binary tree: leaves = internal nodes + 1.`, `Full binary tree-তে: leaf সংখ্যা = internal node সংখ্যা + 1।`],
  [`<b>Array form</b> (root at index 1): node i has its left child at 2i, right child at 2i + 1, parent at i/2. With root at index 0: 2i + 1, 2i + 2, (i − 1)/2.`, `<b>Array রূপ</b> (root index 1-এ): node i-এর left child 2i-তে, right child 2i + 1-এ, parent i/2-তে। Root index 0-তে হলে: 2i + 1, 2i + 2, (i − 1)/2।`]),
H(`The three traversals`, `তিনটি traversal`),
P([`Traversal means visiting every node exactly once. The three orders differ only in <b>when the root is visited</b>.`, `Traversal মানে প্রতিটি node ঠিক একবার visit করা। তিনটি ক্রমের পার্থক্য শুধু <b>root কখন visit হয়</b> তাতে।`],
  [`<b>Pre-order</b>: Root, Left, Right. <b>In-order</b>: Left, Root, Right. <b>Post-order</b>: Left, Right, Root.`, `<b>Pre-order</b>: Root, Left, Right। <b>In-order</b>: Left, Root, Right। <b>Post-order</b>: Left, Right, Root।`],
  [`Left always comes before Right. Only the Root moves: first, middle, or last.`, `Left সবসময় Right-এর আগে। শুধু Root-এর জায়গা বদলায়: শুরুতে, মাঝে, বা শেষে।`]),
V('trav', `The 15-node tree from BPSC AP 2023. Try all four orders.`, `BPSC AP 2023-এর 15 node-এর tree। চারটি ক্রমই চালিয়ে দেখুন।`),
X('trick', `The name tells you where the root goes. PRE = root comes before. IN = root comes in the middle. POST = root comes after.`, `নামই বলে দেয় root কোথায় বসবে। PRE = root আগে। IN = root মাঝে। POST = root পরে।`),
C(`
class Node:
    def __init__(self, v):
        self.v, self.left, self.right = v, None, None

def preorder(n):
    if n:
        print(n.v)            # Root
        preorder(n.left)      # Left
        preorder(n.right)     # Right

def inorder(n):
    if n:
        inorder(n.left)       # Left
        print(n.v)            # Root
        inorder(n.right)      # Right

def postorder(n):
    if n:
        postorder(n.left)     # Left
        postorder(n.right)    # Right
        print(n.v)            # Root
`),
H(`Rebuilding a tree from two traversals`, `দুটি traversal থেকে tree বানানো`),
P([`Given in-order <code>d b e a f c g</code> and pre-order <code>a b d e c f g</code>.`, `দেওয়া আছে in-order <code>d b e a f c g</code> ও pre-order <code>a b d e c f g</code>।`],
  [`Step 1: the first letter of pre-order is always the root. Root = a.`, `ধাপ ১: pre-order-এর প্রথম অক্ষর সবসময় root। Root = a।`],
  [`Step 2: find a in the in-order. Left of it (d b e) is the left subtree; right of it (f c g) is the right subtree.`, `ধাপ ২: in-order-এ a খুঁজুন। তার বাঁয়ে (d b e) left subtree; ডানে (f c g) right subtree।`],
  [`Step 3: repeat on each part. Left part: root b with children d and e. Right part: root c with children f and g.`, `ধাপ ৩: প্রতিটি অংশে একই কাজ। বাঁ অংশ: root b, child d ও e। ডান অংশ: root c, child f ও g।`],
  [`Now read it Left, Right, Root: post-order = <b>d e b f g c a</b>.`, `এবার Left, Right, Root ক্রমে পড়ুন: post-order = <b>d e b f g c a</b>।`]),
X('tip', `Pre-order + in-order, or post-order + in-order, give exactly one tree. Pre-order + post-order alone do not. With post-order, the root is the LAST letter.`, `Pre-order + in-order অথবা post-order + in-order থেকে একটাই tree হয়। শুধু pre-order + post-order দিয়ে হয় না। Post-order-এ root হলো শেষ অক্ষর।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`In-order: dbeafcg, pre-order: abdecfg. Find the post-order.`, `45th BCS CSE 2024`, `The first letter of pre-order, a, is the root. In the in-order, dbe is the left subtree and fcg is the right subtree. Recursing: b is the root of the left part with children d and e; c is the root of the right part with children f and g. Post-order (Left, Right, Root) = <b>debfgca</b>. Draw the tree.`, `উত্তর: debfgca। Tree-টা এঁকে তিন ধাপে দেখান।`),
Q(`Prove that a proper binary tree has one more leaf than internal nodes.`, `Titas Gas AE (CSE) 2024`, `Let i = internal nodes, l = leaves, n = i + l total nodes. A tree with n nodes has n − 1 edges. In a proper binary tree every internal node has exactly 2 children, so the number of edges is also 2i. Therefore 2i = n − 1 = i + l − 1, which gives <b>l = i + 1</b>.`, `Edge দুইভাবে গুনুন: মোট n − 1, আবার প্রতিটি internal node থেকে 2টা করে = 2i। সমান করলে l = i + 1।`),
Q(`How do you represent a binary tree using an array?`, `PGCB AE (CSE) 2024`, `Store the root at index 1. For a node at index i, the left child is at 2i, the right child at 2i + 1 and the parent at ⌊i/2⌋. (With 0-based indexing: 2i + 1, 2i + 2 and ⌊(i − 1)/2⌋.) A missing child is marked with a special value such as NULL or −1. This is compact for a complete tree but wastes space for a skewed tree.`, `কোন index থেকে শুরু করছেন তা শুরুতেই লিখে দিন, তারপর সূত্র তিনটা। একটা ছোট tree আর তার array আঁকুন।`),
Q(`Maximum and minimum number of nodes in a binary tree of height 7 (root at height 0).`, `NESCO AM (ICT) 2021`, `Maximum = 2<sup>h+1</sup> − 1 = 2<sup>8</sup> − 1 = <b>255</b>. Minimum = h + 1 = <b>8</b> (one node on each level).`, `সর্বোচ্চ 255, সর্বনিম্ন 8। Root-এর height 0 ধরা হয়েছে, এটা খেয়াল রাখুন।`),
Q(`Draw a binary tree of 15 elements and write its pre-order, in-order and post-order.`, `BPSC AP 2023`, `For the tree rooted at 25: <b>Pre-order</b>: 25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90. <b>In-order</b>: 4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90. <b>Post-order</b>: 4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25.`, `উপরের animation-এ এই tree-টাই আছে। In-order sorted এলে বুঝবেন উত্তর ঠিক (এটা একটা BST)।`),
Q(`What is the minimum number of nodes in a binary tree?`, `BCC AP 2023`, `A binary tree of height h (root at height 0) needs at least h + 1 nodes, one per level. For height 0 the answer is 1. An empty tree has 0 nodes.`, `Height h হলে সর্বনিম্ন h + 1টি node।`)],
z: [Z([`Maximum number of nodes in a binary tree with N levels (levels counted from 1):`, `N level-এর binary tree-তে সর্বোচ্চ node সংখ্যা (level 1 থেকে গোনা):`], [`2N`, `2<sup>N</sup>`, `2<sup>N</sup> − 1`, `N²`], 2, [`Asked in Combined 4 Banks AP 2020.`, `Combined 4 Banks AP 2020-এ এসেছিল।`]),
  Z([`In-order traversal visits nodes in the order:`, `In-order traversal-এর ক্রম:`], [`Root, Left, Right`, `Left, Root, Right`, `Left, Right, Root`, `Right, Root, Left`], 1, [`IN = root in the middle.`, `IN = root মাঝখানে।`]),
  Z([`A tree with 20 nodes has how many edges?`, `20টি node-এর tree-তে কয়টি edge থাকে?`], [`20`, `21`, `19`, `40`], 2, [`Edges = n − 1.`, `Edge = n − 1।`]),
  Z([`Post-order is D E B F C A. The root is:`, `Post-order হলো D E B F C A। Root কোনটি?`], [`D`, `B`, `C`, `A`], 3, [`In post-order the root comes last.`, `Post-order-এ root সবার শেষে আসে।`])] });

CH.push({ id: 'bst', tier: 2, t: [`Binary search tree`, `Binary search tree (BST)`], s: [`Search, insert, delete (three cases), min and max`, `Search, insert, delete (তিন case), min ও max`], b: [
P([`A <b>binary search tree</b> is a binary tree with one extra rule at every node.`, `<b>Binary search tree</b> হলো এমন binary tree যার প্রতিটি node-এ একটা বাড়তি নিয়ম আছে।`],
  [`Everything in the <b>left</b> subtree is <b>smaller</b> than the node. Everything in the <b>right</b> subtree is <b>larger</b>.`, `<b>Left</b> subtree-র সব মান node-এর চেয়ে <b>ছোট</b>। <b>Right</b> subtree-র সব মান node-এর চেয়ে <b>বড়</b>।`],
  [`It works like a dictionary: open the middle, then go left or right. Each comparison throws away half of the remaining data.`, `এটা অভিধানের মতো কাজ করে: মাঝখান খুলুন, তারপর বাঁয়ে বা ডানে যান। প্রতিটি তুলনায় বাকি ডাটার অর্ধেক বাদ পড়ে।`],
  [`So search, insert and delete take O(h), where h is the height. Balanced tree: O(log n). Skewed tree: O(n).`, `তাই search, insert ও delete-এ লাগে O(h), h হলো height। Balanced tree: O(log n)। Skewed tree: O(n)।`],
  [`The <b>in-order</b> traversal of a BST always comes out <b>sorted</b>. Use this to check your answer.`, `BST-র <b>in-order</b> traversal সবসময় <b>sorted</b> আসে। নিজের উত্তর যাচাই করতে এটা কাজে লাগান।`]),
V('bst', `Insert 65, search 40, then delete 70 (it has two children)`, `65 insert করুন, 40 খুঁজুন, তারপর 70 delete করুন (এর দুটো child আছে)`),
H(`Search and insert`, `Search ও insert`),
A(`SEARCH IN BST`, [`Start at the root`, `If root is NULL, return NOT FOUND`, `If key = root → data, return the node`, `If key &lt; root → data, search the left subtree`, `If key &gt; root → data, search the right subtree`, `EXIT`], `Insert-ও একই পথে হাঁটে। যেখানে NULL পায়, সেখানেই নতুন node বসে। নতুন node সবসময় leaf হয়।`),
H(`Delete: the three cases`, `Delete: তিনটি case`),
P([`<b>Case 1, leaf (no child)</b>: simply remove it.`, `<b>Case 1, leaf (child নেই)</b>: সরাসরি মুছে দিন।`],
  [`<b>Case 2, one child</b>: connect that child directly to the deleted node's parent.`, `<b>Case 2, একটা child</b>: সেই child-কে মুছে ফেলা node-এর parent-এর সাথে সরাসরি জুড়ে দিন।`],
  [`<b>Case 3, two children</b>: replace the node's value with its <b>in-order successor</b> (the smallest value in the right subtree), then delete that successor.`, `<b>Case 3, দুটো child</b>: node-এর মান বদলে দিন তার <b>in-order successor</b> দিয়ে (right subtree-র সবচেয়ে ছোট মান), তারপর সেই successor-কে মুছুন।`],
  [`You may use the <b>in-order predecessor</b> instead (the largest value in the left subtree). Both are correct.`, `চাইলে <b>in-order predecessor</b>-ও নিতে পারেন (left subtree-র সবচেয়ে বড় মান)। দুটোই সঠিক।`]),
X('trick', `Smallest = keep going left until you cannot. Largest = keep going right until you cannot. Both are O(h).`, `সবচেয়ে ছোট = যতক্ষণ পারেন বাঁয়ে যান। সবচেয়ে বড় = যতক্ষণ পারেন ডানে যান। দুটোই O(h)।`),
C(`
class Node:
    def __init__(self, key):
        self.key, self.left, self.right = key, None, None

def insert(root, key):
    if root is None:
        return Node(key)                 # empty spot found
    if key < root.key:
        root.left = insert(root.left, key)
    elif key > root.key:
        root.right = insert(root.right, key)
    return root

def search(root, key):
    if root is None or root.key == key:
        return root
    if key < root.key:
        return search(root.left, key)
    return search(root.right, key)

def delete(root, key):
    if root is None: return None
    if key < root.key:   root.left = delete(root.left, key)
    elif key > root.key: root.right = delete(root.right, key)
    else:
        if root.left is None:  return root.right   # case 1 and 2
        if root.right is None: return root.left    # case 2
        s = root.right                             # case 3
        while s.left: s = s.left                   # in-order successor
        root.key = s.key
        root.right = delete(root.right, s.key)
    return root
`),
X('trap', `Inserting already-sorted data (10, 20, 30, 40) gives a skewed tree that behaves like a linked list: O(n). An <b>AVL tree</b> fixes this. It is a self-balancing BST where the heights of the left and right subtrees of every node differ by at most 1.`, `আগে থেকে sorted ডাটা (10, 20, 30, 40) insert করলে skewed tree হয়, যা linked list-এর মতো আচরণ করে: O(n)। <b>AVL tree</b> এর সমাধান। এটা self-balancing BST, যেখানে প্রতিটি node-এর left ও right subtree-র height-এর পার্থক্য সর্বোচ্চ 1।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Explain binary search tree operations.`, `17th NTRCA (CSE) 2023, Combined Bank SO (IT) 2020`, `<b>Search</b>: start at the root; if equal, found; if smaller go left; if larger go right. <b>Insert</b>: walk the same way until an empty position is found and create the node there. <b>Delete</b>: three cases: no child (remove), one child (link the child to the parent), two children (replace with the in-order successor or predecessor, then delete that node). <b>Min / Max</b>: the leftmost / rightmost node.`, `চারটা অপারেশন ২ লাইন করে, সাথে একটা ছোট BST-র ছবি।`),
Q(`Insert 50, 30, 70, 20, 40, 60, 80 into a BST, print the post-order, delete 70 and redraw.`, `PGCB AE (CSE) 2024`, `The tree: root 50; left subtree 30 with children 20 and 40; right subtree 70 with children 60 and 80. Post-order = 20, 40, 30, 60, 80, 70, 50. Deleting 70 (two children): the in-order successor is 80; copy 80 into the node and delete the old 80. New post-order = 20, 40, 30, 60, 80, 50.`, `উপরের animation-এ হুবহু এই tree আছে। 70 delete করে নিজে দেখুন।`),
Q(`Write an algorithm to find a node in a binary search tree.`, `PSB AP 2018`, `Step 1: start at the root. Step 2: if root is NULL, return not found. Step 3: if key = root→data, return the node. Step 4: if key &lt; root→data, search root→left. Step 5: if key &gt; root→data, search root→right. Step 6: exit. Complexity: O(log n) on average, O(n) in the worst case (skewed tree).`, `৬ ধাপ লিখে শেষে complexity উল্লেখ করুন।`),
Q(`Given 40, 45, 80, 90, 50, 70, draw the BST.`, `SGFL AE (IT) 2023`, `Insert in the given order: root 40; 45 goes right of 40; 80 goes right of 45; 90 goes right of 80; 50 goes left of 80; 70 goes right of 50. Because the input is nearly sorted, the tree leans heavily to the right.`, `প্রতিটি মান root থেকে শুরু করে ছোট হলে বাঁয়ে, বড় হলে ডানে নামান।`)],
z: [Z([`In-order traversal of a BST gives the values in:`, `BST-র in-order traversal মানগুলো দেয়:`], [`Random order`, `Descending order`, `Ascending (sorted) order`, `Level order`], 2, [`Left, Root, Right on a BST is sorted.`, `BST-তে Left, Root, Right মানেই sorted।`]),
  Z([`Worst-case time to search in a BST is:`, `BST-তে search-এর worst case সময়:`], [`O(1)`, `O(log n)`, `O(n)`, `O(n log n)`], 2, [`A skewed tree is as slow as a linked list.`, `Skewed tree linked list-এর মতোই ধীর।`]),
  Z([`To delete a node with two children, we replace it with its:`, `দুটো child থাকা node মুছতে তাকে বদলানো হয়:`], [`Parent`, `In-order successor`, `Left child always`, `Root`], 1, [`Successor = smallest in the right subtree.`, `Successor = right subtree-র সবচেয়ে ছোট মান।`]),
  Z([`What is an AVL tree?`, `AVL tree কী?`], [`A tree with exactly 3 children`, `A height-balanced binary search tree`, `A tree stored on disk`, `A heap`], 1, [`Subtree heights differ by at most 1.`, `Subtree-র height-এর পার্থক্য সর্বোচ্চ 1।`])] });

CH.push({ id: 'heap', tier: 3, t: [`Heap and heap sort`, `Heap ও heap sort`], s: [`Max-heap, min-heap, heapify, heap sort`, `Max-heap, min-heap, heapify, heap sort`], b: [
P([`A <b>heap</b> is a <b>complete binary tree</b> that also obeys the heap property between every parent and its children.`, `<b>Heap</b> হলো একটা <b>complete binary tree</b>, যেখানে প্রতিটি parent ও তার child-দের মধ্যে heap-এর শর্ত মানা হয়।`],
  [`<b>Max-heap</b>: every parent ≥ its children, so the largest value sits at the root.`, `<b>Max-heap</b>: প্রতিটি parent ≥ তার child, তাই সবচেয়ে বড় মান থাকে root-এ।`],
  [`<b>Min-heap</b>: every parent ≤ its children, so the smallest value sits at the root.`, `<b>Min-heap</b>: প্রতিটি parent ≤ তার child, তাই সবচেয়ে ছোট মান থাকে root-এ।`],
  [`Think of an office: the boss always outranks the people directly under them, but two colleagues at the same level are not ordered.`, `একটা অফিসের কথা ভাবুন: boss সবসময় তার ঠিক নিচের লোকদের চেয়ে বড় পদে, কিন্তু একই স্তরের দুই সহকর্মীর মধ্যে কোনো ক্রম নেই।`],
  [`Because the tree is complete, a heap is stored in a plain array with no pointers: children of i are at 2i + 1 and 2i + 2.`, `Tree-টা complete বলে heap-কে pointer ছাড়াই সাধারণ array-তে রাখা যায়: i-এর child থাকে 2i + 1 ও 2i + 2-এ।`]),
V('heap', `Load the exam example and watch each value bubble up`, `পরীক্ষার উদাহরণ চালান, দেখুন প্রতিটি মান কীভাবে উপরে ওঠে`),
H(`Insert and extract`, `Insert ও extract`),
P([`<b>Insert</b>: put the new value in the first free position (end of the array), then <b>bubble it up</b> while it beats its parent. O(log n).`, `<b>Insert</b>: নতুন মান প্রথম ফাঁকা জায়গায় (array-র শেষে) বসান, তারপর parent-কে হারাতে পারলে <b>উপরে ওঠান</b>। O(log n)।`],
  [`<b>Extract root</b>: swap the root with the last item, remove it, then <b>heapify down</b>: swap with the better child until the rule holds. O(log n).`, `<b>Extract root</b>: root-কে শেষ item-এর সাথে swap করুন, তাকে সরিয়ে দিন, তারপর <b>নিচের দিকে heapify</b>: শর্ত না মানা পর্যন্ত ভালো child-এর সাথে swap। O(log n)।`],
  [`<b>Heap sort</b>: build a max-heap, then repeat SWAP, REMOVE, HEAPIFY until one item is left. O(n log n) in every case, O(1) extra space.`, `<b>Heap sort</b>: একটা max-heap বানান, তারপর একটা item বাকি না থাকা পর্যন্ত SWAP, REMOVE, HEAPIFY। সব case-এ O(n log n), বাড়তি space O(1)।`]),
C(`
def heapify(a, n, i):              # sift a[i] down in a max-heap of size n
    largest = i
    l, r = 2*i + 1, 2*i + 2
    if l < n and a[l] > a[largest]: largest = l
    if r < n and a[r] > a[largest]: largest = r
    if largest != i:
        a[i], a[largest] = a[largest], a[i]
        heapify(a, n, largest)

def heap_sort(a):
    n = len(a)
    for i in range(n//2 - 1, -1, -1):   # build max-heap
        heapify(a, n, i)
    for end in range(n - 1, 0, -1):
        a[0], a[end] = a[end], a[0]     # SWAP root with last
        heapify(a, end, 0)              # REMOVE (shrink) + HEAPIFY
`),
X('trap', `A heap is NOT a BST. Heap rule is up-down (parent vs child). BST rule is left-right (left &lt; node &lt; right). In a heap, the left child may be bigger than the right child.`, `Heap আর BST এক নয়। Heap-এর নিয়ম উপর-নিচ (parent বনাম child)। BST-র নিয়ম বাঁ-ডান (left &lt; node &lt; right)। Heap-এ left child, right child-এর চেয়ে বড়ও হতে পারে।`),
T([`Point`, `Heap sort`, `Merge sort`], [[`Time (all cases)`, `O(n log n)`, `O(n log n)`], [`Extra space`, `O(1), in place`, `O(n), temporary array`], [`Stable?`, `No`, `Yes`], [`Memory access`, `Jumps around (poor cache use)`, `Sequential (good cache use)`], [`Data movement`, `Swaps: 2 reads + 2 writes`, `Moves: 1 read + 1 write`]]),
X('trick', `Heap sort saves memory. Merge sort saves time. That one sentence is the whole comparison.`, `Heap sort memory বাঁচায়। Merge sort সময় বাঁচায়। এই এক বাক্যই পুরো তুলনা।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Given 40, 45, 80, 90, 50, 70, draw the heap.`, `SGFL AE (IT) 2023`, `Insert one at a time into a max-heap, bubbling up: the array becomes 90, 80, 70, 40, 50, 45. Root 90; its children 80 and 70; 80's children 40 and 50; 70's child 45. State that you built a max-heap by successive insertion; any tree that satisfies the heap property and is complete earns the marks.`, `একটা একটা করে insert করুন, প্রতিবার parent-এর চেয়ে বড় হলে উপরে তুলুন। ল্যাবে Max-heap বেছে নিজে মিলিয়ে নিন।`),
Q(`Heapify the max-heap tree (heap sort walkthrough).`, `BUET M.Sc May 2016`, `The rhythm is SWAP, REMOVE, HEAPIFY. Swap the root with the last element; remove the last element from the heap (it is now in its sorted position); heapify the remaining heap from the root. Repeat until one element remains. Show the tree after each round.`, `প্রতি রাউন্ডের পর tree এঁকে দেখান। Sorting ল্যাবে "Heap" বেছে ধাপগুলো দেখে নিন।`),
Q(`Insert 5, 7, 9, 1, 3, 10, 8, 4 into a min-heap. What is the resulting sequence?`, `Quick test MCQ`, `Insert and bubble up: [5] → [5,7] → [5,7,9] → [1,5,9,7] → [1,3,9,7,5] → [1,3,9,7,5,10] → [1,3,8,7,5,10,9] → <b>[1,3,8,4,5,10,9,7]</b> (4 swaps with its parent 7, then stops below 3).`, `সঠিক level-order array হলো 1, 3, 8, 4, 5, 10, 9, 7। কিছু গাইডের answer key-তে "1, 3, 4, 5, 7, 8, 9, 10" ছাপা আছে; সেটা sorted ক্রম, heap-এর array নয়। MCQ-র option-এ কোনটা আছে দেখে উত্তর দিন, আর ল্যাবে চালিয়ে নিজে যাচাই করুন।`),
Q(`Difference between heap sort and merge sort.`, `BPSC AP 2021`, `Both are O(n log n). Heap sort sorts in place (O(1) space) but is not stable and jumps around the array, so it uses the cache poorly; it swaps data (2 reads and 2 writes). Merge sort needs O(n) extra space but is stable and reads and writes sequentially (1 read and 1 write per move), so it is usually faster on real hardware.`, `উপরের ৫ সারির টেবিলটা দিন।`)],
z: [Z([`In a max-heap the largest element is at the:`, `Max-heap-এ সবচেয়ে বড় element থাকে:`], [`Last leaf`, `Root`, `Leftmost leaf`, `Anywhere`], 1, [`Every parent ≥ its children.`, `প্রতিটি parent ≥ তার child।`]),
  Z([`A heap stored in an array from index 0: the children of index 3 are at:`, `Index 0 থেকে শুরু হওয়া array-তে heap: index 3-এর child আছে:`], [`4 and 5`, `6 and 7`, `7 and 8`, `5 and 6`], 2, [`2i + 1 = 7 and 2i + 2 = 8.`, `2i + 1 = 7 ও 2i + 2 = 8।`]),
  Z([`Time complexity of heap sort in the worst case:`, `Heap sort-এর worst case time complexity:`], [`O(n)`, `O(n log n)`, `O(n²)`, `O(log n)`], 1, [`O(n log n) in all three cases.`, `তিন case-এই O(n log n)।`]),
  Z([`A heap must always be a:`, `Heap সবসময় হতে হবে:`], [`Binary search tree`, `Complete binary tree`, `Skewed tree`, `Graph with cycles`], 1, [`That is why it fits in an array.`, `এজন্যই একে array-তে রাখা যায়।`])] });

CH.push({ id: 'btree', tier: 3, t: [`B-tree and B+ tree`, `B-tree ও B+ tree`], s: [`Why databases use them, splitting, B vs B+`, `Database কেন ব্যবহার করে, splitting, B বনাম B+`], b: [
P([`A database table can hold millions of rows on a disk, and every disk read is slow.`, `একটা database table-এ লক্ষ লক্ষ row থাকে disk-এ, আর প্রতিটি disk read ধীর।`],
  [`A binary tree with a million keys is about 20 levels deep: up to 20 disk reads for one search.`, `দশ লক্ষ key-র binary tree প্রায় 20 স্তর গভীর: একটা search-এ সর্বোচ্চ 20টা disk read।`],
  [`A <b>B-tree</b> solves this by packing <b>many keys into one node</b>, so the tree becomes short and wide: only 3 or 4 levels.`, `<b>B-tree</b> এর সমাধান করে <b>একটা node-এ অনেকগুলো key</b> রেখে, ফলে tree হয় খাটো আর চওড়া: মাত্র 3 বা 4 স্তর।`],
  [`A B-tree is a <b>balanced</b> search tree: all leaves are on the same level, and keys inside a node are kept sorted.`, `B-tree একটা <b>balanced</b> search tree: সব leaf একই স্তরে, আর node-এর ভেতরের key-গুলো sorted থাকে।`],
  [`For order m: a node has at most m children and m − 1 keys; every node except the root has at least ⌈m/2⌉ children.`, `Order m হলে: একটা node-এ সর্বোচ্চ m টি child ও m − 1টি key; root ছাড়া প্রতিটি node-এ অন্তত ⌈m/2⌉টি child।`],
  [`When a node overflows, it <b>splits</b> in two and the <b>middle key moves up</b> to the parent. The tree grows upward, from the root.`, `কোনো node উপচে পড়লে সেটা দুই ভাগে <b>split</b> হয় আর <b>মাঝের key উপরে</b> parent-এ চলে যায়। Tree বাড়ে উপরের দিকে, root থেকে।`]),
H(`B+ tree`, `B+ tree`),
P([`A <b>B+ tree</b> is a B-tree with two changes. First, <b>all data lives in the leaves</b>; internal nodes hold only keys that guide the search.`, `<b>B+ tree</b> হলো দুটো পরিবর্তনসহ B-tree। প্রথমত, <b>সব data থাকে leaf-এ</b>; internal node-এ থাকে শুধু পথ দেখানোর key।`],
  [`Second, <b>the leaves are linked together</b> like a linked list, so a range query (all values from 20 to 40) just walks along the leaves.`, `দ্বিতীয়ত, <b>leaf-গুলো পরস্পর জোড়া</b> linked list-এর মতো, তাই range query (20 থেকে 40-এর সব মান) শুধু leaf ধরে হেঁটে যায়।`]),
V('btree', `The BUET M.Sc 2017 answer`, `BUET M.Sc 2017-এর উত্তর`),
T([`Point`, `B-tree`, `B+ tree`], [[`Where data is stored`, `Internal and leaf nodes`, `Leaf nodes only`], [`Duplicate keys`, `Not allowed`, `Keys are repeated in the index`], [`Searching`, `Slower (data may be at any level)`, `Faster (always ends at a leaf)`], [`Deletion`, `Complex (internal nodes)`, `Simple (always from a leaf)`], [`Leaf nodes`, `Not linked`, `Linked as a list`], [`Range queries`, `Hard`, `Easy`]]),
X('trick', `B+ = "all Business in the Basement". The real data lives on the bottom (leaf) level, and the basement rooms are joined by a corridor (the linked list).`, `B+ = "all Business in the Basement"। আসল data থাকে সবার নিচের (leaf) স্তরে, আর নিচতলার ঘরগুলো একটা করিডোর (linked list) দিয়ে জোড়া।`),
X('tip', `In a "draw the B+ tree" question: state the rule first (how many keys a node holds), show the tree after every split, push the middle key up, and finish by drawing the arrows between the leaves.`, `"B+ tree আঁকো" প্রশ্নে: আগে নিয়মটা লিখুন (একটা node-এ কয়টা key ধরে), প্রতিটি split-এর পর tree দেখান, মাঝের key উপরে তুলুন, আর শেষে leaf-গুলোর মাঝে তীর আঁকুন।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Explain the B-tree data structure.`, `17th NTRCA (CSE) 2023`, `A B-tree is a self-balancing search tree that keeps data sorted and allows search, insertion and deletion in O(log n). Each node holds many keys, which keeps the tree short so that fewer disk reads are needed. All leaves are at the same level. It is used in databases, file systems and multilevel indexing.`, `সংজ্ঞা, বৈশিষ্ট্য (অনেক key, সব leaf এক স্তরে), আর ব্যবহার (database index) লিখুন।`),
Q(`Difference between B-tree and B+ tree.`, `Common`, `(1) B-tree stores data in internal and leaf nodes; B+ tree only in leaves. (2) B-tree keys are not repeated; B+ tree repeats keys in the index. (3) Searching is faster in a B+ tree. (4) Deletion in a B-tree is complex; in a B+ tree it is always from a leaf. (5) B-tree leaves are not linked; B+ tree leaves are linked as a list.`, `৫টা পার্থক্য টেবিল আকারে দিন।`),
Q(`Draw a B+ tree with keys 12, 14, 19, 30, 21, 22, 13, 34, 18, 23, 38, 40 where n = 5.`, `BUET M.Sc April 2017`, `Taking each node to hold up to 5 keys: the first five keys fill one leaf [12, 14, 19, 21, 30]. Inserting 22 overflows it; split and promote 21: leaves [12, 14, 19] and [21, 22, 30]. Then 13, 34, 18 and 23 go into the leaves without a split. Inserting 38 overflows the right leaf; split and promote 34, then 40 joins the last leaf. Final: root [21 | 34]; leaves [12 13 14 18 19] → [21 22 23 30] → [34 38 40].`, `উত্তরের শুরুতেই লিখুন আপনি n = 5 কীভাবে ধরছেন (node-প্রতি সর্বোচ্চ key সংখ্যা), কারণ বইভেদে সংজ্ঞা আলাদা। উপরের চিত্রটাই চূড়ান্ত tree।`)],
z: [Z([`Why do databases prefer B-trees over binary trees?`, `Database কেন binary tree-র বদলে B-tree পছন্দ করে?`], [`They use less CPU`, `They are shorter, so fewer disk reads`, `They need no memory`, `They are unsorted`], 1, [`Many keys per node makes the tree short.`, `প্রতি node-এ অনেক key থাকায় tree খাটো হয়।`]),
  Z([`In a B+ tree, actual data records are stored in:`, `B+ tree-তে আসল data record থাকে:`], [`The root only`, `Internal nodes`, `Leaf nodes only`, `Every node`], 2, [`All business in the basement.`, `সব data নিচতলায় (leaf-এ)।`]),
  Z([`In a B-tree, all leaf nodes are:`, `B-tree-তে সব leaf node থাকে:`], [`At different levels`, `At the same level`, `Always empty`, `Linked in a circle`], 1, [`A B-tree is always balanced.`, `B-tree সবসময় balanced।`]),
  Z([`When a B-tree node overflows:`, `B-tree-র কোনো node উপচে পড়লে:`], [`The tree is rebuilt`, `It splits and the middle key moves up`, `The key is discarded`, `A new root is always created`], 1, [`Split, and promote the middle key.`, `Split হয়, মাঝের key উপরে ওঠে।`])] });

CH.push({ id: 'graph', tier: 2, t: [`Graph, BFS and DFS`, `Graph, BFS ও DFS`], s: [`Terminology, adjacency matrix and list, two traversals`, `পরিভাষা, adjacency matrix ও list, দুই traversal`], b: [
P([`A <b>graph</b> G = (V, E) is a set of <b>vertices</b> (points) and a set of <b>edges</b> (lines joining two points).`, `<b>Graph</b> G = (V, E) হলো কিছু <b>vertex</b> (বিন্দু) আর কিছু <b>edge</b> (দুটি বিন্দুকে জোড়া রেখা)-র সমষ্টি।`],
  [`A road map is a graph: cities are vertices, roads are edges. So is Facebook: people are vertices, friendships are edges.`, `রাস্তার মানচিত্র একটা graph: শহর হলো vertex, রাস্তা হলো edge। Facebook-ও তাই: মানুষ vertex, বন্ধুত্ব edge।`],
  [`<b>Undirected</b>: edges work both ways. <b>Directed</b> (digraph): each edge has an arrow. <b>Weighted</b>: each edge has a cost.`, `<b>Undirected</b>: edge দুই দিকেই চলে। <b>Directed</b> (digraph): প্রতিটি edge-এ তীর থাকে। <b>Weighted</b>: প্রতিটি edge-এর একটা খরচ থাকে।`],
  [`<b>Degree</b> of a vertex = number of edges touching it. A <b>path</b> is a route along edges. A <b>cycle</b> is a path that returns to its start.`, `Vertex-এর <b>degree</b> = তাকে ছোঁয়া edge-এর সংখ্যা। <b>Path</b> হলো edge ধরে যাওয়ার একটা পথ। <b>Cycle</b> হলো এমন path যা শুরুর জায়গায় ফিরে আসে।`],
  [`A graph may contain cycles; a tree may not. A tree is simply a connected graph with no cycle.`, `Graph-এ cycle থাকতে পারে; tree-তে পারে না। Tree আসলে cycle-ছাড়া একটা connected graph।`],
  [`A directed graph is <b>strongly connected</b> if every vertex can reach every other vertex following the arrows.`, `একটা directed graph <b>strongly connected</b> হয় যদি তীর মেনে প্রতিটি vertex থেকে অন্য প্রতিটি vertex-এ যাওয়া যায়।`]),
H(`Two ways to store a graph`, `Graph রাখার দুই উপায়`),
P([`<b>Adjacency matrix</b>: a V × V table. M[i][j] = 1 if there is an edge from i to j, otherwise 0. For a weighted graph, store the weight.`, `<b>Adjacency matrix</b>: V × V আকারের টেবিল। i থেকে j-তে edge থাকলে M[i][j] = 1, নইলে 0। Weighted graph হলে weight রাখা হয়।`],
  [`<b>Adjacency list</b>: for each vertex, keep a linked list of its neighbours.`, `<b>Adjacency list</b>: প্রতিটি vertex-এর জন্য তার প্রতিবেশীদের একটা linked list রাখা হয়।`],
  [`For an undirected graph the matrix is symmetric, and the total length of all lists is 2 × E.`, `Undirected graph-এ matrix প্রতিসম (symmetric) হয়, আর সব list-এর মোট দৈর্ঘ্য 2 × E।`]),
T([`Point`, `Adjacency matrix`, `Adjacency list`], [[`Space`, `O(V²)`, `O(V + E)`], [`Is there an edge u–v?`, `O(1)`, `O(degree of u)`], [`List all neighbours of u`, `O(V)`, `O(degree of u)`], [`Add / remove an edge`, `O(1)`, `Slower removal`], [`Best for`, `Dense graphs`, `Sparse graphs`]]),
X('trick', `Dense graph → matrix. Sparse graph → list. Matrix answers "Is there a road?" instantly. List answers "Where can I go?" instantly.`, `Dense graph → matrix। Sparse graph → list। Matrix সাথে সাথে বলে "রাস্তা আছে কি?" List সাথে সাথে বলে "কোথায় কোথায় যেতে পারি?"`),
H(`BFS and DFS`, `BFS ও DFS`),
P([`<b>BFS</b> (breadth-first search) explores level by level, like ripples spreading in a pond. It uses a <b>queue</b>.`, `<b>BFS</b> (breadth-first search) স্তরে স্তরে এগোয়, পুকুরে ঢেউ ছড়ানোর মতো। এটা <b>queue</b> ব্যবহার করে।`],
  [`<b>DFS</b> (depth-first search) goes as deep as it can along one path, then backtracks, like exploring a maze. It uses a <b>stack</b>.`, `<b>DFS</b> (depth-first search) একটা পথ ধরে যত গভীরে পারে যায়, তারপর ফিরে আসে (backtrack), গোলকধাঁধা ঘোরার মতো। এটা <b>stack</b> ব্যবহার করে।`],
  [`Both mark vertices as <b>visited</b> so that a cycle does not trap them in an endless loop. Both cost O(V + E).`, `দুটোই vertex-কে <b>visited</b> চিহ্ন দেয়, যাতে cycle-এ পড়ে অনন্ত loop-এ না আটকায়। দুটোরই খরচ O(V + E)।`]),
V('bfs', `Same graph, two orders. Watch the queue and the stack.`, `একই graph, দুই রকম ক্রম। Queue আর stack-এর দিকে খেয়াল রাখুন।`),
A(`BFS`, [`Enqueue the source vertex and mark it visited`, `Repeat Steps 3 and 4 until the queue is empty`, `Dequeue a vertex and process it`, `Enqueue all its unvisited neighbours and mark them visited`, `EXIT`], `DFS-এ queue-এর জায়গায় stack বসান, বাকি সব একই।`),
C(`
from collections import deque

def bfs(graph, start):
    visited, q, order = {start}, deque([start]), []
    while q:
        u = q.popleft()               # dequeue
        order.append(u)
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                q.append(v)           # enqueue
    return order

def dfs(graph, u, visited=None, order=None):
    if visited is None: visited, order = set(), []
    visited.add(u)
    order.append(u)
    for v in graph[u]:
        if v not in visited:
            dfs(graph, v, visited, order)   # the call stack is the stack
    return order

g = {'A':['B'], 'B':['A','C','D'], 'C':['B','E','F'],
     'D':['B','F'], 'E':['C'], 'F':['C','D']}
print(bfs(g, 'A'))    # A B C D E F
print(dfs(g, 'A'))    # A B C E F D
`),
T([`Point`, `BFS`, `DFS`], [[`Data structure`, `Queue`, `Stack (or recursion)`], [`Explores`, `Level by level`, `One path to the end, then backtracks`], [`Shortest path (unweighted)`, `Yes`, `No`], [`Memory`, `More`, `Less`], [`Good when the goal is`, `Near the source`, `Far from the source`], [`Time`, `O(V + E)`, `O(V + E)`]]),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Differences between BFS and DFS. When is BFS better?`, `45th BCS CSE 2024, BPSC AP 2021`, `BFS uses a queue and explores level by level; DFS uses a stack and explores one branch fully before backtracking. BFS needs more memory; DFS needs less. Both are O(V + E). Use BFS when you need the shortest path in an unweighted graph, when the goal is close to the source, when the graph is very deep or infinite, or when you need level-by-level information.`, `টেবিল দিন, তারপর BFS কখন ভালো তা ৩–৪ point-এ লিখুন।`),
Q(`Why is depth-first search not optimal?`, `45th BCS ICT 2024`, `DFS does not consider path length or cost, so the first solution it finds may not be the shortest. It may also get stuck in cycles or infinitely deep paths (not complete), deep recursion can overflow the stack, and it is uninformed: it uses no knowledge of where the goal is.`, `মূল কারণ: DFS প্রথম যে সমাধান পায় সেটাই দেয়, সেটা সবচেয়ে ছোট পথ নাও হতে পারে।`),
Q(`Which problems suit an adjacency matrix and which suit an adjacency list?`, `Combined Bank AP 2023`, `<b>Matrix</b>: dense graphs, and problems that often ask whether an edge exists (O(1)) or add and remove edges in constant time. Its weakness is O(V²) space. <b>List</b>: sparse graphs and problems that iterate over the neighbours of a vertex (BFS, DFS, Dijkstra); space is O(V + E).`, `Dense → matrix, sparse → list। সাথে complexity-র টেবিল।`),
Q(`What is a strongly connected graph?`, `BPSC AME 2021`, `A directed graph is strongly connected if there is a directed path from every vertex to every other vertex. For an undirected graph the term is simply "connected": run BFS or DFS from any vertex; if all vertices are visited, the graph is connected.`, `Directed graph-এ প্রতিটি vertex থেকে প্রতিটি vertex-এ তীর মেনে যাওয়া গেলে সেটা strongly connected।`),
Q(`Explain BFS traversal with an example.`, `17th NTRCA (ICT) 2023, DBBL PO 2017`, `BFS traverses a graph breadth-wise using a queue. Enqueue the source and mark it visited; repeatedly dequeue a vertex, process it, and enqueue all its unvisited neighbours. Marking prevents a vertex from being processed twice. On the example graph, BFS from A gives A B C D E F, while DFS gives A B C E F D.`, `সংজ্ঞা, ৫ ধাপের algorithm আর একটা ছোট graph-এ queue-র অবস্থা ধাপে ধাপে দেখান।`),
Q(`Give the adjacency list and matrix of a complete binary tree on 7 vertices.`, `BB AP 2023`, `Treating edges as parent → child: List: 1 → 2, 3; 2 → 4, 5; 3 → 6, 7; vertices 4 to 7 have empty lists. Matrix (7 × 7): row 1 has 1s in columns 2 and 3; row 2 in columns 4 and 5; row 3 in columns 6 and 7; rows 4 to 7 are all zeros. (If you treat it as undirected, also add each parent to its children's lists, which makes the matrix symmetric.)`, `আগে tree-টা আঁকুন (1 root; 2, 3; 4, 5, 6, 7), তারপর list আর matrix। Directed নাকি undirected ধরছেন তা লিখে দিন।`)],
z: [Z([`BFS uses which data structure?`, `BFS কোন data structure ব্যবহার করে?`], [`Stack`, `Queue`, `Heap`, `Hash table`], 1, [`Queue for BFS, stack for DFS.`, `BFS-এ queue, DFS-এ stack।`]),
  Z([`Space needed by an adjacency matrix for V vertices:`, `V টি vertex-এর adjacency matrix-এ কত space লাগে?`], [`O(V)`, `O(V + E)`, `O(V²)`, `O(E)`], 2, [`A V × V table.`, `V × V আকারের টেবিল।`]),
  Z([`Which gives the shortest path in an unweighted graph?`, `Unweighted graph-এ shortest path দেয় কোনটি?`], [`DFS`, `BFS`, `In-order traversal`, `Heap sort`], 1, [`BFS reaches nearer vertices first.`, `BFS কাছের vertex-এ আগে পৌঁছায়।`]),
  Z([`Time complexity of BFS and DFS with an adjacency list:`, `Adjacency list-এ BFS ও DFS-এর time complexity:`], [`O(V²)`, `O(V + E)`, `O(E log V)`, `O(V log V)`], 1, [`Every vertex and every edge is handled once.`, `প্রতিটি vertex ও edge একবার করে দেখা হয়।`])] });

CH.push({ id: 'mst', tier: 2, t: [`Minimum spanning tree`, `Minimum spanning tree (MST)`], s: [`Prim's and Kruskal's, step by step`, `Prim ও Kruskal, ধাপে ধাপে`], b: [
P([`Five villages must be joined by roads, and every possible road has a cost. You want every village reachable with the <b>least total cost</b>.`, `পাঁচটি গ্রামকে রাস্তা দিয়ে জুড়তে হবে, প্রতিটি সম্ভাব্য রাস্তার একটা খরচ আছে। আপনি চান <b>সবচেয়ে কম মোট খরচে</b> সব গ্রামে যাওয়া যাক।`],
  [`A <b>spanning tree</b> is a set of edges that connects all vertices with no cycle.`, `<b>Spanning tree</b> হলো এমন কিছু edge, যা cycle ছাড়া সব vertex-কে যুক্ত করে।`],
  [`A <b>minimum spanning tree</b> is the spanning tree whose total edge weight is the smallest.`, `<b>Minimum spanning tree</b> হলো সেই spanning tree যার edge-গুলোর মোট weight সবচেয়ে কম।`],
  [`Two facts for the first line of any answer: a spanning tree of V vertices has exactly <b>V − 1 edges</b>, and it has <b>no cycle</b>.`, `যেকোনো উত্তরের প্রথম লাইনের জন্য দুটো তথ্য: V টি vertex-এর spanning tree-তে ঠিক <b>V − 1টি edge</b> থাকে, আর এতে <b>cycle থাকে না</b>।`]),
V('mst', `The same graph solved both ways. Both end at cost 10.`, `একই graph দুইভাবে সমাধান। দুটোতেই cost 10।`),
H(`Kruskal's algorithm`, `Kruskal-এর algorithm`),
P([`Sort all edges from cheapest to costliest. Take them one by one.`, `সব edge সস্তা থেকে দামি ক্রমে সাজান। একটা একটা করে নিন।`],
  [`If an edge joins two different trees, keep it. If both its ends are already in the same tree, it would form a cycle: reject it.`, `Edge-টা যদি দুটো আলাদা tree-কে জোড়ে, রাখুন। তার দুই প্রান্ত যদি আগে থেকেই একই tree-তে থাকে, তাহলে cycle হবে: বাদ দিন।`],
  [`Stop when you have V − 1 edges.`, `V − 1টি edge হয়ে গেলে থামুন।`]),
A(`KRUSKAL'S`, [`Create a forest in which each vertex is a separate tree`, `Create a priority queue Q containing all the edges`, `Repeat Steps 4 and 5 while Q is not empty`, `Remove the minimum-weight edge from Q`, `IF it connects two different trees, add it to the forest (union); ELSE discard it`, `END`]),
H(`Prim's algorithm`, `Prim-এর algorithm`),
P([`Start from any one vertex. That is your tree.`, `যেকোনো একটা vertex থেকে শুরু করুন। ওটাই আপনার tree।`],
  [`Look at every edge that goes from the tree to a vertex outside it. Pick the cheapest one and add it.`, `Tree থেকে বাইরের vertex-এ যাওয়া সব edge দেখুন। সবচেয়ে সস্তাটা বেছে যোগ করুন।`],
  [`Repeat until every vertex is inside the tree.`, `সব vertex tree-র ভেতরে না আসা পর্যন্ত চালিয়ে যান।`]),
A(`PRIM'S`, [`Select a starting vertex`, `Repeat Steps 3 and 4 until there are fringe vertices`, `Select an edge e connecting a tree vertex and a fringe vertex that has minimum weight`, `Add the selected edge and the vertex to the minimum spanning tree T`, `EXIT`]),
X('trick', `Prim = grows like a Plant from one seed. Kruskal = Kollects the cheapest edges from anywhere. Both are greedy and both give the same minimum cost.`, `Prim = একটা বীজ থেকে Plant-এর (গাছের) মতো বাড়ে। Kruskal = যেখান থেকেই হোক সবচেয়ে সস্তা edge Kollect করে। দুটোই greedy, দুটোই একই minimum cost দেয়।`),
T([`Point`, `Prim's`, `Kruskal's`], [[`Works on`, `Vertices: grows one tree`, `Edges: merges many small trees`], [`Starts from`, `Any chosen vertex`, `The cheapest edge`], [`Data structure`, `Priority queue (min-heap)`, `Sorting + Union-Find`], [`Time`, `O(E log V), or O(V²) with a matrix`, `O(E log E) = O(E log V)`], [`Better for`, `Dense graphs`, `Sparse graphs`]]),
C(`
def kruskal(vertices, edges):          # edges: (weight, u, v)
    parent = {v: v for v in vertices}  # each vertex is its own tree

    def find(x):                       # which tree is x in?
        while parent[x] != x:
            x = parent[x]
        return x

    mst, total = [], 0
    for w, u, v in sorted(edges):      # cheapest first
        ru, rv = find(u), find(v)
        if ru != rv:                   # different trees -> no cycle
            parent[rv] = ru            # union
            mst.append((u, v, w))
            total += w
    return mst, total

E = [(1,'A','B'), (2,'D','E'), (3,'B','C'), (4,'C','D'),
     (5,'A','E'), (7,'A','C'), (10,'A','D')]
print(kruskal('ABCDE', E))             # cost 10
`),
X('tip', `Every mark in a Kruskal's question comes from the cycle check. Write the rejected edges down: "AE rejected: A and E are already in the same tree." Do not skip them silently.`, `Kruskal-এর প্রশ্নে নম্বর আসে cycle যাচাই থেকে। বাদ পড়া edge-গুলো লিখে দিন: "AE rejected: A and E are already in the same tree." চুপচাপ বাদ দেবেন না।`),
H(`Past exam questions`, `বিগত পরীক্ষার প্রশ্ন`),
Q(`Construct a minimum spanning tree using Prim's algorithm.`, `Common`, `State the five-step algorithm, then trace it. On the graph above starting from A: add AB (1); from {A, B} the cheapest outgoing edge is BC (3); from {A, B, C} it is CD (4); then DE (2). MST edges: AB, BC, CD, DE; cost = 1 + 3 + 4 + 2 = 10. V − 1 = 4 edges.`, `প্রতি ধাপে লিখুন: এখন tree-তে কারা আছে, বাইরে যাওয়া edge কোনগুলো, আর কোনটা সবচেয়ে সস্তা।`),
Q(`Apply Kruskal's algorithm to find the MST.`, `Common`, `Sorted edges: AB(1), DE(2), BC(3), CD(4), AE(5), AC(7), AD(10). Add AB, DE, BC and CD. Reject AE, AC and AD because each would form a cycle. Cost = 1 + 2 + 3 + 4 = 10.`, `Edge-গুলো sort করে একটা টেবিল বানান: Edge, Weight, Add / Reject।`),
Q(`Find the MST of the given 9-vertex, 14-edge graph using Kruskal's algorithm.`, `RAKUB Programmer 2021`, `9 vertices, so the MST has 9 − 1 = 8 edges. Start with 9 single-vertex trees (MAKE-SET), sort the 14 edges by weight, and scan them: add an edge if its ends are in different sets, otherwise discard it as a cycle. Present a table with columns Weight, Source, Destination, Action. For the standard textbook graph (a to i) the total weight is 37.`, `টেবিল আকারে লিখুন: Weight, Source, Destination, Action (Add / Discard)। 8টা edge যোগ হলেই থামুন।`),
Q(`What is the time complexity of Kruskal's algorithm?`, `Quick test MCQ`, `O(E log E), which equals O(E log V), because sorting the edges dominates.`, `Edge sort করতেই সবচেয়ে বেশি সময় যায়: O(E log V)।`)],
z: [Z([`A spanning tree of a graph with 9 vertices has how many edges?`, `9টি vertex-এর graph-এর spanning tree-তে কয়টি edge?`], [`9`, `8`, `10`, `14`], 1, [`V − 1 = 8.`, `V − 1 = 8।`]),
  Z([`Kruskal's algorithm rejects an edge when:`, `Kruskal কখন একটা edge বাদ দেয়?`], [`It is too cheap`, `It forms a cycle`, `It touches the start vertex`, `It is the last edge`], 1, [`Both ends are already in the same tree.`, `দুই প্রান্ত আগে থেকেই একই tree-তে।`]),
  Z([`Time complexity of Kruskal's algorithm:`, `Kruskal-এর time complexity:`], [`O(V)`, `O(E log V)`, `O(V³)`, `O(2ⁿ)`], 1, [`Sorting the edges dominates.`, `Edge sort করাই মূল খরচ।`]),
  Z([`Prim's and Kruskal's algorithms are examples of:`, `Prim ও Kruskal কোন কৌশলের উদাহরণ?`], [`Divide and conquer`, `Backtracking`, `Greedy method`, `Brute force`], 2, [`Each step takes the cheapest safe edge.`, `প্রতি ধাপে সবচেয়ে সস্তা নিরাপদ edge নেয়।`])] });
